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
  // Language menu: 文 over A, the familiar translate glyph pair, on the 12×12 grid (variant A, approved 2026-11-02).
  translate: 'M4 0h2v2h-2zM0 2h12v2h-12zM2 4h2v2h-2zM8 4h2v2h-2zM4 6h4v2h-4zM2 8h2v2h-2zM8 8h2v2h-2zM0 10h2v2h-2zM10 10h2v2h-2zM18 12h2v2h-2zM16 14h2v2h-2zM20 14h2v2h-2zM14 16h2v2h-2zM22 16h2v2h-2zM14 18h10v2h-10zM14 20h2v2h-2zM22 20h2v2h-2zM14 22h2v2h-2zM22 22h2v2h-2z',
  // Diagonal arrow without the box, for links that leave the page.
  arrowUpRight: 'M8 6h12v2H8zM18 8h2v10h-2zM16 8h2v2h-2zM14 10h2v2h-2zM12 12h2v2h-2zM10 14h2v2h-2zM8 16h2v2H8zM6 18h2v2H6z',
  // Observatório de Universos Bíblicos: open book (page line, fold, stem), star and two planets — drawn by Silas.
  oub: 'M14 0h4v2h-4zM14 2h4v2h-4zM4 6h2v2h-2zM18 6h4v2h-4zM2 8h6v2h-6zM18 8h4v2h-4zM4 10h2v2h-2zM0 16h10v2h-10zM14 16h10v2h-10zM6 18h12v2h-12zM10 20h4v2h-4zM10 22h4v2h-4z',
  // Levantine Seals / CSSL: two square spirals stacked into the vertical S of the seal mark.
  seals: 'M6 0h10v2h-10zM6 2h2v2h-2zM14 2h2v2h-2zM6 4h2v2h-2zM10 4h2v2h-2zM14 4h2v2h-2zM6 6h2v2h-2zM10 6h6v2h-6zM6 8h2v2h-2zM6 10h12v2h-12zM16 12h2v2h-2zM8 14h6v2h-6zM16 14h2v2h-2zM8 16h2v2h-2zM12 16h2v2h-2zM16 16h2v2h-2zM8 18h2v2h-2zM16 18h2v2h-2zM8 20h10v2h-10z',
  // Paleographic Networks: ancient Hebrew alef (vertical body, straight upper crossbar, curved lower crossbar) — after Silas's illustration.
  alef: 'M8 0h2v2h-2zM8 2h2v2h-2zM8 4h2v2h-2zM0 6h22v2h-22zM8 8h2v2h-2zM8 10h2v2h-2zM20 10h2v2h-2zM8 12h4v2h-4zM20 12h2v2h-2zM8 14h2v2h-2zM12 14h8v2h-8zM8 16h2v2h-2zM8 18h2v2h-2zM8 20h2v2h-2zM8 22h4v2h-4z',
  // Paleographic Networks: mem (head of crossed parallel strokes, oblique body, curved looping foot) — after Silas's illustration.
  mem: 'M12 0h2v2h-2zM18 0h2v2h-2zM10 2h2v2h-2zM16 2h2v2h-2zM22 2h2v2h-2zM8 4h2v2h-2zM14 4h2v2h-2zM20 4h2v2h-2zM6 6h18v2h-18zM4 8h2v2h-2zM10 8h2v2h-2zM16 8h2v2h-2zM2 10h2v2h-2zM8 10h2v2h-2zM14 10h2v2h-2zM6 12h2v2h-2zM12 12h2v2h-2zM10 14h2v2h-2zM10 16h2v2h-2zM0 18h2v2h-2zM8 18h2v2h-2zM2 20h2v2h-2zM8 20h2v2h-2zM4 22h4v2h-4z',
  // Paleographic Networks: het (ladder of three strokes, uprights protruding upper left and lower right) — after Silas's illustration.
  het: 'M4 0h2v2h-2zM4 2h2v2h-2zM4 4h2v2h-2zM4 6h14v2h-14zM4 8h2v2h-2zM16 8h2v2h-2zM4 10h2v2h-2zM16 10h2v2h-2zM4 12h14v2h-14zM4 14h2v2h-2zM16 14h2v2h-2zM4 16h2v2h-2zM16 16h2v2h-2zM4 18h14v2h-14zM16 20h2v2h-2zM16 22h2v2h-2z',
  // EpOD (Epistemology of the Divine): the looped ring of its symbol.
  epod: 'M2 6h6v2h-6zM16 6h6v2h-6zM0 8h2v2h-2zM8 8h8v2h-8zM22 8h2v2h-2zM0 10h2v2h-2zM22 10h2v2h-2zM0 12h2v2h-2zM22 12h2v2h-2zM0 14h2v2h-2zM8 14h8v2h-8zM22 14h2v2h-2zM2 16h6v2h-6zM16 16h6v2h-6z',
};

export const ICON_NAMES = [...Object.keys(MAP), ...Object.keys(CUSTOM)];
