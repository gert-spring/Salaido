import Image from "next/image";
import { assets } from "@/content/assets";
import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich, plain } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Placeholder gradients, one per vertical, until photography is delivered (content/assets.ts).
const PLACEHOLDER_BG: Record<string, string> = {
  highTech: "radial-gradient(120% 80% at 70% 20%, #1d4a5a 0%, #0b0b12 60%)",
  cpg: "radial-gradient(120% 80% at 30% 25%, #1a2f5e 0%, #0b0b12 62%)",
  banking: "radial-gradient(120% 80% at 60% 30%, #2b2e37 0%, #0b0b12 60%)",
};

export function Industries() {
  const t = en.industries;
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="bg-ink py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <Reveal>
          <SectionHeading id="industries-heading" eyebrow={t.eyebrow} heading={t.heading} className="max-w-3xl" />
        </Reveal>

        <ul className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20">
          {t.items.map((item, i) => {
            const photo = assets.industries[item.key];
            return (
              <Reveal as="li" key={item.key} delay={i * 0.07}>
                <article className="relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl p-6 sm:p-7">
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="-z-10 object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 -z-10" style={{ background: PLACEHOLDER_BG[item.key] }}>
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(115deg,#8ED9EC_0_1px,transparent_1px_22px)]"
                      />
                      <span className="absolute left-5 top-5 rounded-full border border-dashed border-flag/60 px-3 py-1 text-[0.625rem] uppercase tracking-eyebrow text-flag/90">
                        {plain(item.label)} {en.placeholders.industryPhoto}
                      </span>
                    </div>
                  )}
                  <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

                  <p className="text-xs font-medium uppercase tracking-eyebrow text-cyan">
                    <Rich text={item.label} />
                  </p>
                  <h3 className="mt-4 font-serif text-[2rem] leading-[1.05] text-paper">
                    <Rich text={item.headline} />
                  </h3>
                  <p className="mt-3 text-mist">
                    <Rich text={item.line} />
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
