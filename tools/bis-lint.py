#!/usr/bin/env python3
"""bis-lint: validate a Bison Intent Spec (BIS v0.1) YAML file.

Usage: bis-lint.py SPEC.bis.yaml [...]
Exit code 0 = clean, 1 = failures, 2 = could not parse.
Requires PyYAML (pip install pyyaml).
"""
import sys, re
try:
    import yaml
except ImportError:
    print("bis-lint requires PyYAML: pip install pyyaml"); sys.exit(2)

def lint(doc):
    F, W = [], []
    g = lambda k, d=None: doc.get(k, d) if isinstance(doc, dict) else d
    if str(g("bis")) != "0.1": F.append("BIS000 header 'bis' must be \"0.1\"")
    owner = str(g("owner", ""))
    if not owner: F.append("BIS005 'owner' (accountable role) is required")
    elif re.match(r"^[A-Z][a-z]+ [A-Z][a-z]+$", owner) and not re.search(r"head|chief|lead|owner|officer|director|manager|vp", owner, re.I):
        W.append("BIS005 'owner' looks like a person's name; use a role")
    if not g("outcome"): F.append("BIS010 'outcome' statement is required")
    objs = g("objectives") or []
    if not objs: F.append("BIS002 at least one objective is required")
    for i, o in enumerate(objs, 1):
        if not (o or {}).get("hard_floor"): F.append(f"BIS002 objective {i} has no hard_floor")
    cons = g("constraints") or []
    ids = set()
    for c in cons:
        cid = (c or {}).get("id", "?"); ids.add(cid)
        if not c.get("enforced_at"): F.append(f"BIS001 constraint {cid} has no enforced_at")
        if not c.get("verified_by"): F.append(f"BIS001 constraint {cid} has no verified_by")
    edges = g("edge_cases") or []
    if len(edges) < 3: W.append("BIS003 fewer than 3 edge cases; add model-failure cases")
    for e in edges:
        ids.add((e or {}).get("id", "?"))
        if not e.get("expected"): F.append(f"BIS003 edge case {e.get('id','?')} has no expected behaviour")
    for i, _ in enumerate(objs, 1): ids.add(f"O{i}")
    blob = str(edges) + str(cons)
    if not re.search(r"timeout|unavailable|down|malformed|parse|fail", blob, re.I):
        W.append("BIS012 no model-failure fallback described")
    if not g("do_not_build"): F.append("BIS004 do_not_build list must be non-empty")
    acc = g("acceptance") or []
    if not acc: F.append("BIS006 acceptance tests are required")
    for a in acc:
        cov = str((a or {}).get("covers", ""))
        if not cov: F.append(f"BIS006 acceptance {a.get('id','?')} does not reference an objective/constraint/edge case")
        elif not any(x.strip() in ids for x in cov.split(",")):
            W.append(f"BIS006 acceptance {a.get('id','?')} covers unknown id '{cov}'")
    if g("decision_class") in ("financial", "safety", "legal") and g("risk_tolerance") != "low" and not g("risk_override_signed_by"):
        F.append("BIS007 decision_class requires risk_tolerance: low or risk_override_signed_by")
    return F, W

def main(paths):
    rc = 0
    for p in paths:
        try:
            doc = yaml.safe_load(open(p))
        except Exception as ex:
            print(f"{p}: parse error: {ex}"); rc = max(rc, 2); continue
        F, W = lint(doc)
        for w in W: print(f"{p}: warning: {w}")
        for f in F: print(f"{p}: FAIL: {f}")
        print(f"{p}: {'PASS' if not F else 'FAIL'} ({len(F)} failures, {len(W)} warnings)")
        if F: rc = max(rc, 1)
    return rc

if __name__ == "__main__":
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    sys.exit(main(sys.argv[1:]))
