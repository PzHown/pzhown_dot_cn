---
name: spatial-composition
description: 为 pzhown_dot_cn 统一页面、组件与控件的空间构图规则。用于 gap、padding、margin、gutter、section spacing、negative space、视觉重心、视觉重量、光学对齐、注意力顺序、非对称平衡，以及跨手机/平板/桌面的空间密度调整。执行时先用距离表达关系，再用视觉重量表达重要性，通过整体平衡和 attention flow 组织视线；几何一致性是起点，允许受控的 optical adjustment。此 Skill 不决定内容语义、响应式结构、交互语义、颜色材质或复杂动画。
---

# 空间构图规范

把空间当作信息，而不是剩余区域。统一页面、组件与控件的距离关系、视觉重量、整体重心和注意力顺序。

## 核心原则

- **距离表达关系**：越相关的元素越近；跨越越大的语义层级需要越明显的空间跳跃。
- **视觉重量表达重要性**：对比、排版、面积、位置、密度、图像复杂度、深度、运动和孤立程度都会改变视觉重量。
- **空白也是构图元素**：Negative space 可用于分组、隔离、强调、平衡和降低视觉拥挤。
- **平衡不等于对称**：允许稳定的非对称、Editorial 和动态平衡。
- **几何一致性是起点，光学一致性是终点**：先使用统一 scale，再做最小、受控的 optical adjustment。
- **不要伪造物理公式**：视觉重量不是可可靠计算的 `area × contrast × distance`；将其作为设计推理模型，不制造虚假精确度。

## 工作流程

1. 先读取内容层级和布局结构；不要在不知道元素关系时直接挑 `gap` 数值。
2. 标记关系层级：inline、control inset、stack、group、section、gutter、page edge。
3. 从项目 primitive spacing ramp 选择候选值，再映射为语义空间；避免业务组件直接依赖孤立数字。
4. 检查主要视觉重量：标题、图片、CTA、颜色块、深色区域、动效和高密度信息谁在主导视线。
5. 让一个页面/section 有清楚的主要注意力锚点；降低不必要的竞争中心。
6. 检查整体平衡。允许非对称，但不能出现无意的视觉下坠、偏压或边缘拉扯。
7. 检查 attention flow：用户应先看到什么、接着看到什么、最后进入什么。
8. 只有几何值看起来仍不平衡时做 optical adjustment；优先从现有 scale 中换档，最后才允许局部例外。
9. 跨设备保持关系语义和信息优先级，允许具体 spacing、并列关系和视觉重量重新映射。

## Primitive spacing ramp

项目空间值优先从下列受控尺度选择：

```text
2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
```

这不是“每个数字都要用”，而是允许在微空间、组件空间和页面空间之间保持足够分辨率。不要在业务 UI 中继续产生 13px、19px、27px、37px 等无语义孤立值，除非属于明确的光学校正。

## Spatial semantics

优先按语义选择空间，而不是按组件名选择：

```text
inline       同一行中的紧密关系，例如 icon ↔ label
inset        单个控件或 surface 的内部 padding
stack        同一内容流的上下关系，例如 title ↔ description
group        一个语义组内部的组件关系
section      不同内容区域之间的主要节奏
gutter       grid / column / pane 之间的结构距离
page-edge    viewport / safe area 与主要内容之间的保护空间
```

规则：

- 父容器负责兄弟元素之间的 `gap`；组件不要用外部 margin 强行决定自己在任何上下文中的位置。
- 组件负责自己的内部 `padding/inset`。
- Page/Layout 负责 gutter、page-edge 和 section rhythm。
- 同一个 primitive 值可以服务不同语义，但业务层应通过语义 token/变量消费，方便以后独立演化。

详细规则读取 `references/spatial-rhythm.md`。

## Visual weight

判断视觉重量时综合考虑：

```text
contrast
+ typography mass
+ area
+ position
+ density
+ chroma
+ image complexity
+ shape / direction
+ depth
+ motion
+ isolation / negative space
```

优先关注内容型 Web 中最常见的四项：**对比、排版、位置、空白**。

- 大不一定更重；高对比小标题可能比低对比大插画更有重量。
- Motion 会显著增加注意力重量，不能把动画当作中性的装饰。
- 靠近画面边缘、具有向外方向感的对象需要谨慎，避免形成无意的“拉出画面”感。
- 如果视觉重量与内容优先级冲突，优先降低错误重量，而不是继续给正确内容加更多装饰。

