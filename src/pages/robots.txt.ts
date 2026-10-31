// robots.txt: open on www.silasklein.com, closed on the GitHub preview address.
import type { APIRoute } from 'astro';
import { BASE } from '../lib/format';

export const GET: APIRoute = ({ site }) => new Response(
  BASE
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /icons/\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
