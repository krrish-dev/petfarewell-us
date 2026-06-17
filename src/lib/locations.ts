import { getCollection } from 'astro:content';
import { ADDITIONAL_LOCATIONS } from '../data/additionalLocations';

export async function getAllLocations() {
  const contentLocations = await getCollection('locations');
  const additionalLocations = ADDITIONAL_LOCATIONS.map((data) => ({ data }));

  const locationsBySlug = new Map<string, { data: any }>();

  for (const location of additionalLocations) {
    locationsBySlug.set(`${location.data.stateSlug}/${location.data.citySlug}`, location);
  }

  for (const location of contentLocations) {
    locationsBySlug.set(`${location.data.stateSlug}/${location.data.citySlug}`, location);
  }

  return Array.from(locationsBySlug.values());
}
