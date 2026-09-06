# Bison — Intent Engineering for AI-Native Software

**Bison** is a consultancy and product studio for the post-"code-is-cheap" era.
When AI writes code at grandmaster level, the bottleneck in software moves to
three things: **intent clarity, system topology, and deterministic validation.**
Bison sells exactly those three things.

> The bottleneck moved. So did we.

## What is in this repository

| Path | What it is |
|------|------------|
| `docs/01-business-plan.md` | Thesis, positioning, service lines, pricing, financial model, 12-month plan |
| `docs/02-service-playbooks.md` | Step-by-step delivery playbooks for each engagement type |
| `docs/03-go-to-market.md` | ICP, channels, messaging, sales process, content engine |
| `docs/04-operations.md` | Legal, tooling, hiring, QA, risk register |
| `docs/05-spec-standard.md` | The Bison Intent Spec (BIS) — the open standard we deliver against |
| `docs/06-what-we-missed-and-moats.md` | Strategy: gaps in the plan, the five separation bets, the data flywheel, resequenced 90 days |
| `docs/07-intent-engineer-role.md` | Role definition, competency model, certification exam and curriculum |
| `tools/sss/sss.py` | Spec Sufficiency Score reference harness (`--runner mock` or your own agent via `--runner cmd`) |
| `tools/bis-testgen.py` | Emits a pytest skeleton from a BIS spec so tests exist before implementation |
| `.claude/skills/intent-engineer/` | Agent skill that runs Frame and Specify inside a coding agent and blocks code until lint passes |
| `fence/` | Fence policy registry: schema, six core policies with self-tests, vertical pack layout |
| `.github/workflows/bis-lint.yml`, `.pre-commit-hooks.yaml` | CI and pre-commit integration for bis-lint and SSS |
| `.github/workflows/deploy.yml` | Optional CI deploy to Vercel (needs three secrets); unnecessary once the repo is linked in Vercel |
| `docs/08-deploy.md` | Vercel + Neon deployment, verification, and data queries |
| `site/` | The public website (static, zero build step, deploys anywhere) |
| `site/tools/spec-builder.html` | Working lead-gen tool: generates a BIS intent spec in the browser |
| `site/tools/readiness.html` | Working lead-gen tool: AI-native engineering readiness scorecard |
| `site/assets/config.js` | Launch configuration: form endpoint, calendar URL, newsletter endpoint, analytics |
| `tools/bis-lint.py` | Command-line BIS validator (`python3 tools/bis-lint.py examples/*.bis.yaml`) |
| `examples/` | Example BIS specs that pass the validator |

## Try the tooling

```bash
pip install pyyaml
python3 tools/bis-lint.py examples/refund-eligibility.bis.yaml
python3 tools/sss/sss.py examples/refund-eligibility.bis.yaml --runner mock
python3 tools/bis-testgen.py examples/refund-eligibility.bis.yaml -o tests/test_refund.py
```

## Run locally

```bash
npm install && npm run dev      # http://localhost:8080 — site plus API handlers
npm test                        # handler tests, no network needed
```

## Deploy (Vercel + Neon, free tiers)

[![Import to Vercel](https://vercel.com/button)](https://vercel.com/new/import?s=https://github.com/superdupermega/another-bison)

1. Import the repo into Vercel (button above, framework preset **Other**).
2. Storage → Create Database → **Neon** (free) → Connect to project. This sets `DATABASE_URL`.
3. Redeploy once. `/api/health` should report `"db":"connected"`.

Full steps, verification, and data queries: `docs/08-deploy.md`. Until the database
is connected the site runs in degraded mode: writes return 503, the contact form
falls back to email, and the tools keep working from local storage.

### Backend

| Endpoint | Purpose |
|---|---|
| `api/health.js` | Database connectivity check |
| `api/lead.js` | Email captures from the tools |
| `api/contact.js` | Contact form submissions |
| `api/specs.js` | Shareable spec links (Spec Builder "Share link") |
| `api/readiness.js` | Anonymous readiness submissions and the public benchmark |
| `api/spec.py` | Hosted BIS lint and Spec Sufficiency Score (mock runner) |
| `db/schema.sql` | Postgres schema, applied idempotently on first request |
| `scripts/dev-server.mjs` | Local server: static site plus all API handlers |

## Launch checklist

- [ ] Import to Vercel and connect Neon (`docs/08-deploy.md`)
- [ ] Fill in `CALENDAR_URL` and `ANALYTICS_ID` in `site/assets/config.js` (API endpoints already default to `/api/*`)
- [ ] Replace `hello@bison.systems` / `privacy@bison.systems` with live addresses
- [ ] Add registered entity and jurisdiction to `site/privacy.html`
- [ ] Publish showcase spec results on `site/sss.html`
- [ ] Deploy `site/` and point the domain

## Status

Pre-launch. Follow the resequenced 90 days in `docs/06-what-we-missed-and-moats.md` §6.
