import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Rich } from "./Rich";
import { SplitLine } from "./SplitLine";

export function SectionHeading({
  id,
  eyebrow,
  heading,
  tone = "dark",
  className = "",
  split = false,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  tone?: "dark" | "light" | "accent";
  className?: string;
  /** Right-align against the split on large screens (design system: headings sit right against the midline). */
  split?: boolean;
}) {
  const headingColor = tone === "dark" ? "text-cream" : "text-navy";
  return (
    <div className={`${split ? "lg:text-right" : ""} ${className}`}>
      <Eyebrow text={eyebrow} tone={tone} />
      <h2
        id={id}
        className={`mt-5 font-serif text-[2.25rem] leading-[1.1] sm:text-5xl lg:text-[3.25rem] ${headingColor}`}
      >
        <Rich text={heading} boldClassName="font-bold" />
      </h2>
    </div>
  );
}

/**
 * The split (design system > Vormtaal): two columns around the middle of the page. Headings sit
 * right-aligned against the midline; content starts right of it. Stacks on small screens.
 *
 * The 1px line itself is opt-in (`line`): use it only where the split carries meaning, so it stays
 * a signature instead of decoration. When shown, it draws itself once on scroll into view.
 */
export function Split({
  left,
  right,
  tone = "dark",
  className = "",
  align = "start",
  line = false,
}: {
  left: ReactNode;
  right?: ReactNode;
  tone?: "dark" | "light" | "accent";
  className?: string;
  align?: "start" | "center" | "end";
  line?: boolean;
}) {
  const lineColor = tone === "dark" ? "bg-cream/25" : "bg-navy/30";
  const items = align === "center" ? "lg:items-center" : align === "end" ? "lg:items-end" : "lg:items-start";
  return (
    <div className={`relative grid gap-10 lg:grid-cols-2 lg:gap-0 ${items} ${className}`}>
      {line && <SplitLine className={`absolute inset-y-0 left-1/2 hidden w-px lg:block ${lineColor}`} />}
      <div className="lg:pr-14">{left}</div>
      <div className="lg:pl-14">{right}</div>
    </div>
  );
}
