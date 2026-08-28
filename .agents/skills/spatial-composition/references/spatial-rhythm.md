# 空间节奏

## 目标

让距离本身表达信息关系。不要把 spacing 当作装饰性留白，也不要让每个组件自己发明一套 margin。

## Primitive scale

项目优先使用：

```text
2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
```

这套 scale 同时覆盖微空间、控件空间和页面空间。它不是要求每个值都出现，而是提供受控选择范围。

## 语义层

### Inline

用于同一行或同一短语中的紧密关系：

- icon ↔ label
- avatar ↔ name
- status dot ↔ status text
- inline metadata

通常从 `4 / 6 / 8 / 12` 中选择。

### Inset

用于单个控件或 surface 的内部 padding：

- Button / Input / Chip
- Menu item
- Card / Callout
- Toolbar item

横向和纵向 inset 可以不同。控件的视觉紧凑度与 touch hit area 是两个概念，不要为了 hit target 把所有可见 padding 都无限放大。

### Stack

用于同一内容流中的上下关系：

- title ↔ description
- field label ↔ field
- paragraph group
- image ↔ caption

相邻内容越属于同一语义单元，stack 越紧。

### Group

用于一个完整语义组内部的组件关系，例如：

- 一组字段之间
- 一组 CTA 之间
- Card 内不同内容区块
- Toolbar cluster 之间

### Section

用于明显跨越内容层级的区域：

- Hero → article list
- article body → related content
- project intro → gallery

Section spacing 应明显大于组内 spacing，避免“所有 gap 都差不多”导致层级扁平。

### Gutter

用于 Grid、Column、Pane、Reading/Wide track 之间的结构关系。Gutter 是布局结构的一部分，不应和普通 Card padding 混为一谈。

### Page edge

用于 viewport / safe area 与主要内容之间的保护空间。Page edge 不是普通 margin；它需要结合 safe area、窗口宽度和正文 measure。

## Ownership

遵守以下职责：

```text
组件自己
→ internal inset

父布局
→ siblings gap

页面/布局系统
→ section / gutter / page edge
```

基础组件默认不要通过 `margin-block` 决定与外界的距离。这样 Button、Card、Field 等才能在不同上下文中被复用。

## Density

不要定义一个全站固定的“松/紧”。按场景调整：

- 长文阅读：group 清楚、section 呼吸充分，避免控件密度侵入正文。
- 高频操作：组件内部更紧凑，但 hit area 和误触隔离仍成立。
- Touch：可能需要更大的 hit area 和控件间安全距离，但不等于所有 section 都变大。
- Wide screen：把额外空间优先给 gutter、negative space、辅助信息，不简单按比例放大所有 gap。

## Fluid spacing

适合连续变化的页面级空间可使用 `clamp()`，但语义上下限仍应来自项目 scale。

例如概念上：

```css
.section {
  gap: clamp(var(--space-section-min), 4vw, var(--space-section-max));
}
```

不要让 `vw` 单独决定 spacing，否则超宽屏会失控。

## 关系优先

判断一个 gap 时先问：

1. 两个元素是否属于同一语义单元？
2. 是内部结构、组内关系还是 section 跨越？
3. 空间是否比边框更适合表达分组？
4. 缩小 gap 会不会误认为属于同组？
5. 放大 gap 会不会切断本来应该连续的阅读关系？

## 现代设计系统参考

- Fluent 2 Layout / spacing：强调 proximity、whitespace 与跨平台 spacing ramp。
- Carbon Spacing：使用受控 spacing scale，并建议父 Stack/Layout 管理组件间距。
- Atlassian Spacing：区分不同 spacing 范围的用途，并允许 optical adjustment。
- Spectrum Spacing：强调组件之间的 spacing 与组件内部 padding 的职责差异。
- Material adaptive layout：区分 margin、pane、spacer、component padding，并随窗口结构适配。
