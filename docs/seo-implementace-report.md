# SEO implementační report — REAMAR Agency

**Stav:** Částečně hotovo / připraveno k publikaci (ne deployováno)  
**Datum:** 19. 11. 2026  
**Zdroj:** `REAMAR_Agency_SEO_zadani_pro_Cursor.md` + existující OG assety

---

## Hotovo

### Metadata (9 hlavních URL)
Přesné title + meta description ze zadání + oddělené sociální `og:title` / `og:description` + `og:image:alt`.

| URL | SEO title nasazen |
|-----|-------------------|
| `/` | Agentura pro kupující \| Novostavby v Praze \| REAMAR |
| `/bydleni` | Vlastní bydlení… |
| `/investice` | Investice do novostaveb… |
| `/o-nas` | Novostavby známe z druhé strany stolu… |
| `/sluzby` | Priority a Standard… (bez „zdarma“ / ceny) |
| `/klientsky-portal` | Klientský portál… |
| `/agent-pro-kupujici` | Agent pro kupující: Jan Vitvera… |
| `/pribehy-z-trhu/` | Příběhy z trhu \| Agentura pro kupující… |
| `/kontakt` | Kontakt \| Agentura pro kupující… (opraven framing developery) |

Centrální zdroj: `src/data/seo-pages.ts`

### Open Graph
- Existující karty v `public/images/og/`
- `og:site_name=REAMAR Agency`, locale, width/height, alt
- Sociální texty ze sekce 4 zadání (ne SEO title)

### Technické
- `public/robots.txt` (Allow hlavní boty + OAI-SearchBot, Disallow demo/duplicity, Sitemap)
- `@astrojs/sitemap` → `sitemap-index.xml`
- Demo / onepagery už měly `noindex` (ponecháno)
- JSON-LD: Organization + WebSite; Service na bydlení/investice/služby; Person na agentovi

### Viditelný obsah (lehce)
- Homepage lead: „Jako nákupní agentura…“
- Služby: subline Priority/Standard × Agentura pro kupující
- O nás: explicitní „Agentura pro kupující“
- Agent: role napojená na Agenturu
- Příběhy: hub lead o Agentuře
- Portál: popis jako nástroj Agentury
- Patička: brand řádek Agentura pro kupující
- Kontakt: text pro kupující; adresa sjednocena na Za potokem (jako patička)

### Kontroly
- `npm run build` — OK
- Ověřeno ve výsledném HTML (title, description, og, JSON-LD, robots, sitemap)

---

## Neaplikováno / otevřené

| Bod | Důvod |
|-----|--------|
| Dedicated OG pro `/kontakt` a `/agent` | Není samostatný asset; fallback `og-uvod` / `og-co-delame` |
| `og-faq` jako meta `/sluzby#faq` | Hash nemění OG; `/sluzby` má `og-vybrat-sluzbu` |
| BreadcrumbList | Neměnit navigaci bez QA |
| `sameAs` sociální profily v JSON-LD | URL neověřené v tomto kroku |
| `llms.txt` / GPTBot policy | Explicitně volitelné |
| IndexNow / GSC / Bing submit | Vyžaduje lidské přihlášení |
| Rich Results / Sharing Debugger na produkci | Až po deployi |
| Ceny Priority / „Standard zdarma“ | Do metadat nevloženo (dle zadání) |
| Trailing slash: sitemap má `/bydleni/`, canonical často bez `/` | Astro default; sjednotit po QA |
| Indexace `/prodej`, `/alterna` | Ponecháno (obchodní rozhodnutí) |
| Detail dílů — šablona VideoObject rozšíření | Částečně už existuje; nerušit bez obsahu |

---

## Lidské ověření před publikací

1. Tvrzení „více než 200 developerských projektů“ v meta O nás  
2. Adresa na `/kontakt` (sjednoceno na Za potokem; dříve Rybná — potvrdit)  
3. Canonical vs trailing slash  
4. Po deployi: GSC sitemap, Facebook/LinkedIn debugger  
5. Politika GPTBot  
6. Zda `/prodej` a `/alterna` mají zůstat v indexu  

---

## Změněné / nové soubory (hlavní)

- `src/data/seo-pages.ts` *(nový)*
- `src/lib/og.ts`, `src/lib/jsonld.ts` *(nové/rozšířené)*
- `src/components/SEO.astro`, `JsonLd.astro`, `Layout.astro`
- `src/pages/{index,bydleni,investice,o-nas,sluzby,klientsky-portal,agent-pro-kupujici,kontakt,pribehy-z-trhu/index}.astro`
- `src/components/{HeroStrip,SectionVyberSluzeb,SectionFooter,SectionAgentHero,OnasStory,KlientskyPortalHeroMobile}.*`
- `public/robots.txt`, `public/images/og/*`
- `astro.config.mjs`, `package.json` (`@astrojs/sitemap`)
