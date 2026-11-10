import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dily = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/dily' }),
  schema: z.object({
    cislo: z.number(),
    titulek: z.string(),
    slug: z.string(),
    tema: z.string(),
    datum: z.coerce.date(),
    delka: z.string(),
    delkaIso: z.string(),
    youtubeId: z.string(),
    poster: z.string(),
    nahled: z.string().optional(),
    perex: z.string(),
    kapitoly: z.array(z.object({ cas: z.string(), nazev: z.string() })),
    shorts: z.array(z.string()).default([]),
    cta: z.object({
      nadpis: z.string(),
      tlacitko: z.string(),
      href: z.string(),
    }),
  }),
});

export const collections = { dily };
