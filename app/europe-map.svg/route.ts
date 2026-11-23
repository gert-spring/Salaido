import { buildEuropeMapSvg } from "@/lib/europe-map";

// Generated once at build time and served as a static, cacheable file.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildEuropeMapSvg(), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
