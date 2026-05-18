# Implementation Tasks: Pet Farewell Static Site

## Task List

- [x] 1. Project Setup and Configuration
  - [x] 1.1 Initialize Astro project with static output mode and TypeScript
  - [x] 1.2 Install and configure required integrations: @astrojs/sitemap, @astrojs/image, sharp
  - [x] 1.3 Create netlify.toml with cache-control headers for versioned assets and HTTP→HTTPS redirect configuration
  - [x] 1.4 Create src/config/site.ts with SITE_CONFIG constants (name, URL, NAP, GA4 ID, GSC token)
  - [x] 1.5 Set up Vitest and fast-check for unit and property-based testing
  - [x] 1.6 Configure Lighthouse CI (lighthouserc.json) with LCP < 2.5s, CLS < 0.1, INP < 200ms thresholds

- [x] 2. Content Collections and Data Models
  - [x] 2.1 Create src/content/config.ts defining the resources collection schema with Zod (title, description, datePublished, dateModified, author, ogImage, faqs, relatedPages)
  - [x] 2.2 Create src/content/config.ts entry for the locations collection schema with Zod (cityName, stateName, stateSlug, citySlug, businessName, address, telephone, geo, services)
  - [x] 2.3 Create placeholder MDX files for the three launch resource articles: quality-of-life-scale-dog.mdx, pet-cremation-cost.mdx, backyard-pet-burial-laws.mdx
  - [x] 2.4 Create at least one sample location JSON file to validate the location collection schema

- [x] 3. Utility Library
  - [x] 3.1 Implement src/lib/slugify.ts — slug normalization function (lowercase, hyphens, no underscores/uppercase/special chars)
  - [x] 3.2 Implement src/lib/schema.ts — JSON-LD builder functions: buildOrganizationSchema, buildBreadcrumbSchema, buildLocalBusinessSchema, buildArticleSchema, buildFAQSchema, buildProductSchema
  - [x] 3.3 Implement src/lib/breadcrumb.ts — breadcrumb item generation from URL path strings
  - [x] 3.4 Write property-based tests for slugify() verifying the slug format invariant across random string inputs (Feature: petfarewell-static-site, Property 5: Slug Format Invariant)
  - [x] 3.5 Write property-based tests for buildBreadcrumbSchema() verifying hierarchy consistency across random URL paths (Feature: petfarewell-static-site, Property 3: Breadcrumb Hierarchy Consistency)
  - [x] 3.6 Write property-based tests for buildFAQSchema() verifying completeness — output contains exactly the same items as input (Feature: petfarewell-static-site, Property 6: FAQ Structured Data Completeness)
  - [x] 3.7 Write property-based tests for buildArticleSchema() verifying datePublished and dateModified round-trip (Feature: petfarewell-static-site, Property 7: Resource Article Metadata Round-Trip)
  - [x] 3.8 Write property-based tests for buildLocalBusinessSchema() verifying NAP field consistency between input and output (Feature: petfarewell-static-site, Property 4: Location Page NAP Consistency)
  - [x] 3.9 Write property-based tests for all schema builders verifying required fields and correct @type values (Feature: petfarewell-static-site, Property 2: Structured Data Schema Validity)

- [x] 4. Base Layout and Global Components
  - [x] 4.1 Create src/layouts/BaseLayout.astro with <html>, <head>, <body> structure; inject title, description, canonical URL, viewport meta, Open Graph tags, JSON-LD slot, GA4 async script, GSC verification meta, and "Skip to main content" link
  - [x] 4.2 Create src/components/Header.astro with site logo, primary navigation links, and CTA button
  - [x] 4.3 Create src/components/MobileNav.astro as an Astro island (client:load) with collapsible hamburger menu for viewports < 768px
  - [x] 4.4 Create src/components/Footer.astro with NAP, all primary service links, resources index, locations index, About, Contact, Privacy Policy links, and copyright notice
  - [x] 4.5 Create src/components/Breadcrumb.astro rendering <nav aria-label="Breadcrumb"> from items array
  - [x] 4.6 Create src/components/HeroSection.astro with h1, subheadline, CTA button, and hero image using fetchpriority="high" and <link rel="preload">
  - [x] 4.7 Create src/components/TableOfContents.astro generating TOC from h2 headings array
  - [x] 4.8 Create src/components/FAQSection.astro rendering FAQ items and outputting FAQPage JSON-LD
  - [x] 4.9 Create src/components/StructuredData.astro rendering <script type="application/ld+json"> in <head>
  - [x] 4.10 Create src/components/OptimizedImage.astro wrapping Astro's <Image> component, enforcing explicit width/height and WebP format
  - [x] 4.11 Create global CSS in src/styles/global.css: compassionate color palette, humanist sans-serif body font at minimum 16px, font-display: swap, WCAG 2.1 AA color contrast

- [x] 5. Page Layouts
  - [x] 5.1 Create src/layouts/ServicePageLayout.astro extending BaseLayout with HeroSection, TableOfContents, FAQSection, Breadcrumb, and internal links section
  - [x] 5.2 Create src/layouts/ResourcePageLayout.astro extending BaseLayout with Article JSON-LD, Breadcrumb, publication date display, and related pages section
  - [x] 5.3 Create src/layouts/LocationPageLayout.astro extending BaseLayout with LocalBusiness JSON-LD, NAP display block, Breadcrumb, and available services list

- [x] 6. Homepage
  - [x] 6.1 Create src/pages/index.astro with HeroSection (primary headline, value proposition, CTA to /pet-cremation)
  - [x] 6.2 Add navigation section to homepage linking to all 12 Cornerstone Pages
  - [x] 6.3 Add "About Pet Farewell" section to homepage
  - [x] 6.4 Add trust signals section (testimonials or affiliations)
  - [x] 6.5 Add FAQ section with at least 4 questions and FAQPage JSON-LD
  - [x] 6.6 Add Organization JSON-LD to homepage using buildOrganizationSchema()

