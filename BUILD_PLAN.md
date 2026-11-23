# Salaido one-pager: build plan

Version 1.0, 23 November 2026. Owner: Gert Jansen (Spring Marketing Consulting).
Repo: https://github.com/gert-spring/Salaido.git

Open points are marked in **[square brackets]**. Claude Code must keep them as visible placeholders and never invent the answer.

---

## 1. Goal and deadline

A single-page website for Salaido that is live **before Celosphere 2026** (Messe München, pre-conference 1 December, main conference 2 and 3 December). Visitors at the Salaido and Datalane booth, Celonis contacts and potential partners should understand in one scroll:

1. What Salaido is: a European Process Intelligence and AI partner.
2. What Salaido does: four building blocks, from data to AI execution.
3. **That Datalane is part of Salaido.** Datalane is the name people know in the Celonis community, so the page must make that link unmistakable, in words and visually.
4. Who Salaido works with: Celonis at the core, Microsoft and Databricks.
5. How to get in touch, and where to meet the team in Munich.

Target: production-ready by **Friday 27 November**, leaving the weekend and Monday 30 November for review and DNS.

This is v1. A fuller website (strategy, attractive to partners who want to join) follows in the coming months, so the codebase must be easy to extend to more pages.

## 2. Setup (same as Cobotx, Expedition and the Lukas Stiefelhagen page)

| Part | Choice |
|---|---|
| Framework | Next.js 15, App Router, TypeScript, React Server Components |
| Styling | Tailwind CSS with design tokens from section 6 |
| Motion | Motion (`motion/react`), following the installed design skills (`emil-design-eng`, `frontend-design`, `apple-design`) |
| Content | All copy in `content/en.ts` (typed), no copy hardcoded in components |
| Language | English only for v1 (international Celosphere audience). Structure ready for `next-intl` with `/en` and `/nl` later. **[Confirm: is a Dutch version needed for v1?]** |
| Contact form | Server action + zod validation + honeypot, sent via Resend. No database |
| Hosting | GitHub `gert-spring/Salaido` connected to Vercel |
| Branching | Build on a branch (`feat/one-pager`), review on the Vercel preview URL, merge to `main` for production |
| Analytics | Vercel Web Analytics (cookieless, so no cookie banner) |
| Domain | `salaido.com` and `www.salaido.com` (see section 9) |

No external accounts are created by Claude Code. It builds a locally runnable app with `.env.example` and a README covering account and domain setup.

## 3. Folder structure

```
/app
  layout.tsx            fonts, metadata, analytics
  page.tsx              composes the sections in order
  opengraph-image.tsx   OG image (eye + "Imagine better")
  robots.ts, sitemap.ts
  actions/contact.ts    server action: zod + honeypot + Resend
/components
  sections/             Hero, Problem, BuildingBlocks, Datalane, Partners, Industries, Ambition, Celosphere, Contact, Footer
  ui/                   Button, Eyebrow, SectionHeading, Logo, PartnerLogo
  visuals/              EyeHero, ProcessLines, DatalaneDiagram
/content
  en.ts                 all copy (section 11)
  site.ts               config: event details, booth number, contact email, links
/public
  brand/                salaido-logo.svg, salaido-logo-white.svg, datalane-logo.svg, eye-hero.jpg
  partners/             celonis.svg, microsoft.svg, databricks.svg
  industries/           high-tech.jpg, cpg.jpg, banking.jpg
/emails
  ContactNotification.tsx (react-email)
BUILD_PLAN.md, README.md, .env.example
```

## 4. Page structure

One long page, anchored sections, sticky minimal header (logo left, anchor links + "Meet us in Munich" button right, collapses to a menu on mobile).

| # | Section | Anchor | Background | Purpose |
|---|---|---|---|---|
| 1 | Hero | `#top` | Navy-black, eye image | Vision, tagline, Datalane link at first glance |
| 2 | Problem | `#why` | Navy-black | Why process intelligence |
| 3 | Building blocks | `#what-we-do` | Navy-black | Four blocks, from data to AI execution |
| 4 | **Datalane** | `#datalane` | Off-white (contrast break) | Relationship Salaido and Datalane |
| 5 | Partners | `#partners` | Off-white | Celonis core, Microsoft, Databricks |
| 6 | Industries | `#industries` | Navy-black, photography | Three focus verticals |
| 7 | Ambition | `#ambition` | Navy-black, map of Europe | European platform |
| 8 | Celosphere | `#celosphere` | Cyan accent band | Meet us in Munich |
| 9 | Contact | `#contact` | Navy-black | Form + email |
| 10 | Footer | | Navy-black | Lockups, legal |

