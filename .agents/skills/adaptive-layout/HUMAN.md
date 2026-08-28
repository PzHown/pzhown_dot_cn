# 跨设备自适应布局 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md)

## 它解决什么问题

这个 Skill 负责让同一套内容在手机、平板、桌面、窄窗口和不同输入设备下都自然成立。

它不是传统的“桌面版缩小成手机版”，而是重新安排空间关系，同时保持信息优先级不变。

## 核心理念

> Adapt，不是 Shrink。

Breakpoint 应由内容真正开始失效的地方产生，而不是机械套用 375 / 768 / 1440。

## 什么时候看它

当任务涉及响应式、Container Queries、Grid/Subgrid、侧栏、目录、导航重排、横竖屏、可变窗口、safe area、触控/鼠标差异时，看这里。

## 它主要负责

- 从最窄可用内容流开始，再逐步增加辅助空间。
- 优先使用 Container Queries 让组件对自己的容器负责。
- 区分屏幕尺寸和输入能力，不把“窄屏”等同于“触控”。
- 宽屏增加留白、目录、注释和媒体，而不是无限拉宽正文。
- 处理 sticky/fixed、虚拟键盘、安全区域和任意窗口宽度。

## 它不负责

- 正文阅读参数：看[感知阅读](../perceptual-reading/HUMAN.md)。
- 内容本身属于 reading 还是 wide/stage：看[内容呈现](../content-presentation/HUMAN.md)。
- 控件可点击性与状态表达：看[交互可供性](../interaction-affordance/HUMAN.md)。
- 最终视觉材质：看[Apple 视觉](../apple-design/HUMAN.md)。
- 布局变化的动画方式：看[交互动效](../interaction-motion/HUMAN.md)。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [布局策略](./references/layout-strategy.md)
- [设备与输入能力](./references/device-input.md)
- [项目总设计契约](../../../DESIGN.md)
