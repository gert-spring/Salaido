import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";

// The top rule brightens from block 01 to 04: from data to AI execution.
const RULE = ["border-cyan/25", "border-cyan/45", "border-cyan/70", "border-cyan"];

export function BuildingBlocks() {
  const t = en.blocks;
  return (
    <section
      id="what-we-do"
      aria-labelledby="what-we-do-heading"
      className="border-t border-paper/10 bg-ink py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <Reveal>
          <SectionHeading id="what-we-do-heading" eyebrow={t.eyebrow} heading={t.heading} className="max-w-3xl" />
        </Reveal>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {t.items.map((item, idx) => (
            <Reveal as="li" key={item.number} delay={idx * 0.07} className={`border-t pt-6 ${RULE[idx]}`}>
              <p className="font-serif text-lg text-cyan" aria-hidden>
                {item.number}
              </p>
              <h3 className="mt-6 font-serif text-[1.625rem] leading-tight text-paper">
                <span className="sr-only">{item.number}. </span>
                <Rich text={item.title} />
              </h3>
              <p className="mt-3 leading-relaxed text-mist">
                <Rich text={item.body} />
              </p>
              <p className="mt-5 text-sm italic text-slate">
                <Rich text={item.partners} />
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2}>
          <p className="mt-16 flex items-center gap-4 font-serif text-xl text-paper sm:text-2xl lg:mt-20">
            <span className="h-px w-10 shrink-0 bg-cyan" aria-hidden />
            <Rich text={t.closing} />
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
