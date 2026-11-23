import { en } from "@/content/en";
import { buttonClasses, ButtonInner } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";
import { PrefillLink } from "@/components/ui/PrefillLink";
import { ColorBars } from "@/components/ui/ColorBars";

/** Yellow band ("Verrassen"): dark blue type only, per the system's contrast rule. */
export function Celosphere() {
  const t = en.celosphere;
  return (
    <section id="celosphere" aria-labelledby="celosphere-heading" className="on-light relative bg-yellow text-navy">
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal>
          <Split
            line
            tone="accent"
            align="end"
            left={<SectionHeading id="celosphere-heading" eyebrow={t.eyebrow} heading={t.heading} tone="accent" split />}
            right={
              <>
                <p className="text-lg leading-relaxed text-navy">
                  <Rich text={t.body} />
                </p>
                <PrefillLink
                  href={t.button.href}
                  subject={t.button.subject}
                  className={`${buttonClasses("filled", "light")} mt-8`}
                >
                  <ButtonInner>{t.button.label}</ButtonInner>
                </PrefillLink>
              </>
            }
          />
        </Reveal>
      </Container>
      <ColorBars exclude={["yellow", "navy"]} />
    </section>
  );
}
