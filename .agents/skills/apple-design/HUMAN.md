# Apple-inspired 视觉语言 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md)

## 它解决什么问题

这个 Skill 负责项目最终的视觉语言：层级、Neutral 灰度、颜色、材质、Squircle、留白、阴影、透明度、Glass 和 Progressive Blur。

它借鉴 Apple HIG 的清晰、克制、材质和连续形状原则，但不是把网页做成 iOS/macOS 仿制品。

## 核心理念

> 先让内容、阅读、布局和交互语义成立，再决定它最终长什么样。

另一个核心原则是：**先用灰度/Neutral 与明度建立层级，再用色相表达品牌、状态和重点。**

## 什么时候看它

当任务涉及颜色、灰度、Surface、Squircle、边框、阴影、Glass、Blur、视觉层级、品牌气质、暗色模式和组件外观时，看这里。

## 它主要负责

- Apple-inspired，而不是 Apple clone。
- Neutral / Canvas / Surface / Foreground 等语义层级。
- OKLCH/Oklab 色彩与 Smooth Gradient。
- `corner-shape: squircle` 的连续圆角体系。
- Solid / Translucent / Progressive Blur 等材质边界。
- 减少默认 shadcn 式“每块一圈灰边框”。
- 浅色、深色、高对比环境中的视觉重映射。

## 它不负责

- 正文阅读参数：看[感知阅读](../perceptual-reading/HUMAN.md)。
- 内容应该用什么版式：看[内容呈现](../content-presentation/HUMAN.md)。
- 页面在不同设备怎么重排：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- Link/Button/Clickable Surface 应该如何被识别：看[交互可供性](../interaction-affordance/HUMAN.md)。
- 高级动画怎么组织：看[交互动效](../interaction-motion/HUMAN.md)。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [视觉语言](./references/visual-language.md)
- [组件视觉](./references/components.md)
- [Web 实现](./references/web-implementation.md)
- [项目总设计契约](../../../DESIGN.md)
