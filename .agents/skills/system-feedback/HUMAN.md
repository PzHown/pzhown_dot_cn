# 系统反馈 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [导航与定向](../navigation-wayfinding/HUMAN.md) · [认知工效](../cognitive-ergonomics/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [系统反馈](../system-feedback/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md) · [包容性与可访问性](../inclusive-accessibility/HUMAN.md)

## 它解决什么问题

这个 Skill 负责回答：**用户操作之后，系统现在在做什么、结果是什么、失败后怎么办。**

## 核心理念

> 任何动作都要有可理解的结果，任何失败都要有可恢复的路径。

## 它主要负责

- Loading / Pending / Progress / Skeleton。
- Empty / Success / Error / Partial failure。
- Retry、Undo、确认和 Optimistic UI。
- 长耗时与后台任务反馈。
- 等待期间保持上下文。

## 它不负责

- Button 的 Hover/Pressed：看 `interaction-affordance`。
- 反馈怎么做复杂动画：看 `interaction-motion`。
- 为什么用户容易操作错：看 `cognitive-ergonomics`。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [状态语言](./references/status-language.md)
- [等待与进度](./references/progress-latency.md)
- [错误与恢复](./references/error-recovery.md)
- [Optimistic UI 与 Undo](./references/optimistic-undo.md)
- [研究依据](./references/research-basis.md)
