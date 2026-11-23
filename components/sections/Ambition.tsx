import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EuropeMap } from "@/components/visuals/EuropeMap";

export function Ambition() {
  const t = en.ambition;
  return (
    <section id="ambition" aria-labelledby="ambition-heading" className="border-t border-paper/10 bg-ink py-24 sm:py-32 lg:py-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <Reveal>
          <SectionHeading id="ambition-heading" eyebrow={t.eyebrow} heading={t.heading} />
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-mist">
            <Rich text={t.body} />
          </p>
          {t.joinLine.show && (
            <p className="mt-8 max-w-lg font-serif text-xl text-paper">
              <Rich text={t.joinLine.text} />
            </p>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <EuropeMap />
        </Reveal>
      </Container>
    </section>
  );
}
