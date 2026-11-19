/** Open Graph obrázky (1200×630) — `public/images/og/` */
export const OG = {
  uvod: '/images/og/og-uvod.jpg',
  bydleni: '/images/og/og-bydleni.jpg',
  investice: '/images/og/og-investice.jpg',
  oNas: '/images/og/og-o-nas.jpg',
  pribehy: '/images/og/og-pribehy-z-trhu.jpg',
  sluzby: '/images/og/og-vybrat-sluzbu.jpg',
  coDelame: '/images/og/og-co-delame.jpg',
  faq: '/images/og/og-faq.jpg',
} as const;

export const OG_DEFAULT = OG.uvod;
export const OG_SIZE = { width: 1200, height: 630 } as const;
