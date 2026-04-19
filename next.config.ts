import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@import "src/styles/variables.scss"; @import "src/styles/animations.scss";  @import "src/styles/mixins.scss";`,
  },
  swcMinify: true,
  compress: true,                 // gzip responses for SSR (default true)
  productionBrowserSourceMaps: false,
};

export default nextConfig;
