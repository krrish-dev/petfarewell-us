# PetFarewell.us SEO Audit & Content Expansion Master Plan

## 1. Executive Summary

PetFarewell.us now has strong technical foundations: canonical URLs, sitemap index, robots access, Open Graph/Twitter metadata, WebSite/WebPage JSON-LD, LocalBusiness/VeterinaryCare schema for location pages, and a large Southern California service-area footprint.

The main SEO opportunity is not more raw city pages. The highest ROI is to build stronger topical authority around end-of-life veterinary care while reducing doorway-page risk from thin or near-duplicate location pages.

Primary ranking targets:

- pet euthanasia near me
- in home pet euthanasia
- dog euthanasia at home
- cat euthanasia at home
- pet hospice care
- end of life pet care
- pet cremation
- mobile veterinarian end of life services

## 2. Technical SEO Issues

| Issue | Severity | SEO Impact | Recommended Fix | Priority |
|---|---:|---|---|---:|
| Near-duplicate city pages | High | City pages can look like doorway pages if they only swap city names. | Add unique local blocks: route notes, nearby neighborhoods, appointment availability text, city-specific FAQs, related city links. | P1 |
| Thin city service subpages | High | `/at-home-pet-euthanasia/` and `/pet-cremation/` under each city may compete with city parent pages. | Keep if they have unique local content; otherwise consolidate or add stronger templates with local intent. | P1 |
| Missing dedicated cost page | Fixed | Cost intent was only an anchor section, limiting ranking for cost queries. | Added `/cost/` and redirected `/pricing/` to `/cost/`. | Done |
| Missing dedicated FAQ page | Fixed | FAQ intent had no central crawlable hub. | Added `/faq/` with FAQ schema and core internal links. | Done |
| Weak homepage title | Fixed | Search result showed old title focused on dog/cat only. | Updated homepage title to `In-Home Pet Euthanasia in Southern California | PetFarewell.us`. | Done |
| Incomplete social metadata | Fixed | Facebook/WhatsApp/X previews lacked complete metadata. | Added global OG/Twitter tags and image metadata. | Done |
| Crawl depth for new cities | Medium | New location pages can be buried if only in sitemap. | Locations index/state hub now list more cities; city pages link to core hubs. | P1 |
| Orphan page risk | Medium | Some generated pages may have sitemap-only discovery. | Add related-city links and footer links to top city clusters. | P2 |
| Page authority dilution | Medium | 250+ generated pages can dilute internal PageRank if content is thin. | Prioritize core hubs and strongest city cluster in nav/footer; use contextual links from articles. | P1 |
| GSC/GA4 placeholders | Medium | Search Console and Analytics verification may not be active if placeholders remain. | Replace `XXXXXXXXXX` and `G-XXXXXXXXXX` in site config. | P1 |
| Non-core service pages | Medium | Pages like pet urns/burial/memorial can weaken service focus if presented as services. | Keep as resources or redirect if not part of business offering. | P2 |

## 3. Content Gaps

### Competitor Pattern Observed

Large in-home euthanasia competitors and authoritative resources tend to cover:

- Quality of life assessment
- Hospice and palliative care
- What happens during euthanasia
- Cost and aftercare options
- Cremation choices
- Signs it may be time
- Species-specific content for dogs and cats
- Grief/support content as resources, not necessarily services
- City/local service pages
- Doctor/team trust signals

### Missing / Weak Topic Clusters

#### Cluster A — Pet Euthanasia Core

Recommended pages:

1. `/what-is-pet-euthanasia/`
2. `/how-to-know-when-it-is-time/`
3. `/what-happens-during-pet-euthanasia/`
4. `/preparing-for-in-home-pet-euthanasia/`
5. `/pet-euthanasia-near-me/`

#### Cluster B — Dog Euthanasia

Recommended pages:

1. `/dog-euthanasia-at-home/`
2. `/dog-end-of-life-signs/`
3. `/dog-quality-of-life-scale/`
4. `/when-to-euthanize-a-dog-with-cancer/`
5. `/when-to-euthanize-a-dog-with-kidney-failure/`

#### Cluster C — Cat Euthanasia

Recommended pages:

1. `/cat-euthanasia-at-home/`
2. `/cat-end-of-life-signs/`
3. `/cat-quality-of-life-scale/`
4. `/when-to-euthanize-a-cat-with-kidney-disease/`
5. `/when-to-euthanize-a-cat-not-eating/`

#### Cluster D — Pet Hospice / End-of-Life Care

Recommended pages:

1. `/pet-hospice-care/`
2. `/end-of-life-pet-care/`
3. `/palliative-care-for-dogs/`
4. `/palliative-care-for-cats/`
5. `/quality-of-life-consultation/`

#### Cluster E — Cost / Aftercare / Cremation

Recommended pages:

1. `/cost/` — created
2. `/pet-cremation/` — existing
3. `/private-pet-cremation/`
4. `/communal-pet-cremation/`
5. `/pet-cremation-cost/`
6. `/what-happens-after-pet-euthanasia/`

#### Cluster F — Local SEO Hubs

Recommended pages:

1. `/locations/` — existing
2. `/locations/california/` — existing
3. County/region hubs:
   - `/locations/california/san-bernardino-county/`
   - `/locations/california/riverside-county/`
   - `/locations/california/los-angeles-county/`
   - `/locations/california/orange-county/`
   - `/locations/california/high-desert/`
   - `/locations/california/inland-empire/`

## 4. Internal Linking Map

### Homepage Links

| Link Source | Link Target | Anchor Text |
|---|---|---|
| Homepage | `/at-home-pet-euthanasia/` | In-Home Pet Euthanasia |
| Homepage | `/cost/` | Cost & Pricing |
| Homepage | `/faq/` | In-Home Pet Euthanasia FAQ |
| Homepage | `/locations/` | Southern California Service Areas |
| Homepage | `/pet-cremation/` | Cremation & Aftercare |
| Homepage | `/pet-hospice/` | Pet Hospice Care |

### Service Hub Links

| Link Source | Link Target | Anchor Text |
|---|---|---|
| `/at-home-pet-euthanasia/` | `/dog-euthanasia-at-home/` | Dog euthanasia at home |
| `/at-home-pet-euthanasia/` | `/cat-euthanasia-at-home/` | Cat euthanasia at home |
| `/at-home-pet-euthanasia/` | `/pet-hospice/` | Pet hospice care |
| `/at-home-pet-euthanasia/` | `/cost/` | In-home pet euthanasia cost |
| `/at-home-pet-euthanasia/` | `/locations/` | Service areas |
| `/at-home-pet-euthanasia/` | `/faq/` | Frequently asked questions |

### City Page Links

Every city page should link to:

| Link Source | Link Target | Anchor Text |
|---|---|---|
| City page | `/` | Pet Farewell homepage |
| City page | `/cost/` | Cost & Pricing |
| City page | `/at-home-pet-euthanasia/` | In-Home Pet Euthanasia |
| City page | `/faq/` | FAQ |
| City page | `/pet-cremation/` | Pet Cremation |
| City page | `/locations/california/` | California service areas |

Implemented globally in the city layout as a `Plan an In-Home Visit` internal-link block.

### Topic Cluster Links

Every informational article should include:

| Article Type | Must Link To |
|---|---|
| Quality of life | `/at-home-pet-euthanasia/`, `/cost/`, nearest city page |
| Dog end-of-life signs | `/dog-euthanasia-at-home/`, `/cost/`, `/locations/` |
| Cat end-of-life signs | `/cat-euthanasia-at-home/`, `/cost/`, `/locations/` |
| Cremation content | `/pet-cremation/`, `/cost/`, relevant city page |
| Hospice content | `/pet-hospice/`, `/at-home-pet-euthanasia/`, `/faq/` |

## 5. Page Optimization Recommendations

| URL / Page Type | Search Intent | Primary Keyword | Secondary Keywords | Semantic Keywords | Recommended Length |
|---|---|---|---|---|---|
| `/` | Commercial + brand | in home pet euthanasia Southern California | pet euthanasia near me, dog euthanasia at home, cat euthanasia at home | mobile veterinarian, compassionate passing, aftercare | 800–1500 words |
| `/at-home-pet-euthanasia/` | Commercial service | in home pet euthanasia | at home dog euthanasia, at home cat euthanasia, mobile pet euthanasia | sedation, peaceful passing, quality of life | 1200–2000 words |
| `/cost/` | Commercial investigation | in home pet euthanasia cost | dog euthanasia cost, cat euthanasia cost, cremation cost | private cremation, communal cremation, travel fee | 900–1400 words |
| `/faq/` | Informational / objection handling | in home pet euthanasia FAQ | what to expect, does it hurt, how long does it take | sedation, children present, ashes returned | Flexible, answer-driven |
| `/pet-cremation/` | Commercial service | pet cremation | private pet cremation, communal pet cremation, ashes returned | urn, paw print, aftercare | 1000–1600 words |
| `/pet-hospice/` | Informational + commercial | pet hospice care | end of life pet care, palliative care for pets | comfort care, pain management, appetite, mobility | 1000–1800 words |
| City parent pages | Local commercial | in home pet euthanasia [city] CA | dog euthanasia at home [city], cat euthanasia at home [city] | mobile vet, service area, route availability | 900–1500 words after localization |
| City service subpages | Local service-specific | at home pet euthanasia [city] | pet cremation [city], mobile euthanasia [city] | aftercare, private visit, local scheduling | 700–1200 words if kept indexed |

## 6. Schema Recommendations

Implemented / recommended schema:

- WebSite schema — sitewide
- WebPage schema — sitewide
- Organization schema — homepage/about
- VeterinaryCare / LocalBusiness schema — location pages
- BreadcrumbList schema — all structured pages
- FAQPage schema — `/faq/`, `/cost/`, article pages with visible FAQs
- Service schema — recommended next for service hubs
- Review schema — only when real first-party reviews are visible on the page

Important: do not add fake Review schema. Only use review markup if the exact reviews are displayed on-page and are real.

## 7. Local SEO Recommendations

### City Authority

- Build unique text for the strongest cities first: Victorville, Apple Valley, Hesperia, San Bernardino, Riverside, Rancho Cucamonga, Upland, Fontana.
- Add nearby community links within the same cluster.
- Add route/coverage notes instead of fake addresses.
- Add real reviews from Google Business Profile when available.

### State / Regional Authority

Create regional hubs:

- High Desert
- Victor Valley
- Inland Empire
- San Bernardino County
- Riverside County
- Los Angeles County
- Orange County

Each regional hub should link down to cities and up to `/locations/california/`.

### Location Signals

Keep NAP consistent:

- Name: Pet Farewell by Dr. Hany Soliman
- Phone: (760) 912-0848
- Email: pethomeeuthanasiaservice@gmail.com
- Address: service-area business, no fake street address
- Service area: Southern California

## 8. Entity SEO Recommendations

### Brand Description

PetFarewell.us is a Southern California mobile veterinary end-of-life care service led by Dr. Hany Soliman, providing in-home dog euthanasia, cat euthanasia, pet hospice guidance, and cremation aftercare coordination for families who want a peaceful goodbye at home.

### Required Trust Signals

- Doctor profile page with qualifications
- Real photos when possible
- Google Business Profile link
- Review page with real reviews
- Consistent NAP across citations
- Phone number visible sitewide
- Clear pricing page
- Clear service-area explanation
- No fake clinic address

### Citation Opportunities

- Google Business Profile
- Bing Places
- Apple Business Connect
- Yelp
- Nextdoor
- Facebook Page
- Vet clinic referral pages
- Local pet cremation directories
- Local humane society/resource pages where appropriate
- Chamber/local business directories for service-area communities

## 9. 90-Day SEO Roadmap

### Priority 1 — Highest ROI / 0–30 Days

1. Expand `/at-home-pet-euthanasia/` into the primary service hub.
2. Strengthen `/cost/` with exact pricing, travel fee rules, and comparison table.
3. Build `/dog-euthanasia-at-home/`.
4. Build `/cat-euthanasia-at-home/`.
5. Localize top 10 city pages with unique content.
6. Add regional hub: `/locations/california/high-desert/`.
7. Submit sitemap-index.xml in Google Search Console.
8. Replace GA4/GSC placeholder IDs.

Expected impact: strongest short-term improvement for commercial queries.  
Traffic potential: high.  
Difficulty: medium.

### Priority 2 — Medium ROI / 31–60 Days

1. Build `/pet-hospice-care/` or strengthen existing `/pet-hospice/`.
2. Build `/end-of-life-pet-care/`.
3. Build `/what-happens-during-pet-euthanasia/`.
4. Build `/how-to-know-when-it-is-time/`.
5. Build regional hubs for Inland Empire, San Bernardino County, Riverside County.
6. Add related-city internal links to city pages.
7. Add real testimonials/reviews page.

Expected impact: stronger topical depth and better internal linking.  
Traffic potential: medium-high.  
Difficulty: medium.

### Priority 3 — Long-Term Authority / 61–90 Days

1. Build disease-specific dog and cat end-of-life articles.
2. Build private vs communal cremation pages.
3. Build pet insurance/cost reimbursement page.
4. Build child/family preparation article.
5. Add downloadable quality-of-life worksheet.
6. Earn citations and referral links from vet clinics and local directories.

Expected impact: informational authority and long-tail growth.  
Traffic potential: medium.  
Difficulty: medium-high.

## Doorway Page Protection Rules

To avoid doorway-page patterns:

1. Do not create hundreds of city pages with only city-name swaps.
2. Add unique local context to high-priority cities first.
3. Keep city pages useful even if the user does not convert immediately.
4. Use regional hubs to organize clusters instead of relying only on massive city lists.
5. Avoid fake addresses or fake local offices.
6. Keep service-area language honest: mobile appointment, route availability, travel distance.

## Immediate Implementation Completed

- Added `/cost/` as a dedicated cost page.
- Added `/faq/` as a dedicated FAQ page.
- Added FAQ schema to cost/FAQ pages.
- Added internal planning links to every city page.
- Added header links to Cost and FAQ.
- Added footer links to Cost, FAQ, and Pet Hospice.
- Updated redirects for `/cost.html` and `/pricing/` to point to `/cost/`.
- Previously added sitewide canonical/social metadata and sitemap-index support.
