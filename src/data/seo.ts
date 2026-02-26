/**
 * SEO texty pro meta tagy – použij v Layout přes props.
 * Pro samostatné stránky sekcí (např. /pro-developery) importuj příslušný objekt.
 */

const BASE = 'https://www.reamar.cz';
const DEFAULT_IMAGE = '/images/og-image.jpg';

export const seoHomepage = {
  title: 'REAMAR | Reality. Marketing. Strategie pro development.',
  description:
    'Propojujeme svět realit a marketingu. Strategické zastoupení developerů a prodej nemovitostí s důrazem na vizi, design a výsledek.',
  ogTitle: 'REAMAR | Reality. Marketing.',
  ogDescription: 'Profesionální partnerství pro vaše realitní záměry. Od marketingu po úspěšný prodej.',
  canonical: `${BASE}/`,
  image: DEFAULT_IMAGE,
};

export const seoProDevelopery = {
  title: 'REAMAR | Strategický marketing a sales pro developery.',
  description:
    'Komplexní řešení pro rezidenční projekty. Zajistíme vaši vizi od analýzy trhu a brandingu až po finální doprodej jednotek.',
  ogTitle: 'REAMAR | Strategický marketing a sales pro developery.',
  ogDescription: 'Jsme vaším přímým zástupcem v každé fázi developmentu.',
  canonical: `${BASE}/pro-developery`,
  image: DEFAULT_IMAGE,
};

export const seoProKlienty = {
  title: 'REAMAR | Prodej a vyhledávání exkluzivních nemovitostí.',
  description:
    'Individuální přístup k prodeji i nákupu. Postaráme se o bezpečnost transakce a maximální zhodnocení vaší investice.',
  ogTitle: 'REAMAR | Prodej a vyhledávání exkluzivních nemovitostí.',
  ogDescription: 'Bezpečný průběh a nadstandardní péče o vaše realitní portfolio.',
  canonical: `${BASE}/pro-klienty`,
  image: DEFAULT_IMAGE,
};

export const seoZahranici = {
  title: 'REAMAR | Zastoupení světových developerů pro ČR a SK.',
  description:
    'Jako přímé zastoupení pro český a slovenský trh si nás vybrala řada developerů ze Španělska, Portugalska, Albánie nebo Řecka.',
  ogTitle: 'REAMAR | Autorizované zastoupení světových developerů.',
  ogDescription:
    'Expertní vhled do mezinárodních realitních trhů. Zajišťujeme bezpečnost a výnos vašeho portfolia v zahraničí.',
  canonical: `${BASE}/zahranici`,
  image: DEFAULT_IMAGE,
};
