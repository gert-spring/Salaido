import { en } from "@/content/en";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { EyeHero } from "@/components/visuals/EyeHero";

/**
 * Hero, following the design system: a large circular image (the "eye") centred on the page,
 * the split running through its centre, "Imagine | better" cut by the line, white type over the image.
 */
export function Hero() {
  const t = en.hero;
  const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-navy">
      <EyeHero className="fade-in pointer-events-none absolute left-1/2 top-[44%] -z-10 w-[150vw] -translate-x-1/2 -translate-y-1/2 sm:w-[110vw] lg:w-[min(78vw,1040px)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-navy/35" />
      {/* The split: full height, through the centre of the eye. */}
      <span aria-hidden className="split-draw pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-px bg-cream/20 lg:block" />

      <Container className="flex min-h-[100svh] flex-col justify-center pb-20 pt-32 lg:pb-24 lg:pt-32">
        <div className="grid grid-cols-2">
          <p
            className="rise col-start-1 pr-4 text-right text-[0.6875rem] font-medium uppercase tracking-eyebrow text-cream sm:pr-6 sm:text-xs lg:pr-8"
            style={i(0)}
          >
            <Rich text={t.eyebrow} />
          </p>
        </div>

        <SplitHeadline
          id="hero-heading"
          text={t.heading}
          className="rise mt-6 text-[3.25rem] text-white sm:text-[5.5rem] lg:text-[8.5rem]"
          lineClassName="bg-cream/80"
        />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-0">
          <p
            className="rise font-serif text-2xl text-cream sm:text-[1.75rem] lg:pr-14 lg:text-right"
            style={i(2)}
          >
            <Rich text={t.tagline} />
          </p>

          <div className="lg:pl-14">
            {/* Section 5, place 1: the Datalane link at first glance. */}
            <p
              className="rise inline-flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow text-yellow"
              style={i(3)}
            >
              <span className="h-px w-8 shrink-0 bg-yellow" aria-hidden />
              <Rich text={t.tag} />
            </p>

            <p className="rise mt-5 max-w-md text-lg leading-relaxed text-cream/90" style={i(4)}>
              <Rich text={t.intro} />
            </p>

            <div className="rise mt-8 flex flex-col items-start gap-3 sm:flex-row" style={i(5)}>
              <Button href={t.primary.href}>{t.primary.label}</Button>
              <Button href={t.secondary.href} variant="outline">
                {t.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
