# pzhown.cn

Monorepo for the public Astro site and the Payload CMS / admin backend.

## Stack

- `apps/web`: Astro 7 + Tailwind CSS 4 public site
- `apps/web`: React Islands are available for interactive components
- `apps/cms`: Payload 3 on Next.js + Tailwind CSS 4
- `packages/ui`: shared framework-light UI primitives
- Database: SQLite for local development by default, PostgreSQL for production
- Package manager: pnpm workspaces

## Requirements

- Node.js 22.12+
- pnpm 9+

## Local development

```bash
pnpm install
cp apps/cms/.env.example apps/cms/.env
pnpm dev
```

- Astro: http://localhost:4321
- Payload Admin: http://localhost:3000/admin

The first visit to Payload Admin will guide you through creating the initial user.

## Styling

The Astro frontend uses Tailwind CSS 4 through the official Vite plugin.

The Payload backend uses Tailwind CSS 4 through PostCSS. Tailwind Preflight is intentionally disabled there and utilities use the `tw:` prefix, for example `tw:flex`, so Payload's built-in Admin styles are not reset or shadowed.

### Progressive Blur

Progressive Blur is implemented locally in `@pzhown/ui`. The visual core is CSS plus framework-neutral layer calculations, so there is no dependency on the former `progressive-blur` npm package.

Astro and React / Next use the same component name and the same core props. Only the adapter import path differs.

Astro:

```astro
---
import ProgressiveBlur from '@pzhown/ui/astro'
---

<ProgressiveBlur
  mode="linear"
  side="bottom"
  strength={64}
  steps={8}
  falloff={100}
  tint="transparent"
  className="my-blur"
/>
```

Next.js / React:

```tsx
import ProgressiveBlur from '@pzhown/ui/react'

<ProgressiveBlur
  mode="linear"
  side="bottom"
  strength={64}
  steps={8}
  falloff={100}
  tint="transparent"
  className="my-blur"
/>
```

Shared API:

- `mode`: `linear | radial`
- `side`: `top | right | bottom | left` for linear mode
- `strength`: maximum blur strength
- `steps`: number of blur layers
- `falloff`: percentage of the area used for progressive falloff
- `tint`: optional tint color
- `className`: additional class name

The Astro adapter renders with zero client JavaScript. The React adapter has no hooks or browser APIs, so it can remain a React Server Component in Next.js / Payload.

## Database selection

Local development defaults to SQLite:

```env
DATABASE_ADAPTER=sqlite
DATABASE_URL=file:./payload.db
```

For PostgreSQL:

```env
DATABASE_ADAPTER=postgres
DATABASE_URL=postgresql://user:password@localhost:5432/pzhown
```

In production, set `PAYLOAD_SECRET` to a strong secret and explicitly configure the database adapter and URL.
