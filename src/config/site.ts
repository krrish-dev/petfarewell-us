export interface NAP {
  telephone: string;
  telephoneHref: string;
  email: string;
}

export interface Organization {
  name: string;
  legalName: string;
  url: string;
  logo: string;
  founder: string;
  serviceArea: string;
}

export interface SiteConfig {
  name: string;
  brandName: string;
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
  brandName: 'Pet Farewell by Dr. Hany Soliman',
  url: 'https://petfarewell.us',
  description:
    'Pet Farewell provides mobile in-home dog euthanasia, cat euthanasia, pet hospice guidance, and aftercare coordination for Southern California families.',
  logo: '/images/logo.svg',
  nap: {
    telephone: '(760) 912-0848',
    telephoneHref: '+17609120848',
    email: 'pethomeeuthanasiaservice@gmail.com',
  },
  ga4MeasurementId: 'G-XXXXXXXXXX',
  gscVerificationToken: 'XXXXXXXXXX',
  organization: {
    name: 'Pet Farewell',
    legalName: 'Pet Farewell by Dr. Hany Soliman',
    url: 'https://petfarewell.us',
    logo: '/images/logo.svg',
    founder: 'Dr. Hany Soliman',
    serviceArea: 'Southern California',
  },
};