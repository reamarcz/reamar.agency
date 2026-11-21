import { actions } from 'astro:actions';

function track(event: string, payload?: Record<string, unknown>) {
  try {
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...(payload || {}) });
  } catch (_) {}
}

function initPoptavkaReveal() {
  const sections = document.querySelectorAll<HTMLElement>('[data-poptavka-paticka]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sections.forEach(function (kb) {
    if (kb.dataset.kbRevealReady === '1') return;
    kb.dataset.kbRevealReady = '1';

    if (reduced) {
      kb.classList.add('is-in');
      return;
    }

    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          kb.classList.add('is-in');
          io.unobserve(kb);
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    io.observe(kb);
  });
}

export function initPoptavkaPatickaForms() {
  initPoptavkaReveal();

  document.querySelectorAll<HTMLElement>('[data-poptavka-paticka]').forEach(function (kb) {
    if (kb.dataset.kbReady === '1') return;
    kb.dataset.kbReady = '1';

    const form = kb.querySelector<HTMLFormElement>('[data-kb-form]');
    if (!form) return;

    const note = form.querySelector<HTMLInputElement>('[data-note]');
    const noteLbl = form.querySelector<HTMLElement>('[data-note-label]');
    const submitBtn = form.querySelector<HTMLButtonElement>('[data-kb-submit]');
    const NOTE = {
      def: ['Co hledáte', 'např. 3+kk v Praze 9 do 10 mil., nastěhování 2027'],
      byt: ['Odkaz na byt', 'Vložte odkaz nebo název projektu'],
    };

    function syncNote() {
      if (!note || !noteLbl) return;
      const radios = form.elements.namedItem('hledam') as RadioNodeList | null;
      const isByt = radios?.value === 'konkretni-byt';
      const v = isByt ? NOTE.byt : NOTE.def;
      noteLbl.textContent = v[0];
      note.placeholder = v[1];
    }

    form.addEventListener('change', function (e) {
      const t = e.target as HTMLInputElement | null;
      if (t && t.name === 'hledam') syncNote();
    });
    syncNote();

    const zdrojInput = form.elements.namedItem('zdroj') as HTMLInputElement | null;
    if (zdrojInput && !zdrojInput.value) {
      zdrojInput.value = location.pathname;
    }

    let started = false;
    form.addEventListener('input', function () {
      if (started) return;
      started = true;
      track('form_start', {
        form: 'poptavka-paticka',
        zdroj: zdrojInput?.value || location.pathname,
      });
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nm = form.elements.namedItem('jmeno') as HTMLInputElement;
      const tel = form.elements.namedItem('telefon') as HTMLInputElement;
      const web = form.elements.namedItem('web') as HTMLInputElement;
      const nmEmpty = !nm.value.trim();
      const telShort = tel.value.replace(/\D/g, '').length < 9;
      nm.closest('.kb__f')?.classList.toggle('is-err', nmEmpty);
      tel.closest('.kb__f')?.classList.toggle('is-err', telShort);
      if (form.querySelector('.is-err') || web?.value) return;

      if (submitBtn) submitBtn.disabled = true;

      const radios = form.elements.namedItem('hledam') as RadioNodeList | null;
      const hledam = radios?.value || '';
      const zdroj = zdrojInput?.value || location.pathname;
      const poznamkaEl = form.elements.namedItem('poznamka') as HTMLInputElement | null;
      const poznamka = (poznamkaEl?.value || '').trim();

      track('form_submit', { form: 'poptavka-paticka', hledam, zdroj });

      try {
        const { data, error } = await actions.sendContactForm({
          formSource: 'poptavka-paticka',
          jmeno: nm.value.trim(),
          telefon: tel.value.trim(),
          hledam,
          poznamka,
          zdroj,
          vzkaz: poznamka,
        });
        if (error) {
          if (submitBtn) submitBtn.disabled = false;
          return;
        }
        if (data) {
          kb.classList.add('is-sent');
        } else if (submitBtn) {
          submitBtn.disabled = false;
        }
      } catch (_) {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    kb.querySelectorAll('[data-track]').forEach(function (a) {
      a.addEventListener('click', function () {
        track('contact_' + a.getAttribute('data-track'), {
          form: 'poptavka-paticka',
        });
      });
    });
  });
}
