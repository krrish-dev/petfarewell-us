/**
 * Property-based tests for JSON-LD schema builders
 * Feature: petfarewell-static-site
 * - Property 6: FAQ Structured Data Completeness
 * - Property 7: Resource Article Metadata Round-Trip
 * - Property 4: Location Page NAP Consistency
 * - Property 2: Structured Data Schema Validity
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildArticleSchema,
  buildFAQSchema,
  buildProductSchema,
  type OrgData,
  type BreadcrumbItem,
  type LocationData,
  type ArticleData,
  type FAQItem,
  type ProductData,
} from '../src/lib/schema';

// --- Arbitraries ---

const nonEmptyString = fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0);
const urlString = fc.webUrl();

const orgArb: fc.Arbitrary<OrgData> = fc.record({
  name: nonEmptyString,
  url: urlString,
  logo: urlString,
  telephone: fc.option(nonEmptyString, { nil: undefined }),
  email: fc.option(nonEmptyString, { nil: undefined }),
});

const breadcrumbItemArb: fc.Arbitrary<BreadcrumbItem> = fc.record({
  label: nonEmptyString,
  href: urlString,
});

const locationArb: fc.Arbitrary<LocationData> = fc.record({
  businessName: nonEmptyString,
  address: fc.record({
    streetAddress: nonEmptyString,
    city: nonEmptyString,
    state: fc.stringOf(fc.constantFrom(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')), { minLength: 2, maxLength: 2 }),
    postalCode: fc.stringOf(fc.constantFrom(...'0123456789'.split('')), { minLength: 5, maxLength: 5 }),
    country: fc.constant('US'),
  }),
  telephone: nonEmptyString,
  geo: fc.record({
    latitude: fc.double({ min: -90, max: 90, noNaN: true }),
    longitude: fc.double({ min: -180, max: 180, noNaN: true }),
  }),
  url: urlString,
  services: fc.option(fc.array(nonEmptyString, { minLength: 1, maxLength: 5 }), { nil: undefined }),
  serviceArea: fc.option(nonEmptyString, { nil: undefined }),
});

const isoDate = fc
  .date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') })
  .map((d) => d.toISOString().split('T')[0]);

const articleArb: fc.Arbitrary<ArticleData> = fc.record({
  headline: nonEmptyString,
  description: nonEmptyString,
  datePublished: isoDate,
  dateModified: isoDate,
  author: nonEmptyString,
  url: urlString,
  image: fc.option(urlString, { nil: undefined }),
  publisher: fc.option(orgArb, { nil: undefined }),
});

const faqItemArb: fc.Arbitrary<FAQItem> = fc.record({
  question: nonEmptyString,
  answer: nonEmptyString,
});

const productArb: fc.Arbitrary<ProductData> = fc.record({
  name: nonEmptyString,
  description: nonEmptyString,
  image: fc.option(urlString, { nil: undefined }),
  url: urlString,
  brand: fc.option(nonEmptyString, { nil: undefined }),
  offers: fc.option(
    fc.record({
      price: fc.double({ min: 0, max: 10000, noNaN: true }),
      priceCurrency: fc.constant('USD'),
      availability: fc.constant('https://schema.org/InStock'),
    }),
    { nil: undefined }
  ),
});

// --- Property 2: Structured Data Schema Validity ---

describe('Property 2: Structured Data Schema Validity', () => {
  it('buildOrganizationSchema always has @context, @type, name, url, logo', () => {
    fc.assert(
      fc.property(orgArb, (org) => {
        const result = buildOrganizationSchema(org);
        expect(result['@context']).toBe('https://schema.org');
        expect(result['@type']).toBe('Organization');
        expect(result.name).toBe(org.name);
        expect(result.url).toBe(org.url);
        expect(result.logo).toBe(org.logo);
      }),
      { numRuns: 100 }
    );
  });

  it('buildBreadcrumbSchema always has @context, @type, itemListElement', () => {
    fc.assert(
      fc.property(fc.array(breadcrumbItemArb, { minLength: 1, maxLength: 5 }), (items) => {
        const result = buildBreadcrumbSchema(items);
        expect(result['@context']).toBe('https://schema.org');
        expect(result['@type']).toBe('BreadcrumbList');
        expect(Array.isArray(result.itemListElement)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('buildLocalBusinessSchema always has @context, @type, name, telephone, address, geo', () => {
    fc.assert(
      fc.property(locationArb, (loc) => {
        const result = buildLocalBusinessSchema(loc);
        expect(result['@context']).toBe('https://schema.org');
        expect(result['@type']).toBe('LocalBusiness');
        expect(result.name).toBe(loc.businessName);
        expect(result.telephone).toBe(loc.telephone);
        expect(result.address).toBeDefined();
        expect(result.geo).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });

  it('buildArticleSchema always has @context, @type, headline, datePublished, dateModified', () => {
    fc.assert(
      fc.property(articleArb, (article) => {
        const result = buildArticleSchema(article);
        expect(result['@context']).toBe('https://schema.org');
        expect(result['@type']).toBe('Article');
        expect(result.headline).toBe(article.headline);
        expect(result.datePublished).toBe(article.datePublished);
        expect(result.dateModified).toBe(article.dateModified);
      }),
      { numRuns: 100 }
    );
  });

  it('buildFAQSchema always has @context, @type FAQPage', () => {
    fc.assert(
      fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 10 }), (items) => {
        const result = buildFAQSchema(items);
        expect(result['@context']).toBe('https://schema.org');
        expect(result['@type']).toBe('FAQPage');
      }),
      { numRuns: 100 }
    );
  });

  it('buildProductSchema always has @context, @type Product, name, description', () => {
    fc.assert(
      fc.property(productArb, (product) => {
        const result = buildProductSchema(product);
        expect(result['@context']).toBe('https://schema.org');
        expect(result['@type']).toBe('Product');
        expect(result.name).toBe(product.name);
        expect(result.description).toBe(product.description);
      }),
      { numRuns: 100 }
    );
  });
});

// --- Property 4: Location Page NAP Consistency ---

describe('Property 4: Location Page NAP Consistency', () => {
  it('NAP fields in LocalBusiness JSON-LD match the input LocationData exactly', () => {
    fc.assert(
      fc.property(locationArb, (loc) => {
        const result = buildLocalBusinessSchema(loc);
        // Name matches
        expect(result.name).toBe(loc.businessName);
        // Telephone matches
        expect(result.telephone).toBe(loc.telephone);
        // Address fields match
        const addr = result.address as Record<string, unknown>;
        expect(addr.streetAddress).toBe(loc.address.streetAddress);
        expect(addr.addressLocality).toBe(loc.address.city);
        expect(addr.addressRegion).toBe(loc.address.state);
        expect(addr.postalCode).toBe(loc.address.postalCode);
        expect(addr.addressCountry).toBe(loc.address.country);
        // Geo matches
        const geo = result.geo as Record<string, unknown>;
        expect(geo.latitude).toBe(loc.geo.latitude);
        expect(geo.longitude).toBe(loc.geo.longitude);
      }),
      { numRuns: 100 }
    );
  });
});

// --- Property 6: FAQ Structured Data Completeness ---

describe('Property 6: FAQ Structured Data Completeness', () => {
  it('output contains exactly the same number of items as input', () => {
    fc.assert(
      fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 20 }), (items) => {
        const result = buildFAQSchema(items);
        const mainEntity = result.mainEntity as Array<Record<string, unknown>>;
        expect(mainEntity.length).toBe(items.length);
      }),
      { numRuns: 200 }
    );
  });

  it('every input question/answer appears in the output with matching text', () => {
    fc.assert(
      fc.property(fc.array(faqItemArb, { minLength: 1, maxLength: 10 }), (items) => {
        const result = buildFAQSchema(items);
        const mainEntity = result.mainEntity as Array<Record<string, unknown>>;

        items.forEach((item, i) => {
          const entity = mainEntity[i];
          expect(entity['@type']).toBe('Question');
          expect(entity.name).toBe(item.question);
          const answer = entity.acceptedAnswer as Record<string, unknown>;
          expect(answer['@type']).toBe('Answer');
          expect(answer.text).toBe(item.answer);
        });
      }),
      { numRuns: 200 }
    );
  });
});

// --- Property 7: Resource Article Metadata Round-Trip ---

describe('Property 7: Resource Article Metadata Round-Trip', () => {
  it('datePublished and dateModified round-trip without mutation', () => {
    fc.assert(
      fc.property(articleArb, (article) => {
        const result = buildArticleSchema(article);
        // Dates must be preserved exactly
        expect(result.datePublished).toBe(article.datePublished);
        expect(result.dateModified).toBe(article.dateModified);
      }),
      { numRuns: 200 }
    );
  });

  it('headline and author round-trip without mutation', () => {
    fc.assert(
      fc.property(articleArb, (article) => {
        const result = buildArticleSchema(article);
        expect(result.headline).toBe(article.headline);
        const author = result.author as Record<string, unknown>;
        expect(author.name).toBe(article.author);
      }),
      { numRuns: 200 }
    );
  });
});
