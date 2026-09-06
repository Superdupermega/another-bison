# What We Missed, and How Bison Separates From the Field

_Strategic addendum to the business plan. Read this before the 90-day plan; it changes the sequencing._

## 0. The honest diagnosis

The plan in `01-business-plan.md` describes a good boutique consultancy. Consultancies
have a ceiling: revenue scales with headcount, the method leaks the moment it is
published, and every competitor with two senior engineers can copy the service menu
in a weekend. "Method + artifacts" is not a moat. It is a head start.

The things that separate a firm for a decade are the ones that **compound without
headcount** and that **competitors cannot buy**: a metric the industry adopts, a job
title the industry hires for, an attestation that buyers and regulators ask for by
name, a recurring event that forces re-purchase, and a proprietary dataset that makes
every next engagement cheaper and better than anyone else's.

This document lists what the plan missed (§1), the five bets that create separation
(§2), the data flywheel that underpins them (§3), the products that fall out of it
(§4), and the resequenced first 90 days (§5).

---

## 1. What we missed

### 1.1 Strategic gaps

| # | Gap | Why it matters |
|---|---|---|
| 1 | **No proof of the core thesis.** We claim "agents implement a BIS spec without clarifying questions" but never demonstrated it publicly. | The thesis is the product. Unproven, it is a slogan. Proven and measurable, it is a category. |
| 2 | **No metric.** We have lint rules but no number that a VP Eng can put on a dashboard and compare quarter to quarter. | Whoever owns the metric owns the category (see: test coverage, DORA, SOC 2). |
| 3 | **No answer to "what happens when the labs ship this."** Frontier labs will bundle spec elicitation and guardrails into their agent products. | Our defensible ground is what labs will never do: carry liability, be vendor-neutral, and go vertical-deep. The plan says this but does not build on it. |
| 4 | **Accountability is priced as a $30k document.** Accountability is the scarcest thing in the market; we priced it as a deliverable rather than as risk transfer. | Auditors and attestation firms have some of the most durable businesses that exist. |
| 5 | **The recurring revenue engine is weak.** Retainers are "tuning and monitoring". That is a maintenance contract, and maintenance contracts get cut. | We need a forcing event that makes re-verification mandatory, not optional. Model deprecations are that event. |
| 6 | **BIS has no adoption strategy.** An open standard with one author and no conformance suite is a marketing PDF. | Standards win through procurement pull and tooling, not through publishing. |
| 7 | **No talent strategy for a role that does not exist.** We will hire "intent engineers" from a labour market that has none. | Whoever defines and certifies the role gets the pipeline, the community, and the pricing power. |
| 8 | **Distribution is founder-led outbound only.** Engineers discover tools inside their editor and CI, not from cold email. | Bison must exist as an agent skill, an MCP server, and a CI check, not only as a pod. |
| 9 | **No regulatory mapping to concrete artefacts.** We name the EU AI Act and sector guidance in passing. | Annex IV technical documentation, ISO/IEC 42001, and NIST AI RMF map almost one-to-one onto BIS sections. That is a ready-made demand channel we left on the table. |
| 10 | **Cost governance is absent.** Token and tool-call economics are a first-class engineering constraint in agent systems. | Cheap to add, opens the CFO conversation, and every topology already has cost envelopes. |
| 11 | **No dogfooding infrastructure.** We say agents do our implementation but did not plan the internal factory (pipelines, telemetry, cost per engagement). | The margin moat is delivery cost falling every quarter. It only falls if we instrument it. |
| 12 | **Founder credibility is assumed.** No public work, no named people, no case studies. | Regulated buyers do not buy from anonymous firms. |

### 1.2 Commercial and site gaps

- **Lead capture is missing.** Both tools produce value and let the visitor leave without an email. Add optional email capture on download and on the readiness report, with the spec-defect corpus as the "what you get" exchange.
- **No scheduling.** "Book a call" should open a calendar, not a form.
- **No proof.** No case studies, no public specs, no evidence tables, no named team, no logos. The site asserts; it does not show.
- **No SEO surface.** No essays, no glossary for the terms we are trying to own (intent engineering, spec sufficiency, deterministic integration, fallback loop, enforcement point).
- **No legal pages** (privacy, terms) and no analytics wired beyond a dataLayer stub.
- **No pricing model for startups** (equity or deferred), none for enterprise (outcome-linked fees), and no success-fee option.
- **No security posture statement.** SOC 2 Type II and ISO 27001 timelines will gate every regulated deal.

