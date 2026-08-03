/**
 * Extracts FAQ Q&A pairs from raw markdown or HTML content and returns
 * a JSON-LD FAQPage schema object, or null if no FAQ section is found.
 */

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&#39;': "'",
  '&nbsp;': ' ',
  '&mdash;': '\u2014',
  '&ndash;': '\u2013',
  '&hellip;': '\u2026',
};

/**
 * Normalizes a markdown/HTML fragment down to the plain prose that belongs in
 * JSON-LD. Google's FAQPage spec allows a small subset of HTML in answer text,
 * but plain text is always valid and keeps both extraction paths consistent —
 * so link markup is reduced to its anchor text rather than carried through.
 */
function toPlainText(fragment: string): string {
  return (
    fragment
      // Images: keep the alt text, drop the URL.
      .replace(/!\[([^\]]*)\]\((?:[^()]|\([^()]*\))*\)/g, '$1')
      // Inline links: keep the anchor text, drop the URL (tolerates one level
      // of nested parens inside the URL, e.g. Wikipedia-style links).
      .replace(/\[([^\]]*)\]\((?:[^()]|\([^()]*\))*\)/g, '$1')
      // Bare autolinks: <https://example.com> -> https://example.com
      .replace(/<(https?:\/\/[^>\s]+)>/g, '$1')
      // Any remaining HTML markup, including <a href="...">...</a>.
      .replace(/<[^>]+>/g, '')
      // Inline code fences.
      .replace(/`+/g, '')
      // Emphasis markers.
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      // Leading heading markers on any line.
      .replace(/^#+\s*/gm, '')
      // Entities, so the schema carries real characters.
      .replace(/&(?:amp|lt|gt|quot|apos|#39|nbsp|mdash|ndash|hellip);/g, (m) => HTML_ENTITIES[m] ?? m)
      // Collapse runs of horizontal whitespace, then tidy blank lines.
      .replace(/[ \t]+/g, ' ')
      .replace(/[ \t]*\n[ \t]*/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

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
          name: toPlainText(m[1]),
          acceptedAnswer: {
            '@type': 'Answer',
            text: toPlainText(m[2]),
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
        const question = toPlainText(lines[0]);
        const answer = toPlainText(lines.slice(1).join('\n'));
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
