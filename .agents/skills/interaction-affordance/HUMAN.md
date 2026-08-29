# 交互可供性 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [导航与定向](../navigation-wayfinding/HUMAN.md) · [认知工效](../cognitive-ergonomics/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [系统反馈](../system-feedback/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md) · [感知自然性](../perceptual-naturalness/HUMAN.md) · [包容性与可访问性](../inclusive-accessibility/HUMAN.md)

## 它解决什么问题

这个 Skill 负责回答：**用户怎么看得出一个东西能不能点，以及点了以后大概会发生什么。**

它统一的是交互语法，而不是把所有可点击项做成同一种按钮。

## 核心理念

> 先决定语义，再决定视觉 signifier；Hover 只是增强，不是发现机制。

导航、动作、状态切换、选择和“进入一个对象”不是一回事，它们应该保留不同的可供性。

## 什么时候看它

当任务涉及正文链接、导航链接、文字动作、Button、Icon Button、Clickable Surface/Card、Tabs、Toggle、Menu Item，以及 hover、pressed、focus-visible、selected、disabled、pending 时，看这里。

## 它主要负责

- 区分 Link 与 Button：导航用 Link，动作与状态改变用 Button/对应控件。
- 让重要交互在 Rest 状态下就有适量线索。
- 规定 Hover、Focus-visible、Pressed、Selected、Disabled、Pending 的统一方向。
- 禁止只靠颜色或 Hover 表达“这里能点”。
- 处理 Icon Button 与整块可点击 Surface 的命中区域和嵌套冲突。
- 让 Mouse、Touch、Keyboard 下的语义保持一致。

## 它不负责

- 文字链接密度与正文阅读舒适度：看[感知阅读](../perceptual-reading/HUMAN.md)。
- Card/目录/脚注在内容里的角色：看[内容呈现](../content-presentation/HUMAN.md)。
- 不同设备上的结构重排：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- 控件 padding、icon-label gap、相邻目标的空间节奏和静态视觉重心：看[空间构图](../spatial-composition/HUMAN.md)。
- 颜色、圆角和 Surface 最终长相：看[Apple 视觉](../apple-design/HUMAN.md)。
- 操作级 Loading / Success / Error / Retry：看[系统反馈](../system-feedback/HUMAN.md)。
- 复杂动画和空间连续性：看[交互动效](../interaction-motion/HUMAN.md)。

- 直接操控、手势与结果之间的因果连续性：看[感知自然性](../perceptual-naturalness/HUMAN.md)。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [统一交互语法](./references/interaction-grammar.md)
- [链接、文字动作与按钮](./references/links-actions.md)
- [状态与反馈](./references/states-feedback.md)
- [命中区域与输入能力](./references/hit-targets.md)
- [项目总设计契约](../../../DESIGN.md)
