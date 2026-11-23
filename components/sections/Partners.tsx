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
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className={`font-serif text-[1.75rem] font-bold leading-none ${core ? "text-cream" : "text-navy"}`}>{p.name}</h3>
                    <Pill variant={core ? "blue" : "outline"}>{p.role}</Pill>
                  </div>

                  <div className="mt-8">
                    <PartnerLogo partner={p.key} name={p.name} on={core ? "dark" : "light"} />
                  </div>

                  <p className="mt-6 leading-relaxed">
                    <Rich text={p.body} />
                  </p>

                  <div className="mt-auto pt-8">
                    <p className={`border-t pt-4 text-sm ${core ? "border-cream/20" : "border-navy/15"}`}>
                      <span className={`font-medium ${core ? "text-cream" : "text-navy"}`}>
                        <Rich text={p.credential} />
                      </span>
                      {p.viaDatalane && (
                        <>
                          {" "}
                          <a
                            href="#datalane"
                            className={`font-medium underline decoration-2 underline-offset-4 ${
                              core ? "text-yellow decoration-yellow/50" : "text-navy decoration-red"
                            }`}
                          >
                            {t.viaDatalane}
                          </a>
                        </>
                      )}
                    </p>
                    {"note" in p && p.note && (
                      <p className="mt-3 text-xs leading-relaxed">
                        <Rich text={p.note} />
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
