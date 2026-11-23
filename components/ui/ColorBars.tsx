/**
 * Colour bars along the bottom of a plane, equally divided (design system > Kleur).
 * Decorative only.
 */
const BARS = [
  { key: "navy", cls: "bg-navy" },
  { key: "beyond", cls: "bg-beyond" },
  { key: "yellow", cls: "bg-yellow" },
  { key: "green", cls: "bg-green" },
  { key: "red", cls: "bg-red" },
  { key: "purple", cls: "bg-purple" },
] as const;

export function ColorBars({ exclude = [], className = "" }: { exclude?: Array<(typeof BARS)[number]["key"]>; className?: string }) {
  return (
    <div aria-hidden className={`flex h-2 w-full ${className}`}>
      {BARS.filter((b) => !exclude.includes(b.key)).map((b) => (
        <span key={b.key} className={`flex-1 ${b.cls}`} />
      ))}
    </div>
  );
}
