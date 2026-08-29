# pzhown.cn

Monorepo for the public Astro site and the Payload CMS / admin backend.

## Stack

- `apps/web`: Astro 7 + Tailwind CSS 4 public site
- `apps/web`: React Islands are used only for stateful interaction
- `apps/cms`: Payload 3 on Next.js + Tailwind CSS 4
- `packages/ui`: PzHown-owned iOS 27 React component system, implemented from scratch
- Visual specification: `seunghan91/ios27-design-system`
- Component anatomy reference: `Andersonlimahw/react-cupertino-ui`
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
- Component lab: http://localhost:4321/components
- Payload Admin: http://localhost:3000/admin

## UI architecture

`@pzhown/ui` no longer uses the old shadcn / aria-nova / Base UI component implementation or the former global theme-correction chain.

The component system is intentionally owned by this repository. The current core is:

- Button
- TextField / Textarea / SearchBar / Select
- Toggle / Switch
- Checkbox
- RadioGroup / Radio
- Slider
- SegmentedControl
- Badge / Avatar
- Progress / Spinner / Skeleton
- Page
- Toolbar
- ListSection / ListRow
- TabBar
- Alert
- Dialog
- Sheet
- Popover
- ContextMenu

Visual values come from the iOS 27 reference system: system colors, SF Pro metrics, grouped surfaces, 28/36/50px button geometry, 52px list rows, 54px toolbar chrome, 95px tab-bar chrome, and Large / Medium / Small Liquid Glass materials.

`react-cupertino-ui` is not a visual dependency. It is used only as a structural reference when deciding component anatomy and state ownership. See [`packages/ui/THIRD_PARTY_NOTICES.md`](./packages/ui/THIRD_PARTY_NOTICES.md).

The formal visual contract is [`DESIGN.md`](./DESIGN.md). Agents must read it before substantial UI work.

### React usage

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  ListRow,
  ListSection,
  Select,
  TextField,
} from '@pzhown/ui/react'
```

Astro stays Astro-first. Interactive controls can be mounted as React Islands when needed; presentation-only content should remain native Astro.

## Styles

The iOS 27 component layer is exported as one stylesheet:

```css
@import "@pzhown/ui/styles.css";
```

Internally it is split by responsibility:

- `styles/tokens.css`: iOS 27 semantic colors, type metrics, spacing, geometry, motion
- `styles/typography.css`: semantic type utilities
- `styles/materials.css`: Liquid Glass and transparency fallbacks
- `styles/controls.css`: controls and form states
- `styles/content.css`: textarea/select, identity, progress and loading primitives
- `styles/navigation.css`: page, list, toolbar and tab-bar chrome
- `styles/overlays.css`: dialog, sheet, popover, context menu and alerts

The previous `components.css`, `ios-theme.css`, `form-controls.css`, `liquid-glass.css`, and `liquid-glass-components.css` are retired and must not be restored as a compatibility layer.

## Preserved effects

Only two visual-effect families from the previous system remain intentionally independent from iOS 27 components.

### Perceptual gradients

```css
@import "@pzhown/ui/effects.css";
```

Available utilities:

- `gradient-oklab`
- `gradient-smooth`
- `gradient-smooth-radial`

The smooth variants approximate smootherstep (`6t^5 - 15t^4 + 10t^3`) with multiple Oklab-interpolated stops.

### Progressive Blur

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
/>
```

React / Next:

```tsx
import { ProgressiveBlur } from '@pzhown/ui/react'
```

Progressive Blur is for scroll edges and contextual transitions. It is not a default component skin and should not be used as a persistent long-form reading background.

## Accessibility and adaptation

- Use semantic HTML first.
- Visual control size and hit target may differ; small iOS controls can keep a larger invisible target.
- Do not infer touch or mouse from viewport width; use pointer/hover capabilities where needed.
- Keyboard focus must remain independently visible.
- Reduced Motion and Reduced Transparency are supported by the shared styles.
- Liquid Glass must degrade to opaque grouped surfaces when backdrop filtering is unavailable or transparency is reduced.

## Database selection

Local development defaults to SQLite:

```env
DATABASE_ADAPTER=sqlite
DATABASE_URL=file:./payload.db
```

Production PostgreSQL:

```env
DATABASE_ADAPTER=postgres
DATABASE_URL=postgresql://user:password@localhost:5432/pzhown
```

Set `PAYLOAD_SECRET` and the production database configuration explicitly in production.
