import Image from "next/image";
import { assets } from "@/content/assets";
import { en } from "@/content/en";

/**
 * Map of Europe for the ambition section. No map asset exists yet, so this renders a labelled
 * placeholder: a dot field with a single home node in Vught. Set assets.europeMap to swap it.
 */
export function EuropeMap({ className = "" }: { className?: string }) {
  const t = en.ambition;
  const asset = assets.europeMap;

  if (asset) {
    return (
      <div className={`relative aspect-[6/5] ${className}`}>
        <Image src={asset.src} alt={t.mapLabel} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain" />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[6/5] overflow-hidden rounded-2xl border border-dashed border-paper/15 ${className}`}
      role="img"
      aria-label={en.placeholders.europeMap}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(#8E95A5_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_50%,black_30%,transparent_75%)]"
      />
      {/* Home node: Vught, NL. Roughly where the Netherlands sits on a Europe crop. */}
      <div aria-hidden className="absolute left-[43%] top-[40%] flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="absolute inset-[-8px] rounded-full border border-cyan/40" />
          <span className="h-3 w-3 rounded-full bg-cyan" />
        </span>
        <span className="text-xs font-medium uppercase tracking-eyebrow text-cyan">{t.homeLabel}</span>
      </div>
      <span className="absolute bottom-4 left-4 rounded-full border border-dashed border-flag/60 px-3 py-1 text-[0.625rem] uppercase tracking-eyebrow text-flag/90">
        {en.placeholders.europeMap}
      </span>
    </div>
  );
}
