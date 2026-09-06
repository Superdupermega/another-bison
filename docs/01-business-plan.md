# Bison — Business Plan

_Version 1.0 · September 2026 · Confidential working document_

---

## 1. Thesis

For thirty years the scarce input in software was the ability to write correct code.
That input is now abundant: frontier models implement, refactor, and test at a level
that exceeds most senior engineers. When implementation is nearly free, the cost of
software collapses onto three things that models still do badly on their own:

1. **Intent clarity** — knowing, precisely and measurably, what "done" means.
2. **System topology** — how autonomous, non-deterministic components are wired into
   deterministic systems without losing fault tolerance or transactional integrity.
3. **Deterministic validation** — proving that what was built has the properties that
   were promised, continuously, with humans accountable for the guarantees.

Companies that adopt AI coding tools without re-organising around these three
disciplines get **faster production of the wrong thing.** Bison exists to fix that.

**Bison is an intent engineering firm.** We do not sell hours of coding. We sell
specifications that machines can execute unambiguously, architectures that keep
autonomous agents inside deterministic rails, and verification systems that let a
human sign their name to the result.

## 2. The company in one paragraph

Bison is a boutique consultancy and product studio. Year one is services-led
(high-margin, fixed-scope engagements that produce reusable IP). Year two converts the
IP into two products: the **Bison Intent Spec (BIS)** open standard and tooling, and
**Fence**, a policy-enforcing proxy layer for LLM traffic. Services fund the products;
products make the services cheaper to deliver and harder to compete with.

## 3. Market

### 3.1 Who buys

| Segment | Pain | Budget owner | Deal size |
|---|---|---|---|
| **Scale-ups (50–500 eng)** adopting agentic coding | Velocity up, quality and incident rate also up; nobody owns "what should this do" | VP Eng / CTO | $40k–$180k |
| **Regulated verticals** (fintech, health, legal, maritime/logistics, insurance) shipping AI features | Cannot ship without provable guardrails and audit trails; generalist models miss domain constraints | CTO, Head of Risk, GC | $80k–$400k |
| **AI-native startups** building multi-agent products | Agent systems drift, halt, loop, and cost too much; no topology discipline | Founder / CTO | $25k–$90k |
| **Enterprises** with platform teams | Want an "AI engineering operating model" and internal guardrail middleware | VP Platform, CISO | $150k–$600k |

### 3.2 Why now

- Coding agents crossed the threshold where implementation time is no longer the
  schedule driver. Backlogs are now spec-bound, not code-bound.
- Incident post-mortems increasingly trace to ambiguous intent or unguarded model
  output, not to syntax bugs.
- Regulators (EU AI Act enforcement phases, sector guidance in finance and health)
  now require documented risk controls for AI-driven decisions. Someone has to build
  and own them.
- Engineering leaders are actively looking for a new operating model and have few
  credible vendors: most "AI consultancies" sell prompt workshops or LLM apps, not
  systems discipline.

### 3.3 Competitive landscape

| Category | Examples | Where Bison wins |
|---|---|---|
| Big-firm AI practices | Accenture, Deloitte, Thoughtworks | Speed, price, opinionated method, we ship code not decks |
| LLM app shops | hundreds of small agencies | We sit upstream (intent, architecture, verification), not in the commodity build layer |
| AI safety/eval vendors | eval platforms, red-team firms | We integrate evals into architecture and CI rather than selling a dashboard |
| Internal platform teams | the client's own staff | We are the accelerant and the method; we leave them owning it |

Bison's moat is **method + artifacts**: a published spec standard, reference
topologies, and a verification harness that every engagement improves.

## 4. Offer architecture

Every engagement maps to one of the four disciplines from the thesis. Each is
fixed-scope, fixed-price, and produces artifacts the client keeps.

### 4.1 Intent Engineering

**Intent Sprint** — 2 weeks · $28,000
Converts one fuzzy business need into a Bison Intent Spec: explicit constraints,
edge-case parameters, objective functions, acceptance tests, and a
"do-not-build" list. Deliverable is executable by an autonomous coding agent on
day one. Includes one implementation pass by our agents to prove the spec is
sufficient.

