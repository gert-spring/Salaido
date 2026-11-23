import { Rich } from "./Rich";

/**
 * Overline above a section heading. On dark blue: yellow (the vibrant accent). On cream: dark blue
 * with a red accent dash (red is only allowed as large text, so it marks rather than colours the label).
 * On yellow: dark blue.
 */
export function Eyebrow({
  text,
  tone = "dark",
  className = "",
}: {
  text: string;
  tone?: "dark" | "light" | "accent";
  className?: string;
}) {
  const color = tone === "dark" ? "text-yellow" : "text-navy";
  const dash = tone === "dark" ? "bg-yellow" : tone === "light" ? "bg-red" : "bg-navy";
  return (
    <p className={`inline-flex items-center gap-3 text-xs font-medium uppercase tracking-eyebrow ${color} ${className}`}>
      <span aria-hidden className={`h-px w-6 shrink-0 ${dash}`} />
      <span>
        <Rich text={text} />
      </span>
    </p>
  );
}
