import { assets } from "@/content/assets";
import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { plain } from "@/components/ui/Rich";
import { BrandVideo } from "@/components/visuals/BrandVideo";

/**
 * Anchor #why. Replaced (23 Nov) by the 60-second brand intro, which tells the problem story
 * itself ("Every business runs on processes..."). The section heading remains for screen readers.
 */
export function Problem() {
  const t = en.problem;
  const src = assets.video.brandIntro;
  if (!src) return null;

  return (
    <section id="why" aria-labelledby="why-heading" className="bg-navy py-16 sm:py-24 lg:py-28">
      <h2 id="why-heading" className="sr-only">
        {plain(t.heading)}
      </h2>
      <Container>
        <Reveal>
          <BrandVideo src={src} label={t.video.label} playLabel={t.video.play} />
        </Reveal>
      </Container>
    </section>
  );
}
