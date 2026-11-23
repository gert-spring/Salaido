import { en } from "@/content/en";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { EyeHero } from "@/components/visuals/EyeHero";

export function Hero() {
  const t = en.hero;
  const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-ink">
      <EyeHero className="fade-in pointer-events-none absolute -right-[42%] top-16 -z-10 w-[125vw] opacity-45 sm:-right-[22%] sm:w-[90vw] lg:-right-[6%] lg:top-1/2 lg:w-[min(54vw,780px)] lg:-translate-y-1/2 lg:opacity-100" />
      {/* Keep body copy readable where the eye sits behind it on small screens. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent lg:via-ink/30" />

      <Container className="flex min-h-[100svh] flex-col justify-center pb-20 pt-32 lg:pb-28 lg:pt-36">
        <div className="max-w-xl">
          <p className="rise text-xs font-medium uppercase tracking-eyebrow text-mist" style={i(0)}>
            <Rich text={t.eyebrow} />
          </p>
          <h1
            id="hero-heading"
            className="rise mt-6 font-serif text-[4.25rem] leading-[0.95] tracking-[-0.025em] text-paper sm:text-[6rem] lg:text-[7.5rem]"
            style={i(1)}
          >
            <Rich text={t.heading} />
          </h1>
          <p className="rise mt-6 font-serif text-2xl text-mist sm:text-[1.75rem]" style={i(2)}>
            <Rich text={t.tagline} />
          </p>

          {/* Section 5, place 1: the Datalane link at first glance. */}
          <p
            className="rise mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow text-cyan"
            style={i(3)}
          >
            <span className="h-px w-8 bg-cyan" aria-hidden />
            <Rich text={t.tag} />
          </p>

          <p className="rise mt-6 max-w-md text-lg leading-relaxed text-mist" style={i(4)}>
            <Rich text={t.intro} />
          </p>

          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={i(5)}>
            <Button href={t.primary.href}>{t.primary.label}</Button>
            <Button href={t.secondary.href} variant="secondary">
              {t.secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
