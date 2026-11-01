// sitemap.xml with both language versions of every page (Portuguese at the root, English under /en/).
import type { APIRoute } from 'astro';
import { projects, cases, news } from '../data/content';

const paths = [
  '/', '/publications/', '/talks/', '/news/',
  ...projects.filter((p) => p.slug).map((p) => `/research/${p.slug}/`),
  ...cases.map((c) => `/design/${c.slug}/`),
];
const lastmod = new Map(news.map((p) => [`/news/${p.slug}/`, p.date]));

export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  const entry = (path: string) => {
    const pt = url(path), en = url(`/en${path}`);
    const alt = `<xhtml:link rel="alternate" hreflang="pt-BR" href="${pt}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${pt}"/>`;
    const mod = lastmod.get(path) ? `<lastmod>${lastmod.get(path)}</lastmod>` : '';
    return `<url><loc>${pt}</loc>${mod}${alt}</url><url><loc>${en}</loc>${mod}${alt}</url>`;
  };
  const posts = news.map((p) => {
    const loc = url(p.lang === 'pt' ? `/news/${p.slug}/` : `/en/news/${p.slug}/`);
    const pair = news.find((x) => x.slug === p.slug && x.lang !== p.lang);
    const alt = pair ? `<xhtml:link rel="alternate" hreflang="pt-BR" href="${url(`/news/${p.slug}/`)}"/><xhtml:link rel="alternate" hreflang="en" href="${url(`/en/news/${p.slug}/`)}"/>` : '';
    return `<url><loc>${loc}</loc><lastmod>${p.date}</lastmod>${alt}</url>`;
  }).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${paths.map(entry).join('')}${posts}</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
