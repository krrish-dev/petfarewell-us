# Requirements Document

## Introduction

Pet Farewell (petfarewell.us) is a static website serving as a trust-first, conversion-capable resource hub for pet end-of-life care and aftercare services. The site targets pet owners navigating emotionally difficult decisions — from hospice and at-home euthanasia through cremation, burial, memorials, and grief support. The site must be SEO-optimized from the ground up, technically sound, and designed with a compassionate tone appropriate for the niche. It will launch with 12 cornerstone content pages, full technical SEO infrastructure, structured data markup, and a location page system to support local service discovery.

## Glossary

- **Site**: The petfarewell.us static website
- **Cornerstone_Page**: One of the 12 primary content pages identified in the SEO strategy
- **Resource_Page**: An article or guide published under the /resources URL path
- **Location_Page**: A city- or state-level landing page under the /locations URL path
- **Structured_Data**: JSON-LD markup embedded in page `<head>` elements conforming to Schema.org vocabulary
- **CWV**: Core Web Vitals — the set of Google performance metrics (LCP, INP, CLS)
- **LCP**: Largest Contentful Paint — measures loading performance
- **INP**: Interaction to Next Paint — measures interactivity responsiveness
- **CLS**: Cumulative Layout Shift — measures visual stability
- **Sitemap**: The XML sitemap file submitted to Google Search Console
- **Canonical_URL**: The preferred URL declared via `<link rel="canonical">` to prevent duplicate content indexing
- **NAP**: Name, Address, Phone — the consistent business contact data used across local SEO citations
- **Schema_Type**: A structured data vocabulary type from Schema.org (e.g., Organization, FAQPage, LocalBusiness)
- **Slug**: The URL path segment for a page, using lowercase words separated by hyphens
- **Static_Generator**: The build tool that compiles source files into deployable static HTML, CSS, and JS
- **Hero_Section**: The primary above-the-fold section of a page containing the headline, subheadline, and primary CTA
- **CTA**: Call to Action — a button or link prompting the user toward a conversion goal
- **Breadcrumb**: A navigational element showing the user's current location in the site hierarchy

---

## Requirements

### Requirement 1: Site Architecture and URL Structure

**User Story:** As a site owner, I want a well-structured URL hierarchy, so that search engines can crawl and index all pages efficiently and users can navigate intuitively.

#### Acceptance Criteria

1. THE Site SHALL serve all pages over HTTPS with HTTP requests redirecting to HTTPS.
2. THE Site SHALL expose a canonical URL for every page via a `<link rel="canonical" href="[absolute-url]">` tag in the `<head>`.
3. THE Site SHALL implement the following top-level service page slugs: `/pet-cremation`, `/dog-cremation`, `/cat-cremation`, `/at-home-pet-euthanasia`, `/pet-hospice`, `/pet-grief-support`, `/pet-urns`, `/pet-memorial-ideas`, `/pet-burial`.
4. THE Site SHALL implement resource article pages under the `/resources` path, including `/resources/quality-of-life-scale-dog`, `/resources/pet-cremation-cost`, and `/resources/backyard-pet-burial-laws`.
5. THE Site SHALL implement location pages under the `/locations/[state]` and `/locations/[state]/[city]` path patterns, with service-specific sub-pages at `/locations/[state]/[city]/pet-cremation` and `/locations/[state]/[city]/at-home-pet-euthanasia`.
6. THE Site SHALL use lowercase hyphen-separated slugs for all URLs, with no underscores, uppercase letters, or query parameters in canonical URLs.
7. WHEN a user requests a URL that does not exist, THE Site SHALL return a custom 404 page with navigation links to the homepage and primary service pages.

---

### Requirement 2: Technical SEO Infrastructure

**User Story:** As a site owner, I want the site to meet all technical SEO requirements, so that search engines can discover, crawl, index, and rank the site's pages.

#### Acceptance Criteria

