/**
 * JSON-LD Structured Data Builders
 *
 * Constructs Schema.org JSON-LD objects for various page types.
 * These are passed to the StructuredData component for injection into <head>.
 */

// --- Type Definitions ---

export interface OrgData {
  name: string;
  url: string;
  logo: string;
  telephone?: string;
  email?: string;
  legalName?: string;
  founder?: string;
  serviceArea?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface LocationData {
  businessName: string;
  address?: {
    streetAddress?: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
  };
  telephone?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  url: string;
  services?: string[];
  serviceArea?: string;
  nearbyAreas?: string[];
}

export interface ArticleData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
  image?: string;
  publisher?: OrgData;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductData {
  name: string;
  description: string;
  image?: string;
  url: string;
  brand?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability: string;
  };
}

// --- Builder Functions ---

/**
 * Builds Organization JSON-LD.
 */
export function buildOrganizationSchema(org: OrgData): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${org.url}/#organization`,
    name: org.name,
    url: org.url,
    logo: new URL(org.logo, org.url).href,
  };

  if (org.legalName) {
    schema.legalName = org.legalName;
  }
  if (org.telephone) {
    schema.telephone = org.telephone;
  }
  if (org.email) {
    schema.email = org.email;
  }
  if (org.founder) {
    schema.founder = {
      '@type': 'Person',
      name: org.founder,
      jobTitle: 'Veterinarian',
    };
  }
  if (org.serviceArea) {
    schema.areaServed = org.serviceArea;
  }

  return schema;
}

/**
 * Builds BreadcrumbList JSON-LD from an array of breadcrumb items.
 * Each item's href should be a prefix of the next item's href.
 */
export function buildBreadcrumbSchema(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };
}

/**
 * Builds LocalBusiness/VeterinaryCare JSON-LD for mobile location pages.
 */
export function buildLocalBusinessSchema(
  location: LocationData
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    '@id': `${location.url}#veterinary-care`,
    name: location.businessName,
    url: location.url,
    priceRange: '$$',
  };

  if (location.telephone) {
    schema.telephone = location.telephone;
  }

  if (location.address) {
    const postalAddress: Record<string, unknown> = {
      '@type': 'PostalAddress',
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      addressCountry: location.address.country,
    };

    if (location.address.streetAddress) {
      postalAddress.streetAddress = location.address.streetAddress;
    }
    if (location.address.postalCode) {
      postalAddress.postalCode = location.address.postalCode;
    }

    schema.address = postalAddress;
  }

  if (location.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    };
  }

  if (location.serviceArea || location.nearbyAreas?.length) {
    schema.areaServed = [
      location.serviceArea,
      ...(location.nearbyAreas || []),
    ].filter(Boolean);
  }

  if (location.services?.length) {
    schema.makesOffer = location.services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name:
          service === 'at-home-pet-euthanasia'
            ? 'In-home pet euthanasia'
            : 'Pet cremation and aftercare coordination',
      },
    }));
  }

  return schema;
}

/**
 * Builds Article JSON-LD for resource pages.
 */
export function buildArticleSchema(
  article: ArticleData
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    url: article.url,
  };

  if (article.image) {
    schema.image = article.image;
  }

  if (article.publisher) {
    schema.publisher = {
      '@type': 'Organization',
      name: article.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: article.publisher.logo,
      },
    };
  }

  return schema;
}

/**
 * Builds FAQPage JSON-LD from an array of FAQ items.
 * Output contains exactly the same items as input.
 */
export function buildFAQSchema(
  items: FAQItem[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Builds Product JSON-LD for product-oriented pages (e.g., pet urns).
 */
export function buildProductSchema(
  product: ProductData
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
  };

  if (product.image) {
    schema.image = product.image;
  }

  if (product.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: product.brand,
    };
  }

  if (product.offers) {
    schema.offers = {
      '@type': 'Offer',
      price: product.offers.price,
      priceCurrency: product.offers.priceCurrency,
      availability: product.offers.availability,
    };
  }

  return schema;
}
