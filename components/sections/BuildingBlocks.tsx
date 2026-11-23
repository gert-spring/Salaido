import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";

// Accent blocks above each building block, one per core colour (design system: strip of small blocks).
const BLOCK = ["bg-beyond", "bg-yellow", "bg-green", "bg-red"];

export function BuildingBlocks() {
  const t = en.blocks;
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-heading" className="bg-navy pb-24 pt-10 sm:pb-32 sm:pt-12 lg:pb-40 lg:pt-16">
      <Container>
        <Split
          line
          align="end"
          left={
            <Reveal>
              <SectionHeading id="what-we-do-heading" eyebrow={t.eyebrow} heading={t.heading} split />
            </Reveal>
          }
          right={
            <Reveal delay={0.08}>
              <p className="font-serif text-xl text-cream sm:text-2xl">
                <Rich text={t.closing} />
              </p>
            </Reveal>
          }
        />

        <ol className="mt-16 grid sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {t.items.map((item, idx) => (
            <Reveal as="li" key={item.number} delay={idx * 0.07} className="py-8 sm:pr-8 lg:border-l lg:border-cream/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0">
              <div className="flex items-center gap-3">
                <span aria-hidden className={`h-3 w-3 ${BLOCK[idx]}`} />
                <p className="font-serif text-lg text-cream" aria-hidden>
                  {item.number}
                </p>
              </div>
              <h3 className="mt-8 font-serif text-[1.625rem] font-bold leading-tight text-cream">
                <span className="sr-only">{item.number}. </span>
                <Rich text={item.title} />
              </h3>
              <p className="mt-3 leading-relaxed text-mist">
                <Rich text={item.body} />
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
