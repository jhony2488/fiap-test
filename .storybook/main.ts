import type { StorybookConfig } from '@storybook/nextjs-vite';
import path, { join } from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  viteFinal: async (config) => {
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${join(process.cwd(), "src/styles/variables.scss").replace(/\\/g, "/")}"; @import "${join(process.cwd(), "src/styles/animations.scss").replace(/\\/g, "/")}"; @import "${join(process.cwd(), "src/styles/mixins.scss").replace(/\\/g, "/")}";`,
          
        },
      },
    };
    return config;
  },
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "..\\public"
  ]
};
export default config;