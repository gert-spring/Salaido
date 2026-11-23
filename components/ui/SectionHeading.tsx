import { Eyebrow } from "./Eyebrow";
import { Rich } from "./Rich";

export function SectionHeading({
  id,
  eyebrow,
  heading,
  tone = "dark",
  className = "",
}: {
  id: string;
  eyebrow: string;
  heading: string;
  tone?: "dark" | "light" | "accent";
  className?: string;
}) {
  const headingColor = tone === "dark" ? "text-paper" : "text-ink";
  return (
    <div className={className}>
      <Eyebrow text={eyebrow} tone={tone} />
      <h2
        id={id}
        className={`mt-5 font-serif text-[2.125rem] leading-[1.08] tracking-[-0.015em] sm:text-5xl lg:text-[3.5rem] ${headingColor}`}
      >
        <Rich text={heading} />
      </h2>
    </div>
  );
}
