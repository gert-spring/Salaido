import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { en } from "@/content/en";

export const alt = en.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadSerif(weight: 400 | 600): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@${weight}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" }, // older UA gets a TTF url
      })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const pub = join(process.cwd(), "public", "brand");
  const [eye, logo, regular, bold] = await Promise.all([
    readFile(join(pub, "helix-nebula.jpg")),
    readFile(join(pub, "salaido-logo-white.svg")),
    loadSerif(400),
    loadSerif(600),
  ]);
  const eyeSrc = `data:image/jpeg;base64,${eye.toString("base64")}`;
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  const fonts = [
    ...(regular ? [{ name: "Serif", data: regular, weight: 400 as const }] : []),
    ...(bold ? [{ name: "Serif", data: bold, weight: 600 as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#050507", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={eyeSrc} alt="" width={1120} height={630} style={{ position: "absolute", right: -260, top: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, #050507 0%, #050507 38%, rgba(5,5,7,0.2) 75%, rgba(5,5,7,0) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={210} height={66} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Serif", fontSize: 120, color: "#FCFCFB", lineHeight: 1, letterSpacing: -3 }}>
              <span>Imagine&nbsp;</span>
              <span style={{ fontWeight: 600 }}>better</span>
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 22, letterSpacing: 4, color: "#8ED9EC", textTransform: "uppercase" }}>
              {en.hero.tag}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
