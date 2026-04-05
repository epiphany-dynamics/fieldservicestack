import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const reviews = await getCollection('reviews', ({ data }) => !data.draft);
  const comparisons = await getCollection('comparisons', ({ data }) => !data.draft);
  const guides = await getCollection('guides', ({ data }) => !data.draft);
  const gear = await getCollection('gear', ({ data }) => !data.draft);

  const collectionPaths: Record<string, string> = {
    reviews: 'reviews',
    comparisons: 'compare',
    guides: 'guides',
    gear: 'gear',
  };

  const allPosts = [
    ...reviews.map((p) => ({ ...p, _collection: 'reviews' })),
    ...comparisons.map((p) => ({ ...p, _collection: 'comparisons' })),
    ...guides.map((p) => ({ ...p, _collection: 'guides' })),
    ...gear.map((p) => ({ ...p, _collection: 'gear' })),
  ].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Field Service Stack',
    description:
      'Software reviews, comparisons, and guides for field service professionals.',
    site: context.site!,
    items: allPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/${collectionPaths[post._collection]}/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
