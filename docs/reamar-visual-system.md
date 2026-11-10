# REAMAR — vizuální systém

Tento soubor je **jediný zdroj pravdy** o designovém stylu, který REAMAR používá napříč weby.  
Účel: předat ho do Clauda (nebo jiného nástroje) a nechat navrhnout **lehce modifikované grafické prvky** pro YouTube kanál **Agent pro kupující** (`youtube.com/@agentprokupujici`).

Nejde o volnou brand inspiraci. Claude má držet tenhle systém a měnit jen to, co je v kapitole 12 výslovně povolené.

---

## 0. Jak s tímhle souborem pracovat

1. Nejdřív přečti kapitoly 1–4 (co je REAMAR, co není, charakter).
2. Pro jakýkoli vizuál používej **pouze tokeny z kapitoly 5 a 6**.
3. Grafické prvky skládej z **motivů v kapitole 8**, ne ze stock šablon YouTube.
4. Kapitola 11 je seznam zákazů. Když si nejsi jistý, zvolte méně.
5. Kapitola 12 říká, co se smí na YouTube lehce uvolnit kvůli čitelnosti v malém měřítku.

Výstup má vypadat, jako by ho kreslil stejný ateliér, který dělá `reamar.cz` a `reamar.agency` — ne jako samostatná YouTube estetika.

---

## 1. Co jsme auditovali

Styl není odvozený z jedné stránky. Je to řemeslo, které se opakuje napříč projekty pod hlavičkou REAMAR.

### Vrstva A — značka REAMAR (primární zdroj pro YouTube)

| Projekt | URL / repo | Role |
|---|---|---|
| REAMAR korporát | `reamar.cz` | Hlavní identita. Slogan **Reality. Marketing.** Černobílé, Yellix, full-bleed foto/video. |
| REAMAR Agency | `reamar.agency` / agentura pro kupující | Nejaktuálnější vizuál. Hero s fotkou, sklo, ostré CTA, tvář Jana Vitvery. |
| Stránka agenta | `/agent-pro-kupujici` | Banner `JVAGENT.jpeg`, overlay, velké verzálky, YouTube jako kanál. |
| ES / VN mutace | `reamar.es`, `reamar.vn` | Stejný systém, jen jazyk. |
| Nabídka pozemku | `reamar.cz/pozemekhusinec`, `nabidka.reamar.cz` | Stejná černobílá gramatika na produktové landing page. |

### Vrstva B — značky klientů / projektů (řemeslo ano, paleta ne)

Tyhle weby REAMAR tvořil, ale **mají vlastní identitu**. Do YouTube kanálu Agenta pro kupující se **nepřebírají** jejich písma ani barvy, jen společné řemeslo (ostré hrany, vzduch, fotografie, klid).

| Projekt | Identita | Poznámka |
|---|---|---|
| SQUARE | Red Hat Display, `#002A1D`, krém `#EDEBE3`, červená jen tečka | Brand bible existuje. Porsche-like kompozice. |
| YARD Hrdlořezy | Nohemi + Inter, clay `#a08058`, cream `#f5efe6` | Warm taupe, lifestyle vizualizace. |
| CLOUD Modřany | stejný YARD kit + forest `#022d20` | Most mezi SQUARE a YARD. |
| d33lnicka | Noah, forest `#022d20`, signal `#e20e17` | Developerská landing. |
| Celestia Estepona | Jost + Cormorant, charcoal `#1A1D23`, gold `#A68B67` | Středomořský luxury, ostré 2px radius. |
| Azure Living | Cormorant + Raleway, navy `#003366` | Jiná paleta, stejná kompoziční kázeň. |

**Pravidlo:** YouTube kanál patří vrstvě A. Forest green `#022d20` smí vstoupit, protože už žije i na REAMAR Agency (investice). Clay, krém SQUARE, navy Azure a gold Celestia **ne**.

---

## 2. Charakter značky

REAMAR není realitní kancelář v růžové, ani tech startup, ani „luxus s folií“.

**Je to:**
- tichý, sebevědomý editorial
- černobílý základ, téměř žádná barva
- ostré hrany, hodně vzduchu
- konkrétní, klidný, dospělý
- fotografie a video nesou atmosféru, typografie nese význam
- malé, přesné CTA, nikoli velké barevné desky

