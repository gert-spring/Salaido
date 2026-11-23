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
          <p className="text-mist">{t.companyLine}</p>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:gap-5">
          <p>{t.copyright}</p>
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
            <a href={site.linkedinUrl} className="transition-colors hover:text-cream" rel="me noopener" target="_blank">
              {t.linkedin}
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
