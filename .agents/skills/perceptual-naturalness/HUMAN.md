# 感知自然性 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [导航与定向](../navigation-wayfinding/HUMAN.md) · [认知工效](../cognitive-ergonomics/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [系统反馈](../system-feedback/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md) · [感知自然性](../perceptual-naturalness/HUMAN.md) · [包容性与可访问性](../inclusive-accessibility/HUMAN.md)

## 它解决什么问题

这个 Skill 负责回答：**界面的变化为什么看起来“自然”，或者为什么虽然技术上平滑，却仍然显得生硬、假、拼装、无原因。**

它不是“自然风格”规范，不要求绿色、米色、低饱和、大圆角、慢动画或 Spring。

## 核心理念

> 不模拟自然的外观，而维护自然的连续性。

自然感来自五种关系：感知连续、空间连续、时间连续、因果连续和材质连续。

## 它主要负责

- 动画是否跟手、可中断、方向和来源合理。
- 状态变化前后是否仍被看作同一对象。
- 用户动作和系统结果是否有清楚的因果关系。
- 颜色、渐变和主题变化是否在感知上连续。
- Shadow、Blur、透明、高光和 Surface 是否属于同一光照/深度系统。
- 跨布局、跨设备变化时是否保留对象身份和关系语义。

## 它不负责

- 具体 easing、duration、spring 参数：看[交互动效](../interaction-motion/HUMAN.md)。
- 最终颜色、材质、圆角和 Shadow 风格：看[Apple 视觉](../apple-design/HUMAN.md)。
- gap、视觉重量和整体重心：看[空间构图](../spatial-composition/HUMAN.md)。
- 页面结构何时重排：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- Loading / Error / Undo 等系统状态：看[系统反馈](../system-feedback/HUMAN.md)。
- 键盘、Reduced Motion、对比等底线：看[包容性与可访问性](../inclusive-accessibility/HUMAN.md)。

## 五种连续性

```text
Perceptual  同一对象仍像同一对象
Spatial     看得出从哪里来、到哪里去
Temporal    速度和节奏没有无原因断裂
Causal      操作和结果像同一个事件链
Material    光、深度和表面属于同一视觉世界
```

## 一句话判断

如果一个效果只能用“因为这样更高级”解释，而不能说明它与对象、动作、空间或状态的关系，它大概率不属于自然性设计。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [连续性框架](./references/continuity-framework.md)
- [自然 Motion](./references/natural-motion.md)
- [自然 Color](./references/natural-color.md)
- [材质、光与深度](./references/material-light-depth.md)
- [因果知觉与直接操控](./references/causality-direct-manipulation.md)
- [研究依据](./references/research-basis.md)
- [项目总设计契约](../../../DESIGN.md)
