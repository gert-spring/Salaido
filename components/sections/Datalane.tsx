import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DatalaneDiagram } from "@/components/visuals/DatalaneDiagram";

/** Section 5, place 2: the dedicated Datalane section. Off-white contrast break. */
export function Datalane() {
  const t = en.datalane;
  return (
    <section id="datalane" aria-labelledby="datalane-heading" className="on-light bg-paper py-24 text-graphite sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <SectionHeading id="datalane-heading" eyebrow={t.eyebrow} heading={t.heading} tone="light" />
          </Reveal>
          <Reveal delay={0.08} className="lg:pt-11">
            <p className="text-lg leading-relaxed">
              <Rich text={t.body} />
            </p>
            <p className="mt-6 border-l-2 border-blue pl-5 font-serif text-xl leading-snug text-ink sm:text-2xl">
              <Rich text={t.body2} />
            </p>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-20">
          <DatalaneDiagram />
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.facts.map((fact, i) => (
            <Reveal as="li" key={fact} delay={i * 0.06} className="border-t border-ink/15 pt-4 text-[0.9375rem] font-medium text-ink">
              <Rich text={fact} />
            </Reveal>
          ))}
        </ul>

        <a
          href={t.link.href}
          className="group mt-12 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-blue underline-offset-4 hover:underline"
        >
          {t.link.label}
          <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-1">
            →
          </span>
        </a>
      </Container>
    </section>
  );
}
