import { en } from "@/content/en";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrefillLink } from "@/components/ui/PrefillLink";

export function Celosphere() {
  const t = en.celosphere;
  return (
    <section id="celosphere" aria-labelledby="celosphere-heading" className="bg-cyan py-20 text-ink sm:py-24 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <SectionHeading id="celosphere-heading" eyebrow={t.eyebrow} heading={t.heading} tone="accent" />
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              <Rich text={t.body} />
            </p>
          </div>
          <PrefillLink
            href={t.button.href}
            subject={t.button.subject}
            className="press inline-flex h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-ink px-7 text-[0.9375rem] font-medium text-paper hover:bg-ink-2 lg:self-auto"
          >
            {t.button.label}
          </PrefillLink>
        </Reveal>
      </Container>
    </section>
  );
}
