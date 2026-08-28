# 动效实现选择

## CSS

用于：

- hover / pressed / focus 的颜色、透明度、小位移。
- 简单展开且不需要 presence 协调的状态。
- 尊重 `prefers-reduced-motion` 的基础过渡。

## Motion

用于：

- spring。
- `AnimatePresence`。
- layout animation。
- gesture / drag。
- 需要状态协调的复杂 React Aria 组件。

React 组件从 `motion/react` 引入；Astro 非 React 场景优先使用 `motion` 的 framework-agnostic API。

## View Transitions

用于：

- 页面导航的视觉连续性。
- 同一内容实体在列表与详情间的共享元素。

必须保留普通导航路径；不支持 View Transition 时不影响内容、焦点和历史记录。

## 性能

- 优先 `transform` / `opacity`。
- 避免持续动画 `filter`、大半径 blur 和巨大 shadow。
- 不在 scroll handler 中同步读取/写入大量 layout 属性。
- 在 Astro 站点避免为了一个小动画把大段静态页面变成 React Island。
