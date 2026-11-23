import { en } from "@/content/en";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Rich } from "@/components/ui/Rich";
import { ColorBars } from "@/components/ui/ColorBars";

export function Footer() {
  const t = en.footer;
  return (
    <footer className="bg-navy pb-14 text-sm text-slate">
      <ColorBars exclude={["navy"]} />
      <Container className="pt-14">
        {/* Endorsement lockup: both logos divided by the thin split line from the deck cover. */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-6">
            <Logo brand="salaido" on="dark" />
            <span className="h-10 w-px bg-cream/30" aria-hidden />
            <a
              href={site.datalane.url}
              className="transition-opacity duration-200 hover:opacity-80"
              aria-label="Datalane (datalane.nl)"
            >
              <Logo brand="datalane" on="dark" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:gap-5">
          <p>{t.copyright}</p>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <address className="not-italic">
            <Rich text={t.address} />
          </address>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <a href={site.privacyUrl ?? "#privacy"} className="transition-colors hover:text-cream">
            {t.privacy}
          </a>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          {site.linkedinUrl ? (
            <a
              href={site.linkedinUrl}
              aria-label={`Salaido on ${t.linkedin}`}
              className="inline-flex self-start text-slate transition-colors duration-200 hover:text-cream sm:self-auto"
              rel="me noopener"
              target="_blank"
            >
              {/* LinkedIn logo (the "in" mark), in the footer text colour. */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          ) : (
            <p>
              <Rich text={`${t.linkedin} [URL]`} />
            </p>
          )}
        </div>

        {/* Privacy statement (draft). Short enough to live here; move to /privacy if it grows. */}
        <section id="privacy" aria-labelledby="privacy-heading" className="mt-12 max-w-3xl scroll-mt-24">
          <h2 id="privacy-heading" className="label text-cream">
            {t.privacyStatement.heading}
          </h2>
          <div className="mt-4 space-y-3 text-[0.8125rem] leading-relaxed text-slate">
            {t.privacyStatement.paragraphs.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
            <p className="text-slate/80">{t.privacyStatement.updated}</p>
          </div>
        </section>
      </Container>
    </footer>
  );
}
