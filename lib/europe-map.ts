import "server-only";
import { createHash } from "node:crypto";
import { geoCentroid, geoConicConformal, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry, MultiPoint } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";
import { site } from "@/content/site";

/**
 * Builds the Europe map as a standalone SVG document: focus countries, next countries, the rest.
 * Served as a static file (app/europe-map.svg/route.ts), so the page HTML stays light.
 * Country tiers: content/site.ts (map.focus, map.next).
 *
 * The frame is cropped tight around the highlighted countries (Ireland to Finland's eastern
 * border, Sicily to the North Cape), so they fill the image; Africa is left out entirely.
 */
const W = 1000;
const PAD = 12;

const FRAME = { west: -10.8, east: 32, south: 35.8, north: 71.3 };

const TONE = {
  focus: "#F5F3ED", // cream: the countries that matter, at full strength
  next: "#8C97AD", // slate, clearly secondary
  rest: "#172946", // barely above the background: context only
  border: "#101E35", // section background: borders read as thin gaps
};

type Tone = "focus" | "next" | "rest";

type Built = { svg: string; width: number; height: number; version: string };
let memo: Built | null = null;

function frameOutline(): MultiPoint {
  const pts: number[][] = [];
  for (let lon = FRAME.west; lon <= FRAME.east; lon += 1) pts.push([lon, FRAME.south], [lon, FRAME.north]);
  for (let lat = FRAME.south; lat <= FRAME.north; lat += 1) pts.push([FRAME.west, lat], [FRAME.east, lat]);
  return { type: "MultiPoint", coordinates: pts };
}

function build(): Built {
  if (memo) return memo;
  const topo = world as unknown as Topology<{ countries: GeometryCollection }>;
  const countries = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>;

  // Fit the frame to the width, then size the height to the frame, so nothing is wasted.
  const outline = frameOutline();
  const projection = geoConicConformal().parallels([40, 65]).rotate([-11, 0]).fitWidth(W - PAD * 2, outline);
  const [[x0, y0], [, y1]] = geoPath(projection).bounds(outline);
  const height = Math.round(y1 - y0 + PAD * 2);
  const [tx, ty] = projection.translate();
  projection.translate([tx - x0 + PAD, ty - y0 + PAD]).clipExtent([
    [0, 0],
    [W, height],
  ]);
  const path = geoPath(projection).digits(1);

  const focus = new Set<string>(site.map.focus);
  const next = new Set<string>(site.map.next);
  const order: Record<Tone, number> = { rest: 0, next: 1, focus: 2 };

  const shapes = countries.features
    // Leave out Africa: everything whose centre lies south of the Mediterranean's north shore.
    .filter((f) => geoCentroid(f)[1] >= 36.5)
    .map((f) => {
      const id = String(f.id ?? "");
      const tone: Tone = focus.has(id) ? "focus" : next.has(id) ? "next" : "rest";
      return { d: path(f) ?? "", tone };
    })
    .filter((s) => s.d.length > 0)
    .sort((a, b) => order[a.tone] - order[b.tone]);

  const paths = shapes.map((s) => `<path d="${s.d}" fill="${TONE[s.tone]}"/>`).join("");

  // Soft feather on the cut edges (east and south), so the crop has no hard line.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${height}" width="${W}" height="${height}">
<defs>
<filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="18"/></filter>
<mask id="m"><rect x="-40" y="-40" width="${W + 18}" height="${height + 18}" fill="#fff" filter="url(#b)"/></mask>
</defs>
<g mask="url(#m)" stroke="${TONE.border}" stroke-width="1.2" stroke-linejoin="round">${paths}</g>
</svg>`;

  memo = { svg, width: W, height, version: createHash("sha1").update(svg).digest("hex").slice(0, 10) };
  return memo;
}

export function buildEuropeMapSvg(): string {
  return build().svg;
}

/** Size plus a content hash, used as a cache-busting query on the image URL. */
export function europeMapMeta(): { width: number; height: number; version: string } {
  const { width, height, version } = build();
  return { width, height, version };
}