**Není to:**
- SaaS dashboard, neon, gradientní nadpisy
- zlatá serifová „luxury“ estetika
- zaoblené karty se stíny
- stock ikony, emoji, vykřičníky
- realitní vizuál typu „vysněné bydlení“

Jednovětý test: *Kdyby to viselo vedle porsche.com a vedle Solidpixels-editorialu, musí obstát. Kdyby to viselo vedle Tipu na byt nebo Canva YouTube packu, musí být cizí.*

Tón textu: věcný, krátký, bez přívlastků. Sebevědomí je v přesnosti, ne v hlasitosti.

---

## 3. Dvě tváře, jeden systém

### 3.1 Korporát (`reamar.cz`)
- Slogan: **Reality. Marketing.**
- Hero: full-bleed foto/video, černý overlay ~33 %, bílé logo, rotující slovo.
- Tmavé sekce: černý podklad, text `#E4E2E2`.
- Publikum: developeři + klienti.
- Logo: wordmark REAMAR, černé na bílé / bílé na fotce.

### 3.2 Agency / Agent pro kupující
- Claim: **Zastupujeme kupující na developerském trhu.**
- Hero: bílá plocha + velká fotka vpravo s bílým fade, malá ostrá tlačítka.
- Tvář: **Jan Vitvera**, šedý oblek, chladný interiér, klidný pohled.
- YouTube je už vestavěný prvek webu (ikona, karta „Příběhy z trhu“, banner CTA).

YouTube kanál vizuálně následuje **3.2**, s podpisem REAMAR z **3.1**.

---

## 4. Princip „téměř žádný radius“

Tohle je jeden z nejsilnějších rozpoznávacích znaků.

- Tlačítka: **0 px** radius.
- Karty, fotky, panely, inputy: **0 px**.
- Výjimka video na stránce agenta: **8 px**.
- Výjimka market pill na `reamar.cz`: **100 px** (jediný „pilulkový“ prvek v celém systému — na YouTube ho nekopíruj jako výchozí).
- Celestia/Azure: max **2 px**.

Když Claude kreslí cokoliv pro YouTube, výchozí je **obdélník s ostrými rohy**.

---

## 5. Paleta

### 5.1 Primární (REAMAR)

| Token | Hex | Role |
|---|---|---|
| Ink | `#000000` | text, CTA výplň, footer, logo na světle |
| Paper | `#FFFFFF` | podklad, text na fotce, inverted CTA |
| Muted | `#F1F1F1` | dlaždice, mezery mezi fotkami, jemný podklad |
| Section | `#EDEDED` | šedá sekce (`hsl(0,0%,92.94%)`) |
| Warm gray text | `#E4E2E2` | text na černé korporátní sekci |
| Label | `#BFBFBF` | popisky ve footeru, sekundární info na černé |
| Black 80 | `rgba(0,0,0,0.80)` | běžný body text na bílé |
| Black 50 | `rgba(0,0,0,0.50)` | muted, kicker, metadata |
| Black 42 | `rgba(0,0,0,0.42)` | uppercase kicker na kartách |
| Overlay | `rgba(0,0,0,0.33)` | rovný overlay na fotografii (Solidpixels) |

### 5.2 Akcenty — používat střídmě

| Token | Hex | Kdy |
|---|---|---|
| Forest | `#022d20` | investice, „živá“ nabídka, silnější CTA. Hover `#033d2c`. |
| Live green | `#16A34A` | jen **tečka 5–7 px**, pulse. Nikdy plocha. |
| Action green | `#4ADE80` | jen tečka na forest kartě. |
| YouTube red | `#FF0000` | jen oficiální play ikona. Nikdy pozadí, nikdy nadpis. |
| SQUARE red | `#ED1C24` | **nepoužívat** na kanálu Agenta. Patří SQUARE. |

### 5.3 Pravidlo tří barev

Jeden vizuál = paper + ink + maximálně jeden akcent (forest **nebo** YouTube red jako ikona, ne obojí jako plocha).

Žádné gradienty jako barva značky. Gradient je povolený jen jako **fade fotky do bílého papíru** nebo **tmavý overlay na fotografii**.

---

## 6. Typografie

### 6.1 Písmo

