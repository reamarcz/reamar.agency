import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const SITEMAP_EXCLUDE = [
  /\/portal-demo(\/|$)/,
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
    '/investice-2': '/investice',
    '/investice-3': '/investice',
    '/klientsky-portal-2': '/klientsky-portal',
    '/home-layout': '/',
    '/agentura-pro-kupujici': '/',
    '/agentura-pro-kupujici-onepager': '/',
    '/sluzby': '/konzultace',
    '/prazsky-rezidencni-trh': 'https://www.reamar.cz/prazsky-rezidencni-trh',
    '/prodej': 'https://www.reamar.cz/prodej',
    '/alterna': 'https://www.reamar.cz/alterna',
    '/pozemekhusinec': 'https://www.reamar.cz/pozemekhusinec',
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
