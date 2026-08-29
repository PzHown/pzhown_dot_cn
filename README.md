# pzhown.cn

Monorepo for the public Astro site and the Payload CMS / admin backend.

## Stack

- `apps/web`: Astro 7 + Tailwind CSS 4 + Motion public site
- `apps/web`: React Islands are available for interactive components
- `apps/cms`: Payload 3 on Next.js + Tailwind CSS 4 + Motion
- `packages/ui`: shared UI system built with React Aria Components + shadcn-style source components
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

Both apps use Tailwind CSS 4 with the `tw:` prefix. Payload does not enable Tailwind Preflight, so its built-in Admin styles remain isolated from the custom UI system.

### Rounded corners

Shared UI uses normal CSS `border-radius` values directly. Corner size remains explicit at the component or token layer.

```css
.card {
  border-radius: 24px;
}
```

### Smooth gradients

The shared effects stylesheet exposes perceptual and smootherstep gradient utilities.

```html
<div
  class="gradient-smooth"
  style="--gradient-angle: 135deg; --gradient-from: #fff; --gradient-to: transparent"
></div>
```

Available utilities:

- `gradient-oklab`: regular two-stop gradient interpolated in Oklab
- `gradient-smooth`: linear smootherstep-eased gradient with Oklab interpolation
- `gradient-smooth-radial`: radial smootherstep-eased gradient

The smooth variants approximate `6t^5 - 15t^4 + 10t^3` with multiple CSS color stops, which makes the transition start and end more gently than a simple two-stop linear gradient.

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

## UI components

`@pzhown/ui` uses React Aria Components as its interaction and accessibility primitive layer, with shadcn-style source ownership and PzHown visual tokens. The initial component set is:

- Button
- Input
- Dialog
- Popover
- Tooltip
- Dropdown Menu
- Tabs
- Switch

React Aria owns adaptive mouse, touch, keyboard, focus, screen-reader, overlay, and selection behavior. The PzHown layer owns rounded surfaces, translucent materials, OKLCH tokens, blur, gradients, and interaction styling.

Next.js / Payload custom UI can import components directly:

```tsx
import { Button, Dialog, DialogContent, DialogTrigger } from '@pzhown/ui/react'
```

Astro uses the same React components inside React Islands when interaction is required:

```astro
---
import { Button } from '@pzhown/ui/react'
---

<Button client:idle>Open</Button>
```

Presentation-only Astro components should remain native Astro where possible. React Aria components are intended for stateful controls such as dialogs, menus, popovers, tabs, switches, and tooltips.

The shared component theme is intentionally scoped to the `.pzhown-ui` class so it does not overwrite Payload's built-in Admin theme. The component layer uses React Aria state attributes such as `data-hovered`, `data-pressed`, `data-selected`, `data-focus-visible`, `data-entering`, and `data-exiting` for adaptive interaction styling.

A `packages/ui/components.json` file is included for future shadcn CLI additions. The package uses the React Aria / Nova base, neutral tokens, Lucide icons, Tailwind CSS variables, and the workspace UI aliases.

## Animation

Motion is the standard animation engine for both apps.

Astro uses Motion's framework-agnostic API:

```ts
import { animate, inView, scroll } from 'motion'
```

Next.js / Payload React components use the React API:

```tsx
import { motion, AnimatePresence } from 'motion/react'
```

Use CSS first for simple hover, focus, color, opacity, pressed, selected, entering, and exiting state transitions exposed by React Aria. Use Motion for richer state-driven animation, springs, gestures, layout transitions, scroll-linked animation, and coordinated UI transitions.

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
