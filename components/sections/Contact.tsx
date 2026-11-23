import { en } from "@/content/en";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Split } from "@/components/ui/SectionHeading";

/** Contact: the form only (no public email address, by choice). */
export function Contact() {
  const t = en.contact;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-navy py-24 sm:py-32 lg:py-40">
      <Container>
        <Split
          line
          left={
            <Reveal className="lg:text-right">
              <SectionHeading id="contact-heading" eyebrow={t.eyebrow} heading={t.heading} split />
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
