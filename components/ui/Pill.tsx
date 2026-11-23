import type { ReactNode } from "react";

/**
 * Salaido Pill (design system > Actions > Pill): round, a coloured dot before a capitalised label.
 * Used here as a static badge. Variants follow the system: filled ink, outline with a red
 * accent border and dot, filled beyond blue.
 */
type PillVariant = "ink" | "ink-dark" | "outline" | "outline-dark" | "blue";

const styles: Record<PillVariant, { pill: string; dot: string }> = {
  ink: { pill: "bg-navy text-cream border-transparent", dot: "bg-cream" },
  "ink-dark": { pill: "bg-cream text-navy border-transparent", dot: "bg-navy" },
  outline: { pill: "border-red text-navy", dot: "bg-red" },
  "outline-dark": { pill: "border-red text-cream", dot: "bg-red" },
  blue: { pill: "bg-beyond text-white border-transparent", dot: "bg-white" },
};

export function Pill({ children, variant = "outline", className = "" }: { children: ReactNode; variant?: PillVariant; className?: string }) {
  const s = styles[variant];
  return (
    <span className={`label inline-flex items-center gap-2 rounded-full border py-1 pl-2 pr-3 ${s.pill} ${className}`}>
      <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
      {children}
    </span>
  );
}
