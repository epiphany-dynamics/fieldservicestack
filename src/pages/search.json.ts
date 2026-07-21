import { getCollection } from 'astro:content';

export async function GET() {
  const collections = [
    { name: 'reviews' as const, label: 'Review', path: 'reviews' },
    { name: 'comparisons' as const, label: 'Comparison', path: 'compare' },
    { name: 'guides' as const, label: 'Guide', path: 'guides' },
    { name: 'gear' as const, label: 'Gear', path: 'gear' },
  ];

  const items: { title: string; description: string; category: string; url: string }[] = [];

  for (const { name, label, path } of collections) {
    const posts = await getCollection(name, ({ data }) => !data.draft);
    for (const post of posts) {
      items.push({
        title: post.data.title,
        description: post.data.description,
        category: label,
        url: `/${path}/${post.id}/`,
      });
    }
  }

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}
