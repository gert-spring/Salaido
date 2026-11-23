# Salaido one-pager

Single-page site for Salaido, live before Celosphere 2026 (Messe München, 1 to 3 December).
Spec: [BUILD_PLAN.md](BUILD_PLAN.md).

Stack: Next.js 15 (App Router, RSC), TypeScript, Tailwind CSS 4, Motion, zod + server action + Resend + react-email, Vercel Web Analytics.

## Local setup

```bash
npm install
cp .env.example .env.local   # optional locally, see below
npm run dev                  # http://localhost:3000
npm run build                # production build (lint + types)
npm run email:dev            # preview the contact notification email
```

Without Resend env values the contact form still works in development: submissions are logged to the terminal instead of emailed. In production, missing values make the form show an error and log the cause.

## Where things live

| What | Where |
|---|---|
| All copy | `content/en.ts` |
| Booth number, contact email, LinkedIn, privacy URL, event dates | `content/site.ts` |
| Logos, hero image, partner logos, industry photos, map | `content/assets.ts` + files in `/public` |
| Colours, fonts, easing (design tokens) | `app/globals.css` (`@theme` block) |
| Section order | `app/page.tsx` |
| Sections | `components/sections/*` |
| Datalane diagram | `components/visuals/DatalaneDiagram.tsx` |
| Contact form logic | `app/actions/contact.ts`, `lib/contact.ts`, `components/ContactForm.tsx` |
| Notification email | `emails/ContactNotification.tsx` |
| SEO | `app/layout.tsx` (metadata), `components/JsonLd.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`, `app/sitemap.ts` |

### Editing copy

Edit strings in `content/en.ts`. Inline markup:

- `**word**` renders bold (the "Imagine **better**" style).
- `[note]` renders as a visible amber placeholder flag. Search the repo for `[` in `content/` to find open points.
- `{booth}` and `{email}` are filled from `content/site.ts`.

### Swapping an asset

Drop the file in `/public/...` and replace `null` in `content/assets.ts` with `{ src, width, height }`. The placeholder disappears automatically.

The Salaido logos and the hero image (`helix-nebula.jpg`) come from the Salaido design system artifact (Assets > Logos, Assets > Beeld).

## Environment variables

| Name | Example | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | Server only. Never prefix with `NEXT_PUBLIC_`. |
| `CONTACT_TO_EMAIL` | `hello@salaido.com` | Inbox for form submissions. Comma-separate for several. |
| `CONTACT_FROM_EMAIL` | `Salaido website <website@mail.salaido.com>` | Must be on the verified Resend domain. |
| `NEXT_PUBLIC_SITE_URL` | `https://salaido.com` | Canonical URL, OG image, sitemap, JSON-LD. |

`.env.local` is git-ignored and must never be committed.

## Connect Vercel

1. In Vercel: Add New > Project > import `gert-spring/Salaido`. Framework preset: Next.js (defaults are fine).
2. Settings > Environment Variables: add the four variables above for Production and Preview.
3. Settings > Analytics: enable Web Analytics (cookieless, no banner needed). The `<Analytics />` component is already in `app/layout.tsx`.
4. Every push to `feat/one-pager` gets a preview URL. Review there, then merge to `main` for production.
5. Settings > Git: make sure the Production Branch is `main` (see note in the summary: the first push created `feat/one-pager` before `main` had commits).

## Verify the Resend sending domain

1. In Resend: Domains > Add domain > `mail.salaido.com` (a subdomain keeps the main domain's mail reputation separate).
2. Resend shows DNS records (MX, SPF TXT and DKIM TXT, all on `mail.salaido.com`). Add them at Vimexx exactly as shown.
3. Click Verify in Resend; it can take a few minutes to a few hours.
4. Create an API key with "Sending access" for that domain and put it in Vercel as `RESEND_API_KEY`.
5. Set `CONTACT_FROM_EMAIL` to an address on that domain and send a test via the form on the preview URL.

## DNS switch for salaido.com (BUILD_PLAN section 9)

`salaido.com` currently 301-redirects to `datalane.nl` via Vimexx. Do this only after the production build is approved (Monday 30 November at the latest).

1. Vercel > Project > Settings > Domains: add `salaido.com` and `www.salaido.com`. Choose which one redirects to the other (open point: www vs apex).
2. Vimexx: remove the domain redirect / forwarding for `salaido.com`.
3. Vimexx DNS: set `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` (hostname only, no `https://`). Keep the nameservers at Vimexx so email records stay untouched.
4. Wait for Vercel to show the domains as valid; SSL is issued automatically.
5. Test all four variants: `http://salaido.com`, `https://salaido.com`, `http://www.salaido.com`, `https://www.salaido.com`. All should end on the primary domain over https.
6. Mail: if `hello@salaido.com` is used, add the Microsoft 365 MX and SPF records. Otherwise keep the null-MX / SPF / DMARC protection already advised.
7. Update `NEXT_PUBLIC_SITE_URL` in Vercel if the primary domain is www, and redeploy.

## Accessibility and motion

- All animation respects `prefers-reduced-motion` (Motion `reducedMotion="user"`, explicit checks in the diagram and process lines, CSS media query for the hero).
- Cyan is only used on dark backgrounds; light sections use `blue` for accents.
- Skip link, visible focus states, one `h1`, `h2` per section, labelled form fields with inline errors.
