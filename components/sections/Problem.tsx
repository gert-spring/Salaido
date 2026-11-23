import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";
import { ProcessLines } from "@/components/visuals/ProcessLines";

export function Problem() {
  const t = en.problem;
  return (
    <section id="why" aria-labelledby="why-heading" className="bg-navy py-24 sm:py-32 lg:py-40">
      <Container>
        <Split
          left={
            <Reveal>
              <SectionHeading id="why-heading" eyebrow={t.eyebrow} heading={t.heading} split />
            </Reveal>
          }
          right={
            <Reveal delay={0.08} className="lg:pt-10">
              <p className="max-w-lg text-lg leading-relaxed text-mist">
                <Rich text={t.body} />
              </p>
              <ProcessLines className="mt-12 w-full" />
            </Reveal>
          }
        />
      </Container>
    </section>
  );
}
