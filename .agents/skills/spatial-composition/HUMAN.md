# 空间构图 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [导航与定向](../navigation-wayfinding/HUMAN.md) · [认知工效](../cognitive-ergonomics/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [系统反馈](../system-feedback/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md) · [感知自然性](../perceptual-naturalness/HUMAN.md) · [包容性与可访问性](../inclusive-accessibility/HUMAN.md)

## 它解决什么问题

这个 Skill 负责页面、组件与控件之间“离多远、谁更重、整体怎么平衡、视线怎么走”。

它把 gap、padding、gutter、留白、视觉重心和 attention flow 放在同一套空间构图体系里，而不是把它们当成互不相关的微调。

## 核心理念

> 距离表达关系，视觉重量表达重要性，重心组织整体稳定，视线顺序决定用户如何读懂页面。

同时遵循：**几何一致性是起点，光学一致性才是终点。**

## 它主要负责

- 页面 gutter、section gap、组件 gap、控件 padding、icon-label gap 等空间节奏。
- 通过 proximity / negative space 表达分组与层级。
- 判断标题、图片、CTA、颜色块、动效等视觉重量是否与内容优先级一致。
- 组织 symmetric / asymmetric / editorial 等构图平衡。
- 控制一个页面或 section 的主要注意力锚点和阅读顺序。
- 在手机、平板、桌面之间重新映射空间密度与视觉重心。
- 对图标、文字、圆形/不对称几何进行有限的 optical adjustment。

## 它不负责

- 内容本身的语义与版式角色：看[内容呈现](../content-presentation/HUMAN.md)。
- 正文行长、字号、行高与阅读舒适：看[感知阅读](../perceptual-reading/HUMAN.md)。
- 列、pane、导航和目录何时重排：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- 可点击元素的语义和状态：看[交互可供性](../interaction-affordance/HUMAN.md)。
- 颜色、材质、圆角、Glass、Blur：看[Apple 视觉](../apple-design/HUMAN.md)。
- 动画如何解释状态变化：看[交互动效](../interaction-motion/HUMAN.md)。

## 怎么理解它和跨设备布局的区别

```text
adaptive-layout
= WHERE
东西放在哪里、什么时候重排

spatial-composition
= RELATION + WEIGHT
东西离多远、谁更重、整体是否平衡、视线怎么流动
```

两者必须一起使用，但不互相替代。

- 跨状态/跨设备变化是否在感知上连续：看[感知自然性](../perceptual-naturalness/HUMAN.md)。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [空间节奏](./references/spatial-rhythm.md)
- [视觉重量](./references/visual-weight.md)
- [视觉平衡](./references/visual-balance.md)
- [注意力顺序](./references/attention-flow.md)
- [光学校正](./references/optical-adjustment.md)
- [跨设备构图](./references/adaptive-composition.md)
- [研究依据](./references/research-basis.md)
- [项目总设计契约](../../../DESIGN.md)
