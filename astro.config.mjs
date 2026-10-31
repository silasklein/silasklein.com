import { defineConfig } from 'astro/config';

const cases = [
  '2fit', 'coca-cola-quiz', 'samsunglp', 'blackberry', '27million', 'habibs', 'ceapvagas',
  'doubleleft', 'modalimpa', 'solidum', 'natura', 'logofolio', 'standrews', 'saints', 'ice',
];

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
  ...Object.fromEntries(cases.map((c) => [`/${c}`, `/en/design/${c}`])),
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
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  redirects: Object.fromEntries(Object.entries(redirects).map(([from, to]) => [from, base.replace(/\/$/, '') + to])),
});