**Context Infrastructure Build** — 4–6 weeks · $75,000–$120,000
Ontology map, retrieval pipeline design, ground-truth data contracts, freshness and
provenance policies, and corruption detection. Delivered as running infrastructure
plus the runbook.

### 4.2 System Architecture & Orchestration

**Topology Design** — 3–4 weeks · $55,000–$85,000
Multi-agent network design: roles, communication protocols, delegation paths,
consensus and tie-break rules, halt/drift detection, deterministic fallback loops,
cost envelopes. Delivered as an architecture decision record set plus a running
reference implementation.

**Deterministic Integration** — 4–8 weeks · $90,000–$180,000
Wiring non-deterministic decisions into transactional systems: idempotency, sagas
and compensation, event-stream contracts, replay and audit, circuit breakers for
model failure. Delivered as production code with property-based tests.

### 4.3 Auditing, Safety & Telemetry

**Behavioural Verification Audit** — 2–3 weeks · $35,000–$60,000
Property-based test suites, dynamic security probing of model-exposed surfaces,
formal statement of safety invariants with evidence. Report is written for the
engineering team **and** for the risk committee.

**Fence Deployment (guardrail middleware)** — 3–5 weeks · $60,000–$110,000
Real-time policy proxy: PII and secret egress prevention, output schema
enforcement, toxicity and hallucination checks, graceful degradation and model
failover. Deployed in the client's environment with telemetry dashboards.

**Guardrail Retainer** — monthly · $12,000–$30,000
Ongoing policy tuning, drift monitoring, incident review, quarterly re-verification.
This is the recurring revenue engine.

### 4.4 Domain Nuance & Responsibility

**Vertical Knowledge Injection** — 4–8 weeks · $80,000–$200,000
Encoding specialist domain rules (tax code, clinical boundaries, maritime/regulatory
law, insurance underwriting rules) into the architecture as hard constraints, not
prompts. Delivered with a domain expert co-author and a traceability matrix from
regulation to enforcement point.

**Accountability Framework** — 2 weeks · $30,000
Risk tolerance definitions, ethical boundary policy, sign-off matrix (who is
accountable for what class of automated decision), regulatory mapping. Designed for
the board and the regulator, implemented in the codebase.

### 4.5 Products (Year 2)

- **BIS (Bison Intent Spec)** — open standard + open-source validator + hosted
  "spec linter" ($49–$199/seat/month for teams). Lead-gen and the wedge.
- **Fence** — the guardrail proxy, packaged as a self-hosted product with a
  managed policy library. $2,500–$15,000/month by traffic tier.

## 5. Delivery model

- **Pods of three**: one Intent Engineer (lead), one Systems Architect, one
  Verification Engineer. A pod runs two engagements concurrently.
- **Agents do the implementation.** Every pod uses autonomous coding agents for
  implementation, and every artifact we deliver is designed to be executed by them.
  We eat our own thesis.
- **Fixed scope, fixed price.** No hourly billing. Change requests are new sprints.
- **Client keeps everything**: specs, code, tests, dashboards, runbooks. We keep the
  method and anonymised patterns.
- **Every engagement produces a pattern** added to the internal library, which lowers
  the cost of the next engagement.

## 6. Pricing logic

- Anchor on **outcome value**, not effort. An Intent Sprint that prevents one
  mis-built feature pays for itself; a Fence deployment that prevents one data-leak
  incident pays for itself many times over.
- Target gross margin: **65–75%** on services (pod cost vs. price), **85%+** on
  products.
- Retainers are priced so that three retainers cover one pod's fully loaded cost.

## 7. Financial model (assumptions, not forecasts)

**Founding team**: 2 founders (Intent + Architecture) and 1 contract Verification
Engineer for the first two quarters.

