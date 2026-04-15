/**
 * Extracts FAQ Q&A pairs from raw markdown or HTML content and returns
 * a JSON-LD FAQPage schema object, or null if no FAQ section is found.
 */
export function extractFAQSchema(content: string): object | null {
  // HTML path
  const htmlSectionMatch = content.match(
    /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>([\s\S]*?)(?=<h2[^>]*>|$)/i,
  );

  if (htmlSectionMatch) {
    const faqSection = htmlSectionMatch[1];
    const pairs = [
      ...faqSection.matchAll(/<h3[^>]*>(?:Q:\s*)?([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi),
    ];
    if (pairs.length > 0) {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pairs.map((m) => ({
          '@type': 'Question',
          name: m[1].replace(/<[^>]+>/g, '').trim(),
          acceptedAnswer: {
            '@type': 'Answer',
            text: m[2].replace(/<[^>]+>/g, '').trim(),
          },
        })),
      };
    }
  }

  // Markdown path — capture everything from the FAQ heading to the next H2 or true end of string
  const mdSectionMatch = content.match(
    /^##\s+Frequently Asked Questions\s*\n([\s\S]*?)(?=\n##\s[^#])/m,
  ) || content.match(
    /^##\s+Frequently Asked Questions\s*\n([\s\S]*)/m,
  );

  if (mdSectionMatch) {
    const faqSection = mdSectionMatch[1];
    const chunks = faqSection.split(/^###\s+(?:Q:\s*)?/im).slice(1);
    const pairs = chunks
      .map((chunk) => {
        const lines = chunk.trim().split('\n');
        const question = lines[0].trim();
        const answer = lines
          .slice(1)
          .join('\n')
          .trim()
          .replace(/\*\*/g, '')
          .replace(/\*/g, '')
          .replace(/^#+\s*/gm, '')
          .trim();
        return { question, answer };
      })
      .filter((p) => p.question && p.answer);

    if (pairs.length > 0) {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: pairs.map((p) => ({
          '@type': 'Question',
          name: p.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: p.answer,
          },
        })),
      };
    }
  }

  return null;
}
