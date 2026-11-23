import Image from "next/image";
import { assets } from "@/content/assets";
import { en } from "@/content/en";

type PartnerKey = keyof typeof assets.partners;

/** Partner logo in the version for its surface; a labelled outline while no file is set in content/assets.ts. */
export function PartnerLogo({ partner, name, on = "light" }: { partner: PartnerKey; name: string; on?: "light" | "dark" }) {
  const set = assets.partners[partner];
  const asset = on === "dark" ? set.onDark : set.onLight;
  if (asset) {
    return (
      <Image
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={name}
        className="h-9 w-auto max-w-[11rem] object-contain object-left"
      />
    );
  }
  const tone = on === "dark" ? "border-cream/25 text-cream" : "border-navy/25 text-navy";
  return (
    <span
      className={`inline-flex h-10 items-center gap-2 border border-dashed px-3 text-sm font-semibold tracking-tight ${tone}`}
      title={`${name} ${en.placeholders.logo}`}
    >
      {name}
      <span className="text-[0.625rem] font-medium uppercase tracking-eyebrow opacity-60">{en.placeholders.logoShort}</span>
    </span>
  );
}
