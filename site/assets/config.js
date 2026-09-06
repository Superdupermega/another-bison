// Site configuration. Defaults point at the Vercel serverless API in /api (backed by Neon Postgres via DATABASE_URL).
// Everything degrades gracefully: if the API is absent or the database is unconfigured, forms fall back to mailto
// and tools keep working from localStorage.
window.BISON = {
  API_BASE: "",                          // "" = same origin; set to "https://<deployment>.vercel.app" when hosting the static site elsewhere
  FORM_ENDPOINT: "/api/contact",         // contact form
  NEWSLETTER_ENDPOINT: "/api/lead",      // optional email capture inside the tools
  CALENDAR_URL: "",                      // e.g. "https://cal.com/bison/intent-review" — "Book a call" opens this when set
  ANALYTICS_ID: ""                       // e.g. Plausible domain or GA4 id
};
window.bisonApi = function(path){ var b=(window.BISON||{}).API_BASE||''; return (path.charAt(0)==='/'&&b) ? b.replace(/\/$/,'')+path : path; };
