# 交互与动效 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md)

## 它解决什么问题

这个 Skill 负责让动画真正解释状态和空间关系，而不是给页面增加“看起来高级”的持续运动。

## 核心理念

> Motion 是信息层，不是装饰层。动画要回答“发生了什么、东西去了哪里、下一步能做什么”。

动效优先级是：空间连续性 > 状态反馈 > 操作反馈 > 注意力引导 > 氛围装饰。

## 什么时候看它

当任务涉及 Motion、View Transitions、页面切换、共享元素、Popover/Dialog/Menu 出入场、Tabs、手势、拖拽、滚动联动和微交互时，看这里。

## 它主要负责

- 判断动画是否真的值得存在。
- CSS transition、Motion、View Transitions 之间的职责划分。
- Spring、Presence、Layout、Gesture 与共享元素。
- 让动画可中断、支持 reduced motion、保持阅读控制权。
- 限制默认 Card hover scale 和无意义 scroll reveal。
- 保护文字清晰度、GPU 成本和中端移动设备性能。

## 它不负责

- 动画前后内容本身怎么排：看[内容呈现](../content-presentation/HUMAN.md)。
- 阅读区域能承受多少视觉运动：先看[感知阅读](../perceptual-reading/HUMAN.md)。
- 布局在不同设备如何变化：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- 控件应该怎样表现“可点击”：看[交互可供性](../interaction-affordance/HUMAN.md)。
- 最终材质与颜色：看[Apple 视觉](../apple-design/HUMAN.md)。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [Motion Language](./references/motion-language.md)
- [实现选择](./references/implementation.md)
- [项目总设计契约](../../../DESIGN.md)
