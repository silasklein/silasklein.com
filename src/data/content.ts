// Site content. Editable text lives in src/content/ (edited through Pages CMS, see .pages.yml);
// this module only loads it and keeps the interface strings.
import site from '../content/site.json';
import currentlyFile from '../content/currently.json';
import recognitionFile from '../content/recognition.json';
import publicationsFile from '../content/publications.json';
import clientsFile from '../content/clients.json';
import outreachFile from '../content/outreach.json';
import initiativesFile from '../content/initiatives.json';
import talksFile from '../content/talks.json';

export type Lang = 'en' | 'pt';
export type L = { en: string; pt: string };
export const t = (l: L, lang: Lang) => l[lang];

const fm = <T,>(mods: Record<string, any>): T[] => Object.values(mods).map((m) => m.frontmatter as T);
const byOrder = <T extends { order?: number }>(a: T, b: T) => (a.order ?? 0) - (b.order ?? 0);

export const ui = {
  nav: {
    currently: { en: 'Currently', pt: 'Agora' },
    research: { en: 'Research', pt: 'Pesquisa' },
    publications: { en: 'Publications', pt: 'Publicações' },
    teaching: { en: 'Teaching', pt: 'Docência' },
    initiatives: { en: 'Initiatives', pt: 'Iniciativas' },
    design: { en: 'Design', pt: 'Design' },
    about: { en: 'About', pt: 'Sobre' },
    contact: { en: 'Contact', pt: 'Contato' },
  },
  hello: site.hello as L,
  subtitle: site.subtitle as L,
  index: { en: 'What do you want to see?', pt: 'O que você quer ver?' },
  seeAll: { en: 'See all', pt: 'Ver tudo' },
  readMore: { en: 'Read more', pt: 'Saiba mais' },
  back: { en: 'Back to home', pt: 'Voltar ao início' },
  getInTouch: { en: 'Get in touch', pt: 'Fale comigo' },
  exploreResearch: { en: 'Explore research', pt: 'Conheça a pesquisa' },
  fullList: { en: 'Full list of publications', pt: 'Lista completa de publicações' },
  role: { en: 'Role', pt: 'Papel' },
  funding: { en: 'Funding', pt: 'Financiamento' },
  partners: { en: 'Partners', pt: 'Parceiros' },
  commissioner: { en: 'Commissioner', pt: 'Contratante' },
  year: { en: 'Year', pt: 'Ano' },
  copy: { en: 'Copy', pt: 'Copiar' },
  copied: { en: 'Copied', pt: 'Copiado' },
  rights: { en: 'All rights reserved.', pt: 'Todos os direitos reservados.' },
  langName: { en: 'Português', pt: 'English' },
  descriptor: site.descriptor as L,
};

export const sections = site.sections as Record<'about' | 'currently' | 'research' | 'publications' | 'teaching' | 'initiatives' | 'design' | 'contact', { n: string; label: L; title: L }>;
export const facts = site.facts as { icon: string; k: L; v: L }[];
export const bio = site.bio as L;
export const bio2 = site.bio2 as L;
export const researchApproach = site.researchApproach as L;
export const teaching = site.teaching as L;
export const designIntro = site.designIntro as L;
export const email = site.email as string;
export const profiles = site.profiles as { name: string; icon: string; href: string }[];
export const contactTopics = site.contactTopics as { icon: string; label: L; email?: string }[];

export const currently = currentlyFile.items as { kicker: L; title: L; text: L; href: string; icon: string }[];
export const recognition = recognitionFile.items as L[];
export const books = publicationsFile.books as { cover: string; title: string; meta: L; href: string; pdf?: string }[];
export const selected = publicationsFile.selected.map((s: any) => ({ ...s, href: s.href || null })) as { title: string; venue: string; href: string | null; pdf?: string }[];
export const clients = clientsFile.items as { name: string; slug?: string }[];
export const outreach = outreachFile.items as { title: L; text: L; href: string; icon: string }[];
export const talks = talksFile.items as { year: string; kind: L; title: string; channel: string; lang: Lang; href: string }[];
export const initiatives = initiativesFile.items as { icon: string; title: L; text: L; details?: L; more?: string; href?: string }[];

export type Project = { order?: number; slug?: string; page?: boolean; featured?: boolean; icon?: string; years: string; title: L; role: L; places?: { name: L; href?: string }[]; funding?: string; partners?: string; summary: L; outputs?: L[]; current?: boolean };
export const projects: Project[] = fm<Project>(import.meta.glob('../content/projects/*.md', { eager: true }))
  .sort(byOrder).map((p) => ({ ...p, slug: p.page ? p.slug : undefined }));

export type Post = { slug: string; date: string; lang: Lang; title: string; summary: string; Content?: any };
const newsMods = Object.values(import.meta.glob('../content/news/*.md', { eager: true })) as any[];
export const news: Post[] = newsMods.map((m) => ({ ...m.frontmatter, Content: m.rawContent().trim() ? m.Content : undefined }) as Post)
  .map((p) => ({ ...p, date: (p.date as unknown) instanceof Date ? (p.date as unknown as Date).toISOString().slice(0, 10) : String(p.date).slice(0, 10) })).sort((a, b) => b.date.localeCompare(a.date));

export type Case = { order?: number; slug: string; title: string; image: string; gallery?: string[]; team?: L; role?: L; commissioner?: string; year?: string; text: L };
export const cases: Case[] = fm<Case>(import.meta.glob('../content/cases/*.md', { eager: true }))
  .sort(byOrder);

export type DesignItem = { order?: number; slug: string; icon: string; title: L; text: L; year: string; client: string; role: L; body: L; href?: string };
export const designForResearch: DesignItem[] = fm<DesignItem>(import.meta.glob('../content/design-research/*.md', { eager: true })).sort(byOrder);

