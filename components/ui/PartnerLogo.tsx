import Image from "next/image";
import { assets } from "@/content/assets";
import { en } from "@/content/en";

type PartnerKey = keyof typeof assets.partners;

/** Partner logo; a labelled outline until the file is set in content/assets.ts (check usage rules first). */
export function PartnerLogo({ partner, name, on = "light" }: { partner: PartnerKey; name: string; on?: "light" | "dark" }) {
  const asset = assets.partners[partner];
  if (asset) {
    return <Image src={asset.src} width={asset.width} height={asset.height} alt={name} className="h-8 w-auto" />;
  }
  const tone = on === "dark" ? "border-paper/25 text-paper" : "border-ink/25 text-ink";
  return (
    <span
      className={`inline-flex h-10 items-center gap-2 rounded-md border border-dashed px-3 text-sm font-semibold tracking-tight ${tone}`}
      title={`${name} ${en.placeholders.logo}`}
    >
      {name}
      <span className="text-[0.625rem] font-medium uppercase tracking-eyebrow opacity-60">{en.placeholders.logoShort}</span>
    </span>
  );
}
