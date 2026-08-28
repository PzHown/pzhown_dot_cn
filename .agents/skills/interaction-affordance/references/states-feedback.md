# 状态与反馈语言

## 状态模型

优先使用 React Aria / 原生状态：

- Rest
- Hovered
- Focus-visible
- Pressed
- Selected
- Disabled
- Pending / Loading
- Invalid（表单）

不要为视觉效果维护第二套与真实交互状态不同步的状态机。

## Rest

Rest 状态必须先成立：

- Button 通过 shape/surface/label 表达。
- Inline Link 通过文字语义 + decoration 表达。
- Navigation Link 通过位置、结构和当前态表达。
- Clickable Surface 通过对象标题、构图和适度 surface 线索表达。

如果只有 Hover 后才看得出“能点”，Rest 设计不合格。

## Hover

Hover 用于增强确认：

- 适度提高前景或 surface 对比。
- 可显示轻量 background/surface response。
- Link 可强化 underline。
- 不默认大幅 `scale()` 或上浮。

不要在 Hover 时出现关键功能本身，除非同时存在触控/键盘可发现入口。

## Focus-visible

Focus-visible 是键盘定位状态：

- 必须明显高于 Rest。
- 与 Hover 可以共享视觉语言，但不能完全依赖 Hover 样式。
- Focus ring 不要被 `overflow:hidden` 裁掉。
- Ring 要在浅色、深色和复杂背景上保持可见。

## Pressed

Pressed 是即时物理反馈：

- 允许小幅 `scale(0.97–0.99)`、轻微下压或 surface 变暗/变实。
- 反馈应立即开始并快速恢复。
- 不需要所有控件都使用弹性 spring；高频工具动作优先短促。

## Selected

Selected 是持续状态：

优先组合至少两类线索：

- indicator / position
- surface / shape
- 字重 / foreground
- icon / checkmark

不要只靠 Accent 色。

## Disabled

Disabled：

- 不响应 Hover/Pressed。
- 保持文本仍可辨认，但降低操作暗示。
- 不把 `opacity: 0.3` 当万能方案；在复杂背景上需重新校准。
- 如果用户需要知道为什么不可用，提供上下文说明，不把原因只藏在 Tooltip。

## Pending / Loading

- 用户触发后立即给状态反馈。
- 防止重复提交时，不要让界面看起来“死掉”。
- Button 可保留宽度，避免 Label → Spinner 导致布局跳动。
- 长操作提供进度或结果预期；短操作避免夸张 Loading 动画。

## Motion 分工

状态反馈默认 CSS 足够：颜色、opacity、小位移、小 scale。

只有以下场景再调用 `interaction-motion`：

- Presence。
- Layout transition。
- Shared element。
- Gesture。
- 页面空间连续性。

## Reduced Motion

Reduced Motion 下：

- 保留颜色、surface、focus、selected 等必要状态差异。
- 去除大位移、overshoot、旋转和不必要 spring。
- 不因为关闭动画而让 pressed/focus 反馈消失。

## 参考

- React Aria Components: https://react-aria.adobe.com/
- W3C Focus Appearance: https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
