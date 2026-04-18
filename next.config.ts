import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
 sassOptions: {
    // Isso injeta o arquivo em todos os seus arquivos .scss
    // Certifique-se de que o caminho está correto para o seu arquivo de variáveis
    additionalData: `@import "src/styles/variables.scss"; @import "src/styles/animations.scss";  @import "src/styles/mixins.scss";`,
  },
};

export default nextConfig;
