# 空间构图 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [导航与定向](../navigation-wayfinding/HUMAN.md) · [认知工效](../cognitive-ergonomics/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [系统反馈](../system-feedback/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md) · [包容性与可访问性](../inclusive-accessibility/HUMAN.md)

## 它解决什么问题

这个 Skill 负责回答两类互相影响的问题：

1. **元素之间应该离多远？**
2. **整个页面的视觉重量、重心和视线顺序是否自然？**

它不是“8px spacing 表”，而是一套空间关系与视觉构图语法。

## 核心理念

> 距离表达关系，视觉重量表达重要性，重心组织整体稳定，视线顺序组织理解。

同时记住：**空白也是构图元素，几何一致性只是起点。**

## 什么时候看它

当任务涉及 page gap、section gap、组件间 gap、Card padding、Button/Input 内边距、icon-label gap、grid gutter、页面边距、negative space、视觉重心、非对称构图、图片/标题谁更抢眼、optical center 或跨设备密度时，看这里。

## 它主要负责

- Primitive spacing ramp 和语义 spacing。
- Inline / Inset / Stack / Group / Section / Gutter / Page Edge。
- 组件内部 padding 与父布局 gap 的职责边界。
- Visual Weight、Visual Balance 和 Negative Space。
- Attention Flow：第一眼、第二眼、下一步视线应该去哪。
- Optical Adjustment：数学对齐后必要的有限视觉修正。
- 不同设备下重新映射空间密度和视觉重心。

## 它不负责

- 内容是什么、该用什么内容版式：看[内容呈现](../content-presentation/HUMAN.md)。
- 正文具体字号、行高、行长：看[感知阅读](../perceptual-reading/HUMAN.md)。
- 元素在不同容器里放在哪里、什么时候重排：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- 一个对象应该是 Link 还是 Button：看[交互可供性](../interaction-affordance/HUMAN.md)。
- Neutral、材质、Squircle、Blur 和 Shadow：看[Apple 视觉](../apple-design/HUMAN.md)。
- 页面状态变化以后怎么动：看[交互动效](../interaction-motion/HUMAN.md)。

## 一句话区分

```text
adaptive-layout = WHERE
spatial-composition = RELATION + WEIGHT
```

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
