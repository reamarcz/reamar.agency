# Podklady: design a chování formulářových modalů (přenos do jiného projektu)

Tento dokument shrnuje design a chování modalů z reamar.cz tak, aby šlo stejný vzhled a chování zkopírovat do jiného projektu v Cursoru. Můžeš celý obsah vložit do druhého chatu v jiném projektu a požádat o implementaci.

---

## 1. Architektura (jak to funguje)

- **Otevření z libovolného místa:** Na tlačítka/odkazy dáš data atributy `data-smart-contact-open` nebo `data-smart-meeting-open`. Neměly by mít `href="#"` bez ošetření – klik se zachytí dřív a místo navigace se vyvolá CustomEvent.
- **Jeden globální listener v Layoutu (v `<head>`, `is:inline`):** Zachytává klik v **capture fázi** (`true`), hledá `[data-smart-contact-open]` nebo `[data-smart-meeting-open]`, volá `preventDefault()` + `stopPropagation()` a vyvolá `window.dispatchEvent(new CustomEvent('smart-contact-open', { detail: { … } }))` nebo `smart-meeting-open`.
- **Modaly:** Jsou v body (např. za `<main>`). Každý modal má svůj skript, který poslouchá `window.addEventListener('smart-contact-open', …)` resp. `smart-meeting-open` a v obsluze zavolá `openModal(event.detail)`.
- **Při Astro View Transitions:** Po navigaci (např. klik na logo) se document/body může nahradit a listener ztratit. Proto po `astro:after-swap` znovu odregistruj a zaregistruj ten samý click handler (stejná funkce, capture: true).

---

## 2. Design – společné styly modalu

Všechny modaly (poptávka, schůzka, děkovná stránka) sdílejí stejný vizuální vzor:

- **Overlay:**  
  `fixed inset-0 z-[100] flex items-center justify-center bg-black/80`  
  + pro skrytí: `opacity-0 pointer-events-none`  
  + přechod: `transition-opacity duration-200`
- **Okno modalu:**  
  `relative w-[94vw] max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white rounded-none shadow-none`  
  + animace vstupu: `scale-95` → při otevření `scale-100`, `transition-all duration-200`
- **Vnitřní padding:**  
  `p-10 md:p-14 lg:p-16`
- **Tlačítko Zavřít:**  
  `absolute top-8 right-8`, bez borderu, průhledné pozadí, font např. 14px, text „Zavřít“ + znak ×
- **Nadpisy:**  
  např. 27px, font-normal, černá, `pr-20` kvůli tlačítku Zavřít
- **Formulářové pole:**  
  pouze spodní border (`border-0 border-b border-gray-200`), bez zaoblení, placeholder šedý, focus: `focus:border-[#000000]`
- **Label nad polem:**  
  block, 14px, margin-bottom 1
- **Chybová hláška:**  
  červená, 12px, `hidden` a zobrazí se přes odstranění `hidden`
- **Primární tlačítko (Odeslat):**  
  `w-full bg-[#000000] text-white` py-4, hover opacity 90 %, disabled: opacity 70 %
- **Sekundární volby (Jsem / Mám zájem o):**  
  tlačítka bez borderu, neaktivní `text-gray-500 font-normal`, aktivní `text-[#000000] font-medium underline underline-offset-2 decoration-[#000000]`
- **Zastavení propagace kliku na modal:**  
  na kontejneru modalu `onclick="event.stopPropagation()"` aby klik do bílého okna nezavřel modal (zavře jen overlay)

Barvy: pozadí textu `#000000`, pozadí overlay `bg-black/80`, odkazy underline, tlačítko „Zavolat“ černé s bílým textem.

---

## 3. Skript v Layoutu (otevírání modalů)

Vlož do `<head>` layoutu (např. Layout.astro). Použij `is:inline` aby skript běžel v globálním kontextu a přežil View Transitions.

```html
<script is:inline>
  function handleModalClick(event) {
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
  }

  document.addEventListener('click', handleModalClick, true);

  document.addEventListener('astro:after-swap', function () {
    document.removeEventListener('click', handleModalClick, true);
    document.addEventListener('click', handleModalClick, true);
  });
</script>
```

V jiném projektu (ne Astro) stačí jen `document.addEventListener('click', handleModalClick, true);` a vlastní způsob znovu-navěšení po SPA navigaci, pokud je potřeba.

---

## 4. Jak otevřít modal z UI

- **Poptávkový formulář:**  
  Na prvek (tlačítko/odkaz) přidej `data-smart-contact-open`.  
  Volitelně: `data-smart-contact-type="developer"` nebo `"client"`, `data-smart-contact-service="Název služby"`.
- **Schůzka:**  
  `data-smart-meeting-open`.  
  Volitelně: `data-smart-meeting-type="developer"` nebo `"client"`, `data-smart-meeting-service="Osobní schůzka v Praze"` nebo `"Online"`.

Odkazy mohou mít `href="javascript:void(0)"` nebo `href="#"` – listener v capture fázi zabrání výchozímu chování.

---

## 5. Životní cyklus modalu (open/close)

- **openModal:**  
  - overlay: odstranit `opacity-0` a `pointer-events-none`  
  - overlay `aria-hidden="false"`  
  - `document.body.style.overflow = 'hidden'`  
  - modal: přidat `scale-100`, odstranit `scale-95`  
  - `modal.focus()`
- **closeModal:**  
  - overlay: přidat `opacity-0`, `pointer-events-none`, `aria-hidden="true"`  
  - `document.body.style.overflow = ''`  
  - modal: odstranit `scale-100`, přidat `scale-95`  
  - volitelně: `window.dispatchEvent(new CustomEvent('smart-modal-closed'))`

