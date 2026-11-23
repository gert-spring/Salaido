import { en } from "@/content/en";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const t = en.contact;
  const emailIsPlaceholder = site.contactEmail.startsWith("[");

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeading id="contact-heading" eyebrow={t.eyebrow} heading={t.heading} />
          <p className="mt-10 text-sm uppercase tracking-eyebrow text-slate">{t.orEmail}</p>
          <p className="mt-3 font-serif text-2xl text-paper">
            {emailIsPlaceholder ? (
              <Rich text={t.email} />
            ) : (
              <a href={`mailto:${site.contactEmail}`} className="underline decoration-cyan/50 underline-offset-[6px] hover:decoration-cyan">
                {site.contactEmail}
              </a>
            )}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
