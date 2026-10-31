import type { Lang } from '../data/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Brand typography: the backslash and the ampersand are always set in magenta.
export function sig(text: string): string {
  return esc(text)
    .replace(/\\/g, '<span class="bs" aria-hidden="true">\\</span>')
    .replace(/&amp;/g, '<span class="amp">&amp;</span>');
}

// Prefix an internal path for the current locale. Hash-only and external links pass through.
export function href(path: string, lang: Lang): string {
  if (/^(https?:|mailto:)/.test(path)) return path;
  if (path.startsWith('#')) return (lang === 'pt' ? '/pt/' : '/') + path;
  return lang === 'pt' ? `/pt${path === '/' ? '/' : path}` : path;
}

// Same page in the other language.
export function switchPath(pathname: string, lang: Lang): string {
  if (lang === 'pt') return pathname.replace(/^\/pt(\/|$)/, '/') || '/';
  return pathname === '/' ? '/pt/' : `/pt${pathname}`;
}
