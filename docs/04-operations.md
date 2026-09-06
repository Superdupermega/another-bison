# Operations

## 1. Entity and legal

- Entity: limited company (Bison Systems Ltd / LLC depending on jurisdiction).
- Insurance before first contract: professional indemnity / E&O, cyber liability,
  general liability.
- Contracts: MSA + SOW template. Key clauses: fixed scope, do-not-build list as an
  exhibit, client owns deliverables, Bison retains method and anonymised patterns,
  "evidence not guarantee" language on safety claims, accountable-role clause
  (client names the decision owner), liability cap at fees paid.
- Data handling: client data stays in client environments. Bison agents run inside
  client infrastructure or in isolated per-client environments with no cross-client
  retention. Written data-processing addendum for regulated clients.
- Domain expert agreements for vertical packs: per-engagement contract, co-author
  credit, no client-confidential material in the shared pack.

## 2. Tooling

| Need | Choice | Notes |
|---|---|---|
| Coding agents | Frontier models via API, multi-vendor | Cost envelope per engagement; routing through our own Fence instance |
| Spec tooling | BIS validator CLI (ours) | Runs in client CI |
| Verification | Property-based testing libs per language; probe suite (ours) | |
| Telemetry | OpenTelemetry to client's stack; Grafana dashboards template | |
| Site | Static HTML on Vercel; form endpoint; analytics via dataLayer | Zero build step by design |
| CRM and pipeline | Lightweight CRM; weekly metrics sheet | |
| Finance | Accounting SaaS; invoicing on milestones | |

### 2a. Security and assurance posture

- SOC 2 Type I kickoff in Q1 (cheap now, deal-blocker later); Type II by Q4.
- ISO 27001 scoping in Q3 if enterprise pipeline warrants it.
- Insurer conversations from month six on a warranty-backed attestation.

### 2b. Dogfooding telemetry

Every engagement runs through the same pipeline we sell: BIS → lint → SSS → agent
implementation → testgen → verification → evidence. We record per engagement:
clarifying questions (spec defects), cost to green, agent hours vs human hours, and
before/after SSS. Delivery cost per engagement must fall quarter over quarter; that
is the margin moat and it is reviewed monthly.

## 3. Hiring plan

| Hire | When | Profile |
|---|---|---|
| Founder A: Intent Engineer | Day 0 | Product/engineering leader; obsessive about specification; can run a workshop with a CFO and a clinician |
| Founder B: Systems Architect | Day 0 | Distributed systems background; has shipped agentic systems in production; strong on transactions and event systems |
| Verification Engineer (contract → FTE) | Q1 → Q3 | Property-based testing, security probing, formal-methods-adjacent |
| Intent Engineer #2 | Q4 | Vertical specialist (fintech or clinical) |
| Growth/content | Q4, part-time | Runs the content engine and partnerships |

Every hire is tested with a compressed Intent Sprint on a real past problem.

## 4. Quality system

- BIS-lint clean is mandatory before implementation.
- Every engagement has an internal red-team hour: another pod member tries to break
  the spec or the topology before handover.
- Post-engagement retro adds at least one pattern, one lint rule, or one Fence
  policy to the library.
- Client NPS and a 30-day follow-up call after every engagement.

## 5. Risk register

| Risk | Owner | Control |
|---|---|---|
| Safety claim liability | Founder A | Contract language, E&O, evidence tables, accountable-role clause |
| Client data leakage via agents | Founder B | Client-side execution, Fence on our own traffic, no cross-client retention |
| Model provider outage during delivery | Founder B | Multi-vendor routing, schedule buffer |
| Key-person dependency | Both | Playbooks, pattern library, recorded handovers |
| Category confusion in market | Founder A | Relentless messaging discipline; free tools that demonstrate the category |
| Cash flow | Founder A | 50% upfront, retainers, 3-month runway minimum |

## 6. Weekly operating rhythm

- Monday: pipeline review (30 min), engagement plan for the week.
- Wednesday: pattern library review; content published.
- Friday: evidence tables and lint reports reviewed across engagements; retro.
- Monthly: finance, hiring, product roadmap.
- Quarterly: strategy review against the plan's metrics.
