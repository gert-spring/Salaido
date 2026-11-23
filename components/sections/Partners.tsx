import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";

/** Section 5, place 3: credentials shown "via Datalane", so name and credentials reinforce each other. */
export function Partners() {
  const t = en.partners;
  return (
    <section id="partners" aria-labelledby="partners-heading" className="on-light bg-cream pb-24 text-graphite sm:pb-32 lg:pb-40">
      <Container>
        <div className="border-t border-navy/15 pt-24 sm:pt-32 lg:pt-40">
          <Split
            tone="light"
            left={
              <Reveal>
                <SectionHeading id="partners-heading" eyebrow={t.eyebrow} heading={t.heading} tone="light" split />
              </Reveal>
            }
          />

          <ul className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-3">
            {t.items.map((p, i) => {
              const core = i === 0;
              return (
                <Reveal
                  as="li"
                  key={p.key}
                  delay={i * 0.07}
                  className={`flex flex-col p-7 sm:p-8 ${core ? "bg-navy text-mist" : "bg-white text-graphite"}`}
                >
                  <Pill variant={core ? "blue" : "outline"} className="self-start">
                    {p.role}
                  </Pill>

                  {/* The logo is the card title; the name stays available to screen readers via alt text. */}
                  <h3 className="mt-10 flex h-12 items-center">
                    <PartnerLogo partner={p.key} name={p.name} on={core ? "dark" : "light"} />
                  </h3>

                  <p className="mt-6 leading-relaxed">
                    <Rich text={p.body} />
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
