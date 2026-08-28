# Web 实现规范

## 技术栈职责

本项目当前设计层分工：

- `apps/web`：Astro 7，公共前台，静态优先。
- `apps/cms`：Next.js + Payload，自定义后台页面可使用共享 UI；不要全局重写 Payload 原生 Admin。
- `packages/ui`：共享设计系统。
- React Aria Components：交互语义、键盘、Focus、Overlay 行为。
- Motion：spring、presence、layout、gesture。
- Tailwind CSS 4：布局与 utility，使用项目 `tw:` prefix。
- `effects.css`：Squircle、Smooth Gradient 等全局视觉能力。
- Progressive Blur：本地共享实现。

## Astro

- 展示组件优先 `.astro`。
- 只有 Dialog/Menu/Tabs/复杂状态等真正需要 React 时才使用 React Island。
- 不为了 hover/transition/gradient 把整个 section 变成 React。

## React Aria

优先使用 React Aria 提供的 render props/data states，例如：

- `data-hovered`
- `data-pressed`
- `data-selected`
- `data-focus-visible`
- `data-entering`
- `data-exiting`

不要重新实现其键盘/焦点行为。

## Squircle

正常设置 radius：

```css
.card {
  border-radius: 24px;
}
```

由共享样式在浏览器支持时应用：

```css
@supports (corner-shape: squircle) {
  *, *::before, *::after {
    corner-shape: squircle;
  }
}
```

不要为普通圆角加入 SVG mask 或复杂 Bézier。

## 渐变

优先：

```css
background: linear-gradient(135deg in oklab, var(--from), var(--to));
```

需要柔和起止时使用项目 `gradient-smooth` / `gradient-smooth-radial`，不要手写十几套不同 easing stop。

## Progressive Blur

- Linear blur 通常作为边缘条带使用，而不是默认铺满整张 Card。
- Radial blur 通常作为局部区域使用。
- Chromium 对 masked `backdrop-filter` 存在已知组合问题：避免让 blur 的祖先同时使用 `overflow: hidden` 与明显 `border-radius`；需要裁圆角时优先裁剪背景 sibling，而不是 blur 的祖先。
- Blur 层数量越多 GPU 成本越高；默认 8 层，只有肉眼需要时再增加。

## Motion

- 简单状态优先 CSS。
- 使用 Motion 时保持动画状态与 React Aria 状态一致，不让两个系统分别维护 open/selected 状态。
- 不滥用 `whileHover` 大幅缩放；按压反馈通常比 hover 漂浮更重要。

## Token 与样式

- 颜色使用 `--pzhown-ui-*` 语义 token，不在组件内部散落重复硬编码。
- Tailwind arbitrary value 只用于布局细节，不把关键语义色完全依赖 arbitrary class；关键状态应有稳定 CSS/token 规则。
- 新增基础组件时优先放 `packages/ui/src/components`，再由 `@pzhown/ui/react` 导出。
- 单页样式只有在确实不具备复用价值时才留在页面内。

## 设计验收

实现后至少检查：

1. 桌面和移动宽度。
2. light/dark。
3. mouse + keyboard。
4. pressed/focus/selected/disabled。
5. reduced motion。
6. Blur/Mask 在 Chromium 的实际渲染。
7. 是否出现默认 shadcn/Base UI 风格回退。
