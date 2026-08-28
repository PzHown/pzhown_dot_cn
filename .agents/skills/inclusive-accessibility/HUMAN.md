# 包容性与可访问性 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [导航与定向](../navigation-wayfinding/HUMAN.md) · [认知工效](../cognitive-ergonomics/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [系统反馈](../system-feedback/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md) · [感知自然性](../perceptual-naturalness/HUMAN.md) · [包容性与可访问性](../inclusive-accessibility/HUMAN.md)

## 它解决什么问题

这个 Skill 不是设计链里的一个步骤，而是**所有设计 Skill 的横向底线**。

它负责保证不同视觉、运动、认知和输入能力的用户都能完成核心任务。

## 核心理念

> 可访问性从结构和交互语义开始，而不是最后补一个 ARIA 或对比度检查。

## 它主要负责

- Semantic HTML / ARIA 边界。
- Keyboard、Focus、Screen Reader。
- Contrast 与非颜色线索。
- Zoom / Reflow / 系统字体变化。
- Touch target 与替代输入。
- Reduced Motion。
- 动态状态公告和错误可理解性。

## 它不负责

它不替代任何纵向 Skill，而是约束它们的输出。

`perceptual-naturalness` 与它同为横向质量层：自然性不能突破可访问性和舒适性底线。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [可感知](./references/perceivable.md)
- [可操作](./references/operable.md)
- [可理解与健壮](./references/understandable-robust.md)
- [输入与适配](./references/adaptive-input.md)
- [研究依据](./references/research-basis.md)