**Yellix** — jediné písmo REAMAR.  
Řezy v produkci: Light 300, Regular 400, Medium 500, SemiBold 600, Bold 700.  
Na webu je výchozí `font-medium` (500). Black / ExtraBold existují v souborech, ale v UI se téměř nepoužívají.

Fallback: `system-ui, sans-serif`.  
Nikdy Inter, Helvetica jako display, nikdy serif, nikdy Google Font náhrada, pokud Yellix jde nasadit.  
Pro YouTube mockupy, kde Yellix nelze embedovat: geometrický sans blízko Yellix (čistý, mírně široký, ne grotesk typu Inter). V popisu výstupu ale vždy uveď „Yellix“.

### 6.2 Stupnice

| Role | Velikost | Řez | Tracking | Line-height |
|---|---|---|---|---|
| Hero H1 | 36 → 52 px (web). Na banneru agenta až 92 px | 500 | −0.025 až −0.03 em | 1.08 (banner 0.82) |
| Sekční H2 | 28 → 40 px | 500 | −0.02 em | 1.12 |
| Citace / punch | 24 → 34 px | 500 | −0.02 em | 1.22 |
| Body | 14–15 px | 500 | 0 | 1.50–1.55 |
| CTA | 13 px | 500 | 0 | 1.0 |
| Kicker / eyebrow | 9–14 px | 500 | 0.08 až 0.14 em | 1.0 |
| Meta na kartě | 13 px | 500 | 0 | 1.15 |
| Footer label | 14–15 px | 400 | 0 | — |

### 6.3 Typografické manýry (povinné)

1. **Podtržené klíčové slovo** v nadpisu: `text-decoration-thickness: 2.5px`, `underline-offset: 0.11em`, `skip-ink: none`. Příklad: *Zastupujeme **kupující** na developerském trhu.* Na banneru agenta je podtržení bílé, `0.065em`.
2. **Uppercase kicker** s velkým trackingem. Barva 42–50 % černé. Nikdy verzálky v dlouhém odstavci.
3. **Arrow před H2** — diagonální šipka `arrow-1.svg` (bílá čára, na světle invertovaná do černé). Velikost 12–24 px.
4. Jeden řez v jednom bloku. Ne míchat Bold + Light v jedné větě.
5. Žádná kurzíva pro důraz. Důraz = podtržení, nebo forest barva (jen u investic).

### 6.4 Šipka (signature mark)

`arrow-1.svg` je **pravý úhel z čar**, natočený ~45° — vypadá jako roh rámu / „enter“. Není to běžná šipka doprava `→`.

Použití:
- uvnitř černého CTA, bílá, 12 px
- před nadpisem sekce, černá
- v inverted CTA na fotce, černá na bílém knoflíku

Na YouTube může tahle šipka nahradit generické play/subscribe šipky všude kromě oficiálního YouTube play buttonu.

---

## 7. Kompozice a layout

### 7.1 Rastr
- Max šířka webu: **1440 px**
- Korporátní content: **1280 px** při 90 % šířky, nebo 1136 px historicky ze Solidpixels
- Padding: 20 / 40 / 56 px (mobil / tablet / desktop)
- Nav výška: 80 px mobil, 108 px desktop

### 7.2 Hero vzorce (použij jako kompozice thumbnailů)

**A. Split editorial (agency homepage)**  
Levá třetina: bílý papír, H1, malá CTA.  
Pravá část: fotografie ~72 % šířky, `object-position` mírně vpravo.  
Přechod: `linear-gradient(to right, #fff 0%, rgba(255,255,255,0.85) 28%, transparent 100%)`.  
V pravém dolním rohu fotky: malé overlay karty.

**B. Full-bleed portrait (stránka agenta)**  
Fotka Jana přes celou šířku. Výřez: `top: -170px`, `object-position: left 22%`.  
Dvojitý overlay: shora černá 50 % → 0, zleva doprava černá 0 → 58 %.  
Text vpravo, bílá, H1 uppercase, velmi těsné řádkování 0.82.

**C. Full-bleed architecture (korporát / náš příběh)**  
Foto na celou plochu, overlay 30–33 % černá, bílý text vlevo, malé bílé CTA.

**D. Černý punch (zastoupení)**  
Čistě černá plocha, bílá typografie, logo vsazené do věty jako slovo.

