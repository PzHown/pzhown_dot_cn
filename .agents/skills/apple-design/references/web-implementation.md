# Web 实现规范

## 技术栈职责

本项目当前设计层分工：

- `apps/web`：Astro 7，公共前台，静态优先。
- `apps/cms`：Next.js + Payload，自定义后台页面可使用共享 UI；不要全局重写 Payload 原生 Admin。
- `packages/ui`：PzHown-owned iOS 27 React primitives 与视觉 token。
- `DESIGN.md`：iOS 27 机器可读 token + 中文视觉契约，是实现时的第一事实来源。
- `seunghan91/ios27-design-system`：系统色、Typography、组件几何、Liquid Glass、Motion 的视觉基准。
- `Andersonlimahw/react-cupertino-ui`：仅研究组件 anatomy、状态归属和组合方式，不使用它的视觉主题。
- Motion：需要 spring、presence、layout、gesture 时使用；简单状态优先 CSS。
- Tailwind CSS 4：页面布局与 utility，使用项目 `tw:` prefix；共享核心组件自身不依赖 Tailwind 才能成立。
- `effects.css`：Oklab / smootherstep Gradient。
- Progressive Blur：本地共享实现，仅用于边缘和上下文过渡。

## Astro

- 展示内容优先 `.astro`。
- 只有 Dialog、Sheet、Popover、复杂选择或其他真正需要状态时才使用 React Island。
- 不为了 hover、transition、gradient 或静态 iOS 27 外观把整个 section 变成 React。

## React primitives

- 共享交互组件优先复用 `@pzhown/ui/react`。
- 新 primitive 默认从原生语义 HTML + React 状态开始实现；先确保 Button、Input、Select、Dialog 等语义正确，再做 iOS 27 视觉。
- 不恢复旧 shadcn / aria-nova / Base UI DOM 和主题修补链。
- 复杂交互若原生语义不足，可按需引入成熟底层 primitive，但第三方层只能负责难以可靠重写的行为；DOM anatomy、公开 API 和视觉仍由 `@pzhown/ui` 所有。
- 状态命名保持语义化：rest / hover / focus-visible / pressed / selected / disabled / invalid / pending；不绑定某个第三方库的 data attribute 命名。

## iOS 27 Token

- 系统色、Label、Fill、Grouped Background、Separator、Typography 和 System Chrome 直接消费 `styles/tokens.css` / `DESIGN.md`。
- 不在业务组件里重新创建 `--pzhown-ui-*`、Tailwind gray/zinc 等第二套视觉 token。
- Button 视觉高度、List Row、Toolbar、Tab Bar 等系统几何以 `DESIGN.md` 当前值为准。
- 小视觉控件可以通过伪元素或 wrapper 扩展 hit area；不要为了触控命中区破坏 iOS 27 视觉尺寸。

## Liquid Glass

- Large Glass：Toolbar、Tab Bar、主要浮层。
- Medium Glass：Popover、Context Menu 等次级浮层。
- Small Glass：紧凑浮动控制。
- Content surface、Card、Table、长列表正文区域优先 Grouped Surface，不把整页铺成玻璃。
- 禁止无意义 glass-on-glass。
- `prefers-reduced-transparency` 或浏览器不支持 backdrop-filter 时，降级为不透明 Grouped Surface。

## 圆角

直接使用 `DESIGN.md` 的角色化 radius：Field、Control、Overlay、Sheet、Pill 等。

不要为普通圆角加入 SVG mask、复杂 Bézier 或额外的全局曲率覆盖；嵌套圆角优先保持同心关系。

## 渐变

优先：

```css
background: linear-gradient(135deg in oklab, var(--from), var(--to));
```

需要柔和起止时使用项目 `gradient-smooth` / `gradient-smooth-radial`，不要手写多套随机 easing stops。

渐变属于 Effects，不是 iOS 27 组件必须存在的装饰。

## Progressive Blur

- Linear blur 通常作为滚动/容器边缘条带使用，不默认铺满 Card。
- Radial blur 作为局部上下文效果。
- Chromium 对 masked `backdrop-filter` 存在组合问题：避免让 blur 祖先同时使用 `overflow: hidden` 与明显圆角；需要裁圆角时优先裁剪背景 sibling。
- Blur 层数量越多 GPU 成本越高；默认 8 层，只有肉眼需要时再增加。
- Progressive Blur 不替代 Liquid Glass，也不作为普通控件背景。

## Motion

- 简单状态优先 CSS。
- 组件的 open/selected/value 只能有一个状态所有者；不要让 CSS、Motion 和第三方 primitive 分别维护同一状态。
- 不滥用 `whileHover` 大幅缩放；iOS 27 控件更强调短促 pressed feedback。
- Reduced Motion 下去掉 spring / scale / parallax，保留必要 opacity 和状态确认。

## 设计验收

实现后至少检查：

1. `DESIGN.md` 是否仍是唯一视觉 token 来源。
2. 是否误用/恢复旧 shadcn、aria-nova、Base UI 组件链。
3. 窄屏、平板、宽屏与可变窗口。
4. light/dark。
5. mouse + touch + keyboard。
6. pressed/focus/selected/disabled/invalid。
7. reduced motion / reduced transparency。
8. Blur/Mask/backdrop-filter 在 Chromium 的实际降级路径。
9. 是否出现“泛 glassmorphism”而不是 iOS 27 系统组件语法。
