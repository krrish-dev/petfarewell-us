# Master Architecture and Capabilities

## Project Map

Pet Farewell is an Astro static site with feature-first ownership under `src/pages`, reusable UI in `src/components`, shared layouts in `src/layouts`, and small focused utilities in `src/lib`.

## Service Model

- The public service focus is dogs and cats only.
- Primary offering: in-home dog euthanasia and cat euthanasia with Dr. Hany Soliman.
- Aftercare options: euthanasia-only, communal cremation, private cremation, or family-managed arrangements where local law allows.
- Published starting package prices: `$450` euthanasia-only, `$550` euthanasia with communal cremation, and `$750` euthanasia with private cremation.
- Availability language should stay aligned with the service site: by appointment, 7 days a week, 8:00 AM to 8:00 PM, within 50 miles of Victorville and nearby Southern California communities.

## Routing and URL Policy

- Astro builds static HTML with `output: 'static'`.
- Canonical site URL is `https://petfarewell.us`.
- Routes use trailing slashes via `trailingSlash: 'always'`.
- Navigation links should use trailing slash page URLs, for example `/about/`, so local and production browser URLs stay consistent.
- Breadcrumb JSON-LD and generated internal page links should also use trailing slash page URLs.
- Hero CTA props are optional; pages without a primary hero action render the same hero without a button.

## Build-Time Validation

- `src/plugins/check-internal-links.ts` validates generated internal links after build.
- `src/plugins/check-canonical-urls.ts` validates canonical URL uniqueness after build.
- `tests/integration.test.ts` verifies generated sitemap, robots, metadata, JSON-LD, and the `/about/` trailing slash behavior.

## Recent Changes

- 2026-05-18: Enforced trailing slash routing and updated About navigation links so `http://localhost:4321/about/` is the preferred local URL.
- 2026-05-18: Made hero CTA props optional to match existing page usage and keep Astro type checks clean.
- 2026-05-18: Updated service content for dog/cat-only SEO, copied pricing facts from the main service site, and expanded FAQ/aftercare content.
- 2026-05-18: Linked the workspace to the GitHub remote `https://github.com/krrish-dev/petfarewell-us.git` and expanded SEO tests for trailing slash canonical, sitemap, and internal page links.
- 2026-05-18: Centered the shared breadcrumb component across generated pages.
- 2026-05-18: Added mobile-only call actions: a header phone icon and a fixed bottom call bar using the configured phone number.
