import { Rich } from "./Rich";

export function Eyebrow({
  text,
  tone = "dark",
  className = "",
}: {
  text: string;
  tone?: "dark" | "light" | "accent";
  className?: string;
}) {
  const color = tone === "dark" ? "text-cyan" : tone === "light" ? "text-blue" : "text-ink";
  return (
    <p className={`text-xs font-medium uppercase tracking-eyebrow ${color} ${className}`}>
      <Rich text={text} />
    </p>
  );
}
