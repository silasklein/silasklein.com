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

export type Lang = 'en' | 'pt' | 'es';
export type L = { en: string; pt: string; es?: string };
// Spanish is the newest language: a text without its Spanish version shows the English one.
export const t = (l: L, lang: Lang) => (lang === 'es' ? l.es || l.en : l[lang]);
// The languages, in menu order: code, name in its own language, short code, and the tags each one uses.
export const langs = [
  { code: 'pt', name: 'Português', short: 'BR', hreflang: 'pt-BR', locale: 'pt_BR', date: 'pt-BR' },
  { code: 'en', name: 'English', short: 'EN', hreflang: 'en', locale: 'en_US', date: 'en-GB' },
  { code: 'es', name: 'Español', short: 'ES', hreflang: 'es', locale: 'es_LA', date: 'es' },
] as const satisfies readonly { code: Lang; name: string; short: string; hreflang: string; locale: string; date: string }[];
export const langInfo = (lang: Lang) => langs.find((x) => x.code === lang)!;

const fm = <T,>(mods: Record<string, any>): T[] => Object.values(mods).map((m) => m.frontmatter as T);
const byOrder = <T extends { order?: number }>(a: T, b: T) => (a.order ?? 0) - (b.order ?? 0);

export const ui = {
  nav: {
    currently: { en: 'Currently', pt: 'Agora', es: 'Ahora' },
    research: { en: 'Research', pt: 'Pesquisa', es: 'Investigación' },
    publications: { en: 'Publications', pt: 'Publicações', es: 'Publicaciones' },
    teaching: { en: 'Teaching', pt: 'Docência', es: 'Docencia' },
    initiatives: { en: 'Initiatives', pt: 'Iniciativas', es: 'Iniciativas' },
    design: { en: 'Design', pt: 'Design', es: 'Diseño' },
    about: { en: 'About', pt: 'Sobre', es: 'Sobre mí' },
    contact: { en: 'Contact', pt: 'Contato', es: 'Contacto' },
  },
  hello: site.hello as L,
  subtitle: site.subtitle as L,
  index: { en: 'What do you want to see?', pt: 'O que você quer ver?', es: '¿Por dónde empezar?' },
  seeAll: { en: 'See all', pt: 'Ver tudo', es: 'Ver todo' },
  readMore: { en: 'Read more', pt: 'Saiba mais', es: 'Más información' },
  back: { en: 'Back to home', pt: 'Voltar ao início', es: 'Volver al inicio' },
  getInTouch: { en: 'Get in touch', pt: 'Fale comigo', es: 'Hablemos' },
  exploreResearch: { en: 'Explore research', pt: 'Conheça a pesquisa', es: 'Conocer la investigación' },
  fullList: { en: 'Full list of publications', pt: 'Lista completa de publicações', es: 'Lista completa de publicaciones' },
  role: { en: 'Role', pt: 'Papel', es: 'Función' },
  funding: { en: 'Funding', pt: 'Financiamento', es: 'Financiamiento' },
  partners: { en: 'Partners', pt: 'Parceiros', es: 'Instituciones asociadas' },
  team: { en: 'Team', pt: 'Equipe', es: 'Equipo' },
  commissioner: { en: 'Commissioner', pt: 'Contratante', es: 'Contratante' },
  year: { en: 'Year', pt: 'Ano', es: 'Año' },
  copy: { en: 'Copy', pt: 'Copiar', es: 'Copiar' },
  copied: { en: 'Copied', pt: 'Copiado', es: 'Copiado' },
  rights: { en: 'All rights reserved.', pt: 'Todos os direitos reservados.', es: 'Todos los derechos reservados.' },
  language: { en: 'Language', pt: 'Idioma', es: 'Idioma' },
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
export const location = site.location as string;
export const profiles = site.profiles as { name: string; icon: string; href: string }[];
export const contactTopics = site.contactTopics as { icon: string; label: L; email?: string }[];

export const currently = currentlyFile.items as { kicker: L; title: L; text: L; href: string; icon: string }[];
export const recognition = recognitionFile.items as L[];
export const books = publicationsFile.books as { cover: string; title: string; meta: L; href: string; pdf?: string }[];
export const selected = publicationsFile.selected.map((s: any) => ({ ...s, href: s.href || null })) as { title: string; venue: string; href: string | null; pdf?: string }[];
// name_en only where the English name differs (e.g. Groupe SEB); the home sorts by the shown name.
export const clients = clientsFile.items as { name: string; name_en?: string; name_es?: string; slug?: string }[];
export const outreach = outreachFile.items as { title: L; text: L; href: string; icon: string }[];
export const talks = talksFile.items as { year: string; kind: L; title: string; channel: string; lang: 'pt' | 'en'; href: string }[];
export const initiatives = initiativesFile.items as { icon: string; title: L; text: L; details?: L; more?: string; href?: string }[];

export type Project = { order?: number; slug?: string; page?: boolean; featured?: boolean; icon?: string; years: string; title: L; role: L; places?: { name: L; href?: string }[]; funding?: string; partners?: string; team?: L; summary: L; outputs?: L[]; current?: boolean };
export const projects: Project[] = fm<Project>(import.meta.glob('../content/projects/*.md', { eager: true }))
  .sort(byOrder).map((p) => ({ ...p, slug: p.page ? p.slug : undefined }));

export type Post = { slug: string; date: string; lang: Lang; title: string; summary: string; html?: string };
const newsMods = Object.values(import.meta.glob('../content/news/*.md', { eager: true })) as any[];
// The post text (Markdown below the frontmatter) is kept as HTML so the page can fix image paths for the preview address.
export const news: Post[] = (await Promise.all(newsMods.map(async (m) => ({ ...m.frontmatter, html: m.rawContent().trim() ? await m.compiledContent() : undefined }) as Post)))
  .map((p) => ({ ...p, date: (p.date as unknown) instanceof Date ? (p.date as unknown as Date).toISOString().slice(0, 10) : String(p.date).slice(0, 10) })).sort((a, b) => b.date.localeCompare(a.date));

export type Case = { order?: number; slug: string; title: string; image: string; gallery?: string[]; team?: L; role?: L; commissioner?: string; year?: string; text: L; tags?: string[]; mosaic?: boolean };
export const cases: Case[] = fm<Case>(import.meta.glob('../content/cases/*.md', { eager: true }))
  .sort(byOrder);

export type DesignItem = { order?: number; slug: string; case?: string; icon: string; title: L; text: L };
export const designForResearch: DesignItem[] = fm<DesignItem>(import.meta.glob('../content/design-research/*.md', { eager: true })).sort(byOrder);


// Skill tags: one closed vocabulary shared by both design divisions. Projects refer to tags by slug only.
export type Tag = { slug: string; label_pt: string; label_en: string; label_es?: string; descricao: string };
export const tags: Tag[] = Object.values(import.meta.glob('../content/tags/*.json', { eager: true, import: 'default' })) as Tag[];
export const tagLabel = (slug: string, lang: Lang) => { const g = tags.find((x) => x.slug === slug); return g ? (lang === 'pt' ? g.label_pt : lang === 'es' ? g.label_es || g.label_en : g.label_en) : slug; };

// Design-for-research case pages (/design/<slug> and /en/design/<slug>); every text is a {pt, en} pair.
export type CaseImage = { src: string; span?: number; caption?: L; plate?: boolean };
export type Decision = { title: L; text: L; wide?: boolean; images?: CaseImage[]; figures_intro?: L; figures?: { n: string; label: L }[] };
export type ResearchCase = { order?: number; slug: string; title: string; thesis: L; lead: L; meta: { k: L; v: L }[]; hero: string; hero_alt?: L; context?: L; problem?: L; problem_label?: L; decisions: Decision[]; tags: string[] };
export const researchCases: ResearchCase[] = (Object.values(import.meta.glob('../content/research-cases/*.json', { eager: true, import: 'default' })) as ResearchCase[]).sort(byOrder);
