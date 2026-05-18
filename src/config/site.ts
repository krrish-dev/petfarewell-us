export interface NAP {
  telephone: string;
  email: string;
}

export interface Organization {
  name: string;
  url: string;
  logo: string;
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  logo: string;
  nap: NAP;
  ga4MeasurementId: string;
  gscVerificationToken: string;
  organization: Organization;
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Pet Farewell',
  url: 'https://petfarewell.us',
  description: 'Compassionate in-home dog euthanasia and cat euthanasia, with peaceful end-of-life care across Southern California.',
  logo: '/images/logo.svg',
  nap: {
    telephone: '(760) 912-0848',
    email: 'pethomeeuthanasiaservice@gmail.com',
  },
  ga4MeasurementId: 'G-XXXXXXXXXX',
  gscVerificationToken: 'XXXXXXXXXX',
  organization: {
    name: 'Pet Home Euthanasia Service',
    url: 'https://petfarewell.us',
    logo: '/images/logo.svg',
  },
};

