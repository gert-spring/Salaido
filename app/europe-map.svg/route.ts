import { buildEuropeMapSvg } from "@/lib/europe-map";

// Generated once at build time and served as a static, cacheable file.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildEuropeMapSvg(), {
    headers: {
      "Content-Type": "image/svg+xml",
      // The page requests it with ?v=<content hash>, so it can be cached hard.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
