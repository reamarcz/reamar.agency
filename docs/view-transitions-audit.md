# View Transitions – přehled a možné problémy

## Co je už opraveno (po navigaci přes logo v menu)

| Místo | Řešení |
|-------|--------|
| **Layout.astro** | Modal click: event delegation na `document` (capture) + `astro:after-swap` → znovu přidat listener. AOS: `astro:page-load` → znovu `AOS.init()`. |
| **SmartContactModal.astro** | `initSmartContactModal()` + volání hned + `document.addEventListener('astro:page-load', initSmartContactModal)`. |
| **SmartMeetingModal.astro** | Stejný vzor s `initSmartMeetingModal()`. |
| **Navigation.astro** | Event delegation na `document` (menu/drawery), `updateHeader()` vždy bere elementy z aktuálního DOM, `astro:after-swap` → zavřít drawery + `updateHeader()`. |
| **HeroSplit.astro (desktop videa)** | `initHeroVideos()` + `astro:page-load`. |
| **DeveloperServices.astro** | `initDeveloperServicesParallax()` + `astro:page-load` (parallax Positioning / Go to market). |
| **ServiceList.astro** | `initServiceList()` + `astro:page-load` (zvýraznění položky u středu). |

---

## Na co si dát pozor – stejný typ problému

Všechny níže uvedené skripty běží jen jednou (IIFE nebo „holý“ kód). Po View Transitions přechodu (např. klik na logo) se může stát, že se v novém body nespustí znovu, nebo že běží v kontextu starého dokumentu. Pokud by po navigaci něco z toho přestalo fungovat, řešení je stejné: **init funkce + volání hned + `document.addEventListener('astro:page-load', initFunkce)`**.

### 1. HeroSplit.astro – první `<script>` (rotující slovo na mobilu)

- **Řádky cca 131–148:** IIFE, `setInterval` pro střídání slov (Marketing., Strategie., …) v `.rotating-word`.
- **Riziko:** Po přechodu na homepage z podstránky může rotace na mobilu přestat běžet.
- **Kde:** Jen v mobilní hero (homepage).

### 2. SectionZahranici.astro

- **Parallax „fix“** hero obrázku – `scroll` listener, `is-fixed` podle pozice sekce v viewportu.
- **Riziko:** Po přechodu na homepage může parallax v sekci Zahraničí přestat fungovat.
- **Kde:** Sekce Zahraničí (na homepage).

### 3. Footer.astro

- **IntersectionObserver** na `[data-footer-logo-wrap]` – přidává třídu `reveal` při scrollu (Grand Finale).
- **Riziko:** Po přechodu může efekt „odhalení“ loga v patičce přestat fungovat.
- **Kde:** Footer na všech stránkách.

### 4. HeroLogoMobile.astro

- **IntersectionObserver** – při vstupu do viewportu přidá `run-animation` (animace loga na mobilu).
- **Riziko:** Po přechodu na homepage může animace loga na mobilu neběžet.
- **Kde:** Jen mobilní hero (homepage).

### 5. SectionFormujeme.astro

- **Klik na `[data-formujeme-tap-tile]`** – na mobilu toggle třídy `reveal`. Žádná IIFE, ale kód se spustí jen jednou.
- **Riziko:** Po přechodu na stránku s touto sekcí mohou tap-tiles přestat reagovat na klik.
- **Kde:** Sekce Formujeme (homepage).

### 6. SectionKlientyServices.astro

- **Ticker animace na mobilu** – `requestAnimationFrame` smyčka + `resize` listener.
- **Riziko:** Po přechodu může ticker v sekci Pro klienty přestat běžet.
- **Kde:** Sekce Pro klienty (homepage).

### 7. FormThankYouModal.astro

- **IIFE:** poslouchá `form-thank-you-show`, overlay/close tlačítka.
- **Riziko:** Po navigaci by mohlo přestat fungovat zobrazení/zavření modalu „Děkujeme“ po odeslání formuláře (stejný princip jako u SmartContactModal).
- **Kde:** Modaly v Layoutu, zobrazení po odeslání formuláře.

### 8. CookieSystem.astro

- **IIFE + define:vars:** banner, overlay, modal, localStorage, gtag consent, tlačítka.
- **Riziko:** Po přechodu může cookie banner špatně reagovat (zobrazení/skrytí, ukládání souhlasu).
- **Kde:** V Layoutu na všech stránkách.

### 9. DigitalLuxuryDashboard.astro

- **IIFE + define:vars:** IntersectionObserver start/stop, interval pro střídání destinací, „glitch“ efekt.
- **Riziko:** Po přechodu na stránku, kde je dashboard, může přestat běžet animace.
- **Kde:** Použití závisí na tom, na kterých stránkách se komponenta renderuje.

---

## Doporučený vzor pro další opravy

```js
function initNazevKomponenty() {
  const el = document.querySelector('...');
  if (!el) return;
  // ... stávající logika včetně addEventListener ...
}

initNazevKomponenty();
document.addEventListener('astro:page-load', initNazevKomponenty);
```

- U komponent, které jsou jen na určitých stránkách, je na začátku `init` vhodný **guard** (`if (!el) return;`), aby po navigaci na stránku bez daného elementu nedošlo k chybě.
- **Navigation** je speciální případ: zůstává event delegation na `document` a vždy čerstvé dotazy do DOM; není potřeba ji obalovat do `astro:page-load`, ale `astro:after-swap` tam zůstává pro zavření drawerů a `updateHeader()`.

---

## Debugování

- V Layoutu jsou (dočasně?) **console.log** v modal click handleru a v `astro:after-swap` / `astro:page-load`. Až bude vše ustálené, můžeš je odstranit.
- Pokud něco po kliku na logo přestane fungovat, v konzoli zkontroluj, jestli se po přechodu vůbec volá `astro:page-load` a jestli se v dané komponentě volá její init.
