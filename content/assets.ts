/**
 * Asset registry. Swapping a placeholder for the real asset is a one-line change here:
 * drop the file in /public and replace `null` with { src, width, height }.
 * While a value is null the page renders a labelled placeholder.
 */
export type Asset = { src: string; width: number; height: number } | null;

export const assets = {
  salaidoLogo: {
    // From the Salaido design system (Assets > Logos). Navy variant also in /public/brand.
    onDark: { src: "/brand/salaido-logo-white.svg", width: 926, height: 290 } as Asset,
    onLight: { src: "/brand/salaido-logo.svg", width: 926, height: 290 } as Asset,
  },
  datalaneLogo: {
    // From the "Salaido × Datalane at Celosphere 2026" design. PNG; swap for SVG if Datalane supplies one.
    onDark: { src: "/brand/datalane-logo-white.png", width: 1264, height: 274 } as Asset,
    onLight: { src: "/brand/datalane-logo.png", width: 1264, height: 274 } as Asset,
  },
  // Design system (Assets > Beeld): helix-nebula.jpg, "the eye of the universe".
  // Swap for the stand's eye/iris image when Futurama delivers it.
  // Static fallback for the hero: shown under reduced motion and until the video plays.
  eyeHero: { src: "/brand/helix-nebula.jpg", width: 1622, height: 912 } as Asset,
  video: {
    // Hero background loop (SALAIDO_IRIS-15.mp4).
    heroIris: "/video/salaido-iris.mp4" as string | null,
    // 60-second brand intro, replaces the "Why process intelligence" block.
    brandIntro: "/video/salaido-brand-intro.mp4" as string | null,
  },
  partners: {
    // Delivered 23 Nov 2026. [check usage rules on each partner brand portal]
    celonis: {
      onDark: { src: "/partners/celonis-white.png", width: 593, height: 249 } as Asset,
      onLight: { src: "/partners/celonis.png", width: 288, height: 121 } as Asset,
    },
    microsoft: {
      onDark: { src: "/partners/microsoft-white.png", width: 1642, height: 351 } as Asset,
      onLight: { src: "/partners/microsoft.png", width: 1494, height: 320 } as Asset,
    },
    databricks: {
      onDark: { src: "/partners/databricks-white.png", width: 555, height: 89 } as Asset,
      onLight: { src: "/partners/databricks.png", width: 1682, height: 266 } as Asset,
    },
  },
  industries: {
    // Cleanroom with lithography system. The full image shows ASML branding; the 4:5 card crop keeps only
    // the centre (machine), so no logos show. Keep the crop, and check usage rights before go-live.
    highTech: { src: "/industries/high-tech.webp", width: 1672, height: 941 } as Asset,
    cpg: null as Asset,
    banking: null as Asset,
  },
  europeMap: null as Asset, // optional, e.g. { src: "/brand/europe-map.svg", width: 1200, height: 1000 }
};
