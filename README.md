# silasklein.com

Site estático em [Astro](https://astro.build), publicado no GitHub Pages. Português e inglês, identidade visual do site anterior.

## Onde editar

| O quê | Arquivo |
|---|---|
| Todos os textos (EN/PT), projetos, publicações, cases, notícias | `src/content/` (pelo Pages CMS, ver abaixo) |
| Lista completa de publicações (`/publications`) | Vem do Zotero (My Publications) a cada publicação do site e toda segunda-feira; `npm run zotero` atualiza a cópia de segurança `src/content/zotero.json` |
| Textos fixos da interface (menu, botões) | `src/data/content.ts` (`ui`) |
| Cores, tipografia, layout | `src/styles/global.css` |
| Página inicial (ordem das seções) | `src/components/Home.astro` |
| Animações (revelação, menu) | `src/scripts/motion.ts` |
| Logo (grade 19×11, pixel-perfect) | `src/components/Logo.astro` e `../brand/logo.svg` |
| Endereços antigos → novos | `astro.config.mjs` (`redirects`) |
| Imagens | `public/img/` |

**Regra do logo:** use sempre `scale` inteiro (`<Logo scale={2} />` = 38×22 px). Nunca redimensione o logo por CSS.

## Editar pelo Pages CMS

O conteúdo fica em arquivos dentro de `src/content/`; o [Pages CMS](https://pagescms.org) mostra esses arquivos como formulários, com campos lado a lado em inglês e português. O arquivo `.pages.yml` define quais campos aparecem.

1. Entre em **app.pagescms.org** com a sua conta do GitHub e autorize o acesso ao repositório do site.
2. Escolha o repositório e a branch `main`.
3. Edite pelo menu lateral: **Site texts** (hero, bio, contato), **02 Currently**, **03 Research projects**, **04 Publications**, **Awards & distinctions**, **05 Teaching: in public**, **06 Initiatives**, **07 Art direction cases**, **07 Design for research**, **07 Clients**, **News**.
4. **Save** grava a alteração no GitHub; o site se republica sozinho em 1–2 minutos.

Dicas:
- **Order** define a posição na lista (1 aparece primeiro).
- **Slug** é o endereço da página (`/design/<slug>`). Não mude o slug de algo já publicado, senão o link antigo quebra.
- Imagens novas vão para `public/img/` pelo botão de mídia. Capas de livro e cases: use imagens quadradas (cases) ou só a capa, sem sombra (livros).
- Em **07 Clients**, preencha *Case slug* só quando existir um case com esse slug; aí o nome vira link.
- Em **News**, *Language* indica em que língua o post foi escrito.

## Rodar no computador

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
```

## Publicar (primeira vez)

1. Crie um repositório no GitHub (ex.: `silasklein-site`) e envie o conteúdo desta pasta `site/`.
2. No repositório: **Settings → Pages → Source: GitHub Actions**. Cada `push` na branch `main` publica sozinho (`.github/workflows/deploy.yml`).
3. **Settings → Pages → Custom domain:** `www.silasklein.com` (o arquivo `public/CNAME` já existe). Marque **Enforce HTTPS** depois que o certificado sair.
4. **DNS na Locaweb** (painel do domínio → Zona DNS):
   - `www` → **CNAME** → `<seu-usuario>.github.io`
   - `@` (domínio raiz) → quatro registros **A**: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Remova os registros antigos que apontam para o Squarespace.
5. Quando o domínio estiver apontado, apague as linhas `env:` / `SITE_BASE: /silasklein.com` em `.github/workflows/deploy.yml`. Até lá, o site de revisão fica em https://silasklein.github.io/silasklein.com/ (não aparece no Google).
6. Só cancele o Squarespace depois de o novo site abrir em `https://www.silasklein.com`.
