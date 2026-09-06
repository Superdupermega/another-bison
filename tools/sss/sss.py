#!/usr/bin/env python3
"""Spec Sufficiency Score (SSS) reference harness.

Runs a BIS spec through N independent agent runs, collects four signals, and
computes SSS = 100 * (0.35*Q + 0.35*P + 0.20*V + 0.10*C).

  Q  question rate        max(0, 1 - mean_questions / 5)
  P  first-pass rate      mean share of acceptance tests passing on first submission
  V  behavioural agreement share of property cases where all runs agree
  C  cost stability       1 - CV(cost_to_green), clipped to [0,1]

Runners
  --runner mock            deterministic simulation for demos and CI of the harness itself
  --runner cmd --cmd "..." run your own agent. The command receives {spec} and {out};
                           it must write {out}/result.json:
                           {"questions": [..strings..], "tests_passed": int, "tests_total": int,
                            "property_signatures": ["case-id:outcome", ...], "cost_usd": float}

Usage
  sss.py SPEC.bis.yaml [--runs 3] [--runner mock|cmd] [--cmd CMD] [--json]
"""
import argparse, json, os, statistics, subprocess, sys, tempfile, hashlib, random
try:
    import yaml
except ImportError:
    print("requires PyYAML: pip install pyyaml"); sys.exit(2)

def load_spec(p):
    return yaml.safe_load(open(p))

def spec_shape(spec):
    """Count how much of the spec is filled; the mock runner derives its behaviour from this."""
    n_obj = len(spec.get("objectives") or []); n_con = len(spec.get("constraints") or [])
    n_edge = len(spec.get("edge_cases") or []); n_acc = len(spec.get("acceptance") or [])
    n_dnb = len(spec.get("do_not_build") or []); has_outcome = 1 if spec.get("outcome") else 0
    floors = sum(1 for o in (spec.get("objectives") or []) if (o or {}).get("hard_floor"))
    enforce = sum(1 for c in (spec.get("constraints") or []) if (c or {}).get("enforced_at"))
    return dict(n_obj=n_obj, n_con=n_con, n_edge=n_edge, n_acc=n_acc, n_dnb=n_dnb,
                has_outcome=has_outcome, floors=floors, enforce=enforce)

def mock_run(spec, seed):
    """Simulates an agent: missing spec material produces questions, failed tests, disagreement."""
    s = spec_shape(spec); rng = random.Random(seed)
    gaps = []
    if not s["has_outcome"]: gaps.append("What is the observable outcome?")
    gaps += ["What is the hard floor for objective %d?" % (i+1) for i, o in enumerate(spec.get("objectives") or []) if not (o or {}).get("hard_floor")]
    gaps += ["Where is constraint %s enforced?" % (c or {}).get("id","?") for c in (spec.get("constraints") or []) if not (c or {}).get("enforced_at")]
    if s["n_edge"] < 3: gaps.append("What happens when the model times out or returns malformed output?")
    if not s["n_dnb"]: gaps.append("Should I also build the adjacent flows?")
    if not s["n_acc"]: gaps.append("How will this be tested?")
    questions = [g for g in gaps if rng.random() < 0.85]
    total = max(s["n_acc"], 1)
    pass_rate = max(0.0, min(1.0, 0.98 - 0.12 * len(gaps) + rng.uniform(-0.03, 0.03)))
    passed = round(total * pass_rate)
    cases = 20
    sig = []
    for i in range(cases):
        # well-specified cases converge; each gap makes an interpretation fork more likely
        forked = rng.random() < min(0.6, 0.05 * len(gaps))
        sig.append("case-%d:%s" % (i, ("B" if (forked and rng.random() < 0.5) else "A")))
    cost = 2.0 + 0.9 * len(gaps) + rng.uniform(0, 0.4 + 0.6 * len(gaps))
    return dict(questions=questions, tests_passed=passed, tests_total=total, property_signatures=sig, cost_usd=round(cost, 3))

def cmd_run(cmd, spec_path, run_idx):
    out = tempfile.mkdtemp(prefix="sss-run%d-" % run_idx)
    full = cmd.format(spec=spec_path, out=out)
    subprocess.run(full, shell=True, check=False)
    rp = os.path.join(out, "result.json")
    if not os.path.exists(rp):
        return dict(questions=["<agent produced no result.json>"], tests_passed=0, tests_total=1, property_signatures=[], cost_usd=0.0)
    return json.load(open(rp))

def score(results):
    n = len(results)
    q = statistics.mean(len(r["questions"]) for r in results)
    Q = max(0.0, 1.0 - q / 5.0)
    P = statistics.mean((r["tests_passed"] / max(r["tests_total"], 1)) for r in results)
    # agreement: a case counts as agreed when every run reports the same outcome for it
    by_case = {}
    for r in results:
        for sig in r.get("property_signatures", []):
            cid, _, outcome = sig.partition(":")
            by_case.setdefault(cid, []).append(outcome)
    cases = [v for v in by_case.values() if len(v) == n]
    V = (sum(1 for v in cases if len(set(v)) == 1) / len(cases)) if cases else 0.0
    costs = [r.get("cost_usd", 0.0) for r in results]
    cv = (statistics.pstdev(costs) / statistics.mean(costs)) if n > 1 and statistics.mean(costs) > 0 else 0.0
    C = max(0.0, min(1.0, 1.0 - cv))
    sss = 100 * (0.35 * Q + 0.35 * P + 0.20 * V + 0.10 * C)
    band = "Sufficient" if sss >= 85 else "Workable" if sss >= 65 else "Ambiguous" if sss >= 40 else "Not a spec"
    return dict(sss=round(sss, 1), band=band, Q=round(Q, 3), P=round(P, 3), V=round(V, 3), C=round(C, 3),
                mean_questions=round(q, 2), runs=n)

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("spec"); ap.add_argument("--runs", type=int, default=3)
    ap.add_argument("--runner", choices=["mock", "cmd"], default="mock"); ap.add_argument("--cmd")
    ap.add_argument("--json", action="store_true"); ap.add_argument("--min", type=float, help="fail (exit 1) below this score")
    a = ap.parse_args()
    spec = load_spec(a.spec)
    seed_base = int(hashlib.sha256(open(a.spec, "rb").read()).hexdigest()[:8], 16)
    results = []
    for i in range(a.runs):
        results.append(mock_run(spec, seed_base + i) if a.runner == "mock" else cmd_run(a.cmd, a.spec, i))
    rep = score(results); rep["spec"] = a.spec; rep["runner"] = a.runner
    rep["questions"] = sorted({q for r in results for q in r["questions"]})
    if a.json: print(json.dumps(rep, indent=2))
    else:
        print("SSS %5.1f  %s   (Q=%.2f P=%.2f V=%.2f C=%.2f; %d runs, %.1f questions/run)" % (rep["sss"], rep["band"], rep["Q"], rep["P"], rep["V"], rep["C"], rep["runs"], rep["mean_questions"]))
        for q in rep["questions"]: print("  spec defect:", q)
    if a.min is not None and rep["sss"] < a.min: sys.exit(1)

if __name__ == "__main__": main()
