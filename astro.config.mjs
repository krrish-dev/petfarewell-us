import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import checkInternalLinks from './src/plugins/check-internal-links';
import checkCanonicalUrls from './src/plugins/check-canonical-urls';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://petfarewell.us',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
    mdx(),
    checkInternalLinks(),
    checkCanonicalUrls(),
  ],
  build: {
    // HTML minification is handled by Astro's default production build
    inlineStylesheets: 'auto',
  },
  image: {
    // Default image service — sharp is used for optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
