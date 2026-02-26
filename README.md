# Reamar.cz – Astro + Tailwind

Luxusní prezentační web v Astro s Tailwind CSS, fontem Yellix a optimalizovaným načítáním videí.

## Požadavky

- Node.js 18+
- npm / pnpm / yarn

## Instalace a spuštění

```bash
npm install
npm run dev
```

Otevřete [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Struktura

- **`src/layouts/Layout.astro`** – společný layout s View Transitions a fontem Yellix
- **`src/components/Navigation.astro`** – fixní navigace, po scrollu jemné pozadí
- **`src/components/HeroSplit.astro`** – split hero s videi (lazy load při zobrazení)
- **`src/components/ServiceAccordion.astro`** – sekce služeb s elegantním akordeonem
- **`src/components/LazyVideo.astro`** – video načtené až při vstupu do viewportu
- **`src/pages/index.astro`** – hlavní stránka se všemi sekcemi
- **`public/fonts`**, **`public/images`**, **`public/videos`** – symlinky na stávající složky s assety

## Videa

Hero videa (Pro developery, Pro klienty) se načítají při zobrazení sekce. Ostatní videa (X REAMAR, re-sqre, 0116) používají `LazyVideo` a načtou se až při scrollu do viewportu. Všechna mají `muted`, `loop`, `playsinline`, `autoplay` pro plynulý běh bez nutnosti interakce.

## Font

Yellix je načten z `public/fonts/` (WOFF2/WOFF) a nastaven jako hlavní font v `tailwind.config.mjs` a `src/styles/global.css`.
