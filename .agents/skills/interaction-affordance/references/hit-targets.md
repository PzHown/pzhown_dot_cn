# 命中区、输入能力与可访问性

## 命中区原则

项目默认让独立交互控件具有舒适触控目标，通常以约 `44×44 CSS px` 作为设计目标，而不是把视觉图标强行放大到 44px。

允许视觉尺寸与 hit area 分离：

- Icon 可为 16–20px。
- Button 视觉高度可以更紧凑。
- 通过 padding 或安全 hit area 扩大触控目标。

正文 inline link 属于自然文本流，不套用独立控件的固定 44×44 视觉尺寸。

WCAG 2.2 Target Size (Minimum) 的 AA 要求为至少 24×24 CSS px 或满足相应间距/例外；项目的 44px 是更舒适的设计目标，不把它误写成 WCAG AA 的硬性数值。

## 输入能力

不要从屏幕宽度推断输入方式。

分别考虑：

```css
@media (hover: hover) { }
@media (hover: none) { }
@media (pointer: fine) { }
@media (pointer: coarse) { }
```

- Mouse/trackpad：有 Hover，适合轻量确认反馈。
- Touch：没有可靠 Hover，Rest 必须足够可发现，Pressed 更重要。
- Keyboard：依赖 Focus-visible 和正确 DOM 顺序。
- Assistive technology：依赖语义、可访问名称和状态，而不是视觉效果。

## Pointer 与 Cursor

- Link/Button 使用语义元素后优先保留平台合理 cursor 行为。
- 自定义可点击 Surface 若交互语义清楚，可使用 pointer cursor 作为辅助 signifier，但不能让 cursor 成为唯一线索。
- Disabled 不显示会误导为可点击的正常 pointer/hover 反馈。

## 图标按钮

- 必须有 `aria-label` 或可访问名称。
- 图标语义不稳定时提供 Tooltip。
- Tooltip 只解释，不承担核心功能发现。
- 相邻多个 Icon Button 保持足够间距，减少 coarse pointer 误触。

## Clickable Surface

- 整块 Card 可点击时，保证键盘只产生合理的 focus target，不制造重复链接。
- Card 内有次级 Button/Menu 时，避免把交互目标嵌套进 `<a>`。
- 优先使用合法 DOM 结构和明确 primary action，再通过 CSS 扩大 primary hit area。
- Hover/focus 响应应覆盖整个可点击区域，让视觉边界与实际 hit area 一致。

## Focus

- Focus-visible 不能被圆角容器或 `overflow:hidden` 无意裁切。
- 可点击 Surface 的 focus 应覆盖真实交互范围。
- 不用全局 `outline: none`。

## 参考

- WCAG 2.2 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG 2.2 Focus Appearance: https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
- React Aria Components: https://react-aria.adobe.com/
