import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { PartnerLogo } from "@/components/ui/PartnerLogo";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Section 5, place 3: credentials shown "via Datalane", so name and credentials reinforce each other. */
export function Partners() {
  const t = en.partners;
  return (
    <section id="partners" aria-labelledby="partners-heading" className="on-light bg-paper pb-24 text-graphite sm:pb-32 lg:pb-40">
      <Container>
        <div className="border-t border-ink/10 pt-24 sm:pt-32 lg:pt-40">
          <Reveal>
            <SectionHeading id="partners-heading" eyebrow={t.eyebrow} heading={t.heading} tone="light" className="max-w-3xl" />
          </Reveal>

          <ul className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-3">
            {t.items.map((p, i) => {
              const core = i === 0;
              return (
                <Reveal
                  as="li"
                  key={p.key}
                  delay={i * 0.07}
                  className={`flex flex-col rounded-2xl p-7 sm:p-8 ${
                    core ? "bg-ink-2 text-mist" : "bg-paper-2 text-graphite"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`font-serif text-[1.75rem] leading-none ${core ? "text-paper" : "text-ink"}`}>{p.name}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-eyebrow ${
                        core ? "bg-cyan text-ink" : "border border-ink/15 text-graphite"
                      }`}
                    >
                      {p.role}
                    </span>
                  </div>

                  <div className="mt-8">
                    <PartnerLogo partner={p.key} name={p.name} on={core ? "dark" : "light"} />
                  </div>

                  <p className="mt-6 leading-relaxed">
                    <Rich text={p.body} />
                  </p>

                  <div className={`mt-auto pt-8`}>
                    <p className={`border-t pt-4 text-sm ${core ? "border-paper/15" : "border-ink/10"}`}>
                      <span className={`font-medium ${core ? "text-paper" : "text-ink"}`}>
                        <Rich text={p.credential} />
                      </span>
                      {p.viaDatalane && (
                        <>
                          {" "}
                          <a
                            href="#datalane"
                            className={`font-medium underline-offset-4 hover:underline ${core ? "text-cyan" : "text-blue"}`}
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
