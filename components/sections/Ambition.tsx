import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";
import { EuropeMap } from "@/components/visuals/EuropeMap";

export function Ambition() {
  const t = en.ambition;
  return (
    <section id="ambition" aria-labelledby="ambition-heading" className="bg-navy pb-24 pt-10 sm:pb-32 sm:pt-12 lg:pb-40 lg:pt-16">
      <Container>
        <Split
          align="center"
          left={
            <Reveal className="lg:text-right">
              <SectionHeading id="ambition-heading" eyebrow={t.eyebrow} heading={t.heading} split />
              <p className="mt-8 text-lg leading-relaxed text-mist lg:ml-auto lg:max-w-lg">
                <Rich text={t.body} />
              </p>
            </Reveal>
          }
          right={
            <Reveal delay={0.1}>
              <EuropeMap />
            </Reveal>
          }
        />
      </Container>
    </section>
  );
}
