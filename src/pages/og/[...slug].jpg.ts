// Share images as JPEG, since LinkedIn and WhatsApp do not read WebP: one per case, design-for-research case
// and news post with a picture, made at build time so new CMS entries get theirs too.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { join } from 'node:path';
import { cases, researchCases, news } from '../../data/content';
import { postCover } from '../../lib/format';

export function getStaticPaths() {
  const posts = new Map<string, string>();
  for (const p of news) { const src = postCover(p.html); if (src && !posts.has(p.slug)) posts.set(p.slug, src); }
  return [
    ...cases.map((c) => ({ params: { slug: `design/${c.slug}` }, props: { src: c.image } })),
    ...researchCases.map((r) => ({ params: { slug: `design/${r.slug}` }, props: { src: r.hero } })),
    ...[...posts].map(([slug, src]) => ({ params: { slug: `news/${slug}` }, props: { src } })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const jpg = await sharp(join(process.cwd(), 'public', props.src))
    .flatten({ background: '#F5F6F4' })
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Response(jpg, { headers: { 'Content-Type': 'image/jpeg' } });
};
