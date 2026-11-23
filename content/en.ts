/**
 * All page copy, English (v1).
 *
 * Source: BUILD_PLAN.md section 11. Edit copy here only; components never hardcode text.
 *
 * Inline markup understood by <Rich>:
 *   **word**   renders bold (the Source Serif "key word" style in headings)
 *   [note]     renders as a visible placeholder flag; replace before go-live
 *   {token}    filled from content/site.ts (booth number, email address)
 *
 * No em dashes anywhere in this file.
 */

export const en = {
  meta: {
    title: "Salaido | Process Intelligence & AI partner, home of Datalane",
    description:
      "Salaido is a European Process Intelligence and AI partner. Home of Datalane, Celonis Platinum Partner. From data to AI execution.",
    ogAlt: "Salaido. Imagine better.",
  },

  nav: {
    label: "Main",
    items: [
      { label: "Datalane", href: "#datalane" },
      { label: "Partners", href: "#partners" },
      { label: "Industries", href: "#industries" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Meet us in Munich", href: "#celosphere" },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    homeLabel: "Salaido, back to top",
  },

  // 11.1
  hero: {
    heading: "Imagine **better**",
    tag: "Home of Datalane, Celonis Platinum Partner",
    intro:
      "Salaido helps European enterprises see how work really gets done, and puts AI to work on it.",
    primary: { label: "Meet us at Celosphere", href: "#celosphere" },
    secondary: { label: "Get in touch", href: "#contact" },
  },

  // 11.2 On the page this block is now the 60-second brand intro video; the heading stays for
  // screen readers and search, the body is kept for reuse.
  problem: {
    // Brand promise, opens the brand story above the video. No closing full stop: the design
    // system sets the tagline as "Process beyond imagination" (sentence case, no punctuation).
    promise: "Process **beyond imagination**",
    video: {
      label: "Salaido brand intro, 60 seconds",
      play: "Play the Salaido brand intro",
      pause: "Pause",
      mute: "Sound off",
      unmute: "Sound on",
      seek: "Seek in the brand intro",
    },
    eyebrow: "Why process intelligence",
    heading: "Who actually sees **how work gets done?**",
    body: "Every business runs on processes. They cut across dozens of systems and teams. Process intelligence brings it into focus: every step, every bottleneck, and the context AI needs to act on it.",
  },

  // 11.3
  blocks: {
    eyebrow: "Four building blocks",
    heading: "From data to **AI execution**",
    items: [
      {
        number: "01",
        title: "Data platform",
        body: "Unlock and structure process data from ERP and CRM.",
      },
      {
        number: "02",
        title: "Context and digital twin",
        body: "Your process as a digital model, so you see where value leaks.",
      },
      {
        number: "03",
        title: "AI execution",
        body: "AI agents that act on process context.",
      },
      {
        number: "04",
        title: "App migrations",
        body: "Migrate and modernise applications based on process insight.",
      },
    ],
    closing: "Each block makes the next one stronger. Together, they turn **insight into action**.",
  },

  // 11.4 + section 5
  datalane: {
    eyebrow: "Our roots",
    heading: "Datalane is part of **Salaido**",
    body: "You may know us as Datalane, which helps large enterprises get a clear view of their processes, then automate and improve them with AI. As a Celonis Platinum Partner and Microsoft Solutions Partner, Datalane combines process mining, planning and resource optimisation, and intelligent automation in one integrated offering.",
    body2:
      "Datalane is the foundation of Salaido. Same team, same expertise, now part of a European platform for process intelligence and AI.",
    link: { label: "Visit datalane.nl", href: "https://datalane.nl" },
  },

  // 11.5
  partners: {
    eyebrow: "Strategic alliances",
    heading: "Three alliances, **one proposition**",
    items: [
      {
        key: "celonis",
        name: "Celonis",
        body: "Process intelligence and the process context that makes AI reliable.",
      },
      {
        key: "microsoft",
        name: "Microsoft",
        body: "Fabric as data platform and Microsoft AI services.",
      },
      {
        key: "databricks",
        name: "Databricks",
        body: "Data platform and AI for data-intensive organisations.",
      },
    ],
  },

  // 11.6
  industries: {
    eyebrow: "Where we go deep",
    heading: "Built for industries where **process is everything**",
    items: [
      {
        key: "highTech",
        label: "High-tech manufacturing",
        headline: "Imagine **more precise**.",
        line: "Where precision is everything.",
      },
      {
        key: "cpg",
        label: "CPG",
        headline: "Imagine **global reach**.",
        line: "Where speed and scale win.",
      },
      {
        key: "banking",
        label: "Banking",
        headline: "Imagine **effortless compliance**.",
        line: "Where regulation never slows you down.",
      },
    ],
  },

  // 11.7
  ambition: {
    eyebrow: "Our ambition",
    heading: "Building Europe's leading partner for **Process Intelligence, Data Engineering and AI**",
    body: "We are building a leading European platform for Process Intelligence, Data Engineering, AI execution and application modernisation, one strong local company at a time, with entrepreneurship and local presence as deliberate choices.",
    mapLabel: "Map of Europe with Salaido's focus countries highlighted",
  },

  // 11.8
  celosphere: {
    eyebrow: "Celosphere 2026",
    heading: "Meet Salaido and Datalane **in Munich**",
    body: "1 to 3 December 2026, Messe München. Find us at booth **{booth}**.",
    button: { label: "Plan a meeting", href: "#contact", subject: "Celosphere" },
  },

  // 11.9
  contact: {
    eyebrow: "Get in touch",
    heading: "See further than you **ever imagined**",
    form: {
      name: "Name",
      company: "Company",
      email: "Email",
      message: "Message",
      subjectPrefix: "Regarding",
      clearSubject: "Remove subject",
      consent:
        "I agree that Salaido uses these details to respond to my message.",
      privacyLink: "Read the privacy statement",
      honeypot: "Leave this field empty",
      submit: "Send message",
      sending: "Sending",
      success: "Thank you. We'll be in touch shortly.",
      errors: {
        name: "Please enter your name.",
        company: "Please enter your company.",
        email: "Please enter a valid email address.",
        message: "Please add a short message.",
        consent: "Please confirm so we can respond.",
        generic: "Something went wrong. Please email us instead.",
      },
    },
    orEmail: "Or email",
    email: "{email}",
  },

  // 11.10
  footer: {
    companyLine: "Datalane is a Salaido company",
    copyright: "© 2026 Salaido",
    privacy: "Privacy",
    // Privacy statement (general). Have it checked before go-live. Processors: Vercel (hosting,
    // analytics) and Resend (email), both US-based, DPF-certified, SCCs in their DPAs (checked 23 Nov 2026).
    privacyStatement: {
      heading: "Privacy statement",
      paragraphs: [
        "Salaido Group BV (Chamber of Commerce number 42046966) is responsible for the personal data processed through this website.",
        "We only use the details you share with us to respond to your request and to follow up on it. We do this with your consent, which you can withdraw at any time.",
        "We do not sell your details. We share them only with trusted service providers that support this website, such as hosting and email delivery. Some of these providers are based in the United States; those transfers are covered by the EU-U.S. Data Privacy Framework and the European Commission's standard contractual clauses.",
        "We keep your details no longer than necessary, and at most 12 months.",
        "This website uses anonymous visitor statistics without tracking cookies.",
      ],
      updated: "Last updated: 23 November 2026",
    },
    linkedin: "LinkedIn",
  },

  // Labels for placeholder visuals (section 7). Shown only until real assets are in content/assets.ts.
  placeholders: {
    eyeHero: "Eye hero image (placeholder)",
    industryPhoto: "photo (placeholder)",
    logo: "logo placeholder",
    logoShort: "logo",
  },
} as const;

export type Copy = typeof en;