### 7.3 Rytmus
- Hodně prázdna. Prázdno je záměr.
- Asymetrie. Text neuprostřed, pokud to není citace.
- Fotky bez rámečku a bez zaoblení.
- Tenké linky `1px rgba(0,0,0,0.08–0.10)` jako oddělovače, ne tlusté pruhy.

---

## 8. Signature prvky — tohle kresli na YouTube

Každý prvek níže už na webu existuje. Claude z nich má skládat thumbnaily, banner, end screen, lower third, subscribe bump.

### 8.1 Ostré CTA
- Primary: `#000`, text `#fff`, 13 px Yellix Medium, padding `12×6 px` (`px-3 py-1.5`), šipka vlevo.
- Secondary: bílá výplň, `1px solid #000`, stejný padding, bez šipky.
- Inverted na fotce: bílá výplň, černý text, černá šipka.
- Forest varianta jen pro investiční témata: `#022d20`, bílý text.
- Hover: opacity 0.85, žádný fill-change kromě forest → `#033d2c`.
- Nikdy velká tlačítka přes celou šířku.

### 8.2 Glass karta
Malý ostrý obdélník na fotce.
- `background: rgba(255,255,255,0.80–0.86)`
- `backdrop-filter: blur(12px)`
- `border: 1px solid rgba(0,0,0,0.08)`
- `box-shadow: 0 10px 30px rgba(0,0,0,0.08)`
- Uvnitř: 9 px uppercase kicker + 13 px title
- Varianta s YouTube ikonou 28×28 v bílém čtverci

Tohle je native prvek kanálu — „Příběhy z trhu“, „Sledovat na YouTube“.

### 8.3 Action karta
Černý (nebo forest) ostrý blok, vlevo čtvercová fotka 76×76, vpravo tři řádky: kicker / meta / CTA se šipkou.  
Stín `0 10px 28px rgba(0,0,0,0.18)`.  
Forest varianta má pulzující zelenou tečku 7 px.

Vhodné jako: „nové video“, „předprodej“, „live trh“.

### 8.4 Live tečka
5–7 px, `#16A34A` nebo `#4ADE80` na forest.  
Pulse 2.2 s. Nikdy jako dekorace pozadí.

### 8.5 Play control
Na fotce: ostrý nebo mírně round pill `bg-white/80 blur(12px)`, 13 px, černý text, malý filled trojúhelník.  
Na videu: standardní YouTube play (červený) — jediné místo, kde je červená plocha.

### 8.6 Tile stream
Dvě kolony fotek, mezera 18 px, podklad tile `#F1F1F1`, hover zoom 1.055, fade nahoře/dole do bílého papíru.  
Vhodné jako kanálový banner nebo intro loop.

### 8.7 Citace
Velký Yellix Medium, uvozovky v textu, pod tím vodorovná černá linka, pod linkou 14–15 px vysvětlení.  
Příklad tónu: *„Developer vám nabídne svůj projekt, realitní kancelář svoje nemovitosti.“*

### 8.8 Logo jako slovo ve větě
Bílé logo REAMAR vsazené do věty na černém poli.  
Příklad: **[REAMAR] přináší odborné zastoupení i na stranu kupujícího.**

### 8.9 Avatar stack
Tři kruhy 28 px, barvy `#d7d2c8 / #c3beb4 / #a8a29a`, overlapping, ring 2 px white.  
Jediný běžný kruhový prvek. Použít jen jako „150+ klientů“, ne jako frame fotky.

### 8.10 Formulářová estetika
Inputy bez boxu, jen spodní linka `border-b gray-200`, focus `#000`. Modal bílý, nadpis 27 px, zavřít „Zavřít ×“ vpravo nahoře.  
Hodí se pro end screen „napište nám“, ne pro thumbnail.

---

## 9. Fotografie a obraz

### 9.1 Tvář kanálu
Jan Vitvera. Referenční záběr: `JVAGENT.jpeg`.
- Šedomodrý oblek, bílá košile, bez kravaty
- Chladný šedý interiér, vysoká okna, závěsy, konferenční stůl
- Klidný výraz, mírný úsměv, pohled do kamery
- Desaturované, ne teplé realtor světlo
- Výřez: obličej vlevo, vzduch vpravo pro typografii
- Webový crop banneru: `top: -170px`, `object-position: left 22%` — nesahat na výšku sekce, jen na výřez obličeje

