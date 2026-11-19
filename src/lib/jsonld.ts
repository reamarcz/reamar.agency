import { SITE_URL } from './site';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Minimální Organization + WebSite — jen ověřené údaje z webu. */
export function organizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'REAMAR Agency',
        alternateName: ['Agentura pro kupující', 'Reamar Invest Group, s.r.o.'],
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/Reamar%20main.png`,
        description:
          'Nákupní agentura zastupující kupující novostaveb na developerském trhu v Praze a okolí.',
        email: 'info@reamar.cz',
        telephone: '+420607066044',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Za potokem 46/4',
          addressLocality: 'Praha 10',
          postalCode: '106 00',
          addressCountry: 'CZ',
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'REAMAR Agency',
        url: `${SITE_URL}/`,
        publisher: { '@id': ORG_ID },
        inLanguage: 'cs-CZ',
      },
    ],
  };
}

export function serviceLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Praha a okolí',
    },
    serviceType: 'Nákupní agentura / Agentura pro kupující',
  };
}

export function personJanVitvera() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/agent-pro-kupujici#person`,
    name: 'Jan Vitvera',
    jobTitle: 'Agent pro kupující',
    url: `${SITE_URL}/agent-pro-kupujici`,
    worksFor: { '@id': ORG_ID },
    description:
      'Vedoucí Agentury pro kupující. Příběhy a zkušenosti z developerského trhu z pohledu kupujícího.',
  };
}
