// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Permanent (301) redirects for dead WordPress-era URLs still reported by Google
// Search Console.
//
// Sources are written WITHOUT a trailing slash: Astro normalizes a trailing slash off
// the redirect key, so both forms would collapse to the same exact-match Vercel route
// (`^/tag/crm$`). The trailing-slash variant of every one of these routes is added
// after the build by scripts/add-trailing-slash-redirects.mjs, which runs as `postbuild`.
// Canonical live URLs on this site carry a trailing slash, so every target does too.
const legacyWordpressRedirects = {
    // Tool / gear content -> the exact live article where one exists, else the gear hub.
    '/tag/milwaukee-m18-vs-dewalt-20v-max': '/compare/dewalt-vs-milwaukee-impact-driver-comparison-2026/',
    '/milwaukee-m18-vs-dewalt-20v-max-impact-driver': '/compare/dewalt-vs-milwaukee-impact-driver-comparison-2026/',
    '/milwaukee-m18-impact-driver-review-2026': '/gear/milwaukee-m18-impact-driver-review/',
    '/milwaukee-m18-impact-driver-review': '/gear/milwaukee-m18-impact-driver-review/',
    '/tag/milwaukee-tools-review': '/gear/',
    '/tag/milwaukee-tools-review/feed': '/gear/',
    '/tag/best-impact-driver': '/gear/',
    '/tag/field-service-gear': '/gear/',
    '/category/gear': '/gear/',

    // Software comparisons -> the live comparison.
    '/jobber-vs-housecall-pro-2026': '/compare/jobber-vs-housecall-pro/',
    '/jobber-vs-housecall-pro': '/compare/jobber-vs-housecall-pro/',

    // Reviews -> the current live Jobber review.
    '/jobber-review-2025': '/reviews/jobber-review-2026/',

    // Buyer-intent guides -> the live buyer's guide, else the guides hub.
    '/best-field-service-software-2026': '/guides/field-service-management-buyers-guide/',
    '/category/uncategorized': '/guides/',
    '/tag/work-orders': '/guides/',
    '/tag/crm': '/guides/',

    // Stale about / contact variants. This site has no contact page, so contact
    // URLs land on /about/.
    '/about-field-service-stack': '/about/',
    '/contact': '/about/',
    '/contact-field-service-stack': '/about/',
};

export default defineConfig({
  site: 'https://fieldservicestack.com',
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    ...legacyWordpressRedirects,
  },
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