### 9.2 Architektura a trh
- Pražské novostavby, interiéry, vyjednávání, data/software obrazovky
- Cinematic, plošný, bez HDR „wow“
- Lidé v prostoru spíš dokumentárně než pózovaně; výjimka je portrét agenta
- Full-bleed, `object-fit: cover`, žádné rámečky

### 9.3 Overlay a pohyb fotky
- Overlay na korporátu: rovný černý 33 %
- Overlay na agent banneru: kombinace vertikálního a horizontálního gradientu, nikoli viněta
- Pomalý Ken Burns: scale 1.00 → 1.06 za ~22 s
- Hover zoom fotky: 1.04–1.055, 0.55–0.7 s, `cubic-bezier(0.22, 1, 0.36, 1)`

### 9.4 Co se na fotce nesmí
- Teplý orange filter, bokeh luxus, champagne, zlaté hodinky close-up
- Stock úsměv „klíče od bytu“
- Míchat hyperreálnou vizualizaci developerského projektu s reálným portrétem v jednom rámu
- Barevné grade mimo šedou / chladnou / přirozenou

---

## 10. Motion (když se kreslí intro / bumper)

| Parametr | Hodnota |
|---|---|
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` nebo `ease` |
| AOS default | 800 ms, offset 60 |
| Vstup textu | fade + translateY 12–14 px, stagger 110–240 ms |
| Banner title | „Agent“ zleva, „pro kupující“ zprava, 900 ms |
| Hover | opacity, 1 px translateY, žádný bounce |
| Pulse | 2.2–2.4 s, jen tečka nebo YT ikona v kartě |
| Reduced motion | vypnout zoom i pulse |

Pohyb má odhalovat, ne zdobit. Žádný elastic bounce, žádný spin loga.

---

## 11. Zakázáno

- zaoblené karty, blob, neomorfismus, glass přes celou plochu
- gradientní výplně (mimo fade fotky)
- stíny větší než `0 18px 50px rgba(0,0,0,0.12)`
- více než jeden akcent v jednom rámu
- Inter / Montserrat / Poppins / Playfair jako náhrada Yellix v finálním návrhu
- SQUARE krém, YARD clay, Azure navy, Celestia gold na kanálu Agenta
- červená jako pozadí, pruh, nebo wordmark
- emoji, stock ikonové sady, 3D chrome
- verzálky v odstavci
- vykřičníky, „nesmeškej“, „game changer“
- velké CTA přes celý thumbnail
- logo REAMAR deformovat, otáčet, dávat mu stín nebo outline
- 3D mockup telefonu jako hlavní motiv (příliš SaaS)

---

## 12. Lehká modifikace pro YouTube

Tohle je **jediné místo**, kde se smí systém uvolnit. Cíl: čitelnost v 160 px náhledu, ne nová identita.

Povoleno:
1. H1 na thumbnailu větší a kontrastnější než na webu. Pořád Yellix Medium, pořád těsné tracking. Max 4–7 slov.
2. Obličej Jana větší než na webu, často 40–60 % rámu.
3. Podtržené jedno slovo může být silnější (3 px), aby přežilo kompresi.
4. Forest `#022d20` jako úzký pruh, ostrý label nebo kicker bar — ne jako celý background, pokud na něm není bílý text s vysokým kontrastem.
5. YouTube red **pouze** v play ikoně nebo malém „WATCH“ chipu.
6. Mírně silnější stín pod glass kartou, aby se nezlila s fotkou.
7. Kanálové foto (1:1): detail obličeje z `JVAGENT.jpeg`, žádný kruhový rámeček kreslený navíc — YouTube ho zaoblí samo.
8. Banner 2560×1440: kompozice typu Hero A nebo B, bezpečná zóna textu uprostřed (YouTube ořezává kraje).

Stále zakázáno i na YouTube:
- jiná paleta
- zaoblené thumbnaily
- clickbait obličeje, červené šipky stock, žluté bubliny
- víc než jeden řádek Tiny textu pod 18 px v 1920 šířce

---

## 13. Co má Claude navrhnout

