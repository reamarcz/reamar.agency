import { OG } from '../lib/og';

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  ogTitle: string;
  ogDescription: string;
  ogImageAlt: string;
};

/** Finální SEO + sociální metadata — přesně dle zadání (sekce 2 + 4). */
export const seoPages = {
  home: {
    title: 'Agentura pro kupující | Novostavby v Praze | REAMAR',
    description:
      'Nákupní agentura REAMAR zastupuje kupující novostaveb v Praze a okolí. Sledujeme trh, vybíráme vhodné byty a s developery jednáme ve vašem zájmu.',
    canonical: '/',
    image: OG.uvod,
    ogTitle: 'Kdo při nákupu novostavby zastupuje vás?',
    ogDescription:
      'Známe developerský trh z druhé strany stolu. Dnes stojíme na straně kupujících.',
    ogImageAlt: 'REAMAR Agency — Agentura pro kupující, náhled pro sdílení',
  },
  bydleni: {
    title: 'Vlastní bydlení v novostavbě v Praze | REAMAR Agency',
    description:
      'Hledáte novostavbu pro vlastní bydlení? Porovnáme projekty v Praze a okolí, vybereme vhodné byty a při jednání s developerem hájíme vaše zájmy.',
    canonical: '/bydleni',
    image: OG.bydleni,
    ogTitle: 'Nové bydlení. Někdo na vaší straně.',
    ogDescription:
      'Pomáháme porovnat novostavby a hájíme vaše zájmy při jednání s developerem.',
    ogImageAlt: 'REAMAR Agency — Bydlení, náhled pro sdílení',
  },
  investice: {
    title: 'Investice do novostaveb v Praze | REAMAR Agency',
    description:
      'Investujete do bytu v novostavbě? Sledujeme ceny, dispozice i předprodeje a pomáháme vám porovnat projekty. S developery jednáme na vaší straně.',
    canonical: '/investice',
    image: OG.investice,
    ogTitle: 'Investice začíná srovnáním trhu.',
    ogDescription:
      'Ceny, předprodeje a výběr investičních bytů. Developerské know-how na vaší straně.',
    ogImageAlt: 'REAMAR Agency — Investice, náhled pro sdílení',
  },
  oNas: {
    title: 'Novostavby známe z druhé strany stolu | REAMAR Agency',
    description:
      'Známe více než 200 developerských projektů z pohledu prodeje. Dnes zkušenosti z druhé strany stolu využíváme při zastupování kupujících novostaveb.',
    canonical: '/o-nas',
    image: OG.oNas,
    ogTitle: 'Novostavby známe z druhé strany stolu.',
    ogDescription:
      'Zkušenosti z více než 200 developerských projektů. Dnes je využíváme pro kupující.',
    ogImageAlt: 'REAMAR Agency — O nás, náhled pro sdílení',
  },
  konzultace: {
    title: 'Konzultace | Agentura pro kupující | REAMAR',
    description:
      'Probereme vaše představy, podíváme se na možnosti na trhu a představíme vám formy naší spolupráce.',
    canonical: '/konzultace',
    image: OG.sluzby,
    ogTitle: 'Dobrý nákup začíná správným rozhovorem.',
    ogDescription:
      'Nezávazná konzultace k nákupu novostavby. Ozveme se do 24 hodin.',
    ogImageAlt: 'REAMAR Agency — Konzultace k nákupu novostavby, náhled pro sdílení',
  },
  portal: {
    title: 'Klientský portál pro kupující novostaveb | REAMAR',
    description:
      'Ceny, nabídky a srovnání developerských projektů na jednom místě. Podívejte se, jak náš klientský portál pomáhá při výběru novostavby v Praze.',
    canonical: '/klientsky-portal',
    image: OG.coDelame,
    ogTitle: 'Trh novostaveb tak, jak ho vidíme my.',
    ogDescription:
      'Klientský portál pro lepší přehled o nabídkách, cenách a srovnání projektů.',
    ogImageAlt: 'REAMAR Agency — Klientský portál, náhled pro sdílení',
  },
  agent: {
    title: 'Agent pro kupující: Jan Vitvera | REAMAR Agency',
    description:
      'Jan Vitvera ukazuje developerský trh z druhé strany stolu. Příběhy z nákupů novostaveb, zkušenosti z praxe a videa od Agentury pro kupující.',
    canonical: '/agent-pro-kupujici',
    image: OG.coDelame,
    ogTitle: 'Agent pro kupující. Jan Vitvera.',
    ogDescription:
      'Příběhy a zkušenosti z developerského trhu, tentokrát z pohledu kupujícího.',
    ogImageAlt: 'Jan Vitvera — Agent pro kupující, náhled pro sdílení',
  },
  pribehy: {
    title: 'Příběhy z trhu | Agentura pro kupující | REAMAR',
    description:
      'Co se skutečně řeší při nákupu novostavby? Příběhy, rozhovory a zkušenosti z pražského developerského trhu. Videa a články Agentury pro kupující.',
    canonical: '/pribehy-z-trhu/',
    image: OG.pribehy,
    ogTitle: 'Příběhy z trhu. Novostavby bez filtru.',
    ogDescription: 'Videa a příběhy z praxe Agentury pro kupující.',
    ogImageAlt: 'REAMAR Agency — Příběhy z trhu, náhled pro sdílení',
  },
  kontakt: {
    title: 'Kontakt | Agentura pro kupující novostaveb | REAMAR',
    description:
      'Hledáte nové bydlení nebo investiční byt? Napište nám, co hledáte. Probereme vaše zadání a možnosti zastupování při nákupu novostavby v Praze a okolí.',
    canonical: '/kontakt',
    image: OG.uvod,
    ogTitle: 'Pojďme probrat, co hledáte.',
    ogDescription: 'Agentura pro kupující novostaveb. Napište nám své zadání.',
    ogImageAlt: 'REAMAR Agency — Kontakt, náhled pro sdílení',
  },
} as const satisfies Record<string, PageSeo>;
