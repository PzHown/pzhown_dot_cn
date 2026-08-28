# pzhown.cn

Monorepo for the public Astro site and the Payload CMS / admin backend.

## Stack

- `apps/web`: Astro 7 public site
- `apps/cms`: Payload 3 on Next.js
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
