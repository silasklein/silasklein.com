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
  if (path.startsWith('#')) return BASE + (lang === 'pt' ? '/pt/' : '/') + path;
  return BASE + (lang === 'pt' ? `/pt${path === '/' ? '/' : path}` : path);
}

// The page path without the preview prefix.
export const sitePath = (pathname: string) => pathname.slice(BASE.length) || '/';

// Same page in the other language.
export function switchPath(pathname: string, lang: Lang): string {
  const p = sitePath(pathname);
  if (lang === 'pt') return BASE + (p.replace(/^\/pt(\/|$)/, '/') || '/');
  return BASE + (p === '/' ? '/pt/' : `/pt${p}`);
}
