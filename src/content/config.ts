import { defineCollection, z } from 'astro:content';

/**
 * Resources Collection
 * MDX articles about pet end-of-life care topics.
 * File path: src/content/resources/[slug].mdx
 */
const resourcesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.date(),
    dateModified: z.date(),
    author: z.string().default('Pet Farewell Editorial Team'),
    ogImage: z.string().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
    relatedPages: z.array(z.string()).optional(),
  }),
});

/**
 * Locations Collection
 * JSON data files describing service locations.
 * File path: src/content/locations/[state]/[city].json
 */
const locationsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    cityName: z.string(),
    stateName: z.string(),
    stateSlug: z.string(),
    citySlug: z.string(),
    businessName: z.string(),
    address: z.object({
      streetAddress: z.string(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string().default('US'),
    }),
    telephone: z.string(),
    geo: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    services: z.array(
      z.enum(['pet-cremation', 'at-home-pet-euthanasia'])
    ),
    serviceArea: z.string().optional(),
  }),
});

export const collections = {
  resources: resourcesCollection,
  locations: locationsCollection,
};