## 5. The Salaido and Datalane link (core requirement)

The relationship shows up in **four places**, so nobody can miss it:

1. **Hero tag line**, directly under the logo/headline: "Home of Datalane, Celonis Platinum Partner" (Inter, uppercase, cyan, small). Visitors who know Datalane recognise the name in the first second.
2. **Dedicated Datalane section** (section 4 of the page, copy in 11.4). Visual: the `DatalaneDiagram` component (see below), facts row, link to datalane.nl.
3. **Partners section**: the Celonis Platinum and Microsoft Solutions credentials are shown as "via Datalane", so the credentials and the name reinforce each other.
4. **Footer lockup**: "Datalane is a Salaido company" with both logos side by side, divided by a thin vertical line (the same split-line device used on the deck cover).

### DatalaneDiagram (the visual)

A clean, animated SVG that reads in two seconds:

- Top: Salaido logo in a navy block, label "Salaido, European Process Intelligence & AI partner".
- A single cyan line runs down from Salaido and branches (the "process lines" motif from the video, nodes organising into one flow).
- First branch ends in a solid card: **Datalane** logo, "Vught, NL", badges "Celonis Platinum Partner" and "Microsoft Solutions Partner".
- Two further branches end in dashed, empty outline cards labelled "Next company" **[confirm whether to show these; they hint at buy-and-build without naming targets]**.
- Animation: the line draws on scroll-into-view (stroke-dashoffset, ~900 ms, ease-out), Datalane card fades and lifts in after the line reaches it, outline cards appear last at lower opacity. Static final state under `prefers-reduced-motion`.
- Mobile: same diagram stacked vertically.

Alongside the diagram, a "facts row" of four items with thin top borders (the building-block style from the deck): Founded **[2019, confirm: the acquisition copy used both 2013 (process mining activity) and 2019 (founding)]** · Vught, the Netherlands · Celonis Platinum Partner · Microsoft Solutions Partner.

**[Open: brand architecture.]** Does Datalane keep its own name long-term (endorsed brand, "a Salaido company") or will it merge into Salaido? The copy in 11.4 is written for "Datalane stays a recognisable name within Salaido". If a merge is planned, the line "same team, same expertise" stays and the endorsement lockup changes.

## 6. Design system

From the Celosphere stand design (2026_02_SAL_Celosphere_STAND), the Celonis deck and the intro video. Identity is still in draft with Futurama, so all tokens live in one place (`tailwind.config.ts` + CSS variables) and can be swapped in minutes.

**Colours**

| Token | Hex | Use |
|---|---|---|
| `ink` | `#050507` | Main background |
| `ink-2` | `#0B0B12` | Cards on dark, text on light |
| `paper` | `#FCFCFB` | Light sections |
| `paper-2` | `#F3F4F6` | Alternating rows, callouts on light |
| `cyan` | `#8ED9EC` | Accent on dark: eyebrows, lines, numbers |
| `blue` | `#1747D1` | Accent on light: eyebrows, borders, links |
| `mist` | `#C9CED9` | Body text on dark |
| `slate` | `#8E95A5` | Secondary text on dark |
| `graphite` | `#2B2E37` | Body text on light |

**Typography**: headings in Source Serif 4 (regular, with the key words in **bold**, e.g. "Imagine **better**", "From data to **AI execution**"); body and labels in Inter; eyebrow labels uppercase, letter-spacing ~0.2em. Load via `next/font/google`.

**Motif**: the human eye with data reflected in the iris (hero, OG image, closing). Process lines (cyan lines and nodes organising into one flow) as the secondary motif, used in the problem section and the Datalane diagram.

**Motion principles** (from the design skills): ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, 200 to 300 ms for UI, up to 900 ms for the diagram draw, subtle stagger (50 to 80 ms) in grids, scale 0.97 on button press, no parallax gimmicks, everything respects `prefers-reduced-motion`. Animation should explain (the diagram, the process lines), not decorate.

**Accessibility**: WCAG 2.1 AA contrast (check cyan on paper: use `blue` on light backgrounds), visible focus states, semantic landmarks, alt text on all images.

## 7. Assets needed from Gert

