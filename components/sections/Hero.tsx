import { en } from "@/content/en";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Rich } from "@/components/ui/Rich";
import { SplitHeadline } from "@/components/ui/SplitHeadline";
import { EyeHero } from "@/components/visuals/EyeHero";
import { HeroVideo } from "@/components/visuals/HeroVideo";
import { assets } from "@/content/assets";

const heroVideo = assets.video.heroIris;

/**
 * Hero, following the design system: a large circular image (the "eye") centred on the page,
 * the split running through its centre, "Imagine | better" cut by the line, white type over the image.
 */
export function Hero() {
  const t = en.hero;
  const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-navy">
      {heroVideo ? (
        <HeroVideo src={heroVideo} className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover" />
      ) : (
        <EyeHero className="fade-in pointer-events-none absolute left-1/2 top-[44%] -z-10 w-[150vw] -translate-x-1/2 -translate-y-1/2 sm:w-[110vw] lg:w-[min(78vw,1040px)]" />
      )}
      {/* Keeps white type readable over the moving image. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-navy/45" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy to-transparent" />

      <Container className="flex min-h-[100svh] flex-col justify-center pb-20 pt-32 lg:pb-24 lg:pt-32">
        <SplitHeadline
          id="hero-heading"
          text={t.heading}
          className="rise text-[3.25rem] text-white sm:text-[5.5rem] lg:text-[8.5rem]"
          style={i(0)}
          lineClassName="bg-cream/80"
        />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-0">
          {/* The brand promise moved to open the brand story (section #why); this side stays open. */}
          <div className="lg:col-start-2 lg:pl-14">
            {/* Section 5, place 1: the Datalane link at first glance. */}
            <p
              className="rise inline-flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow text-yellow"
              style={i(1)}
            >
              <span className="h-px w-8 shrink-0 bg-yellow" aria-hidden />
              <Rich text={t.tag} />
            </p>

            <p className="rise mt-5 max-w-md text-lg leading-relaxed text-cream/90" style={i(2)}>
              <Rich text={t.intro} />
            </p>

            <div className="rise mt-8 flex flex-col items-start gap-3 sm:flex-row" style={i(3)}>
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
