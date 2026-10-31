// Icon names used across the site and in the CMS (src/components/Pixel.astro draws them).

// Site names → pixelarticons file names, chosen to be recognisable at a glance.
export const MAP: Record<string, string> = {
  arrowRight: 'arrow-right', arrowDown: 'arrow-down',
  plus: 'plus', minus: 'minus', mail: 'mail', pin: 'map-pin', copy: 'copy', download: 'arrow-down',
  library: 'library', books: 'book-open', star: 'trophy', news: 'article',
  now: 'briefcase', field: 'image', group: 'users', image: 'image', sun: 'sun', eye: 'eye',
  building: 'building', calendar: 'calendar', community: 'building-community',
  brush: 'brush', pencil: 'pencil', layout: 'layout', mic: 'mic', globe: 'globe',
  presentation: 'presentation', instagram: 'instagram', linkedin: 'linkedin',
  orcid: 'card-text', lattes: 'file-text', zotero: 'library', researchgate: 'article',
};

// Custom marks drawn on the same grid (2 units per pixel).
export const CUSTOM: Record<string, string> = {
  // Diagonal arrow without the box, for links that leave the page.
  arrowUpRight: 'M8 6h12v2H8zM18 8h2v10h-2zM16 8h2v2h-2zM14 10h2v2h-2zM12 12h2v2h-2zM10 14h2v2h-2zM8 16h2v2H8zM6 18h2v2H6z',
  // Observatório de Universos Bíblicos: open book, star and two planets (the orbit lines are left out).
  oub: 'M14 2h4v2h-4zM14 4h4v2h-4zM6 6h2v2h-2zM18 6h4v2h-4zM4 8h6v2h-6zM18 8h4v2h-4zM6 10h2v2h-2zM2 14h8v2h-8zM14 14h8v2h-8zM2 16h20v2h-20zM10 18h4v2h-4zM10 20h4v2h-4z',
  // Levantine Seals / CSSL: the running-spiral S of the seal mark, as square spirals.
  seals: 'M2 0h10v2h-10zM2 2h2v2h-2zM10 2h2v2h-2zM2 4h2v2h-2zM6 4h2v2h-2zM10 4h2v2h-2zM2 6h2v2h-2zM6 6h6v2h-6zM2 8h2v2h-2zM2 10h18v2h-18zM18 12h2v2h-2zM10 14h6v2h-6zM18 14h2v2h-2zM10 16h2v2h-2zM14 16h2v2h-2zM18 16h2v2h-2zM10 18h2v2h-2zM18 18h2v2h-2zM10 20h10v2h-10z',
  // EPOD (Epistemology of the Divine): the looped ring of its symbol.
  epod: 'M2 6h6v2h-6zM16 6h6v2h-6zM0 8h2v2h-2zM8 8h8v2h-8zM22 8h2v2h-2zM0 10h2v2h-2zM22 10h2v2h-2zM0 12h2v2h-2zM22 12h2v2h-2zM0 14h2v2h-2zM8 14h8v2h-8zM22 14h2v2h-2zM2 16h6v2h-6zM16 16h6v2h-6z',
};

export const ICON_NAMES = [...Object.keys(MAP), ...Object.keys(CUSTOM)];
