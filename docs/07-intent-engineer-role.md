# The Intent Engineer: Role Definition and Certification

_We are defining the role the market will hire for. This document is the canonical
description, the competency model, and the exam._

## 1. Role definition

An **Intent Engineer** translates business needs into specifications that
autonomous coding agents can implement without clarifying questions and that
verification systems can prove. They own the objective function, the constraints
and their enforcement points, the edge cases, the do-not-build list, the data
contracts, and the accountability sign-off. They do not hand-write production code;
if they must, the specification was insufficient and the spec is what gets fixed.

Reports to: Head of Engineering or Head of Product. Works with: architects,
verification engineers, domain experts, risk and compliance.

## 2. Competency model

| Competency | Level 1 (Associate) | Level 2 (Certified) | Level 3 (Principal) |
|---|---|---|---|
| Outcome framing | Writes observable outcomes | Writes measurable outcomes with hard floors | Frames portfolio-level intent with a CFO and a regulator |
| Constraint engineering | Lists constraints | Names enforcement points and verification refs | Designs enforcement architecture across systems |
| Edge-case enumeration | Lists happy-path variants | Always includes model-failure modes | Derives edge cases from incident and regulatory data |
| Data contracts | Names inputs | Specifies source, freshness, provenance | Designs ontology and context infrastructure |
| Agent collaboration | Runs an agent from a spec | Treats every question as a spec defect; iterates to SSS ≥ 75 | Designs the delivery pipeline and its telemetry |
| Verification literacy | Reads test results | Derives property tests from specs | Designs the evidence table and probe strategy |
| Accountability | Knows the sign-off matrix | Writes decision classes and risk tolerances | Owns regulatory mapping and attestation readiness |

## 3. Certification exam

- **Input**: a deliberately messy brief (two pages, contradictory stakeholders,
  hidden regulatory constraint, unstated non-goals).
- **Time**: four hours.
- **Output**: a BIS v0.1 spec.
- **Scoring**: Spec Sufficiency Score across three agent runs on at least two
  vendors (60%), plus a rubric review of constraints, edge cases, and accountability
  sections by two certified reviewers (40%).
- **Pass**: SSS ≥ 75, no failing lint rule, rubric ≥ 70%.
- **Registry**: public, with level, date, and renewal (every two years, or on a
  major BIS version).

## 4. Curriculum (cohort, four weeks part-time)

1. **Frame**: outcome statements, objective functions, hard floors, decision
   classes, risk tolerance, the accountable role.
2. **Specify**: constraint mining, enforcement points, edge-case enumeration,
   data contracts, BIS-lint, the do-not-build list.
3. **Prove**: running agents from specs, spec-defect logging, reading SSS,
   fixing upstream.
4. **Verify and sign**: property tests from specs, probes, evidence tables,
   accountability matrix, exam.

## 5. Why Bison runs this

Every certified engineer is an ambassador inside a client, the curriculum is a
high-margin product that survives consulting downturns, and hiring for our own pods
draws from a pool we created.