---

## 2. Five bets that create separation

### Bet 1 — Own the metric: the Spec Sufficiency Score (SSS)

**What it is.** Run a BIS spec through N independent autonomous coding agents in
clean environments. Measure: (a) clarifying questions raised per agent, (b)
acceptance-test pass rate on first attempt, (c) behavioural variance between the N
implementations under property tests, (d) cost to first green. Combine into a 0–100
score with a public formula.

**Why it separates.** A spec that scores 90 can be handed to any agent, any vendor,
any contractor. A spec that scores 40 will be built wrong four times. The score
converts our thesis into a number a CTO can track, a buyer can require in a
contract, and a regulator can ask for. Nobody else has proposed one.

**How to build it.**
1. Publish the formula and a reference harness (open source) in Q1.
2. Publish a public leaderboard of open-source project specs we author, with the
   agent runs and evidence tables.
3. Sell hosted SSS as a CI check: "your spec scores 62; here are the three defects."
4. Every engagement reports before/after SSS. That is the ROI story.

### Bet 2 — Own the role: Intent Engineer certification

**What it is.** A published role definition, a curriculum built from our playbooks,
a hands-on exam (write a BIS spec for a messy brief; score is its SSS), and a
certification with a public registry.

**Why it separates.** The market will hire for this role within two years whether
we define it or not. If we define it, every certified engineer is a Bison
ambassador inside a client, the curriculum is a high-margin product, and hiring for
our own pods becomes trivial. Training businesses also survive downturns that kill
consulting budgets.

**How to build it.** Q2: cohort-based course, 12 seats, $4,500, run from the
playbooks. Q3: self-paced version. Q4: enterprise licensing to platform teams.
Target 200 certified by month 18.

### Bet 3 — Own the attestation: Bison Attested

**What it is.** A formal, repeatable attestation that a named system's safety
properties hold, with the evidence table, probe results, and telemetry proof, mapped
to EU AI Act Annex IV technical documentation, ISO/IEC 42001 controls, and NIST AI
RMF functions. Renewed on every material change and every model migration.

**Why it separates.** Consultants advise; attesters sign. Signing is the scarce
act. It creates recurring revenue (renewal), pricing power (nobody haggles with
their auditor), and a badge buyers ask vendors for. Labs will never do this; they
are the party being attested.

