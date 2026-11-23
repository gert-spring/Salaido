/**
 * Site config: facts that are not prose. Copy lives in content/en.ts.
 * Values in [square brackets] are open points and render as visible placeholders.
 */
export const site = {
  name: "Salaido",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://salaido.com",

  // Adobe Fonts kit id (e.g. "abc1def") serving IvyPresto Display + Neue Haas Grotesk Display.
  // [deliver: Salaido Adobe Fonts kit]. null = Georgia / Helvetica Neue fallback from the design system.
  adobeFontsKitId: null as string | null,

  // [deliver: e.g. hello@salaido.com, which needs a mailbox, see BUILD_PLAN section 9]
  contactEmail: "[address]",

  // [deliver] Set to the full https://www.linkedin.com/company/... URL. null renders a placeholder.
  linkedinUrl: null as string | null,

  // Privacy statement: drafted in the footer (#privacy). Change to a page URL if it moves to its own page.
  privacyUrl: "#privacy" as string | null,

  datalane: {
    name: "Datalane",
    url: "https://datalane.nl",
    location: "Vught, the Netherlands",
  },

  // Ambition map (Europe). ISO 3166-1 numeric codes, as used by the world-atlas map data.
  map: {
    // Darkest / brightest tier: core focus countries.
    focus: [
      "372", // Ireland
      "826", // United Kingdom
      "578", // Norway
      "752", // Sweden
      "246", // Finland
      "208", // Denmark
      "528", // Netherlands
      "276", // Germany
      "756", // Switzerland
      "040", // Austria
    ],
    // Middle tier: next countries.
    next: [
      "056", // Belgium
      "442", // Luxembourg
      "250", // France
      "724", // Spain
      "620", // Portugal
      "380", // Italy
      "616", // Poland
      "203", // Czechia
    ],
  },

  event: {
    name: "Celosphere 2026",
    venue: "Messe München",
    city: "Munich",
    startDate: "2026-12-01",
    endDate: "2026-12-03",
    // Confirmed 23 Nov 2026
    booth: "13",
  },
};

/** Tokens used inside en.ts strings, e.g. "booth **{booth}**". */
export const copyTokens: Record<string, string> = {
  booth: site.event.booth,
  email: site.contactEmail,
};
