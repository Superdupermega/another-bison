// Site configuration. Fill these in at launch; everything degrades gracefully when empty.
window.BISON = {
  FORM_ENDPOINT: "",          // e.g. "https://formspree.io/f/xxxxxxx" — receives contact form and tool email captures as JSON
  CALENDAR_URL: "",           // e.g. "https://cal.com/bison/intent-review" — "Book a call" opens this when set
  NEWSLETTER_ENDPOINT: "",    // e.g. Buttondown/ConvertKit endpoint; falls back to FORM_ENDPOINT
  ANALYTICS_ID: ""            // e.g. Plausible domain or GA4 id; wire in site.js if used
};
