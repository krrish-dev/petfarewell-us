import { getCollection } from 'astro:content';
import { ADDITIONAL_LOCATIONS } from '../data/additionalLocations';

export async function getAllLocations() {
  const contentLocations = await getCollection('locations');
  const additionalLocations = ADDITIONAL_LOCATIONS.map((data) => ({ data }));
  return [...contentLocations, ...additionalLocations];
}
