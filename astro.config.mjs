import { defineConfig } from 'astro/config';

const cases = [
  '2fit', 'coca-cola-quiz', 'samsunglp', 'blackberry', '27million', 'habibs', 'ceapvagas',
  'doubleleft', 'modalimpa', 'solidum', 'natura', 'logofolio', 'standrews', 'saints', 'ice',
];

// The first design-for-research pages (/design-for-research/<slug>) became full cases at /design/<case>.
const designForResearch = {
  'stamp-seals-identity': 'sssl', 'paleographic-networks': 'paleonet', 'oub-logo': 'observatorio', 'epod-identity': 'epod',
};

// Old Squarespace URLs → new addresses (GitHub Pages serves these as instant-forward pages).
// Old Squarespace pages were in English (the -ptbr ones in Portuguese); Portuguese is now the root.
const redirects = {
  '/home': '/',
  '/scholar': '/en/#research',
  '/scholar-2': '/en/#research',
  '/scholar-3': '/en/#research',
  '/scholar-ptbr': '/#research',
  '/artdirector': '/en/#design',
  '/artdirector-ptbr': '/#design',
  '/phd': '/en/research/magical-mythical-networks',
  '/liminaldevices': '/en/research/liminal-devices',
  '/iconographicexegesis': '/en/research/iconographic-exegesis',
  '/cart': '/',
  // The art-direction cases live on the home page; there is no separate index.
  '/design': '/#design',
  '/en/design': '/en/#design',
  ...Object.fromEntries(cases.map((c) => [`/${c}`, `/en/design/${c}`])),
  ...Object.fromEntries(Object.entries(designForResearch).flatMap(([from, to]) => [
    [`/design-for-research/${from}`, `/design/${to}`],
    [`/en/design-for-research/${from}`, `/en/design/${to}`],
  ])),
};

// SITE_BASE=/silasklein.com serves the site from the GitHub preview address
// (silasklein.github.io/silasklein.com/) until the domain points here; leave it unset for www.silasklein.com.
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site: 'https://www.silasklein.com',
  base,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  redirects: Object.fromEntries(Object.entries(redirects).map(([from, to]) => [from, base.replace(/\/$/, '') + to])),
});