**How to de-risk it.** Attest to *evidence* not *outcomes* ("these properties were
verified by these tests on this date"), keep the accountable role on the client
side, cap liability, carry strong E&O, and pursue an insurer partnership in year
two: a warranty-backed attestation is the endgame.

### Bet 4 — Own the migration moment: Model Equivalence & Migration Verification

**What it is.** Frontier models are deprecated every few months. Every deprecation
forces every AI product to swap models with no proof that behaviour is preserved.
We sell the proof: an equivalence suite that runs the client's property tests,
probes, and golden decisions against the new model, reports drift by property, and
gates the migration.

**Why it separates.** It is a recurring, involuntary purchase with a hard deadline
set by someone else. It is vendor-neutral by construction, which labs cannot offer.
It reuses everything from the Verification Audit, so the marginal cost is low. And
it makes the Guardrail Retainer mandatory rather than optional: the retainer is what
keeps the equivalence suite current.

**How to build it.** Fold into Fence (multi-vendor routing already needs equivalence
tests). Publish a public "migration drift report" for each major model release
across common tasks. That report will be shared widely and is a lead magnet with no
equal.

### Bet 5 — Distribute where engineers already work

**What it is.** Bison as software inside the tools engineers use, not only as a pod.

- `bis-lint` as a CI check and a pre-commit hook (exists in primitive form).
- A **Bison intent-engineer agent skill / MCP server** that runs the Frame and
  Specify phases inside the client's coding agent: interviews the engineer, drafts
  the BIS spec, runs lint, computes SSS.
- Spec-to-test generation: property tests and scenario tests emitted from BIS
  sections 3, 4, and 5.
- A Fence policy pack registry that teams install like a dependency.

**Why it separates.** Distribution through the editor and CI scales without
headcount and puts the standard in front of every engineer, not only the buyer.
Once specs in a client repo are BIS files and CI runs `bis-lint`, switching cost is
real.

---

## 3. The data flywheel (the actual moat)

Every engagement, every tool session, and every migration report feeds four
proprietary datasets. These are what a competitor cannot copy by reading our method.

| Dataset | Source | What it powers |
|---|---|---|
| **Spec-defect corpus** | Every clarifying question an agent asks, the spec section it exposed, the fix | Lint rules, the SSS formula, the intent-engineer agent, the curriculum, and content |
| **Failure-mode taxonomy** | Every fallback loop that fired in production, every probe finding, public AI incidents tagged by us | Topology templates, Fence policies, the attestation checklist |
| **Vertical rule registers** | Every domain rule extracted with citation and enforcement point | Vertical packs sold repeatedly; regulatory mappings |
| **Model drift ledger** | Every equivalence run across model versions and properties | Migration reports, vendor routing decisions, the drift benchmark |

Rules for the flywheel:
- Anonymise at capture time; contracts grant this explicitly.
- Every retro must add at least one item to one dataset or it is not done.
- Publish aggregate findings quarterly. The aggregate is marketing; the detail is
  the moat.

---

## 4. Products that fall out of the bets

| Product | From bet | Pricing shape | Year |
|---|---|---|---|
| Hosted SSS + bis-lint in CI | 1, 5 | Per-repo or per-seat subscription | 1 |
| Intent Engineer course and certification | 2 | Per seat, enterprise licence | 1–2 |
| Bison Attested | 3 | Fixed fee + annual renewal | 2 |
| Equivalence & Migration Suite (in Fence) | 4 | Per model migration, or included in retainer | 1–2 |
| Intent-engineer agent skill / MCP server | 5 | Free tier, paid with SSS | 1 |
| Spec-to-test generator | 5 | Add-on to CI subscription | 2 |
| Fence policy registry | 5 | Free community, paid vertical packs | 2 |

Year-two revenue mix target moves from 70/30 services/product to 55/45.

---

## 5. Additional moves worth making

- **Procurement pull for BIS.** Get one large buyer (a bank, a health system, a
  government department) to require BIS + evidence tables from AI vendors in an RFP.
  One such clause creates more adoption than a year of content.
- **Portfolio-level intent.** Offer CTOs an "Intent Portfolio Review": score the
  entire backlog by spec-readiness and cost of ambiguity. Two days, senior-only,
  opens every door in the org and generates a queue of Intent Sprints.
- **Cost-of-ambiguity instrumentation.** Before/after measurement on every
  engagement: rework rate, clarifying-question rate, incident rate, cost to green.
  Our own results dataset becomes the sales deck.
- **Public showcase specs.** Author three complete BIS specs for well-known open
  source components, run agents, publish the evidence. Free, repeatable, and the
  strongest possible proof of the thesis.
- **Accountability ledger tooling.** The sign-off matrix needs software: who
  approved which constraint change, with evidence attached. Small product, deep
  lock-in, and the natural home for attestations.
- **Cost governance discipline.** Add token/tool-call FinOps to Topology Design and
  Fence: budgets, envelopes, anomaly alerts. It opens the CFO conversation.
- **Neutrality as a stated policy.** Publish a vendor-neutrality charter: we route
  across providers, we take no referral fees from labs, our equivalence reports are
  unsponsored. This is a positioning asset labs cannot match.
- **Security posture early.** Start SOC 2 Type I in Q1; it is cheap now and a
  deal-blocker later.
- **Insurance partnership exploration** from month six. A warranty-backed attestation
  is the only version of this business a competitor cannot enter cheaply.

---

## 6. Resequenced first 90 days

| Week | Original plan | Change |
|---|---|---|
| 1–2 | Incorporate, site live, BIS v0.1 | Same, plus: email capture in both tools, calendar booking, vendor-neutrality charter, SOC 2 Type I kickoff |
| 3–4 | Outbound list, intent reviews | Same, plus: publish SSS formula and reference harness; author showcase spec #1 |
| 5–8 | Two design-partner Sprints | Same, plus: every Sprint reports before/after SSS; showcase spec #2 and #3 with agent runs published |
| 9–12 | Fence prototype, first audit | Replace "first audit" with **first Migration Verification** sold on the next model deprecation; publish the first public drift report |
| 13 | Review | Add: launch the first Intent Engineer cohort (12 seats); decide on attestation pilot with one regulated client |

## 7. The one-sentence version

Bison separates from every AI consultancy by owning the number (SSS), the job title
(Intent Engineer), the signature (Bison Attested), the calendar (model migrations),
and the data (spec-defect corpus), while staying the vendor-neutral party that
labs cannot be.
