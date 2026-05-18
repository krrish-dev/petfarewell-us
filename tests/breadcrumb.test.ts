/**
 * Property-based tests for breadcrumb generation
 * Feature: petfarewell-static-site, Property 3: Breadcrumb Hierarchy Consistency
 *
 * For any page with a BreadcrumbList, the breadcrumb items SHALL reflect the
 * page's actual URL hierarchy — each breadcrumb item's URL SHALL be a prefix
 * of the next item's URL.
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { generateBreadcrumbs, formatSegmentLabel } from '../src/lib/breadcrumb';

const SITE_URL = 'https://petfarewell.us';

// Arbitrary for URL path segments (lowercase, hyphens, digits only)
const urlSegment = fc.stringOf(
  fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyz0123456789-'.split('')
  ),
  { minLength: 1, maxLength: 20 }
).filter((s) => !s.startsWith('-') && !s.endsWith('-') && !s.includes('--') && /[a-z0-9]/.test(s));

// Arbitrary for URL paths of varying depth
const urlPath = fc
  .array(urlSegment, { minLength: 1, maxLength: 5 })
  .map((segments) => '/' + segments.join('/'));

describe('generateBreadcrumbs — Property 3: Breadcrumb Hierarchy Consistency', () => {
  it('should always start with Home linking to site root', () => {
    fc.assert(
      fc.property(urlPath, (path) => {
        const items = generateBreadcrumbs(path, SITE_URL);
        expect(items[0]).toEqual({ label: 'Home', href: SITE_URL });
      }),
      { numRuns: 200 }
    );
  });

  it('each breadcrumb href should be a prefix of the next href', () => {
    fc.assert(
      fc.property(urlPath, (path) => {
        const items = generateBreadcrumbs(path, SITE_URL);
        for (let i = 0; i < items.length - 1; i++) {
          const currentHref = items[i].href;
          const nextHref = items[i + 1].href;
          // The next href should start with the current href
          // (Home → /locations → /locations/california → ...)
          expect(nextHref.startsWith(currentHref)).toBe(true);
        }
      }),
      { numRuns: 200 }
    );
  });

  it('number of breadcrumb items should equal path depth + 1 (for Home)', () => {
    fc.assert(
      fc.property(urlPath, (path) => {
        const items = generateBreadcrumbs(path, SITE_URL);
        const segments = path.split('/').filter(Boolean);
        expect(items.length).toBe(segments.length + 1);
      }),
      { numRuns: 200 }
    );
  });

  it('the last breadcrumb href should contain the full path', () => {
    fc.assert(
      fc.property(urlPath, (path) => {
        const items = generateBreadcrumbs(path, SITE_URL);
        const lastItem = items[items.length - 1];
        expect(lastItem.href).toBe(`${SITE_URL}${path}/`);
      }),
      { numRuns: 200 }
    );
  });

  it('should return only Home for root path', () => {
    const items = generateBreadcrumbs('/', SITE_URL);
    expect(items).toEqual([{ label: 'Home', href: SITE_URL }]);
  });

  it('non-root breadcrumb hrefs should use trailing slashes', () => {
    fc.assert(
      fc.property(urlPath, (path) => {
        const items = generateBreadcrumbs(path, SITE_URL);
        for (const item of items.slice(1)) {
          expect(item.href.endsWith('/')).toBe(true);
        }
      }),
      { numRuns: 200 }
    );
  });
});

describe('formatSegmentLabel', () => {
  it('should capitalize first letter of each word', () => {
    expect(formatSegmentLabel('pet-cremation')).toBe('Pet Cremation');
    expect(formatSegmentLabel('los-angeles')).toBe('Los Angeles');
    expect(formatSegmentLabel('about')).toBe('About');
  });
});
