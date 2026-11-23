import Image from "next/image";
import { assets } from "@/content/assets";
import { en } from "@/content/en";

type PartnerKey = keyof typeof assets.partners;

export function PartnerLogo({ partner, name }: { partner: PartnerKey; name: string }) {
  const asset = assets.partners[partner];
  if (asset) {
    return <Image src={asset.src} width={asset.width} height={asset.height} alt={name} className="h-8 w-auto" />;
  }
  return (
    <span
      className="inline-flex h-10 items-center rounded-md border border-dashed border-ink/25 px-3 text-sm font-semibold tracking-tight text-ink"
      title={`${name} ${en.placeholders.logo}`}
    >
      {name}
      <span className="ml-2 text-[0.625rem] font-medium uppercase tracking-eyebrow text-graphite/60">logo</span>
    </span>
  );
}
