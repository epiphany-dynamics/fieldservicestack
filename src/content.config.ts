import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()),
  rating: z.number().min(1).max(10).optional(),
  product: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  seoTitle: z.string(),
  focusKeyword: z.string(),
  author: z.string().default('Patrick Gibbs'),
  draft: z.boolean().default(false),
  affiliateLinks: z.boolean().default(false),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: postSchema,
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/comparisons' }),
  schema: postSchema,
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: postSchema,
});

const gear = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gear' }),
  schema: postSchema,
});

export const collections = { reviews, comparisons, guides, gear };
