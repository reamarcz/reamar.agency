# Kontext pro opravu: modaly po přechodu přes logo v menu (View Transitions)

## Problém
- **První načtení:** Klik na tlačítka pro otevření modalů funguje (event delegation v Layoutu, capture fáze).
- **Po kliku na logo v menubaru** (odkaz `href="/"` → View Transitions přechod na domovskou stránku): stejná tlačítka už modaly neotevřou, místo toho se projeví výchozí chování odkazu (`href="#"`) → v URL přibude `#`.

Používáme **Astro s View Transitions**. Skript pro otevírání modalů je v **Layout.astro v `<head>`** s **`is:inline`** a přidává jeden **capture** listener na `document`.

---

## 1. Layout.astro – skript pro otevírání modalů (v `<head>`)

```html
<script is:inline>
  document.addEventListener('click', function (event) {
    var target = event.target.closest('[data-smart-contact-open], [data-smart-meeting-open]');
    if (!target) return;
    event.preventDefault();
    event.stopPropagation();
    if (target.hasAttribute('data-smart-contact-open')) {
      var type = target.getAttribute('data-smart-contact-type') || 'developer';
      var service = target.getAttribute('data-smart-contact-service') || null;
      window.dispatchEvent(new CustomEvent('smart-contact-open', { detail: { initialType: type, initialService: service } }));
    } else {
      var meetingType = target.getAttribute('data-smart-meeting-type') || 'developer';
      var meetingService = target.getAttribute('data-smart-meeting-service') || null;
      window.dispatchEvent(new CustomEvent('smart-meeting-open', { detail: { initialType: meetingType, initialService: meetingService } }));
    }
  }, true);
</script>
```

Struktura body v Layoutu:
- `Navigation` (obsahuje logo `href="/"` a odkazy s `href="#"` + `data-smart-contact-open` / `data-smart-meeting-open`)
- `<main><slot /></main>`
- `SmartContactModal`, `SmartMeetingModal`, …

---

## 2. Navigation.astro – logo a tlačítka pro modaly

**Logo v menubaru (po kliku dochází k přechodu, pak modaly nefungují):**
```html
<a href="/" class="..." data-nav-logo title="Reamar">
  <img src="/images/logo-rig-b.svg" alt="Reamar" ... />
</a>
```

**Příklad odkazů, které mají otevřít modaly (všechny mají `href="#"`):**
```html
<a href="#" class="..." data-drawer-close data-smart-contact-open>Poptávkový formulář</a>
<a href="#" class="..." data-drawer-close data-smart-meeting-open>Osobní schůzka...</a>
<a href="#" class="..." data-contact-close data-smart-contact-open>Poptávkový formulář</a>
<a href="#" class="..." data-contact-close data-smart-meeting-open>Osobní schůzka...</a>
```

**Navigation má vlastní document click listener (bubble)** pro menu/drawery (bez capture):
- `[data-nav-toggle]`, `[data-drawer-backdrop]`, `[data-drawer-close]`, `[data-contact-toggle]`, `[data-contact-backdrop]`, `[data-contact-close]`, `[data-contact-open]`
- a reaguje na **astro:after-swap** (zavření drawerů + `updateHeader()`).

---

## 3. Jak modaly reagují na otevření (CustomEvent)

**SmartContactModal.astro:**
```javascript
window.addEventListener('smart-contact-open', function (event) {
  openModal(event.detail || {});
});
```

**SmartMeetingModal.astro:**
```javascript
window.addEventListener('smart-meeting-open', function (event) {
  openModal(event.detail || {});
});
```

Žádný `DOMContentLoaded`; skripty v komponentách běží při jejich načtení.

---

## 4. Všechna místa s tlačítky/odkazy pro modaly

| Soubor | Atributy | href |
|--------|----------|------|
| Navigation.astro | data-drawer-close data-smart-contact-open | # |
| Navigation.astro | data-drawer-close data-smart-meeting-open | # |
| Navigation.astro | data-contact-close data-smart-contact-open | # |
| Navigation.astro | data-contact-close data-smart-meeting-open | # |
| HeroSplit.astro | data-smart-contact-open | # |
| SectionProdej.astro | data-smart-contact-open | # |
| SectionKlientyServices.astro | data-smart-contact-open data-smart-contact-type="client" | # |
| SectionFormujeme.astro | data-smart-meeting-open | # |
| SectionZahranici.astro | data-smart-contact-open data-smart-contact-type="client" data-smart-contact-service="Zahraniční" | # |
| Footer.astro | data-smart-contact-open | # |
| Footer.astro | data-smart-meeting-open | # |

Všechny tyto prvky mají `href="#"`. Po přechodu přes logo v menu na ně klik neotevře modal a v URL přibude `#`.

---

## 5. Shrnutí pro fix

- **Click event:** jeden listener v Layoutu (`<head>`, `is:inline`), **capture** (`true`), event delegation na `[data-smart-contact-open], [data-smart-meeting-open]` → `preventDefault`, `stopPropagation`, dispatch `smart-contact-open` / `smart-meeting-open`.
- **Modal open logic:** v Layoutu pouze tento jeden listener; modaly samy jen poslouchají `window` na tyto CustomEventy.
- **Problém:** po View Transitions přechodu (klik na logo `href="/"`) tento listener zřejmě přestane platit (např. výměna documentu/body a ztráta listeneru z původního dokumentu). Potřeba řešení, které přežije navigaci (např. znovu navěšení listeneru po `astro:page-load` / `astro:after-swap` bez rozbití prvního načtení).