- [x] 7. Cornerstone Service Pages
  - [x] 7.1 Create src/pages/pet-cremation.astro using ServicePageLayout with h1 containing primary keyword, TOC, FAQ (min 3 items), Breadcrumb, BreadcrumbList JSON-LD, and at least 2 internal links
  - [x] 7.2 Create src/pages/dog-cremation.astro (same structure as 7.1)
  - [x] 7.3 Create src/pages/cat-cremation.astro
  - [x] 7.4 Create src/pages/at-home-pet-euthanasia.astro
  - [x] 7.5 Create src/pages/pet-hospice.astro
  - [x] 7.6 Create src/pages/pet-grief-support.astro
  - [x] 7.7 Create src/pages/pet-urns.astro with Product JSON-LD in addition to standard service page structure
  - [x] 7.8 Create src/pages/pet-memorial-ideas.astro
  - [x] 7.9 Create src/pages/pet-burial.astro
  - [x] 7.10 Ensure each service page includes at least one human or pet photograph with appropriate alt text

- [x] 8. Resource Pages
  - [x] 8.1 Create src/pages/resources/index.astro listing all published resource articles with titles, descriptions, and publication dates
  - [x] 8.2 Create src/pages/resources/[slug].astro dynamic route rendering MDX content with ResourcePageLayout, Article JSON-LD, Breadcrumb, and at least 2 internal links
  - [x] 8.3 Write content for quality-of-life-scale-dog.mdx resource article
  - [x] 8.4 Write content for pet-cremation-cost.mdx resource article
  - [x] 8.5 Write content for backyard-pet-burial-laws.mdx resource article

- [x] 9. Location Pages
  - [x] 9.1 Create src/pages/locations/index.astro listing all states with available services
  - [x] 9.2 Create src/pages/locations/[state]/index.astro listing all cities in that state with service links
  - [x] 9.3 Create src/pages/locations/[state]/[city]/index.astro with LocationPageLayout, LocalBusiness JSON-LD, NAP, Breadcrumb, and available services
  - [x] 9.4 Create src/pages/locations/[state]/[city]/pet-cremation.astro service-specific location page
  - [x] 9.5 Create src/pages/locations/[state]/[city]/at-home-pet-euthanasia.astro service-specific location page
  - [x] 9.6 Populate at least one complete state/city location data JSON file to validate the full location page system

- [x] 10. Supporting Pages
  - [x] 10.1 Create src/pages/about.astro with Organization JSON-LD and mission description
  - [x] 10.2 Create src/pages/contact.astro with contact form (with consent notice before submission) and NAP
  - [x] 10.3 Create src/pages/privacy-policy.astro describing data collection, usage, and opt-out
  - [x] 10.4 Create src/pages/terms-of-service.astro
  - [x] 10.5 Create src/pages/404.astro with compassionate message and navigation links to homepage and primary service pages

- [x] 11. Technical SEO Infrastructure
  - [x] 11.1 Configure @astrojs/sitemap to generate /sitemap.xml excluding /404 and noindex pages, with lastmod dates
  - [x] 11.2 Create public/robots.txt permitting crawling of all public pages and referencing /sitemap.xml
  - [x] 11.3 Verify every page template passes unique title and description to BaseLayout
  - [x] 11.4 Implement build-time internal link checker plugin (src/plugins/check-internal-links.ts) that fails the build on broken internal links
  - [x] 11.5 Implement build-time canonical URL uniqueness check that fails the build if two pages share the same canonical URL

- [x] 12. Performance Optimization
  - [x] 12.1 Configure Astro image optimization to output WebP/AVIF with explicit width and height on all images
  - [x] 12.2 Add <link rel="preload"> for the LCP hero image in each page's <head>
  - [x] 12.3 Enable HTML, CSS, and JS minification in astro.config.mjs production build
  - [x] 12.4 Configure netlify.toml cache-control headers: max-age=31536000 for versioned assets (/_astro/*), max-age=0 for HTML
  - [x] 12.5 Add font-display: swap to all @font-face declarations in global CSS

- [x] 13. Accessibility
  - [x] 13.1 Verify "Skip to main content" link is the first focusable element on every page
  - [x] 13.2 Verify all interactive elements have visible focus indicators in CSS
  - [x] 13.3 Verify all informational images have non-empty alt text; decorative images use alt=""
  - [x] 13.4 Run axe-core accessibility audit against built HTML pages and fix all WCAG 2.1 AA violations

- [x] 14. Integration Tests
  - [x] 14.1 Write integration test verifying dist/sitemap.xml exists, is valid XML, and contains all expected routes
  - [x] 14.2 Write integration test verifying dist/robots.txt permits crawling and references sitemap URL
  - [x] 14.3 Write integration test verifying dist/404.html exists and contains navigation links
  - [x] 14.4 Write integration test parsing all built HTML files and verifying each has exactly one h1 element (Feature: petfarewell-static-site, Property: Single H1 Per Page)
  - [x] 14.5 Write integration test parsing all built HTML files and verifying each has og:title, og:description, og:image, og:url, og:type meta tags (Feature: petfarewell-static-site, Property: Open Graph Tags Completeness)
  - [x] 14.6 Write integration test verifying all internal href values in built HTML map to existing files in dist/ (Feature: petfarewell-static-site, Property 8: Internal Link Validity)
  - [x] 14.7 Write integration test verifying all canonical URLs across built pages are unique (Feature: petfarewell-static-site, Property 1: Canonical URL Uniqueness)
  - [x] 14.8 Write integration test validating all JSON-LD blocks in built HTML against schema-dts or JSON Schema
