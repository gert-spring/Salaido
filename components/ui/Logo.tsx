import Image from "next/image";
import { assets } from "@/content/assets";
import { en } from "@/content/en";

type Brand = "salaido" | "datalane";

/**
 * Brand logo. Falls back to a labelled wordmark placeholder until the SVG is set in content/assets.ts.
 */
export function Logo({
  brand = "salaido",
  on = "dark",
  className = "",
}: {
  brand?: Brand;
  on?: "dark" | "light";
  className?: string;
}) {
  const set = brand === "salaido" ? assets.salaidoLogo : assets.datalaneLogo;
  const asset = on === "dark" ? set.onDark : set.onLight;
  const name = brand === "salaido" ? "Salaido" : "Datalane";

  if (asset) {
    return (
      <Image
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={name}
        className={`${brand === "salaido" ? "h-10" : "h-7"} w-auto ${className}`}
        priority={brand === "salaido"}
      />
    );
  }

  const tone = on === "dark" ? "text-paper border-paper/25" : "text-ink border-ink/25";
  return (
    <span
      className={`inline-flex items-center rounded-[4px] border border-dashed px-2 py-0.5 font-serif text-[1.375rem] leading-none tracking-[-0.01em] ${tone} ${className}`}
      title={`${name} ${en.placeholders.logo}`}
    >
      {brand === "salaido" ? (
        <>
          <span className="font-semibold">sal</span>aido
        </>
      ) : (
        <span className="font-sans text-[1.05rem] font-semibold tracking-[-0.02em]">datalane</span>
      )}
      <span className="sr-only"> ({en.placeholders.logo})</span>
    </span>
  );
}