| | Q1 | Q2 | Q3 | Q4 | Year 1 |
|---|---|---|---|---|---|
| Engagements closed | 2 | 3 | 4 | 5 | 14 |
| Avg engagement value | $40k | $55k | $65k | $75k | — |
| Project revenue | $80k | $165k | $260k | $375k | $880k |
| Retainers active (end) | 0 | 2 | 4 | 7 | — |
| Retainer revenue | $0 | $30k | $90k | $180k | $300k |
| **Total revenue** | **$80k** | **$195k** | **$350k** | **$555k** | **$1.18M** |
| People cost | $90k | $110k | $160k | $220k | $580k |
| Tooling, models, infra | $8k | $12k | $18k | $25k | $63k |
| Sales & marketing | $6k | $10k | $15k | $20k | $51k |
| Legal, insurance, admin | $12k | $6k | $6k | $8k | $32k |
| **Operating profit** | **−$36k** | **$57k** | **$151k** | **$282k** | **$454k** |

Break-even in month five. Year-2 target: $3.2M (services $2.4M, products $0.8M),
headcount 9.

Sensitivities: the model breaks if average deal size stays below $35k or close rate
from qualified pipeline falls below 25%. Both are mitigated by the fixed-price
Intent Sprint as a low-risk entry product that upsells into Topology and Fence.

## 8. Go-to-market summary

(Full detail in `03-go-to-market.md`.)

1. **Publish the method.** BIS standard, reference topologies, and the readiness
   scorecard are public. Content is the funnel.
2. **Free tools on the site**: the Spec Builder and the Readiness Scorecard capture
   intent and email. Every tool output ends with a "have Bison review this" CTA.
3. **Founder-led sales** to a named list of 150 VP Eng / CTOs at scale-ups and
   regulated firms.
4. **Wedge → expand**: Intent Sprint ($28k) → Topology or Fence ($60k–$180k) →
   Guardrail Retainer (recurring).
5. **Partnerships**: coding-agent vendors and cloud marketplaces list Bison as the
   "make it safe and specific" partner.

## 9. First 90 days

| Week | Milestone |
|---|---|
| 1–2 | Incorporate, insurance (E&O + cyber), bank, contracts template, site live, BIS v0.1 published |
| 3–4 | Readiness scorecard + spec builder live; 150-name outbound list; 3 design-partner conversations/week |
| 5–8 | Close 2 Intent Sprints at design-partner pricing ($18k); deliver; publish anonymised case notes |
| 9–12 | Fence prototype running on own infra; first Behavioural Verification Audit sold; first retainer proposal |
| 13 | Board-style review: pipeline, margin, pattern library size; decide on hire #3 |

## 10. Twelve-month roadmap

- **Q1** Services live, BIS v0.1, 2 engagements, site + tools.
- **Q2** BIS v1.0 with validator CLI; Fence internal alpha; first vertical pack
  (fintech). 3 engagements, 2 retainers.
- **Q3** Fence deployed at 2 clients; second vertical pack (clinical or maritime);
  hire Verification Engineer full-time. 4 engagements, 4 retainers.
- **Q4** Hosted BIS linter beta; Fence self-serve tier; partner listing with one
  coding-agent vendor. 5 engagements, 7 retainers. Decide Year-2 raise vs. bootstrap.

## 11. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Frontier labs ship "intent + guardrails" natively | Medium | Stay vertical-deep and accountability-focused; labs will not own client liability |
| Category is too new; buyers don't have a budget line | Medium | Sell into existing lines: platform, security, compliance, incident reduction |
| Founder bandwidth — sales vs. delivery | High | Fixed-scope products, agents doing implementation, pod model, retainers |
| Liability exposure from safety claims | Medium | Precise contractual scope, E&O insurance, "evidence not guarantee" language, accountability matrix always names the client as decision owner |
| Model cost volatility | Low | Cost envelopes in every topology; multi-vendor routing in Fence |

## 12. Success metrics

- Pipeline: 20 qualified conversations/month by month 4.
- Sales: ≥30% close rate on Intent Sprints; ≥50% of Sprints upsell within 90 days.
- Delivery: every engagement adds ≥1 reusable pattern; client NPS ≥ 60.
- Product: BIS validator 1,000 GitHub stars by month 9; 10 paying linter teams by month 12.
- Finance: break-even by month 5; 65%+ gross margin.
