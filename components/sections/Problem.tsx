import { assets } from "@/content/assets";
import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { BrandVideo } from "@/components/visuals/BrandVideo";

/**
 * Anchor #why: the brand story. The brand promise introduces the 60-second brand intro, which tells
 * the problem story itself ("Every business runs on processes...").
 */
export function Problem() {
  const t = en.problem;
  const src = assets.video.brandIntro;
  if (!src) return null;

  return (
    <section id="why" aria-labelledby="why-heading" className="bg-navy pb-10 pt-24 sm:pb-12 sm:pt-32 lg:pb-16 lg:pt-40">
      <Container>
        <Reveal>
          <h2
            id="why-heading"
            className="mx-auto max-w-5xl text-center font-serif text-[2.75rem] leading-[1.05] text-cream sm:text-6xl lg:text-[5.5rem]"
          >
            <Rich text={t.promise} boldClassName="font-bold" />
          </h2>
          {/* The split, continuing from the hero down into the film. */}
          <span aria-hidden className="mx-auto mt-10 block h-16 w-px bg-cream/25 lg:mt-14 lg:h-20" />
        </Reveal>
        <Reveal delay={0.08}>
          <BrandVideo src={src} labels={t.video} stillAt={assets.video.brandIntroStillAt} />
        </Reveal>
      </Container>
    </section>
  );
}
