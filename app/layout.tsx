import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { en } from "@/content/en";
import { site } from "@/content/site";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: en.meta.title,
  description: en.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: en.meta.title,
    description: en.meta.description,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101e35",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* IvyPresto + Neue Haas Grotesk via Salaido's Adobe Fonts kit. Falls back to Georgia / Helvetica Neue. */}
        {site.adobeFontsKitId && (
          <>
            <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
            <link rel="stylesheet" href={`https://use.typekit.net/${site.adobeFontsKitId}.css`} />
          </>
        )}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-yellow focus:px-4 focus:py-2 focus:text-navy"
        >
          {en.nav.skipToContent}
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
