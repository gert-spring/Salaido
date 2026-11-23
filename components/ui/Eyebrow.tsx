import { Rich } from "./Rich";

/**
 * Overline above a section heading. On dark blue: yellow (the vibrant accent). On cream and on
 * yellow: dark blue.
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
  return (
    <p className={`text-xs font-medium uppercase tracking-eyebrow ${color} ${className}`}>
      <Rich text={text} />
    </p>
  );
}
