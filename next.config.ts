import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A package-lock.json higher up the user folder confuses root detection; pin it to this repo.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
