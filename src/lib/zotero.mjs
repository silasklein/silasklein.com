// Publications from the Zotero "My Publications" library, formatted by Zotero (Chicago author-date).
// The site fetches them at build time; if Zotero is unreachable it falls back to the saved snapshot
// (src/content/zotero.json, refreshed with `npm run zotero`).
const USER = 8523169;
const API = `https://api.zotero.org/users/${USER}/publications/items/top?format=json&include=data,bib&style=chicago-author-date&linkwrap=0&limit=100`;

/** @param {any} it */
const toEntry = (it) => {
  const d = it.data;
  const att = it.links?.attachment;
  // The trailing URL/DOI in the citation becomes a button instead.
  let bib = String(it.bib || '').replace(/^[\s\S]*?<div class="csl-entry">/, '').replace(/<\/div>\s*<\/div>\s*$/, '').trim();
  const tail = bib.match(/\s(https?:\/\/\S+?)\.?$/);
  if (tail) bib = bib.slice(0, tail.index);
  bib = bib.replace(/<(?!\/?(i|b|em|strong|sup|sub|span)>)[^>]*>/gi, '');
  const year = String(it.meta?.parsedDate || d.date || '').slice(0, 4);
  const link = d.url || tail?.[1] || '';
  const isDoi = (u) => /doi\.org\//.test(u);
  const doi = d.DOI ? `https://doi.org/${d.DOI.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}` : isDoi(link) ? link : '';
  return {
    key: it.key,
    type: d.itemType,
    year,
    bib,
    doi,
    url: !doi ? link : '',
    pdf: att?.attachmentType === 'application/pdf' ? `https://api.zotero.org/users/${USER}/publications/items/${att.href.split('/').pop()}/file/view` : '',
  };
};

export async function fetchPublications() {
  const items = [];
  for (let start = 0; ; start += 100) {
    const res = await fetch(`${API}&start=${start}`, { headers: { 'Zotero-API-Version': '3' } });
    if (!res.ok) throw new Error(`Zotero ${res.status}`);
    const page = await res.json();
    items.push(...page);
    if (page.length < 100) break;
  }
  return items.map(toEntry).sort((a, b) => b.year.localeCompare(a.year) || a.bib.localeCompare(b.bib));
}

// `node src/lib/zotero.mjs` rewrites the snapshot.
const { pathToFileURL } = await import('node:url');
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { writeFileSync } = await import('node:fs');
  const list = await fetchPublications();
  writeFileSync(new URL('../content/zotero.json', import.meta.url), JSON.stringify(list, null, 2) + '\n');
  console.log(`${list.length} publications saved`);
}
