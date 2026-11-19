import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const SITEMAP_EXCLUDE = [
  /\/portal-demo(\/|$)/,
  /\/investice-2\/?$/,
  /\/agentura-pro-kupujici(\/|$)/,
  /\/agentura-pro-kupujici-onepager\/?$/,
  /\/pozemekhusinec(\/|$)/,
  /\/404\/?$/,
];

export default defineConfig({
  site: 'https://reamar.agency',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.some((re) => re.test(page)),
    }),
  ],
  redirects: {
    '/varianta-koncept': '/',
    '/varianta-koncept-2': '/',
    '/horizont': '/',
    '/bydleni-2': '/bydleni',
    '/investice-3': '/investice',
    '/klientsky-portal-2': '/klientsky-portal',
    '/prazsky-rezidencni-trh': 'https://www.reamar.cz/prazsky-rezidencni-trh',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
