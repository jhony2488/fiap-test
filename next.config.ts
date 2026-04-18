import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
 sassOptions: {
    additionalData: `@import "src/styles/variables.scss"; @import "src/styles/animations.scss";  @import "src/styles/mixins.scss";`,
  },
};

export default nextConfig;
