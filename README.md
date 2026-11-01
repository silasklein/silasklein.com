# silasklein.com

Site estático em [Astro](https://astro.build), publicado no GitHub Pages. Abre em português (raiz); a versão em inglês fica em `/en/`.

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

**Regra do logo:** use `scale` em passos de meio (`<Logo scale={1.5} />` = 28,5×16,5 px no topo; `scale={1}` no rodapé). Nunca redimensione o logo por CSS.

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

## Trocar o domínio (Locaweb → GitHub Pages)

O site está no ar em https://www.silasklein.com, publicado a partir do repositório `silasklein/silasklein.com`.

1. **Um dia antes:** na Zona DNS da Locaweb, baixe o TTL dos registros de `silasklein.com` e `www` para 300 segundos (5 min).
2. **Verificar o domínio no GitHub** (impede que outra conta use o seu domínio): GitHub → foto → *Settings* → *Pages* → *Add a domain* → `silasklein.com`. O GitHub mostra um registro **TXT** (`_github-pages-challenge-silasklein`); crie-o na Locaweb e clique em *Verify*.
3. **Na Zona DNS da Locaweb**, apague os registros que apontam para o Squarespace (A `198.185.159.x` / `198.49.23.x` e o CNAME `www` → `ext-cust.squarespace.com`, além de CNAMEs de verificação do Squarespace). **Não apague MX, SPF/TXT de e-mail.**
4. Crie:
   - `@` → **A** → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `@` → **AAAA** (opcional, IPv6) → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `www` → **CNAME** → `silasklein.github.io.`
5. **No repositório:** apague as linhas `env:` / `SITE_BASE: /silasklein.com` em `.github/workflows/deploy.yml` e configure *Settings → Pages → Custom domain* = `www.silasklein.com`.
6. Quando o certificado sair (minutos a 24 h), marque **Enforce HTTPS**.
7. Envie `https://www.silasklein.com/sitemap.xml` no Google Search Console.
8. Só cancele o Squarespace depois de o site novo abrir em https://www.silasklein.com e https://silasklein.com.
