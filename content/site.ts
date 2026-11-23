/**
 * Site config: facts that are not prose. Copy lives in content/en.ts.
 * Values in [square brackets] are open points and render as visible placeholders.
 */
export const site = {
  name: "Salaido",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://salaido.com",

  // [deliver: e.g. hello@salaido.com, which needs a mailbox, see BUILD_PLAN section 9]
  contactEmail: "[address]",

  // [deliver] Set to the full https://www.linkedin.com/company/... URL. null renders a placeholder.
  linkedinUrl: null as string | null,

  // [privacy page or short statement]. Set to a URL (e.g. "/privacy") once it exists.
  privacyUrl: null as string | null,

  datalane: {
    name: "Datalane",
    url: "https://datalane.nl",
    location: "Vught, the Netherlands",
  },

  event: {
    name: "Celosphere 2026",
    venue: "Messe München",
    city: "Munich",
    startDate: "2026-12-01",
    endDate: "2026-12-03",
    // [deliver: booth number from Celonis]
    booth: "13",
  },
};

/** Tokens used inside en.ts strings, e.g. "booth **{booth}**". */
export const copyTokens: Record<string, string> = {
  booth: site.event.booth,
  email: site.contactEmail,
};
