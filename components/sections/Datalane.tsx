import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";

/** Section 5, place 2: the dedicated Datalane section. Cream contrast break ("Verdiepen"). */
export function Datalane() {
  const t = en.datalane;
  return (
    <section id="datalane" aria-labelledby="datalane-heading" className="on-light bg-cream py-24 text-graphite sm:py-32 lg:py-40">
      <Container>
        <Split
          tone="light"
          left={
            <Reveal>
              <SectionHeading id="datalane-heading" eyebrow={t.eyebrow} heading={t.heading} tone="light" split />
            </Reveal>
          }
          right={
            <Reveal delay={0.08} className="lg:pt-10">
              <p className="text-lg leading-relaxed">
                <Rich text={t.body} />
              </p>
              <p className="mt-6 font-serif text-xl font-semibold leading-snug text-navy sm:text-2xl">
                <Rich text={t.body2} />
              </p>
            </Reveal>
          }
        />

        <ul className="mt-16 grid gap-x-8 lg:mt-20 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.facts.map((fact, i) => (
            <Reveal as="li" key={fact} delay={i * 0.06} className="border-t border-navy pt-4 text-[0.9375rem] font-medium text-navy">
              <Rich text={fact} />
            </Reveal>
          ))}
        </ul>

        <a
          href={t.link.href}
          className="group mt-12 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-navy underline decoration-red decoration-2 underline-offset-[6px]"
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
