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
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface LocationData {
  businessName: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  telephone: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  url: string;
  services?: string[];
  serviceArea?: string;
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
    name: org.name,
    url: org.url,
    logo: org.logo,
  };

  if (org.telephone) {
    schema.telephone = org.telephone;
  }
  if (org.email) {
    schema.email = org.email;
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
 * Builds LocalBusiness JSON-LD for location pages.
 */
export function buildLocalBusinessSchema(
  location: LocationData
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: location.businessName,
    telephone: location.telephone,
    url: location.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.streetAddress,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.postalCode,
      addressCountry: location.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
  };

  if (location.serviceArea) {
    schema.areaServed = location.serviceArea;
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
