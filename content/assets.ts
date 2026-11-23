/**
 * Asset registry. Swapping a placeholder for the real asset is a one-line change here:
 * drop the file in /public and replace `null` with { src, width, height }.
 * While a value is null the page renders a labelled placeholder.
 */
export type Asset = { src: string; width: number; height: number } | null;

export const assets = {
  salaidoLogo: {
    onDark: null as Asset, // e.g. { src: "/brand/salaido-logo-white.svg", width: 160, height: 40 }
    onLight: null as Asset, // e.g. { src: "/brand/salaido-logo.svg", width: 160, height: 40 }
  },
  datalaneLogo: {
    onDark: null as Asset, // e.g. { src: "/brand/datalane-logo-white.svg", width: 160, height: 40 }
    onLight: null as Asset, // e.g. { src: "/brand/datalane-logo.svg", width: 160, height: 40 }
  },
  eyeHero: null as Asset, // e.g. { src: "/brand/eye-hero.jpg", width: 2400, height: 2400 }
  partners: {
    // [deliver + check usage rules on each partner brand portal]
    celonis: null as Asset, // e.g. { src: "/partners/celonis.svg", width: 160, height: 40 }
    microsoft: null as Asset,
    databricks: null as Asset,
  },
  industries: {
    highTech: null as Asset, // e.g. { src: "/industries/high-tech.jpg", width: 1600, height: 1200 }
    cpg: null as Asset,
    banking: null as Asset,
  },
  europeMap: null as Asset, // optional, e.g. { src: "/brand/europe-map.svg", width: 1200, height: 1000 }
};
