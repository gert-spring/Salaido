import "server-only";
import { geoConicConformal, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import { site } from "@/content/site";

/**
 * Builds the Europe map as a standalone SVG document: focus countries, next countries, the rest.
 * Served as a static file (app/europe-map.svg/route.ts), so the page HTML stays light.
 * Country tiers: content/site.ts (map.focus, map.next).
 */
export const MAP_W = 1000;
export const MAP_H = 800;

const TONE = {
  focus: "#F5F3ED", // cream
  next: "#7F8AA0", // muted slate
  rest: "#1F3355", // a step lighter than the dark blue surface
  border: "#101E35", // section background: borders read as thin gaps
};

type Tone = "focus" | "next" | "rest";

export function buildEuropeMapSvg(): string {
  const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
  const countries = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>;

  // Frame: Ireland to the Black Sea, Sicily to the North Cape.
  const frame = {
    type: "MultiPoint" as const,
    coordinates: [
      [-10.5, 36],
      [31, 36],
      [-10.5, 71.2],
      [31, 71.2],
      [13, 35.6],
    ],
  };
  const projection = geoConicConformal()
    .parallels([40, 65])
    .rotate([-12, 0])
    .fitExtent(
      [
        [10, 10],
        [MAP_W - 10, MAP_H - 10],
      ],
      frame,
    )
    .clipExtent([
      [0, 0],
      [MAP_W, MAP_H],
    ]);
  const path = geoPath(projection).digits(1);

  const focus = new Set<string>(site.map.focus);
  const next = new Set<string>(site.map.next);
  const order: Record<Tone, number> = { rest: 0, next: 1, focus: 2 };

  const shapes = countries.features
    .map((f) => {
      const id = String(f.id ?? "");
      const tone: Tone = focus.has(id) ? "focus" : next.has(id) ? "next" : "rest";
      return { d: path(f) ?? "", tone };
    })
    .filter((s) => s.d.length > 0)
    .sort((a, b) => order[a.tone] - order[b.tone]);

  const paths = shapes.map((s) => `<path d="${s.d}" fill="${TONE[s.tone]}"/>`).join("");

  // The edges feather into the background, so the map has no hard rectangular edge.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_W} ${MAP_H}" width="${MAP_W}" height="${MAP_H}">
<defs>
<filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="30"/></filter>
<mask id="m"><rect x="36" y="36" width="${MAP_W - 72}" height="${MAP_H - 72}" fill="#fff" filter="url(#b)"/></mask>
</defs>
<g mask="url(#m)" stroke="${TONE.border}" stroke-width="1" stroke-linejoin="round">${paths}</g>
</svg>`;
}
