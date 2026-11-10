import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://reamar.agency',
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind()],
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
