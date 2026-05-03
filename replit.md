# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm v10
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Bhatia Traders (`artifacts/bhatia-traders`)
- **Type**: React + Vite (presentation-first, no backend)
- **Preview path**: `/`
- **Purpose**: Brand awareness website for Bhatia Traders — authorized TVS Motorcycle, JK Tyre, and Exide Battery dealer in Narsinghpur, Madhya Pradesh, India
- **Features**:
  - Bilingual (Hindi + English) content throughout
  - 5 pages: Home, Products, Promotions/Offers, About, Contact
  - Markdown-based CMS: `src/content/promotions.md` and `src/content/news.md` for easy content updates
  - SEO optimized: react-helmet-async, JSON-LD LocalBusiness schema, sitemap.xml, robots.txt
  - framer-motion animations throughout
  - Floating WhatsApp button (+91 9425168575)
  - Social media links (Facebook, Instagram, LinkedIn, Google Business)
  - TVS navy blue (#183883) primary, JK Tyre yellow (#FFEB00) accent color palette
  - Google Fonts: Baloo 2 (headings, Devanagari support) + Poppins (body)
- **Content CMS**: Edit `src/content/promotions.md` or `src/content/news.md` to update promotions and news without code changes
- **Dependencies**: react-markdown, remark-gfm, react-helmet-async, framer-motion, react-icons
- **CI Build command**: `PORT=3000 BASE_PATH=/ NODE_ENV=production pnpm --filter @workspace/bhatia-traders run build`

## GitHub Actions (CI/CD)

Two workflows in `.github/workflows/`:

### `deploy.yml` — Auto-deploy to GitHub Pages
- Triggers on every push to `main`
- Builds `artifacts/bhatia-traders` with Vite
- Copies `index.html` → `404.html` for SPA routing
- Deploys to GitHub Pages
- **BASE_PATH**: Set as a GitHub repo variable (Settings → Variables → Actions). Defaults to `/`.
  - Use `/` for a custom domain or user/org pages (e.g. `username.github.io`)
  - Use `/repo-name/` for project pages (e.g. `username.github.io/bhatia-traders`)

### `ci.yml` — Typecheck & Build Check
- Runs on every push and pull request to `main`
- Validates TypeScript and confirms the production build succeeds

### GitHub Pages Setup Steps
1. Push code to GitHub
2. Go to repo Settings → Pages → Source: **GitHub Actions**
3. (Optional) Set `BASE_PATH` variable in Settings → Variables → Actions
4. Push any commit to `main` to trigger the first deploy
