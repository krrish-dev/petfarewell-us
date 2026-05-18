import type { BreadcrumbItem } from './schema';

/**
 * Generates breadcrumb items from a URL path.
 *
 * Given a path like "/locations/california/los-angeles/",
 * returns breadcrumb items for: Home > Locations > California > Los Angeles
 *
 * Each item's href is a prefix of the next item's href,
 * maintaining the Breadcrumb Hierarchy Consistency property.
 *
 * @param path - The URL path (e.g., "/resources/pet-cremation-cost/")
 * @param siteUrl - The base site URL (e.g., "https://petfarewell.us")
 * @returns Array of breadcrumb items with label and full href
 */
export function generateBreadcrumbs(
  path: string,
  siteUrl: string
): BreadcrumbItem[] {
  // Clean the path: remove trailing slash, ensure leading slash
  const cleanPath = path.replace(/\/+$/, '') || '/';

  // Home is always the first breadcrumb
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: siteUrl },
  ];

  if (cleanPath === '/') {
    return items;
  }

  // Split path into segments
  const segments = cleanPath.split('/').filter(Boolean);
  let currentPath = '';

  for (const segment of segments) {
    currentPath += `/${segment}`;
    items.push({
      label: formatSegmentLabel(segment),
      href: `${siteUrl}${currentPath}/`,
    });
  }

  return items;
}

/**
 * Converts a URL segment into a human-readable label.
 * e.g., "pet-cremation" -> "Pet Cremation"
 *       "los-angeles" -> "Los Angeles"
 */
export function formatSegmentLabel(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