| Asset | Source | Status |
|---|---|---|
| Salaido logo (SVG, dark and light) | Futurama / stand design | **[deliver]** |
| Datalane logo (SVG) | Datalane | **[deliver]** |
| Eye hero image (high-res) | Stand design / Futurama | **[deliver]**; placeholder gradient until then |
| Celonis, Microsoft, Databricks logos | Partner brand portals | **[deliver + check usage rules]** |
| Industry photos (high-tech cleanroom, CPG distribution, banking) | Stock, same as video/deck | **[deliver or license]** |
| Booth number at Celosphere | Celonis | **[deliver]** |
| Contact email address | | **[deliver: e.g. hello@salaido.com, which needs a mailbox, see section 9]** |

## 8. SEO and AEO

- Indexed (unlike the event pages): `robots.ts` allows all, `sitemap.ts` with the single URL.
- Title: "Salaido | Process Intelligence & AI partner, home of Datalane". Meta description (under 160 characters): "Salaido is a European Process Intelligence and AI partner. Home of Datalane, Celonis Platinum Partner. From data to AI execution."
- JSON-LD: `Organization` for Salaido with `subOrganization` Datalane (url datalane.nl), plus `sameAs` LinkedIn **[URL]**. This tells search engines and LLMs explicitly that Datalane belongs to Salaido.
- One `h1` (hero), `h2` per section, descriptive anchors.
- OG image generated with `next/og`: eye + "Imagine better" + Salaido logo.

## 9. Domain and DNS (important, salaido.com currently redirects)

`salaido.com` now 301-redirects to `datalane.nl` via Vimexx. That has to be reversed on go-live:

