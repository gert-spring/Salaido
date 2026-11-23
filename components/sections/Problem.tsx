import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessLines } from "@/components/visuals/ProcessLines";

export function Problem() {
  const t = en.problem;
  return (
    <section id="why" aria-labelledby="why-heading" className="border-t border-paper/10 bg-ink py-24 sm:py-32 lg:py-40">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <SectionHeading id="why-heading" eyebrow={t.eyebrow} heading={t.heading} />
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-mist">
            <Rich text={t.body} />
          </p>
        </Reveal>
        <ProcessLines className="w-full" />
      </Container>
    </section>
  );
}