1. THE Site SHALL generate and serve a valid XML sitemap at `/sitemap.xml` listing all indexable page URLs with their `<lastmod>` dates.
2. THE Site SHALL serve a `robots.txt` file at `/robots.txt` that permits crawling of all public pages and references the sitemap URL.
3. WHEN a page is rendered, THE Site SHALL include a `<title>` tag and a `<meta name="description">` tag in the `<head>` with content unique to that page.
4. THE Site SHALL include `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page to support mobile-first indexing.
5. THE Site SHALL render the same primary content on mobile and desktop viewports (no mobile-only content omissions).
6. THE Site SHALL achieve a Largest Contentful Paint (LCP) score below 2.5 seconds on a simulated mobile connection as measured by PageSpeed Insights.
7. THE Site SHALL achieve a Cumulative Layout Shift (CLS) score below 0.1 as measured by PageSpeed Insights.
8. THE Site SHALL achieve an Interaction to Next Paint (INP) score below 200 milliseconds as measured by PageSpeed Insights.
9. THE Site SHALL serve all images in a next-generation format (WebP or AVIF) with explicit `width` and `height` attributes to prevent layout shift.
10. THE Site SHALL include `<link rel="preload">` hints for the Largest Contentful Paint image on each page.
11. WHEN a page contains heading elements, THE Site SHALL structure them with exactly one `<h1>` per page, followed by hierarchically ordered `<h2>` and `<h3>` elements.
12. THE Site SHALL include Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) on every page.

---

### Requirement 3: Structured Data Markup

**User Story:** As a site owner, I want structured data on every relevant page, so that search engines can generate rich results and better understand the site's content and services.

#### Acceptance Criteria

1. THE Site SHALL include an `Organization` Schema.org JSON-LD block on the homepage and About page, containing the organization name, URL, logo, and contact information.
2. THE Site SHALL include a `BreadcrumbList` Schema.org JSON-LD block on all pages except the homepage, reflecting the page's position in the URL hierarchy.
3. THE Site SHALL include a `LocalBusiness` Schema.org JSON-LD block on all Location_Pages, containing the business name, address, telephone, geo coordinates, and service area.
4. THE Site SHALL include an `Article` or `BlogPosting` Schema.org JSON-LD block on all Resource_Pages, containing the headline, author, datePublished, and dateModified fields.
5. THE Site SHALL include a `Product` Schema.org JSON-LD block on the `/pet-urns` page and any urn or memorial product listing pages, containing the product name, description, and image.
6. WHEN a page contains a section with question-and-answer content, THE Site SHALL include a `FAQPage` Schema.org JSON-LD block listing each question and its answer.
7. THE Site SHALL validate all Structured_Data against Google's Rich Results Test with zero critical errors.

---

### Requirement 4: Homepage

**User Story:** As a visitor arriving at petfarewell.us, I want a clear, compassionate homepage, so that I immediately understand what services are available and feel supported during a difficult time.

#### Acceptance Criteria

1. THE Site SHALL render a Hero_Section on the homepage containing a primary headline, a one-sentence value proposition, and a primary CTA linking to the most prominent service page.
2. THE Site SHALL display a navigation section on the homepage linking to all 12 Cornerstone_Pages.
3. THE Site SHALL include a brief "About Pet Farewell" section on the homepage describing the organization's mission.
4. THE Site SHALL include a trust signals section on the homepage containing at least one of: testimonials, professional affiliations, or accreditation badges.
5. THE Site SHALL include a FAQ section on the homepage with at least 4 questions and answers covering common pet end-of-life topics, accompanied by `FAQPage` Structured_Data.
6. THE Site SHALL include a footer on every page containing NAP information, links to all primary service pages, a privacy policy link, and a copyright notice.

---

### Requirement 5: Cornerstone Service Pages

**User Story:** As a pet owner researching end-of-life options, I want detailed, compassionate service pages, so that I can make informed decisions and find the help I need.

#### Acceptance Criteria

1. THE Site SHALL publish the following 12 Cornerstone_Pages: Homepage, Pet Cremation Guide (`/pet-cremation`), Dog Cremation Guide (`/dog-cremation`), Cat Cremation Guide (`/cat-cremation`), At-Home Pet Euthanasia Guide (`/at-home-pet-euthanasia`), Pet Hospice Guide (`/pet-hospice`), Quality of Life Scale (`/resources/quality-of-life-scale-dog`), Pet Grief Support (`/pet-grief-support`), Pet Cremation Cost Guide (`/resources/pet-cremation-cost`), Pet Urns Buying Guide (`/pet-urns`), Pet Memorial Ideas (`/pet-memorial-ideas`), and Pet Burial Guide (`/pet-burial`).
2. WHEN a Cornerstone_Page is rendered, THE Site SHALL include a Hero_Section with a page-specific `<h1>` containing the primary target keyword for that page.
3. WHEN a Cornerstone_Page is rendered, THE Site SHALL include a table of contents linking to the major `<h2>` sections on that page.
4. WHEN a Cornerstone_Page is rendered, THE Site SHALL include a FAQ section with at least 3 questions and answers relevant to the page topic, accompanied by `FAQPage` Structured_Data.
5. WHEN a Cornerstone_Page is rendered, THE Site SHALL include a Breadcrumb navigation element and the corresponding `BreadcrumbList` Structured_Data.
6. WHEN a Cornerstone_Page is rendered, THE Site SHALL include internal links to at least 2 other Cornerstone_Pages or Resource_Pages that are topically related.
7. THE Site SHALL include a compassionate, supportive tone throughout all Cornerstone_Page copy, avoiding clinical or transactional language in emotional sections.

---

### Requirement 6: Resource Pages

**User Story:** As a pet owner seeking decision-support information, I want in-depth resource articles, so that I can understand my options and feel confident in the choices I make.

#### Acceptance Criteria

1. THE Site SHALL publish the following Resource_Pages at launch: `/resources/quality-of-life-scale-dog`, `/resources/pet-cremation-cost`, and `/resources/backyard-pet-burial-laws`.
2. WHEN a Resource_Page is rendered, THE Site SHALL include `Article` Structured_Data with `datePublished` and `dateModified` fields.
3. WHEN a Resource_Page is rendered, THE Site SHALL include a Breadcrumb navigation element reflecting the `/resources/[slug]` hierarchy.
4. THE Site SHALL include a `/resources` index page listing all published Resource_Pages with their titles, descriptions, and publication dates.
5. WHEN a Resource_Page is rendered, THE Site SHALL include internal links to at least 2 related Cornerstone_Pages or other Resource_Pages.

---

### Requirement 7: Location Pages

**User Story:** As a pet owner looking for local services, I want location-specific pages, so that I can find pet end-of-life services available in my area.

#### Acceptance Criteria

1. THE Site SHALL generate Location_Pages only for geographic areas where services are actually available, to avoid thin or misleading content.
2. WHEN a Location_Page is rendered, THE Site SHALL include a `LocalBusiness` Structured_Data block with the business name, full address, telephone number, and geo coordinates for that location.
3. WHEN a Location_Page is rendered, THE Site SHALL include NAP information in visible page content consistent with the `LocalBusiness` Structured_Data.
4. WHEN a Location_Page is rendered, THE Site SHALL include a Breadcrumb navigation element reflecting the `/locations/[state]/[city]` hierarchy.
5. THE Site SHALL include a `/locations` index page listing all states with available services, linking to each state-level page.
6. WHEN a state-level Location_Page is rendered, THE Site SHALL list all cities within that state where services are available, with links to each city page.
7. THE Site SHALL include service-specific sub-pages at `/locations/[state]/[city]/pet-cremation` and `/locations/[state]/[city]/at-home-pet-euthanasia` for each city where those services are offered.

---

### Requirement 8: Navigation and Site-Wide UX

**User Story:** As a visitor to petfarewell.us, I want clear, accessible navigation, so that I can find the information I need quickly regardless of which page I land on.

#### Acceptance Criteria

1. THE Site SHALL include a persistent header on every page containing the site logo, primary navigation links to the main service categories, and a prominent CTA button.
2. THE Site SHALL render a Breadcrumb navigation element on all pages below the homepage, positioned between the header and the page's `<h1>`.
3. THE Site SHALL include a footer on every page containing links to all primary service pages, the resources index, the locations index, an About page, a Contact page, a Privacy Policy page, and a copyright notice.
4. THE Site SHALL be fully navigable using keyboard-only input, with visible focus indicators on all interactive elements.
5. THE Site SHALL meet WCAG 2.1 Level AA color contrast requirements for all text and interactive elements.
6. THE Site SHALL include descriptive `alt` text on all informational images; decorative images SHALL use `alt=""`.
7. WHEN a user is on a mobile viewport (width below 768px), THE Site SHALL render a responsive layout with a collapsible navigation menu.

---

### Requirement 9: Performance and Hosting

**User Story:** As a site owner, I want the site to load fast and remain reliably available, so that users have a good experience and search engines reward the site with higher rankings.

#### Acceptance Criteria

1. THE Site SHALL be built as a fully static site (pre-rendered HTML, CSS, and JS) with no server-side rendering at request time.
2. THE Site SHALL serve all static assets (CSS, JS, fonts, images) with cache-control headers set to a minimum of 1 year for versioned assets.
3. THE Site SHALL minify all HTML, CSS, and JavaScript files in the production build.
4. THE Site SHALL serve fonts using `font-display: swap` to prevent invisible text during font loading.
5. THE Site SHALL be deployable to a CDN-backed static hosting platform (such as Netlify, Vercel, or Cloudflare Pages) with global edge distribution.
6. THE Site SHALL include a `_redirects` or equivalent configuration file to handle HTTP-to-HTTPS redirects and any legacy URL redirects.

---

### Requirement 10: Compassionate Design and Brand

**User Story:** As a pet owner in distress, I want the site to feel warm, trustworthy, and supportive, so that I feel comfortable engaging with the content and services during a difficult time.

#### Acceptance Criteria

1. THE Site SHALL use a color palette that conveys calm and compassion, avoiding high-contrast aggressive colors (e.g., bright red or orange as primary colors).
2. THE Site SHALL use a legible serif or humanist sans-serif typeface for body copy at a minimum font size of 16px.
3. THE Site SHALL avoid auto-playing audio or video on any page.
4. THE Site SHALL include a visible "Skip to main content" link as the first focusable element on every page for screen reader and keyboard users.
5. WHEN a page contains a CTA, THE Site SHALL use empathetic, non-pressuring language (e.g., "Learn more", "Find support", "Explore options") rather than urgency-driven language.
6. THE Site SHALL include at least one human or pet photograph on each Cornerstone_Page to create emotional connection, with appropriate `alt` text.

---

### Requirement 11: Analytics and Measurement

**User Story:** As a site owner, I want analytics and measurement tools integrated, so that I can track organic search performance and optimize the site over time.

#### Acceptance Criteria

1. THE Site SHALL include a Google Analytics 4 (GA4) tracking snippet on every page, loaded in a privacy-respecting manner (deferred or async).
2. THE Site SHALL include a Google Search Console verification meta tag or DNS verification method to enable Search Console access.
3. THE Site SHALL generate a valid XML sitemap that can be submitted directly to Google Search Console.
4. THE Site SHALL not load analytics scripts in a way that blocks page rendering or degrades CWV scores.

---

### Requirement 12: Privacy and Legal

**User Story:** As a site visitor, I want to know how my data is handled, so that I can trust the site and make informed choices about my privacy.

#### Acceptance Criteria

1. THE Site SHALL include a Privacy Policy page at `/privacy-policy` describing what data is collected, how it is used, and how users can opt out.
2. THE Site SHALL include a Terms of Service page at `/terms-of-service`.
3. IF the site collects any personal data via forms (e.g., contact or newsletter forms), THEN THE Site SHALL display a consent notice before submission.
4. THE Site SHALL not embed third-party tracking scripts beyond GA4 without explicit disclosure in the Privacy Policy.
