# @pzhown/ui Motion audit

This audit applies the repository `interaction-motion` skill to every public component family in `packages/ui/src/components`.

## Rules

- React components that need presence, layout, gesture, or coordinated spring motion use `motion/react`.
- CSS remains the default for simple hover, pressed, focus, color, opacity, and tiny state transitions.
- Static content and material infrastructure do not gain motion without a state or spatial relationship to explain.
- Motion must remain interruptible and must respect `prefers-reduced-motion` through `useReducedMotion()`.
- CSS keyframes must not animate the same `transform` / `opacity` properties owned by Motion.

## Component decisions

| Component | Decision | Reason |
| --- | --- | --- |
| `Button` / `IconButton` | CSS | Pressed/focus feedback is small and direct; no presence/layout coordination needed. |
| `TextField` / `Textarea` / `Select` / `SearchBar` | CSS | Focus, invalid, and clear-button feedback are simple local states. |
| `Toggle` | CSS | Binary pressed state is already legible without spatial travel. |
| `Switch` / `LiquidGlassToggle` | CSS for now | Thumb travel is a single local transform; Motion is only justified later if gesture/drag is added. |
| `Checkbox` / `Radio` / `RadioGroup` | CSS | Check/dot feedback is a tiny state transition. |
| `Slider` | native/CSS | Native range interaction owns the gesture semantics and thumb movement. |
| `SegmentedControl` | CSS for now | Current background transition is sufficient; migrate only if a true shared moving indicator is introduced. |
| `Badge` | none | Static status token. |
| `Avatar` | none | Image/fallback replacement does not need decorative motion. |
| `Progress` | CSS/native | Progress value is continuous feedback; the existing width/native progress representation is sufficient. |
| `Spinner` | CSS | Continuous loading motion is intrinsic system feedback; no extra Motion layer. |
| `Skeleton` | CSS | Loading placeholder effect remains CSS and must stay reduced-motion aware. |
| `Page` / `Toolbar` / `ToolbarGroup` / `ToolbarTitle` | none | Structural layout; page-level navigation continuity belongs to View Transitions/Astro. |
| `ListSection` | none | Static grouping surface. |
| `ListRow` | CSS | Pressed/focus feedback only; navigation transitions belong at page level. |
| `TabBar` / `TabBarItem` | CSS for now | Selection feedback is local; use Motion only if a shared indicator is introduced. |
| `Alert` | none | Persistent semantic status; should not animate by default. |
| `Dialog` / `DialogContent` | `motion/react` | Presence and exit lifecycle explain overlay hierarchy and prevent abrupt removal. |
| `Sheet` / `SheetContent` | `motion/react` | Spatial origin from bottom/left/right is meaningful. |
| `Popover` / `PopoverContent` | `motion/react` | Floating surface presence benefits from short origin-aware motion. |
| `ContextMenu` | `motion/react` | Pointer-origin floating surface needs presence/exit coordination. |
| `Tooltip` / `TooltipContent` | `motion/react` | Very short presence feedback; reduced motion collapses to opacity. |
| `DropdownMenu` / `DropdownMenuContent` | `motion/react` | Menu presence/exit and hierarchy are meaningful. |
| `DropdownMenuItem` / checkbox item | CSS | Item hover/pressed/checked feedback stays local. |
| `ToastProvider` / toast items | `motion/react` | Add/remove presence and stack reflow use `AnimatePresence` + layout animation. |
| `AlertDialog` / `AlertDialogContent` | `motion/react` | Modal presence/exit hierarchy matches Dialog behavior. |
| `Tabs` / `TabsTrigger` / `TabsContent` | CSS for now | Current state switch is simple; avoid content motion that competes with reading. |
| `Breadcrumb*` | none/CSS focus | Wayfinding should remain stable. |
| `Sidebar*` | CSS | Hover/pressed/current states are local; compact mode is structural and should not be animated by default. |
| `CommandPalette` | `motion/react` | Modal-like presence and exit lifecycle are meaningful. |
| `FormField` | none | Structural semantics. |
| `Combobox` | `motion/react` | Result-list presence/exit is a floating overlay state. |
| `DatePicker` / `DateRangePicker` | native/CSS | Platform date picker semantics own the interaction. |
| `EmptyState` | none | Do not add generic reveal animation. |
| `Pagination` | CSS | Button states are local; page content transitions belong to the consuming surface. |
| `DataTable` | CSS/native | Sorting/selection/loading states should stay stable and readable; row layout motion is not enabled by default. |
| `LiquidGlassSurface` | none | Material infrastructure must not introduce independent motion. |
| `ExternalLiquidGlassBackdrop` / `LiquidGlassBackdrop` | none | Rendering infrastructure only. |

## Current Motion owners

The following files intentionally import from `motion/react`:

- `components/data-entry.tsx` — Combobox presence.
- `components/navigation-extra.tsx` — CommandPalette presence.
- `components/overlays.tsx` — Dialog, Sheet, Popover, ContextMenu.
- `components/foundation-overlays.tsx` — Tooltip, DropdownMenu, Toast, AlertDialog.

All other public components were reviewed and intentionally remain CSS/native/static until their interaction model requires presence, layout animation, gesture, or a shared spatial indicator.
