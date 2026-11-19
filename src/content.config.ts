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
    delka: z.string().optional(),
    delkaIso: z.string().optional(),
    youtubeId: z.string().optional(),
    poster: z.string(),
    nahled: z.string().optional(),
    perex: z.string(),
    /** novy = aktuální; pristi-tyden / pripravujeme = ještě nejde přehrát */
    stav: z.enum(['novy', 'pristi-tyden', 'pripravujeme']).optional(),
    kapitoly: z.array(z.object({ cas: z.string(), nazev: z.string() })).default([]),
    shorts: z.array(z.string()).default([]),
    cta: z.object({
      nadpis: z.string(),
      tlacitko: z.string(),
      href: z.string(),
    }),
  }),
});

export const collections = { dily };