Po přečtení tohoto souboru navrhnout v lehké modifikaci, ve stejném systému, tyto prvky. U každého: popis kompozice, přesné barvy, velikosti typu, a 1–2 varianty.

1. **Kanalový avatar** 800×800  
2. **Kanalový banner** 2560×1440 (safe zone)  
3. **Thumbnail systém** 1280×720 — 3 archetypy:  
   - tvrzení / citace (typografie + podtržení)  
   - tvář + téma (Jan + 3–5 slov)  
   - trh / data (černobílé číslo + kicker)  
4. **Intro bumper** 3 s a 5 s (16:9)  
5. **Outro / end screen** — ostré CTA + glass karta dalšího videa  
6. **Lower third** — jméno Jan Vitvera / zástupce kupujících  
7. **Subscribe + like overlay** — ne YouTube červená plocha, ale černé ostré CTA + malá YT ikona  
8. **Chapter card / community post** — bílý papír, šipka, kicker  
9. **Watermark** — malé REAMAR wordmark nebo šipka, 16 px logika  
10. **Playliste covers** — Bydlení / Investice / Příběhy z trhu / Trh

U každého prvku napiš:
- co je 1:1 z webu
- co je povolená YouTube modifikace
- co jsi vědomě nepoužil

---

## 14. Referenční copy (tón)

Používej krátké, věcné věty. Příklady, které už žijí na webu:

- Zastupujeme kupující na developerském trhu.
- Opravdu nezávislá nabídka na trhu skoro neexistuje.
- Developer vám nabídne svůj projekt, realitní kancelář svoje nemovitosti.
- Proto dnes stojím na straně kupujících.
- Reality. Marketing.
- Příběhy z trhu.
- Agent pro kupující.

Nepoužívej: vysněné bydlení, nenechte si ujít, tajemství developerů, MUSÍTE vidět.

---

## 15. Tokeny ve zkratce (pro stroj)

```yaml
brand: REAMAR
channel: Agent pro kupující
font: Yellix
font_weight_default: 500
radius: 0
max_width_web: 1440
colors:
  ink: "#000000"
  paper: "#FFFFFF"
  muted: "#F1F1F1"
  section: "#EDEDED"
  on_black: "#E4E2E2"
  label: "#BFBFBF"
  overlay: "rgba(0,0,0,0.33)"
  forest: "#022d20"
  forest_hover: "#033d2c"
  live: "#16A34A"
  youtube: "#FF0000"  # icon only
type:
  h1_tracking: -0.03em
  h2_tracking: -0.02em
  kicker_tracking: 0.14em
  underline_thickness: 2.5px
  underline_offset: 0.11em
  cta_size: 13px
motion:
  ease: cubic-bezier(0.22, 1, 0.36, 1)
  duration: 800ms
  ken_burns: 1.0 -> 1.06 in 22s
signature:
  - sharp rectangles
  - Yellix medium
  - underline emphasis
  - diagonal corner-arrow
  - glass white chips on photo
  - black or forest fill CTAs
  - live green dot
  - desaturated portrait of Jan Vitvera
forbidden:
  - rounded cards
  - brand gradients
  - Inter/Poppins/Playfair
  - SQUARE/YARD/Azure palettes
  - red as a surface
  - stock realtor imagery
```

---

## 16. Zdrojové soubory (když bude potřeba pixel-true)

- Písmo: `public/fonts/Yellix-*.woff2`
- Logo černé: `public/images/logo-rig-b.svg`
- Logo bílé: `public/images/logo-rig-w.svg`
- Šipka: `public/images/arrow-1.svg`
- Portrét banner: `public/images/agency/JVAGENT.jpeg`
- Starší portrét k porovnání: `public/images/agency/AgentYT.jpeg`
- Agency holder fotky: `jv-holder1.png`, `jv-holder2.jpg`, `jv-holder3.jpg`
- Tokeny webu: `tailwind.config.mjs`, `src/styles/global.css`
- Hero agency: `src/components/Hero.astro`
- Banner agenta: `src/components/SectionAgentHero.astro`
- Korporátní hero: `src/components/HeroSplit.astro` v `reamar.cz`
- SQUARE bible (jen pro hranici „tohle už není REAMAR“): `SQRE Brand/SQUARE-bible-znacky.md`