1. Add `salaido.com` and `www.salaido.com` to the Vercel project (www redirects to apex, or the other way round; **[choose]**).
2. At Vimexx: remove the domain redirect, then set `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` (hostname only, no https://). Keep the nameservers at Vimexx so email records are untouched.
3. Vercel issues SSL automatically. Test all four variants (http/https, with/without www).
4. Mail: if `hello@salaido.com` is used, add the Microsoft 365 MX/SPF records; otherwise keep the null-MX/SPF/DMARC protection already advised.
5. Resend: verify a sending domain (e.g. `mail.salaido.com`) for the contact form notifications.
6. **[Decide: should datalane.nl get a visible link or banner back to salaido.com?]** That strengthens the link from the other side.

Do the DNS switch only after the production build is approved, ideally Monday 30 November at the latest.

## 10. Environment variables (`.env.example`)

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://salaido.com
```

Server-only secrets never get the `NEXT_PUBLIC_` prefix. `.env.local` is never committed.

## 11. Copy (English, draft)

Source: business plan, Celonis deck, intro video script and Datalane announcement. Keep claims factual. Do not use em dashes anywhere in copy or code comments.

### 11.1 Hero
- Eyebrow: PROCESS INTELLIGENCE & AI PARTNER
- H1: Imagine **better**
- Tagline: Process beyond imagination.
- Tag under the tagline: HOME OF DATALANE, CELONIS PLATINUM PARTNER
- Intro: Salaido helps European enterprises see how work really gets done, and puts AI to work on it.
- Buttons: "Meet us at Celosphere" (to `#celosphere`), "Get in touch" (to `#contact`)

### 11.2 Problem
- Eyebrow: WHY PROCESS INTELLIGENCE
- H2: Who actually sees **how work gets done?**
- Body: Every business runs on processes. They cut across dozens of systems and teams. Process intelligence brings it into focus: every step, every bottleneck, and the context AI needs to act on it.

### 11.3 Building blocks
- Eyebrow: WHAT WE DO: FOUR BUILDING BLOCKS
- H2: From data to **AI execution**
- 01 **Data platform**: Unlock and structure process data from ERP and CRM. *Microsoft Fabric, Databricks*
- 02 **Context and digital twin**: Your process as a digital model, so you see where value leaks. *Celonis*
- 03 **AI execution**: AI agents that act on process context. *Celonis, Microsoft*
- 04 **App migrations**: Migrate and modernise applications based on process insight. *Microsoft, Celonis*
- Closing line: Start with one building block. Grow into the next.

### 11.4 Datalane
- Eyebrow: OUR ROOTS
- H2: Datalane is part of **Salaido**
- Body: You may know us as Datalane. Based in Vught, Datalane helps large enterprises get a clear view of their processes, then automate and improve them with AI. As a Celonis Platinum Partner and Microsoft Solutions Partner, Datalane combines process mining, planning and resource optimisation, and intelligent automation in one integrated offering.
- Body 2: Datalane is the foundation of Salaido. Same team, same expertise, now part of a European platform for process intelligence and AI.
- Facts row: Founded [year] · Vught, the Netherlands · Celonis Platinum Partner · Microsoft Solutions Partner
- Link: Visit datalane.nl →

### 11.5 Partners
- Eyebrow: STRATEGIC ALLIANCES
- H2: Three alliances, **one proposition**
- Celonis (CORE): Process intelligence and the process context that makes AI reliable. Celonis Platinum Partner via Datalane.
- Microsoft (ACCELERATOR): Fabric as data platform and Microsoft AI services. Microsoft Solutions Partner via Datalane.
- Databricks (ACCELERATOR): Data platform and AI for data-intensive organisations. **[Partnership status: the deck says the alliance is being started. Until signed, use "We work with Databricks" and no partner badge.]**

### 11.6 Industries
- Eyebrow: WHERE WE GO DEEP
- H2: Built for industries where **process is everything**
- HIGH-TECH MANUFACTURING: Imagine **more precise**. Where precision is everything.
- CPG: Imagine **global reach**. Where speed and scale win.
- BANKING: Imagine **[headline]**. **[one line]**

### 11.7 Ambition
- Eyebrow: OUR AMBITION
- H2: Building Europe's leading partner for **Process Intelligence and AI**
- Body: Together with Celonis, Microsoft and Databricks, we are building a European platform, one strong local company at a time, with entrepreneurship and local presence as deliberate choices.
- **[Optional line for companies that want to join: "Want to build it with us? Let's talk." Confirm before publishing.]**

### 11.8 Celosphere
- Eyebrow: CELOSPHERE 2026
- H2: Meet Salaido and Datalane **in Munich**
- Body: 1 to 3 December 2026, Messe München. Find us at booth **[number]**.
- Button: Plan a meeting (to `#contact`, pre-fills subject "Celosphere")

### 11.9 Contact
- Eyebrow: GET IN TOUCH
- H2: See further than you **ever imagined**
- Form fields: name, company, email, message, consent checkbox (privacy line), hidden honeypot. Success: "Thank you. We'll be in touch shortly."
- Or email: **[address]**

### 11.10 Footer
- Salaido logo | Datalane logo with "Datalane is a Salaido company"
- © 2026 Salaido · Privacy **[privacy page or short statement, needed for the form]** · LinkedIn **[URL]**

## 12. Out of scope for the public page (do not publish)

Internal material from the business plan and deck stays off the site: the Celonis top-20 / ~350 customer split, the 250-300 FTE target, the €100 mln ambition, vendor funding, and all acquisition targets or pipelines. **[Confirm if any of these may be public.]** Also no mention of Oak Tree Hill Capital unless decided otherwise **[confirm]**.

## 13. Build steps for Claude Code

1. Scaffold Next.js 15 + TypeScript + Tailwind + Motion on branch `feat/one-pager`. Commit.
2. Design tokens, fonts, base layout, header and footer. Commit.
3. Sections 1 to 3 (hero, problem, building blocks) with placeholder imagery. Commit.
4. Datalane section with the animated `DatalaneDiagram`. Commit.
5. Partners, industries, ambition, Celosphere. Commit.
6. Contact form: server action, zod, honeypot, Resend, react-email notification. Commit.
7. SEO: metadata, OG image, JSON-LD, robots, sitemap. Commit.
8. QA: responsive (375 / 768 / 1280 / 1920), Lighthouse 95+ on performance and accessibility, `prefers-reduced-motion`, keyboard navigation, no em dashes in copy. `npm run build` passes. Commit and push the branch.
9. README: local setup, env vars, Vercel connection, Resend domain verification, DNS switch (section 9).
10. Summary with a list of open placeholders.

## 14. Planning

| Date | Milestone |
|---|---|
| Mon 23 Nov | Build plan approved, open points answered where possible |
| Tue 24 Nov | First full build on Vercel preview |
| Wed 25 Nov | Assets in, copy feedback round |
| Thu 26 Nov | Final review (incl. Tim/Lucas on the Datalane section **[confirm reviewers]**) |
| Fri 27 Nov | Merge to `main`, production ready |
| Mon 30 Nov | DNS switch salaido.com, final checks |
| Tue 1 Dec | Celosphere starts |

## 15. Open points summary

1. Dutch version needed for v1?
2. Datalane founding year (2013 vs 2019) and long-term brand architecture
3. Show "next company" outline cards in the diagram?
4. Databricks partnership status and wording
5. Third vertical (Banking) headline and line
6. Logos, eye image, industry photos, partner logo permissions
7. Booth number, contact email, LinkedIn URL, privacy statement
8. Partner-recruitment line in the ambition section
9. Oak Tree Hill mention: yes or no
10. Link back from datalane.nl to salaido.com
11. www vs apex as primary domain
12. Reviewers before go-live
