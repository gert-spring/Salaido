import { en } from "@/content/en";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";

/** Section 5, place 2: the dedicated Datalane section. Cream contrast break ("Verdiepen"). */
export function Datalane() {
  const t = en.datalane;
  return (
    <section id="datalane" aria-labelledby="datalane-heading" className="on-light bg-cream pb-10 pt-24 text-graphite sm:pb-12 sm:pt-32 lg:pb-16 lg:pt-40">
      <Container>
        <Split
          line
          tone="light"
          left={
            <Reveal>
              <SectionHeading id="datalane-heading" eyebrow={t.eyebrow} heading={t.heading} tone="light" split />
            </Reveal>
          }
          right={
            <Reveal delay={0.08}>
              {/* The name people know, shown as the brand they know it by. */}
              <Logo brand="datalane" on="light" className="h-10! sm:h-12!" />
              <p className="mt-8 text-lg leading-relaxed">
                <Rich text={t.body} />
              </p>
              <p className="mt-6 font-serif text-xl font-semibold leading-snug text-navy sm:text-2xl">
                <Rich text={t.body2} />
              </p>
              {/* Primary action of this section: the way back to the name people know. */}
              <Button href={t.link.href} variant="filled" on="light" accent className="mt-10">
                {t.link.label}
              </Button>
            </Reveal>
          }
        />
      </Container>
    </section>
  );
}
