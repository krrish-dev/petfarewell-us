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

export interface SEOConfig {
  siteName: string;
  titleSuffix: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  ogImageAlt: string;
  themeColor: string;
  locale: string;
  twitterCard: 'summary_large_image' | 'summary';
  twitterDomain: string;
  geoRegion: string;
  geoPlacename: string;
}

export interface SiteConfig {
  name: string;
  brandName: string;
  url: string;
  description: string;
  logo: string;
  nap: NAP;
  seo: SEOConfig;
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
  seo: {
    siteName: 'PetFarewell.us',
    titleSuffix: 'PetFarewell.us',
    defaultTitle: 'In-Home Pet Euthanasia in Southern California | PetFarewell.us',
    defaultDescription:
      'PetFarewell.us provides in-home dog euthanasia, cat euthanasia, pet hospice guidance, and cremation aftercare coordination by Dr. Hany Soliman in Southern California.',
    defaultOgImage: '/images/og-default.jpg',
    ogImageAlt: 'PetFarewell.us in-home pet euthanasia and aftercare coordination in Southern California',
    themeColor: '#286f6c',
    locale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterDomain: 'petfarewell.us',
    geoRegion: 'US-CA',
    geoPlacename: 'Southern California',
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