Zavření: klik na overlay, klik na tlačítko Zavřít (nebo „zavřít“ v textu), Escape v modalu.

---

## 6. Děkovný modal (po odeslání formuláře)

Samostatná komponenta (např. FormThankYouModal): stejný overlay + bílé okno, uvnitř jen text „Děkujeme“, krátký text a tlačítko/link (např. Zavolat) + tlačítko „zavřít“.

- **Otevření:**  
  `window.dispatchEvent(new CustomEvent('form-thank-you-show'));`
- **Struktura:**  
  overlay s `id` nebo `data-form-thankyou`, vnitřek s `data-form-thankyou-modal`, tlačítka s `data-form-thankyou-close`.  
  Stejné CSS jako výše (overlay opacity/pointer-events, modal scale).  
  Na konci init: `document.addEventListener('astro:page-load', initFormThankYouModal);` a před přidáním listenera na `form-thank-you-show` odstranit předchozí handler (uložený např. v `window.__formThankYouOpenModalHandler`), aby po navigaci nedošlo k dvojímu otevření.

---

## 7. Přepínání formulář / success view

V modalu s formulářem jsou dva bloky:
- formulář: `[data-smart-contact-form-view]` / `[data-smart-meeting-form-view]`
- děkovná zpráva: `[data-smart-contact-success-view]` / `[data-smart-meeting-success-view]`

Po úspěšném odeslání: formulář blok `classList.add('hidden')`, success blok `classList.remove('hidden')`. Při otevření modalu a při closeModal zase formulář zobrazit a success skrýt.

---

## 8. Validace a odeslání

- Formulář má `novalidate`, validace se dělá v JS (povinná pole: jméno, telefon, e-mail; u schůzky i vzkaz).
- Chybové elementy mají např. `data-error="jmeno"` a jsou skryté (`hidden`). Při chybě se u příslušného pole odstraní `hidden`.
- Před odesláním: tlačítko „Odeslat“ změnit na „Odesílám…“ a `disabled = true`. Po odpovědi (úspěch/chyba) vrátit text a `disabled = false`. Při úspěchu přepnout na success view (viz výše).

Backend: v původním projektu se volá Astro action `actions.sendContactForm({ formSource: 'contact' | 'meeting', jmeno, telefon, email, vzkaz, userType, selectedService })`. V jiném projektu nahraď vlastním API voláním.

---

## 9. Přístupnost

- Overlay: `aria-hidden="true"` když zavřeno, `"false"` když otevřeno.
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` na id nadpisu, `tabindex="-1"` a při otevření `modal.focus()`.
- Tlačítko Zavřít: `aria-label="Zavřít"`.
- V modalu poslouchat `keydown` a na Escape volat `closeModal()`.

---

## 10. Struktura souborů v původním projektu (pro inspiraci)

- **Layout.astro:** výše uvedený `<script is:inline>` v `<head>`, v `<body>` za `<main>` komponenty `SmartContactModal`, `SmartMeetingModal`, `FormThankYouModal`.
- **SmartContactModal.astro:** overlay + modal, „Jsem“ (Developer / Koncový klient), „Mám zájem o“ (různé služby podle typu), pole Jméno, Telefon, E-mail, Vzkaz, tlačítko Odeslat, formulář view + success view, listener na `smart-contact-open`, openModal(detail) nastaví initialType/initialService.
- **SmartMeetingModal.astro:** stejná struktura, „Mám zájem o“ = Osobní schůzka v Praze / Online, pole vzkaz jako „Vzkaz a návrh termínu“, listener na `smart-meeting-open`.
- **FormThankYouModal.astro:** pouze overlay + děkovný obsah, listener na `form-thank-you-show`, po zavření dispatch `smart-modal-closed`.

---

## 11. Co přizpůsobit v novém projektu

- Font: v reamar.cz je `font-yellix` (Tailwind). V jiném projektu nahraď za svůj font a odpovídající třídy.
- Barvy: `#000000`, `gray-500`, `gray-200`, `red-500` pro chyby – můžeš je nahradit CSS proměnnými nebo jinými třídami.
- Odkazy: „Zásady zpracování osobních údajů“, telefonní číslo – změň na své URL a číslo.
- Backend: volání `actions.sendContactForm` nahraď vlastním endpointem (fetch / form action).
- Názvy eventů a data atributů můžeš ponechat (`smart-contact-open`, `smart-meeting-open`, `form-thank-you-show`) nebo přejmenovat konzistentně v celém projektu.

Když tento dokument vložíš do druhého chatu v jiném projektu a napíšeš např. „Implementuj podle tohoto dokumentu modaly a formuláře, přizpůsob našim routám a API“, Cursor může podle toho postavit stejné chování a design.

---

## Text pro druhý chat (zkopíruj celý blok)

```
Máme v jiném projektu (reamar.cz) design a chování formulářových modalů, které chceme znovu použít. Připravil jsem podklady – viz dokument níže.

Úkoly:
1. Implementuj podle tohoto dokumentu otevírání modalů (event-driven: data-smart-contact-open / data-smart-meeting-open, jeden capture listener v layoutu, CustomEvents).
2. Přidej modaly se stejným designem (overlay bg-black/80, bílé okno max-w-[1000px], scale animace, stejné styly polí a tlačítek).
3. Přizpůsob našim routám, API pro odeslání formuláře a názvům fontů/barvám, pokud používáme jiné než v dokumentu.
4. Děkovný modal otevíraný přes event form-thank-you-show a po zavření dispatch smart-modal-closed.
5. Po SPA/layout navigaci znovu navěs listener na klik (v dokumentu je astro:after-swap – u nás použij ekvivalent pro náš stack).

[DOKUMENT VLOŽ SEM – celý obsah souboru copy-form-modals-to-other-project.md]
```
