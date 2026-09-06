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
| `docs/06-what-we-missed-and-moats.md` | Strategic addendum: gaps in the plan, the five bets that create separation, the data flywheel, resequenced 90 days |
| `site/` | The public website (static, zero build step, deploys anywhere) |
| `site/tools/spec-builder.html` | Working lead-gen tool: generates a BIS intent spec in the browser |
| `site/tools/readiness.html` | Working lead-gen tool: AI-native engineering readiness scorecard |
| `tools/bis-lint.py` | Command-line BIS validator (`python3 tools/bis-lint.py examples/*.bis.yaml`) |
| `examples/` | Example BIS specs that pass the validator |

## Run the site locally

```bash
cd site && python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

The site is plain HTML/CSS/JS. Deploy `site/` to Vercel, Netlify, Cloudflare Pages,
or GitHub Pages with no configuration. A `vercel.json` is included that sets the
output directory.

## Status

Pre-launch. See `docs/01-business-plan.md` § "First 90 days" for the launch sequence.
