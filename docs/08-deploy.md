# Deploying Bison: Vercel + Neon (free tiers)

Total time: about five minutes. No credit card. The site is static, the API is
Vercel serverless functions (Node for data, Python for lint and SSS), and the
database is Neon Postgres on its free tier.

## 1. Create the Vercel project (one click)

**Option A — import the existing repository (recommended, auto-deploys on push):**

1. Open https://vercel.com/new/import?s=https://github.com/superdupermega/another-bison
2. Project name: `bison`. Framework preset: **Other**. Leave root directory as `/`.
   The included `vercel.json` already sets the output directory to `site`.
3. Deploy. First build takes about a minute.

**Option B — command line:**

```bash
npm i -g vercel
vercel link          # creates the project; choose the team "tobjoh123-6464's projects"
vercel --prod
```

**Option C — GitHub Actions:** add the secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`,
`VERCEL_PROJECT_ID` to the repository; `.github/workflows/deploy.yml` then deploys
on every push. Only needed if you do not want the dashboard link.

## 2. Add the free database (Neon)

1. In the Vercel project, open **Storage → Create Database → Neon** (Marketplace,
   free plan: 0.5 GB, no card).
2. Accept the defaults and **Connect to project**. Vercel injects `DATABASE_URL`
   (and `POSTGRES_URL`) into the project's environment.
3. Redeploy once (Deployments → ⋯ → Redeploy) so the functions pick up the
   variable.

Alternatively create the database at https://neon.tech and add its connection
string as `DATABASE_URL` under Settings → Environment Variables.

The schema is applied automatically on the first API request
(`db/schema.sql`, idempotent). To apply it by hand:

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

## 3. Verify

```
GET  https://<project>.vercel.app/api/health        -> {"ok":true,"db":"connected",...}
POST https://<project>.vercel.app/api/spec          -> lint + SSS for a posted spec
POST https://<project>.vercel.app/api/lead          -> stores an email capture
POST https://<project>.vercel.app/api/contact       -> stores a contact request
POST/GET /api/specs                                 -> shareable spec links
POST/GET /api/readiness                             -> anonymous benchmark
```

Before the database is connected, `/api/health` reports `"db":"unconfigured"`,
write endpoints return HTTP 503, and the site degrades gracefully: the contact
form opens the visitor's mail client, tools keep working from local storage.

## 4. Remaining configuration

Edit `site/assets/config.js`:

| Key | Set to |
|---|---|
| `CALENDAR_URL` | your Cal.com / Calendly link; every "Book a call" button opens it |
| `ANALYTICS_ID` | optional; wire your provider in `site/assets/site.js` |
| `API_BASE` | leave empty on Vercel; set only if the static site is hosted elsewhere |

Replace `hello@bison.systems` and `privacy@bison.systems` with live mailboxes
and add the registered entity to `site/privacy.html`.

## 5. Reading the data

```sql
select email, source, context, created_at from leads order by created_at desc limit 50;
select name, email, company, interest, left(message, 80) from contacts order by created_at desc;
select id, title, sss, created_at from specs order by created_at desc;
select count(*), round(avg(total)) from readiness;
```

## 6. Local development

```bash
npm install
DATABASE_URL=postgres://... npm run dev     # omit DATABASE_URL to exercise the degraded path
npm test                                    # handler tests, no network
```
