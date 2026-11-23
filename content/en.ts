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
      { label: "Why", href: "#why" },
      { label: "What we do", href: "#what-we-do" },
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
    eyebrow: "Process Intelligence & AI partner",
    heading: "Imagine **better**",
    tagline: "Process beyond imagination.",
    tag: "Home of Datalane, Celonis Platinum Partner",
    intro:
      "Salaido helps European enterprises see how work really gets done, and puts AI to work on it.",
    primary: { label: "Meet us at Celosphere", href: "#celosphere" },
    secondary: { label: "Get in touch", href: "#contact" },
  },

  // 11.2
  problem: {
    eyebrow: "Why process intelligence",
    heading: "Who actually sees **how work gets done?**",
    body: "Every business runs on processes. They cut across dozens of systems and teams. Process intelligence brings it into focus: every step, every bottleneck, and the context AI needs to act on it.",
  },

  // 11.3
  blocks: {
    eyebrow: "What we do: four building blocks",
    heading: "From data to **AI execution**",
    items: [
      {
        number: "01",
        title: "Data platform",
        body: "Unlock and structure process data from ERP and CRM.",
        partners: "Microsoft Fabric, Databricks",
      },
      {
        number: "02",
        title: "Context and digital twin",
        body: "Your process as a digital model, so you see where value leaks.",
        partners: "Celonis",
      },
      {
        number: "03",
        title: "AI execution",
        body: "AI agents that act on process context.",
        partners: "Celonis, Microsoft",
      },
      {
        number: "04",
        title: "App migrations",
        body: "Migrate and modernise applications based on process insight.",
        partners: "Microsoft, Celonis",
      },
    ],
    closing: "Start with one building block. Grow into the next.",
  },

  // 11.4 + section 5
  datalane: {
    eyebrow: "Our roots",
    heading: "Datalane is part of **Salaido**",
    body: "You may know us as Datalane. Based in Vught, Datalane helps large enterprises get a clear view of their processes, then automate and improve them with AI. As a Celonis Platinum Partner and Microsoft Solutions Partner, Datalane combines process mining, planning and resource optimisation, and intelligent automation in one integrated offering.",
    body2:
      "Datalane is the foundation of Salaido. Same team, same expertise, now part of a European platform for process intelligence and AI.",
    facts: [
      "Founded [2019, confirm: 2013 or 2019]",
      "Vught, the Netherlands",
      "Celonis Platinum Partner",
      "Microsoft Solutions Partner",
    ],
    link: { label: "Visit datalane.nl", href: "https://datalane.nl" },
    diagram: {
      label:
        "Diagram: Salaido, the European Process Intelligence and AI partner, with Datalane as its first company.",
      salaidoLabel: "Salaido, European Process Intelligence & AI partner",
      datalaneLocation: "Vught, NL",
      badges: ["Celonis Platinum Partner", "Microsoft Solutions Partner"],
      // [Open point 3: confirm whether to show these outline cards]
      showNextCompanies: true,
      nextCompany: "Next company",
    },
  },

  // 11.5
  partners: {
    eyebrow: "Strategic alliances",
    heading: "Three alliances, **one proposition**",
    viaDatalane: "via Datalane",
    items: [
      {
        key: "celonis",
        name: "Celonis",
        role: "Core",
        body: "Process intelligence and the process context that makes AI reliable.",
        credential: "Celonis Platinum Partner",
        viaDatalane: true,
      },
      {
        key: "microsoft",
        name: "Microsoft",
        role: "Accelerator",
        body: "Fabric as data platform and Microsoft AI services.",
        credential: "Microsoft Solutions Partner",
        viaDatalane: true,
      },
      {
        key: "databricks",
        name: "Databricks",
        role: "Accelerator",
        body: "Data platform and AI for data-intensive organisations.",
        // Until the alliance is signed: no partner badge.
        credential: "We work with Databricks",
        viaDatalane: false,
        note: "[Partnership status: alliance is being started. No partner badge until signed]",
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
        headline: "Imagine **[headline]**.",
        line: "[one line]",
      },
    ],
  },

  // 11.7
  ambition: {
    eyebrow: "Our ambition",
    heading: "Building Europe's leading partner for **Process Intelligence and AI**",
    body: "Together with Celonis, Microsoft and Databricks, we are building a European platform, one strong local company at a time, with entrepreneurship and local presence as deliberate choices.",
    // Optional partner-recruitment line. Set `show: true` only after confirmation.
    joinLine: {
      show: true,
      text: '[Optional, confirm before publishing: "Want to build it with us? Let\'s talk."]',
    },
    mapLabel: "Europe",
    homeLabel: "Vught, NL",
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
        "I agree that Salaido uses these details to respond to my message. [Privacy statement link]",
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
    privacy: "Privacy [privacy page or short statement]",
    linkedin: "LinkedIn",
  },

  // Labels for placeholder visuals (section 7). Shown only until real assets are in content/assets.ts.
  placeholders: {
    eyeHero: "Eye hero image (placeholder)",
    europeMap: "Map of Europe (placeholder)",
    industryPhoto: "photo (placeholder)",
    logo: "logo placeholder",
  },
} as const;

export type Copy = typeof en;
