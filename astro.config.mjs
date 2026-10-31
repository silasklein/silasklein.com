import { defineConfig } from 'astro/config';

const cases = [
  '2fit', 'coca-cola-quiz', 'samsunglp', 'blackberry', '27million', 'habibs', 'ceapvagas',
  'doubleleft', 'modalimpa', 'solidum', 'natura', 'logofolio', 'standrews', 'saints', 'ice',
];

// Old Squarespace URLs → new addresses (GitHub Pages serves these as instant-forward pages).
const redirects = {
  '/home': '/',
  '/scholar': '/#research',
  '/scholar-2': '/#research',
  '/scholar-3': '/#research',
  '/scholar-ptbr': '/pt/#research',
  '/artdirector': '/#design',
  '/artdirector-ptbr': '/pt/#design',
  '/phd': '/research/magical-mythical-networks',
  '/liminaldevices': '/research/liminal-devices',
  '/iconographicexegesis': '/research/iconographic-exegesis',
  '/cart': '/',
  ...Object.fromEntries(cases.map((c) => [`/${c}`, `/design/${c}`])),
};

export default defineConfig({
  site: 'https://www.silasklein.com',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  redirects,
});
