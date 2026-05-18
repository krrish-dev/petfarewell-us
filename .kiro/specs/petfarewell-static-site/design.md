# Design Document: Pet Farewell Static Site

## Overview

Pet Farewell (petfarewell.us) is a content-first static website targeting pet owners navigating end-of-life care decisions. The site must combine compassionate UX with rigorous technical SEO — achieving strong Core Web Vitals, rich structured data, and a scalable location page system.

**Technology Choice: Astro**

Astro is selected as the static site generator for the following reasons:

- **Zero-JS by default**: Pages ship as pure HTML unless interactivity is explicitly added, directly supporting LCP < 2.5s and INP < 200ms targets.
- **Islands Architecture**: Any interactive components (mobile nav, FAQ accordions) are hydrated in isolation without blocking the critical rendering path.
- **Content Collections**: Type-safe Markdown/MDX content management with Zod schema validation — ideal for the resource articles and location data.
- **Built-in image optimization**: `<Image>` component automatically generates WebP/AVIF, sets explicit `width`/`height`, and supports `loading="lazy"` and `fetchpriority="high"`.
- **File-based routing**: Maps directly to the required URL structure (`/pet-cremation`, `/resources/[slug]`, `/locations/[state]/[city]`).
- **SEO ecosystem**: First-class support for `<head>` meta tags, canonical URLs, and JSON-LD injection.

**Hosting: Netlify**

Netlify is selected for CDN-backed static hosting because:
- Automatic HTTPS with HTTP→HTTPS redirect at the edge.
- `netlify.toml` supports custom cache-control headers for versioned assets (1-year TTL) and `_redirects` for legacy URL handling.
- Free tier covers the traffic profile of a new content site.
- Instant cache invalidation on deploy.

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Source Repository                        │
│                                                             │
│  src/                                                       │
│  ├── content/          ← Astro Content Collections          │
│  │   ├── resources/    ← Resource article MDX files         │
│  │   └── locations/    ← Location data JSON files           │
│  ├── pages/            ← File-based routing                 │
│  │   ├── index.astro   ← Homepage                           │
│  │   ├── [service].astro ← Service pages                    │
│  │   ├── resources/    ← Resource pages                     │
│  │   └── locations/    ← Location pages                     │
│  ├── layouts/          ← Shared page layouts                │
│  ├── components/       ← Reusable UI components             │
│  └── styles/           ← Global CSS                         │
│                                                             │
│  public/               ← Static assets (images, fonts)      │
│  netlify.toml          ← Hosting config, headers, redirects │
└─────────────────────────────────────────────────────────────┘
                              │
                    astro build (CI/CD)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    dist/ (Static Output)                     │
│  Pre-rendered HTML + optimized CSS/JS/images                │
└─────────────────────────────────────────────────────────────┘
                              │
                    Netlify Deploy
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Netlify CDN (Global Edge Network)               │
│  HTTPS, cache headers, HTTP→HTTPS redirect, 404 handling    │
└─────────────────────────────────────────────────────────────┘
```

### Build Pipeline

```
Content Files (MDX/JSON) + Page Templates (.astro)
        │
        ▼
  Astro Build
  ├── Content collection validation (Zod schemas)
  ├── Static page generation (all routes pre-rendered)
  ├── Image optimization (WebP/AVIF conversion)
  ├── CSS/JS minification
  ├── Sitemap generation (@astrojs/sitemap)
  └── HTML minification
        │
        ▼
  dist/ directory → Netlify deploy
