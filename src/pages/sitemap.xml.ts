// sitemap.xml with every language version of every page (Portuguese at the root, English under /en/, Spanish under /es/).
import type { APIRoute } from 'astro';
import { projects, cases, news, researchCases, langs, type Lang } from '../data/content';

const paths = [
  '/', '/publications/', '/talks/', '/news/',
  ...projects.filter((p) => p.slug).map((p) => `/research/${p.slug}/`),
  ...cases.map((c) => `/design/${c.slug}/`),
  ...researchCases.map((r) => `/design/${r.slug}/`),
];
const lastmod = new Map(news.map((p) => [`/news/${p.slug}/`, p.date]));
const prefix = (lang: Lang) => (lang === 'pt' ? '' : `/${lang}`);

export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(p, site).href;
  // One <url> per language, each listing all the versions that exist (and Portuguese as the default).
  const group = (path: string, codes: Lang[], mod: string) => {
    const alt = codes.map((c) => `<xhtml:link rel="alternate" hreflang="${langs.find((l) => l.code === c)!.hreflang}" href="${url(prefix(c) + path)}"/>`).join('')
      + (codes.includes('pt') ? `<xhtml:link rel="alternate" hreflang="x-default" href="${url(path)}"/>` : '');
    return codes.map((c) => `<url><loc>${url(prefix(c) + path)}</loc>${mod}${codes.length > 1 ? alt : ''}</url>`).join('');
  };
  const pages = paths.map((p) => group(p, langs.map((l) => l.code), lastmod.get(p) ? `<lastmod>${lastmod.get(p)}</lastmod>` : '')).join('');
  const posts = [...new Set(news.map((p) => p.slug))].map((slug) => {
    const versions = news.filter((p) => p.slug === slug);
    return group(`/news/${slug}/`, langs.map((l) => l.code).filter((c) => versions.some((v) => v.lang === c)), `<lastmod>${versions[0].date}</lastmod>`);
  }).join('');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${pages}${posts}</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
