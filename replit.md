# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
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