详细规则读取 `references/visual-weight.md`。

## Visual balance

- 使用几何中心作为构图起点，不把它当最终答案。
- 允许 symmetric、asymmetric、editorial、radial 等不同平衡形式。
- 通过位置、面积、对比、排版和 negative space 共同平衡，不要求左右对象等宽、等高或镜像。
- 空白可以成为 counterweight；不要因为一侧“空”就机械填满。
- Hero、Empty State、Dialog、Poster-like composition 等允许 optical centering，但禁止全局固定 `translateY(-4%)` 一类万能公式。

详细规则读取 `references/visual-balance.md`。

## Attention flow

为重要页面和 section 保持清楚的视线顺序：

```text
primary anchor
→ supporting context
→ next action / main content
→ secondary information
```

- 首页、文章页、作品页可以有不同 scan path，但都避免多个同强度焦点同时竞争。
- 桌面可并列多个次级区域；移动端优先把并行重心转成清楚的滚动顺序。
- Decorative image、Gradient、Badge、CTA 或动效若截断内容阅读路径，降低其重量或调整位置。

详细规则读取 `references/attention-flow.md`。

## Optical adjustment

只有在统一网格和 spacing scale 已经使用后才做光学校正。

常见场景：

- icon 与文字的视觉中心不等于 bounding-box 中心。
- 圆形、三角形或不对称图标需要少量偏移。
- 大字号标题的字形墨色与 cap height 造成几何间距看起来不等。
- Button/Chip 中 icon + label 的左右视觉重量不同。
- 内外容器圆角、边框和阴影造成实际可见边界偏移。

优先换用邻近 scale；需要例外时保持最小，并在共享组件/token 层收敛，不在页面散落 magic numbers。

详细规则读取 `references/optical-adjustment.md`。

## 跨设备分工

- `adaptive-layout` 决定 **WHERE**：列、pane、导航、目录和媒体在不同容器中放在哪里、何时重排。
- `spatial-composition` 决定 **RELATION + WEIGHT**：元素离多远、谁更重、空白如何分配、整体如何平衡、视线如何流动。
- 不把 mobile spacing 简单设为 desktop 的固定倍数。
- Touch 可能需要更安全的 hit area，但不等于整个页面所有 gap 都变大。
- 宽屏优先用额外空间建立呼吸、辅助信息和非对称平衡，不无限扩大正文或所有 section gap。

详细规则读取 `references/adaptive-composition.md`。

## 与其他 Skill 的边界

- 内容是什么、属于什么内容层：使用 `content-presentation`。
- 阅读行长、字号、行高和长文舒适：使用 `perceptual-reading`。
- 响应式结构、Container Query 和重排：使用 `adaptive-layout`。
- Link/Button/Clickable Surface 的语义与状态：使用 `interaction-affordance`。
- Neutral、颜色、Squircle、Glass、Blur、Shadow：使用 `apple-design`。
- 状态变化和空间连续动画：使用 `interaction-motion`。

## 实现审查

实现空间构图时检查：

- gap / padding / gutter 是否表达真实关系，而不是随机挑值？
- 兄弟元素间距是否由父布局负责，组件是否避免携带上下文外 margin？
- 页面是否存在清楚的主要注意力锚点？
- 高对比图片、按钮、Badge、颜色块或动画是否错误抢过主要内容？
- 空白是否在组织层级，而不是被当成必须填满的空缺？
- 非对称构图是否稳定，而不是偶然偏向一侧？
- 几何对齐看起来不自然时，是否先做了合理的 optical adjustment，而非随意增加 magic number？
- 手机是否把桌面的多个并行重心转换成清楚的滚动顺序？
- 是否优先复用语义 spacing/token，而不是散落 raw px？

## 研究依据

需要理解原则来源、避免把经验误写成科学定律时读取 `references/research-basis.md`。

## 与导航和认知的边界

- `navigation-wayfinding` 决定信息空间和路径，本 Skill 决定这些导航对象在构图中的空间关系与视觉重量。
- `cognitive-ergonomics` 决定用户需要承担多少记忆与决策，本 Skill 不用“更多留白”掩盖认知结构问题。
