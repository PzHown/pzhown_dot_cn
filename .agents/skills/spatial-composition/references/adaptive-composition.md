# 跨设备空间构图

## 核心原则

跨设备保持的是内容优先级、关系语义和整体意图，不是完全相同的几何图形。

```text
same hierarchy
+ same semantic relationships
≠ same coordinates
```

## 与 adaptive-layout 的职责

`adaptive-layout` 决定结构：

- 单列还是多列。
- 目录是否侧置/折叠。
- 导航如何重排。
- Wide media 在哪条轨道。
- breakpoint / Container Query 何时发生。

`spatial-composition` 决定重排后的空间质量：

- section / group / inline spacing 映射到哪个尺度。
- gutter 与 negative space 如何重新分配。
- desktop 的多个视觉重心如何在 mobile 转成顺序。
- 图片与标题的视觉重量是否仍符合内容优先级。

## 不做固定倍率缩放

禁止默认：

```text
mobile = desktop * 0.75
```

或：

```text
touch = desktop * 1.25 for every gap
```

Touch 环境需要更安全的 hit area 和目标间隔，但阅读 section、page gutter、控件 inset 不一定同步增大。

## Narrow container

窄空间优先：

- 保持清楚的 group/section 差异。
- 减少同时可见的次级视觉中心。
- 将辅助栏、目录、media 等并行关系转成可理解的滚动顺序。
- Page gutter 不应挤压正文到不可读，但也不能为了留白牺牲有效阅读宽度。

## Medium container

中等空间通常最容易出现“既不像手机也不像桌面”的尴尬状态。

- 不机械使用 mobile layout 放大。
- 根据内容崩坏点决定是否增加第二轨道。
- 允许 section spacing 和 gutter 比窄屏更舒展，但不要过早产生巨大空洞。

## Wide container

额外空间优先用于：

- 阅读列外的 negative space。
- TOC / notes / supporting media。
- Editorial asymmetric balance。
- 更清楚的 gutter。

不要：

- 无限拉宽正文。
- 所有 gap 同比例变大。
- 把空白全部用 Card 或装饰填满。

## Fluid mapping

语义空间可以在容器范围内流体变化：

```css
.component {
  --section-space: clamp(var(--space-min), 4cqi, var(--space-max));
}
```

但上下限仍应来自受控 scale，并避免极端宽容器导致 spacing 爆炸。

## Density context

可以将页面/组件理解为不同密度上下文：

```text
compact
comfortable
spacious
```

它们不是固定设备标签。

例如 desktop 后台工具栏可能是 compact，而 mobile 阅读页可以是 comfortable；反之也成立。

## Safe area 与 page edge

Page edge 需要结合：

- `env(safe-area-inset-*)`
- 浏览器工具栏/可视 viewport
- 内容 measure
- pointer / touch context

不要用一个固定 `padding-inline: 16px` 覆盖所有环境。

## 内容优先级不变

当桌面 Hero 左文右图在手机改成上下排列时，仍应保证真正重要的内容先进入视线。不要因为 DOM/图片尺寸导致 supporting image 在手机上变成新的主重心。