```

---

## Components and Interfaces

### Page Layouts

#### `BaseLayout.astro`
The root layout wrapping every page. Responsible for:
- `<html>`, `<head>`, `<body>` structure
- Injecting `<title>`, `<meta name="description">`, canonical URL, viewport meta
- Open Graph meta tags
- JSON-LD structured data slot
- GA4 script (async/deferred)
- Google Search Console verification meta tag
- "Skip to main content" link (first focusable element)
- `<Header>` and `<Footer>` components

Props interface:
```typescript
interface BaseLayoutProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  structuredData?: object | object[];  // JSON-LD, injected as <script type="application/ld+json">
  noindex?: boolean;
}
```

#### `ServicePageLayout.astro`
Extends `BaseLayout` for cornerstone service pages. Adds:
- Hero section with `<h1>` and CTA
- Table of contents (auto-generated from `<h2>` headings)
- FAQ section with `FAQPage` JSON-LD
- Breadcrumb component + `BreadcrumbList` JSON-LD
- Internal links section

#### `ResourcePageLayout.astro`
Extends `BaseLayout` for resource articles. Adds:
- `Article` JSON-LD with `datePublished`/`dateModified`
- Breadcrumb reflecting `/resources/[slug]`
- Publication date display
- Related pages section

#### `LocationPageLayout.astro`
Extends `BaseLayout` for location pages. Adds:
- `LocalBusiness` JSON-LD
- NAP display block
- Breadcrumb reflecting `/locations/[state]/[city]`
- Available services list

### UI Components

#### `Header.astro`
- Site logo (linked to homepage)
- Primary navigation links (service categories)
- Prominent CTA button ("Find Support")
- Mobile: collapsible hamburger menu (Astro island, hydrated on client)
- Keyboard navigable; visible focus indicators

#### `Footer.astro`
- NAP information
- Links to all primary service pages
- Links to resources index, locations index, About, Contact, Privacy Policy
- Copyright notice

#### `Breadcrumb.astro`
Props: `items: Array<{ label: string; href: string }>`
- Renders `<nav aria-label="Breadcrumb">` with structured list
- Outputs corresponding `BreadcrumbList` JSON-LD

#### `HeroSection.astro`
Props: `headline: string; subheadline: string; ctaText: string; ctaHref: string; image: ImageMetadata`
- Renders above-the-fold section
- `<h1>` contains primary keyword
- CTA uses empathetic language
- Hero image uses `fetchpriority="high"` and `<link rel="preload">`

#### `TableOfContents.astro`
Props: `headings: Array<{ depth: number; slug: string; text: string }>`
- Auto-generated from page `<h2>` elements
- Renders as `<nav aria-label="Table of contents">`

#### `FAQSection.astro`
Props: `items: Array<{ question: string; answer: string }>`
- Renders FAQ list with accessible `<details>`/`<summary>` or heading+paragraph pattern
- Outputs `FAQPage` JSON-LD

#### `StructuredData.astro`
Props: `data: object | object[]`
- Renders `<script type="application/ld+json">` in `<head>`
- Accepts any Schema.org JSON-LD object

#### `OptimizedImage.astro`
Thin wrapper around Astro's `<Image>` component:
- Enforces explicit `width`/`height`
- Defaults to WebP format
- Requires non-empty `alt` prop (or `alt=""` for decorative)

#### `MobileNav.astro` (Astro Island)
- Client-side hydrated (`client:load`)
- Collapsible navigation for viewports < 768px
- Keyboard accessible with visible focus indicators

### Structured Data Builders

A set of TypeScript utility functions in `src/lib/schema.ts` that construct validated JSON-LD objects:

```typescript
buildOrganizationSchema(org: OrgData): WithContext<Organization>
buildBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList>
buildLocalBusinessSchema(location: LocationData): WithContext<LocalBusiness>
buildArticleSchema(article: ArticleData): WithContext<Article>
buildFAQSchema(items: FAQItem[]): WithContext<FAQPage>
buildProductSchema(product: ProductData): WithContext<Product>
```

These functions are called in page templates and their output is passed to `<StructuredData>` or `BaseLayout`'s `structuredData` prop.

---

## Data Models

### Content Collections

#### `resources` Collection
File path: `src/content/resources/[slug].mdx`

```typescript
// src/content/config.ts
const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.date(),
    dateModified: z.date(),
    author: z.string().default('Pet Farewell Editorial Team'),
    ogImage: z.string().optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    relatedPages: z.array(z.string()).optional(), // slugs of related pages
  }),
});
```

#### `locations` Collection
File path: `src/content/locations/[state]/[city].json`

```typescript
const locationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    cityName: z.string(),
    stateName: z.string(),
    stateSlug: z.string(),   // e.g. "california"
    citySlug: z.string(),    // e.g. "los-angeles"
    businessName: z.string(),
    address: z.object({
      streetAddress: z.string(),
      city: z.string(),
      state: z.string(),     // 2-letter abbreviation
      postalCode: z.string(),
      country: z.string().default('US'),
    }),
    telephone: z.string(),
    geo: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    services: z.array(z.enum(['pet-cremation', 'at-home-pet-euthanasia'])),
    serviceArea: z.string().optional(),
  }),
});
```

### Service Page Data
Service pages are static `.astro` files (not content collections) since their content is hand-authored. Each service page imports its FAQ items and related pages from a co-located data file or inline.

### Site Configuration
`src/config/site.ts` — global constants:

```typescript
export const SITE_CONFIG = {
  name: 'Pet Farewell',
  url: 'https://petfarewell.us',
  description: 'Compassionate pet end-of-life care resources and services.',
  logo: '/images/logo.svg',
  nap: {
    telephone: '+1-XXX-XXX-XXXX',
    email: 'hello@petfarewell.us',
  },
  ga4MeasurementId: 'G-XXXXXXXXXX',
  gscVerificationToken: 'XXXXXXXXXX',
  organization: {
    name: 'Pet Farewell',
    url: 'https://petfarewell.us',
    logo: 'https://petfarewell.us/images/logo.svg',
  },
};
```

### URL Structure Map

```
/                                          ← Homepage
/pet-cremation                             ← Service page
/dog-cremation
/cat-cremation
/at-home-pet-euthanasia
/pet-hospice
/pet-grief-support
/pet-urns
/pet-memorial-ideas
/pet-burial
/resources                                 ← Resources index
/resources/quality-of-life-scale-dog
/resources/pet-cremation-cost
/resources/backyard-pet-burial-laws
/locations                                 ← Locations index
/locations/[state]                         ← State page (dynamic)
/locations/[state]/[city]                  ← City page (dynamic)
/locations/[state]/[city]/pet-cremation    ← Service-specific (dynamic)
/locations/[state]/[city]/at-home-pet-euthanasia
/about
/contact
/privacy-policy
/terms-of-service
/404                                       ← Custom 404
```

### Sitemap Generation
`@astrojs/sitemap` integration automatically generates `/sitemap.xml` from all pre-rendered routes. Configuration in `astro.config.mjs` excludes `/404` and any `noindex` pages.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Canonical URL Uniqueness

*For any* two distinct pages on the site, their canonical URL values SHALL be different — no two pages share the same canonical URL.

**Validates: Requirements 2.2**

### Property 2: Structured Data Schema Validity

*For any* page that includes a JSON-LD block, the structured data object SHALL be a valid Schema.org type with all required fields present and non-empty.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

### Property 3: Breadcrumb Hierarchy Consistency

*For any* page with a `BreadcrumbList` structured data block, the breadcrumb items SHALL reflect the page's actual URL hierarchy — each breadcrumb item's `item` URL SHALL be a prefix of the next item's URL.

**Validates: Requirements 3.2, 5.5, 6.3, 7.4**

### Property 4: Location Page NAP Consistency

*For any* location page, the NAP data rendered in visible HTML content SHALL exactly match the corresponding fields in the `LocalBusiness` JSON-LD structured data block on that page.

**Validates: Requirements 7.2, 7.3**

### Property 5: Slug Format Invariant

*For any* page URL generated by the build, the URL path SHALL contain only lowercase letters, digits, hyphens, and forward slashes — no uppercase letters, underscores, spaces, or query parameters.

**Validates: Requirements 1.6**

### Property 6: FAQ Structured Data Completeness

*For any* page that renders a FAQ section, the `FAQPage` JSON-LD block SHALL contain an entry for every question-answer pair rendered in the visible HTML — no FAQ item visible on the page is absent from the structured data.

**Validates: Requirements 3.6, 4.5, 5.4**

### Property 7: Resource Article Metadata Round-Trip

*For any* resource article MDX file, the `datePublished` and `dateModified` fields parsed from frontmatter SHALL appear in both the rendered `Article` JSON-LD block and the visible page content without data loss or transformation.

**Validates: Requirements 6.2**

### Property 8: Internal Link Validity

*For any* internal link (`href` starting with `/`) rendered on any page, the target URL SHALL correspond to a page that exists in the build output — no broken internal links.

**Validates: Requirements 5.6, 6.5**

---

## Error Handling

### Build-Time Errors

**Content validation failures**: Astro's Zod-based content collection schemas will throw typed errors at build time if any MDX/JSON file is missing required fields or has invalid types. The build fails fast with a descriptive error message pointing to the offending file and field.

**Missing image assets**: Astro's `<Image>` component throws a build-time error if a referenced image file does not exist. All images must be present in `public/` or `src/assets/` before the build succeeds.

**Broken internal links**: A custom build plugin (`src/plugins/check-internal-links.ts`) traverses the generated HTML output and reports any `href` pointing to a non-existent route. The build fails if broken links are found.

**Duplicate canonical URLs**: A build-time check validates that no two pages produce the same canonical URL value.

### Runtime / User-Facing Errors

**404 Not Found**: A custom `src/pages/404.astro` page is rendered. It includes:
- A compassionate message acknowledging the user may be in a difficult moment
- Navigation links to the homepage and all primary service pages
- The standard `<Header>` and `<Footer>`
- Proper `<title>` and meta description

**Netlify handles 404 routing**: The `netlify.toml` maps all unmatched routes to the custom 404 page with a `404` HTTP status code.

### Structured Data Errors

All JSON-LD builder functions in `src/lib/schema.ts` use TypeScript strict types. Invalid structured data is caught at compile time. Post-build, the CI pipeline runs Google's Rich Results Test API (or `schema-dts` validation) against a sample of pages to catch any runtime schema issues before deployment.

---

## Testing Strategy

### Unit Tests (Vitest)

Unit tests cover the pure logic layer — functions that do not depend on the DOM or Astro's build pipeline:

- **`src/lib/schema.ts`**: Test each JSON-LD builder function with valid and invalid inputs. Verify required fields are present, types are correct, and `@context`/`@type` values are accurate.
- **`src/lib/slugify.ts`**: Test the slug normalization function against a range of inputs including uppercase, underscores, special characters, and Unicode.
- **`src/lib/sitemap.ts`**: Test sitemap URL generation logic — verify all routes are included, excluded routes are absent, and `<lastmod>` dates are formatted correctly.
- **`src/lib/breadcrumb.ts`**: Test breadcrumb item generation from URL paths.

### Property-Based Tests (fast-check, minimum 100 iterations each)

Property-based tests validate universal invariants across generated inputs. Each test is tagged with its design property reference.

**Feature: petfarewell-static-site, Property 1: Canonical URL Uniqueness**
- Generate a set of random page route configurations; verify all produced canonical URLs are unique.

**Feature: petfarewell-static-site, Property 2: Structured Data Schema Validity**
- Generate random valid inputs for each schema builder; verify the output always contains required fields and correct `@type` values.

**Feature: petfarewell-static-site, Property 3: Breadcrumb Hierarchy Consistency**
- Generate random URL paths of varying depth; verify the breadcrumb items produced always form a valid prefix chain.

**Feature: petfarewell-static-site, Property 4: Location Page NAP Consistency**
- Generate random `LocationData` objects; verify that the NAP fields extracted for HTML rendering exactly match those embedded in the `LocalBusiness` JSON-LD output.

**Feature: petfarewell-static-site, Property 5: Slug Format Invariant**
- Generate random strings (including uppercase, spaces, underscores, Unicode); verify `slugify()` always produces a string matching `/^[a-z0-9-/]+$/`.

**Feature: petfarewell-static-site, Property 6: FAQ Structured Data Completeness**
- Generate random arrays of FAQ items; verify `buildFAQSchema()` output contains exactly the same number of entries as the input array, with matching question/answer text.

**Feature: petfarewell-static-site, Property 7: Resource Article Metadata Round-Trip**
- Generate random article metadata objects; verify that parsing frontmatter and passing through the `buildArticleSchema()` function preserves `datePublished` and `dateModified` without mutation.

**Feature: petfarewell-static-site, Property 8: Internal Link Validity**
- Build-time integration: after `astro build`, parse all HTML files and collect internal `href` values; verify each maps to an existing file in `dist/`.

### Integration Tests

- **Sitemap completeness**: After `astro build`, parse `dist/sitemap.xml` and verify all expected routes are present.
- **robots.txt**: Verify `dist/robots.txt` permits crawling and references the sitemap URL.
- **404 page**: Verify `dist/404.html` exists and contains navigation links.
- **Structured data validation**: Run `schema-dts` or a JSON Schema validator against sampled JSON-LD blocks from built HTML files.

### Accessibility Tests

- Run `axe-core` against built HTML pages to catch WCAG 2.1 AA violations automatically.
- Manual keyboard navigation testing for the mobile nav component.

### Performance Validation

- PageSpeed Insights / Lighthouse CI run in CI against the deployed preview URL.
- Thresholds enforced: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Lighthouse CI configuration stored in `lighthouserc.json`.
