/**
 * Normalizes a string into a URL-safe slug.
 * - Converts to lowercase
 * - Replaces underscores and spaces with hyphens
 * - Removes special characters (keeps only a-z, 0-9, hyphens, forward slashes)
 * - Collapses consecutive hyphens into a single hyphen
 * - Trims leading/trailing hyphens
 *
 * @param input - The raw string to slugify
 * @returns A slug matching /^[a-z0-9][a-z0-9-/]*[a-z0-9]$/ or empty string
 */
export function slugify(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return (
    input
      // Normalize unicode characters to ASCII equivalents
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Convert to lowercase
      .toLowerCase()
      // Replace underscores and spaces with hyphens
      .replace(/[_\s]+/g, '-')
      // Remove anything that isn't a-z, 0-9, hyphen, or forward slash
      .replace(/[^a-z0-9-/]/g, '')
      // Collapse consecutive hyphens into a single hyphen
      .replace(/-{2,}/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
  );
}
