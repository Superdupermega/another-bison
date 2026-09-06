# Bison Intent Spec (BIS) v0.1

BIS is a structured format for stating **what a piece of software must do** with
enough precision that an autonomous coding agent can implement it without asking
questions, and a verification system can prove it did.

It is intentionally boring. Every section is mandatory. Empty sections are a
finding, not an omission.

## 1. Header

```yaml
bis: "0.1"
id: BIS-2026-0042
title: Refund eligibility decision service
owner: Head of Payments          # the accountable human, by role
decision_class: financial        # informational | operational | financial | safety | legal
risk_tolerance: low              # see §7
status: draft | approved | implemented | verified
```

## 2. Outcome statement

One paragraph. What changes in the world when this is done, stated as an
observable, measurable result. No implementation language.

> Customers with eligible orders receive a refund decision within 2 seconds, with
> ≤0.1% incorrect approvals and zero incorrect denials over any rolling 30-day window.

## 3. Objective function

What the system optimises, in priority order, with the metric and the unit.

| Priority | Objective | Metric | Target | Hard floor |
|---|---|---|---|---|
| 1 | Correct denials | false-deny rate | 0% | 0% |
| 2 | Correct approvals | false-approve rate | ≤0.1% | ≤0.5% |
| 3 | Latency | p95 decision time | ≤2s | ≤5s |
| 4 | Cost | model spend per decision | ≤$0.004 | ≤$0.01 |

A hard floor breach is an incident, not a regression.

## 4. Constraints

Rules that must never be violated. Each one has an enforcement point.

```yaml
constraints:
  - id: C1
    rule: "Never expose a customer's payment instrument to the model context."
    enforced_at: fence.policy.pii_egress
    verified_by: property test PT-C1
  - id: C2
    rule: "Refunds above $500 always route to a human."
    enforced_at: topology.router.threshold
    verified_by: property test PT-C2
```

## 5. Edge-case parameters

Enumerated, not implied. Every edge case names the expected behaviour.

| ID | Condition | Expected behaviour |
|---|---|---|
| E1 | Order older than 180 days | Deny with reason `expired_window` |
| E2 | Partial refund already issued | Evaluate remaining balance only |
| E3 | Model returns non-parseable output | Fallback: route to human, log `model_malformed` |
| E4 | Model unavailable > 3s | Fallback: queue, notify customer of delay, never auto-approve |

## 6. Interfaces and data contracts

Inputs, outputs, and the provenance of every field the decision depends on.

```yaml
inputs:
  order:        {source: orders-db, freshness: "≤5s", schema: schemas/order.v3.json}
  policy:       {source: policy-repo, freshness: "on-deploy", schema: schemas/refund-policy.v1.json}
outputs:
  decision:     {schema: schemas/refund-decision.v1.json, sink: decisions-stream}
```

## 7. Risk tolerance and accountability

```yaml
risk_tolerance: low
accountable_owner: Head of Payments
sign_off_required_for:
  - constraint changes
  - objective target changes
  - fallback behaviour changes
regulatory_mapping:
  - PSD2 Art. 73 → C2, E4
```

## 8. Do-not-build list

Explicit non-goals so agents do not over-deliver.

- Do not build a customer-facing appeals flow (separate spec).
- Do not implement fraud scoring; consume the existing fraud service.

## 9. Acceptance tests

Each objective, constraint, and edge case maps to at least one test. Tests are
executable, not prose.

```yaml
acceptance:
  - id: PT-C1
    type: property
    statement: "∀ request: model_context ∩ payment_instrument_fields = ∅"
  - id: AT-E4
    type: scenario
    statement: "Given model timeout of 4s, decision is 'queued' and no approval event emitted"
```

## 10. Verification evidence (filled at verification time)

| Test | Run | Result | Evidence |
|---|---|---|---|
| PT-C1 | 2026-09-14 ci#8812 | pass (10,000 cases) | link |

---

### Validator rules (BIS-lint)

- `BIS001` Every constraint has `enforced_at` and `verified_by`.
- `BIS002` Every objective has a hard floor.
- `BIS003` Every edge case has an expected behaviour.
- `BIS004` Do-not-build list is non-empty.
- `BIS005` Accountable owner is a role, not a person's name.
- `BIS006` Every acceptance test references an objective, constraint, or edge case.
- `BIS007` `decision_class` of `financial`, `safety`, or `legal` requires `risk_tolerance: low` or an explicit override with sign-off.
