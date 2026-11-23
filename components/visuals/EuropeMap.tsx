import { en } from "@/content/en";
import { europeMapMeta } from "@/lib/europe-map";

/**
 * Map of Europe: focus countries (cream), next countries (slate), the rest (barely visible).
 * The SVG is generated from real country borders at build time (app/europe-map.svg) and loaded
 * as an image, so it stays out of the page HTML. Tiers live in content/site.ts.
 */
export function EuropeMap({ className = "" }: { className?: string }) {
  const { width, height, version } = europeMapMeta();
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG route; next/image adds nothing here
    <img
      src={`/europe-map.svg?v=${version}`}
      width={width}
      height={height}
      alt={en.ambition.mapLabel}
      loading="lazy"
      decoding="async"
      className={`block h-auto w-full ${className}`}
    />
  );
}
