import Image from "next/image";
import { assets } from "@/content/assets";
import { en } from "@/content/en";

/**
 * The eye motif. Uses the real image from content/assets.ts when set; until then an abstract
 * SVG iris (data reflected in the iris) stands in, clearly labelled as a placeholder.
 */
export function EyeHero({ className = "" }: { className?: string }) {
  const asset = assets.eyeHero;

  if (asset) {
    return (
      <div className={`aspect-square ${className}`}>
        <Image
          src={asset.src}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 56vw, 120vw"
          className="object-cover [mask-image:radial-gradient(closest-side,black_70%,transparent)]"
        />
      </div>
    );
  }

  // Deterministic iris fibres so server and client render identically.
  const fibres = Array.from({ length: 144 }, (_, i) => {
    const a = (i / 144) * Math.PI * 2;
    const inner = 92 + (Math.sin(i * 12.9898) * 0.5 + 0.5) * 18;
    const outer = 210 + (Math.sin(i * 78.233) * 0.5 + 0.5) * 62;
    const o = 0.08 + (Math.sin(i * 3.17) * 0.5 + 0.5) * 0.28;
    const r = (n: number) => Math.round(n * 100) / 100;
    return {
      x1: r(300 + Math.cos(a) * inner),
      y1: r(300 + Math.sin(a) * inner),
      x2: r(300 + Math.cos(a) * outer),
      y2: r(300 + Math.sin(a) * outer),
      o: r(o),
    };
  });

  return (
    <div className={`aspect-square ${className}`} aria-hidden>
      <svg viewBox="0 0 600 600" className="h-full w-full">
        <defs>
          <radialGradient id="eye-iris" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#050507" />
            <stop offset="30%" stopColor="#0B1A22" />
            <stop offset="62%" stopColor="#123846" />
            <stop offset="86%" stopColor="#0B0B12" />
            <stop offset="100%" stopColor="#050507" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="eye-glow" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#8ED9EC" stopOpacity="0" />
            <stop offset="80%" stopColor="#8ED9EC" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8ED9EC" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="eye-reflect" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FCFCFB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8ED9EC" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <circle cx="300" cy="300" r="298" fill="url(#eye-glow)" />
        <circle cx="300" cy="300" r="280" fill="url(#eye-iris)" />
        <g stroke="#8ED9EC" strokeWidth="1" strokeLinecap="round">
          {fibres.map((f, i) => (
            <line key={i} x1={f.x1} y1={f.y1} x2={f.x2} y2={f.y2} strokeOpacity={f.o} />
          ))}
        </g>
        <circle cx="300" cy="300" r="276" fill="none" stroke="#8ED9EC" strokeOpacity="0.18" />
        <circle cx="300" cy="300" r="214" fill="none" stroke="#8ED9EC" strokeOpacity="0.08" />
        <circle cx="300" cy="300" r="92" fill="#030305" />
        <circle cx="300" cy="300" r="92" fill="none" stroke="#8ED9EC" strokeOpacity="0.35" />

        {/* Data reflected in the iris: a process flow catching the light. */}
        <g opacity="0.9">
          <path
            d="M 212 214 C 236 226, 246 196, 270 206 S 300 232, 330 214"
            fill="none"
            stroke="url(#eye-reflect)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {[
            [212, 214],
            [270, 206],
            [330, 214],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="3.5" fill="#FCFCFB" fillOpacity="0.7" />
          ))}
          <ellipse cx="266" cy="262" rx="15" ry="9" transform="rotate(-24 266 262)" fill="#FCFCFB" fillOpacity="0.14" />
        </g>
      </svg>
      <span className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-dashed border-flag/60 px-3 py-1 text-[0.625rem] uppercase tracking-eyebrow text-flag/90">
        {en.placeholders.eyeHero}
      </span>
    </div>
  );
}
