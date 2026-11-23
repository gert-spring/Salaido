import { en } from "@/content/en";
import { site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";

export function Contact() {
  const t = en.contact;
  const emailIsPlaceholder = site.contactEmail.startsWith("[");

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-navy py-24 sm:py-32 lg:py-40">
      <Container>
        <Split
          left={
            <Reveal className="lg:text-right">
              <SectionHeading id="contact-heading" eyebrow={t.eyebrow} heading={t.heading} split />
              <p className="label mt-10 text-slate">{t.orEmail}</p>
              <p className="mt-3 font-serif text-2xl text-cream">
                {emailIsPlaceholder ? (
                  <Rich text={t.email} />
                ) : (
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="underline decoration-yellow/60 underline-offset-[6px] hover:decoration-yellow"
                  >
                    {site.contactEmail}
                  </a>
                )}
              </p>
            </Reveal>
          }
          right={
            <Reveal delay={0.08}>
              <ContactForm />
            </Reveal>
          }
        />
      </Container>
    </section>
  );
}
