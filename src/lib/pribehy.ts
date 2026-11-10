import { getCollection, type CollectionEntry } from 'astro:content';
import shortsData from '../data/shorts.json';

export type Dil = CollectionEntry<'dily'>;
export type Short = {
  id: string;
  titulek: string;
  delka: string;
  nahled: string;
  youtubeId: string;
  preview?: string;
};

export const shorts = shortsData as Short[];
export const janFoto = '/images/agency/Jan%20Vitvera.webp';
export const janJmeno = 'Jan Vitvera';

export function padDil(n: number) {
  return String(n).padStart(2, '0');
}

export function dilySklon(n: number) {
  if (n === 1) return '1 díl';
  if (n >= 2 && n <= 4) return `${n} díly`;
  return `${n} dílů`;
}

export function timeToSeconds(t: string) {
  const parts = t.split(':').map((x) => Number(x) || 0);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return (parts[0] || 0) * 60 + (parts[1] || 0);
}

export function dilHref(slug: string, hash = '') {
  return `/pribehy-z-trhu/${slug}/${hash}`;
}

export function titulekRadky(t: string) {
  const rozpoctem = t.match(/^(.*?)\s+(s rozpočtem\b.*)$/);
  if (rozpoctem) return [rozpoctem[1], rozpoctem[2]];
  const i = t.indexOf('. ');
  if (i === -1) return [t];
  return [t.slice(0, i + 1), t.slice(i + 2)];
}

export function shortsByIds(ids: string[]) {
  return ids.map((id) => shorts.find((s) => s.id === id)).filter((s): s is Short => Boolean(s));
}

export async function getDily() {
  const all = await getCollection('dily');
  return all.sort((a, b) => b.data.cislo - a.data.cislo);
}
