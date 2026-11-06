// Publications from the Zotero "My Publications" library, formatted by Zotero (Chicago author-date).
// The site fetches them at build time; if Zotero is unreachable it falls back to the saved snapshot
// (src/content/zotero.json, refreshed with `npm run zotero`).
const USER = 8523169;
const API = `https://api.zotero.org/users/${USER}/publications/items/top?format=json&include=data,bib&style=chicago-author-date&linkwrap=0&limit=100`;
const FILES = `https://api.zotero.org/users/${USER}/publications/items?itemType=attachment&format=json&limit=100`;
// MD5 of an empty file: Zotero stored the attachment without its content.
const EMPTY = 'd41d8cd98f00b204e9800998ecf8427e';

/** Every page of a Zotero API listing. @param {string} url */
async function fetchAll(url) {
  const items = [];
  for (let start = 0; ; start += 100) {
    const res = await fetch(`${url}&start=${start}`, { headers: { 'Zotero-API-Version': '3' } });
    if (!res.ok) throw new Error(`Zotero ${res.status}`);
    const page = await res.json();
    items.push(...page);
    if (page.length < 100) break;
  }
  return items;
}

/** @param {any} it @param {Set<string>} files keys of the PDFs anyone can download */
const toEntry = (it, files) => {
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
  // Zotero names the item's PDF even when the file itself is kept out of My Publications (no rights to share it).
  const file = att?.attachmentType === 'application/pdf' ? att.href.split('/').pop() : '';
  return {
    key: it.key,
    type: d.itemType,
    year,
    bib,
    doi,
    url: !doi ? link : '',
    pdf: files.has(file) ? `https://api.zotero.org/users/${USER}/publications/items/${file}/file/view` : '',
  };
};

export async function fetchPublications() {
  const [items, attachments] = await Promise.all([fetchAll(API), fetchAll(FILES)]);
  // Only stored files that are public and not empty get a PDF button.
  const files = new Set(attachments.filter((a) => a.data.linkMode === 'imported_file' && a.data.md5 && a.data.md5 !== EMPTY).map((a) => a.key));
  return items.map((it) => toEntry(it, files)).sort((a, b) => b.year.localeCompare(a.year) || a.bib.localeCompare(b.bib));
}

// `node src/lib/zotero.mjs` rewrites the snapshot.
const { pathToFileURL } = await import('node:url');
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { writeFileSync } = await import('node:fs');
  const list = await fetchPublications();
  writeFileSync(new URL('../content/zotero.json', import.meta.url), JSON.stringify(list, null, 2) + '\n');
  console.log(`${list.length} publications saved`);
}
