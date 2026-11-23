export type SluzbaItem = {
  title: string;
  text: string;
  icon: string;
  tag?: string;
};

export type SluzbaStep = {
  title: string;
  text: string;
};

export const sluzbaItems: SluzbaItem[] = [
  {
    title: 'Osobní konzultant',
    text: 'Jeden člověk, který zná vaše zadání a provede vás celým nákupem.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="24" cy="15" r="7" fill="currentColor" stroke="none"/><path d="M10 41V31h28v10"/></svg>`,
  },
  {
    title: 'Monitoring trhu',
    text: 'Upozornění na zlevněné byty a nové nabídky dle vašich preferencí.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="9" y="8" width="30" height="9" fill="currentColor" stroke="none"/><rect x="9.75" y="21.75" width="28.5" height="7.5"/><rect x="9.75" y="33.75" width="28.5" height="7.5"/></svg>`,
    tag: 'Vlastní software',
  },
  {
    title: 'Přístup k příležitostem',
    text: 'Nabídky a předprodeje, které se na portály často vůbec nedostanou.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 41V7h30v34"/><rect x="24" y="15" width="9" height="26" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    title: 'Vyjednávání s developerem',
    text: 'Cena, splátkový kalendář, parkování, sklep. Jednáme za vás.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="19" y="19" width="10" height="10" fill="currentColor" stroke="none"/><path d="M4 24h11"/><path d="M10 18l6 6-6 6"/><path d="M44 24H33"/><path d="M38 18l-6 6 6 6"/></svg>`,
  },
  {
    title: 'Právní servis',
    text: 'Rezervační i kupní smlouvu zkontroluje náš právník dřív, než podepíšete.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M11 6h26v36H11z"/><path d="M17 15h14M17 21h14M17 27h8"/><rect x="25" y="32" width="12" height="10" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    title: 'Zastoupení až do předání',
    text: 'Hlídáme termíny, platby i předání bytu.',
    icon: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="23" y="23" width="18" height="18" fill="currentColor" stroke="none"/><path d="M7 7l12 12"/><path d="M19 10v9h-9"/></svg>`,
  },
];

export const sluzbaSteps: SluzbaStep[] = [
  {
    title: 'Úvodní konzultace',
    text: 'Projdeme zadání, rozpočet a preference. Ujasníme, podle čeho budeme vybírat.',
  },
  {
    title: 'Objednávka služeb',
    text: 'Potvrdíme rozsah spolupráce a pravidla osobního vyhledávání a zastoupení.',
  },
  {
    title: 'Osobní vyhledávání',
    text: 'Otevřeme vám portál a aktivně doporučujeme nemovitosti podle zadání.',
  },
  {
    title: 'Vyjednávání podmínek',
    text: 'Jednáme s developerem o rezervaci, ceně, splátkách i dalších podmínkách.',
  },
  {
    title: 'Dokončení nákupu',
    text: 'Podle zvolených služeb můžeme také poskytnout právní kontrolu smluv nebo zastoupení až do předání bytu.',
  },
];
