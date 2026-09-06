# Service Playbooks

How each engagement is delivered, day by day. These are internal, but clients may
see them: transparency about the process is part of the pitch.

Common rules for all engagements:

- **Day 0 gate**: no engagement starts without a named accountable role on the
  client side and a signed scope with the do-not-build list.
- **Pod**: Intent Engineer (lead), Systems Architect, Verification Engineer.
- **Agents implement**: all code is produced by autonomous coding agents from BIS
  specs. Humans write specs, topologies, tests, and evidence. A human never hand-writes
  production code; if that is needed, the spec is wrong.
- **Artifacts live in the client's repo** from day one, under `bison/`.
- **Every clarifying question an agent asks is logged** as a spec defect
  (`SPEC-DEFECT-nnn`) with the fix. This log is a deliverable and a sales asset.
- **Weekly 30-minute review** with the accountable owner. No status decks; we show
  the spec diff, the lint output, and the evidence table.

---

## 1. Intent Sprint (2 weeks, $28k)

| Day | Activity | Output |
|---|---|---|
| 1 | Framing workshop (3h) with accountable owner + 2 domain people | Outcome statement, decision class, risk tolerance, draft objective function |
| 2 | Objective function with priorities and hard floors; do-not-build list | BIS §2, §3, §8 |
| 3–4 | Constraint mining: interviews, incident history, existing code, regulation | BIS §4 with enforcement points |
| 5 | Edge-case enumeration workshop (2h); model-failure cases always added | BIS §5 |
| 6–7 | Data contracts and interfaces; BIS-lint passes | BIS §6, §7, lint report |
| 8–10 | Agent implementation pass in clean environment; defect log; spec revisions | Reference implementation, `SPEC-DEFECT` log |
| 11–12 | Property tests and scenario tests from §9; CI wiring | Test suite in client repo |
| 13 | Evidence table; probe results; sign-off review | BIS §10 |
| 14 | Handover: 90-minute session, recorded; upsell conversation | Handover doc, proposal for next step |

**Definition of done**: BIS-lint clean, agent implementation without unresolved
clarifying questions, all acceptance tests passing, evidence table signed by the
accountable role.

## 2. Context Infrastructure Build (4–6 weeks)

1. **Ontology week**: entity and relationship map with the domain expert; naming
   authority decided; conflict-resolution rules for competing sources.
2. **Contracts week**: for every source, a data contract (schema, freshness SLA,
   lineage, owner). Contracts are code (JSON Schema + freshness checks).
3. **Retrieval build**: chunking and indexing strategy chosen by evaluation harness,
   not by taste. Harness ships with the deliverable.
4. **Corruption defence**: staleness detectors, poisoning canaries, provenance
   checks at ingestion, quarantine path.
5. **Runbook and on-call**: what alerts mean, who acts, rollback steps.

## 3. Topology Design (3–4 weeks)

1. **Capability inventory**: what each agent may read, write, call, spend.
2. **Protocol design**: message schemas, versioning, correlation IDs, timeouts.
3. **Delegation and consensus**: who may delegate to whom, when consensus is
   required, tie-break rules (default: conservative option wins).
4. **Fallback loops**: halt, drift, malformed, disagreement, provider failure,
   budget breach. Each has a deterministic route and an incident threshold.
5. **Cost and latency envelopes** per path, enforced by middleware.
6. **Reference implementation** by agents from the ADRs; chaos tests inject each
   failure mode and assert the fallback fired.

## 4. Deterministic Integration (4–8 weeks)

Invariants we always specify and test:

- Every agent action on state is **idempotent** (idempotency key derived from the
  intent, not from the attempt).
- Multi-step workflows are **sagas** with explicit compensation.
- Every decision is written to an **append-only audit stream** before any side
  effect the user can see.
- **Replay** from the audit stream reproduces the same state.
- Circuit breakers open on hard-floor breach; the system fails closed.

## 5. Behavioural Verification Audit (2–3 weeks)

1. Extract or write the invariants (if the client has no spec, the first week is a
   compressed Intent Sprint).
2. Property-based tests over the invariants with generated inputs; minimum 10k
   cases per property.
3. Dynamic security probing: prompt injection, data exfiltration, tool abuse,
   privilege escalation through agents, cost amplification.
4. Telemetry review: are hard floors alerting? Is evidence retained?
5. Two reports: engineering (findings with repro and fix) and risk committee
   (properties, evidence, residual risk, accountable owner).

## 6. Fence Deployment (3–5 weeks)

Fence is a proxy in front of every model call.

**Ingress policies**: PII and secret scrubbing, prompt-injection detection on
retrieved content, per-tenant budget, context-size limits, tool-allowlist.
**Egress policies**: schema enforcement with one repair attempt, hallucination
checks against declared sources, toxicity classification, leakage detection
(secrets, PII, internal identifiers), fail-closed typed errors.
**Resilience**: multi-vendor routing, equivalence tests between vendors, graceful
degradation to non-AI path, circuit breakers.
**Telemetry**: every decision logged with policy verdicts; dashboards for hard
floors; weekly drift report.

Deployment: shadow mode (log only) week 1–2, enforce mode week 3+, tuning week 4–5.

## 7. Guardrail Retainer (monthly)

- Weekly: drift report review, policy tuning PRs.
- Monthly: incident review, evidence table refresh, cost review.
- Quarterly: full re-verification against the current spec; regulatory mapping
  update.
- Always: named engineer on the escalation path, 4-hour response.

## 8. Vertical Knowledge Injection (4–8 weeks)

1. Retain a domain expert (co-author, paid per engagement).
2. Extract rules from regulation and practice into a **rule register** with
   citations.
3. Classify each rule: hard constraint (enforce in code), soft guidance (evaluate),
   context (retrieve).
4. Map each hard constraint to an enforcement point and a property test.
5. Deliver the **traceability matrix**: regulation → rule → enforcement → test →
   evidence.
6. Package as a reusable vertical pack (anonymised) for the Bison library.

## 9. Accountability Framework (2 weeks)

1. Decision classification (informational / operational / financial / safety /
   legal) with examples from the client's systems.
2. Risk tolerance per class and the hard-floor policy.
3. Sign-off matrix: accountable role per class, escalation path, what requires
   re-sign-off (constraint changes, objective changes, fallback changes).
4. Ethical boundaries: what the system must never automate, stated plainly.
5. Regulatory mapping (EU AI Act risk tiers, sector guidance).
6. Codebase enforcement: sign-off metadata required in BIS headers; CI blocks
   changes to protected sections without an approver from the matrix.
