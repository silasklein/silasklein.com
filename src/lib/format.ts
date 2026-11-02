import type { Lang } from '../data/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Brand typography: the backslash and the ampersand are always set in magenta.
export function sig(text: string): string {
  return esc(text)
    .replace(/\\/g, '<span class="bs" aria-hidden="true">\\</span>')
    .replace(/&amp;/g, '<span class="amp">&amp;</span>');
}

// Where the site is served from: '' on www.silasklein.com, '/silasklein.com' on the GitHub preview address.
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// A root-relative file in public/ (images, favicons) at the right address.
export const asset = (path: string) => (path.startsWith('/') ? BASE + path : path);

// Prefix an internal path for the current locale. Hash-only and external links pass through.
export function href(path: string, lang: Lang): string {
  if (/^(https?:|mailto:)/.test(path)) return path;
  if (path.startsWith('#')) return BASE + (lang === 'en' ? '/en/' : '/') + path;
  return BASE + (lang === 'en' ? `/en${path === '/' ? '/' : path}` : path);
}

// The page path without the preview prefix.
export const sitePath = (pathname: string) => pathname.slice(BASE.length) || '/';

// Open-ended ranges read in words: "2026–" → "2026–current" / "2026–atual".
export const yrs = (text: string, lang: Lang) => text.replace(/(\d{4})\s?–(?!\s?\d)/g, `$1–${lang === 'pt' ? 'atual' : 'current'}`);

// The arrow every link carries: down for files to download, diagonal for anything that leaves the site
// (other sites, e-mail), straight right for pages and sections of this site.
export function arrow(url: string): 'download' | 'arrowUpRight' | 'arrowRight' {
  if (/\.(pdf|zip|webp|jpe?g|png)$|\/file\/view$/i.test(url)) return 'download';
  if (/^(https?:|mailto:)/.test(url)) return 'arrowUpRight';
  return 'arrowRight';
}

// Same page in the other language.
export function switchPath(pathname: string, lang: Lang): string {
  const p = sitePath(pathname);
  if (lang === 'en') return BASE + (p.replace(/^\/en(\/|$)/, '/') || '/');
  return BASE + (p === '/' ? '/en/' : `/en${p}`);
}

// The first picture of a news post: what the post shows when shared.
export const postCover = (html?: string) => html?.match(/<img[^>]*src="(\/[^"]+)"/)?.[1];
