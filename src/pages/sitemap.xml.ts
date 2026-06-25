import type { APIRoute } from 'astro';

const siteUrl = 'https://www.pv991.com';

const blogModules = import.meta.glob('./blog/*.astro', { eager: false });
const platformModules = import.meta.glob('./platforms/*.astro', { eager: false });

const blogSlugs = Object.keys(blogModules)
  .map((k) => k.replace(/^\.\/blog\//, '').replace(/\.astro$/, ''))
  .filter((slug) => slug !== 'index');

const platformSlugs = Object.keys(platformModules)
  .map((k) => k.replace(/^\.\/platforms\//, '').replace(/\.astro$/, ''))
  .filter((slug) => slug !== 'index');

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily', hreflang: true },
  { path: '/guide', priority: '0.8', changefreq: 'weekly', hreflang: true },
  { path: '/blog/', priority: '0.7', changefreq: 'weekly', hreflang: false },
  { path: '/platforms/', priority: '0.8', changefreq: 'weekly', hreflang: false }
];

const getLastMod = () => new Date().toISOString().split('T')[0];

const renderUrlEntry = (
  path: string,
  priority: string,
  changefreq: string,
  hreflang = false,
  lastmod?: string
) => {
  const modDate = lastmod || getLastMod();
  const hreflangTags = hreflang
    ? `
    <xhtml:link rel="alternate" hreflang="my-MM" href="${siteUrl}${path}" />
    <xhtml:link rel="alternate" hreflang="my" href="${siteUrl}${path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${path}" />`
    : '';

  return `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${modDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${hreflangTags}
  </url>`;
};

export const GET: APIRoute = async () => {
  const staticUrls = staticPages
    .map((p) => renderUrlEntry(p.path, p.priority, p.changefreq, p.hreflang))
    .join('\n');

  const blogUrls = blogSlugs
    .map((slug) => {
      const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
      const lastmod = dateMatch ? dateMatch[1] : getLastMod();
      return renderUrlEntry(`/blog/${slug}`, '0.6', 'monthly', false, lastmod);
    })
    .join('\n');

  const platformUrls = platformSlugs
    .map((slug) => renderUrlEntry(`/platforms/${slug}`, '0.7', 'weekly', false))
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticUrls}
${platformUrls}
${blogUrls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
};
