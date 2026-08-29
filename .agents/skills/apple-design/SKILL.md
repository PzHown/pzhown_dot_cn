---
name: apple-design
description: 为 pzhown_dot_cn 提供 Apple-inspired Web 视觉语言规范。用于色彩、灰度与 Neutral、材质、层级、圆角、阴影、透明度、Glass、Progressive Blur、视觉组件外观、品牌气质和视觉审查；也用于在信息架构、阅读、布局、空间构图与交互可供性已确定后统一 @pzhown/ui 的最终视觉表达。此 Skill 不负责具体 gap/padding、视觉重心、正文行长、跨设备结构、Link/Button/可点击 Surface 的交互语义或复杂动效逻辑；相关任务应优先使用 perceptual-reading、content-presentation、adaptive-layout、spatial-composition、navigation-wayfinding、cognitive-ergonomics、interaction-affordance、system-feedback 和 interaction-motion；inclusive-accessibility 横向约束全部视觉输出。
---

# Apple-inspired 视觉语言

把 Apple HIG 中关于清晰、层级、材质、连续形状和克制感的原则转译为本项目视觉语言，不机械复刻 iOS/macOS，也不把 Liquid Glass 当默认答案。

## 使用前提

先确认更高优先级问题已经处理：

- 阅读舒适与正文排版：使用 `perceptual-reading`。
- 内容语义与文章结构：使用 `content-presentation`。
- 跨设备空间结构：使用 `adaptive-layout`。
- gap、padding、gutter、negative space、视觉重量、重心和 attention flow：使用 `spatial-composition`。
- Link、Button、Icon Button、可点击 Surface 与局部交互状态表达：使用 `interaction-affordance`。
- 全局导航与当前位置：使用 `navigation-wayfinding`。
- 系统加载、成功、失败与恢复：使用 `system-feedback`。
- 可访问性：使用 `inclusive-accessibility` 作为横向基线。
- 动画与空间连续性：使用 `interaction-motion`。

视觉语言不得反向破坏这些决定。

## 工作流程

1. 检查 `DESIGN.md` 和现有 `@pzhown/ui`，优先复用现有 token、radius、Smooth Gradient、Progressive Blur。
2. 页面/视觉重构读取 `references/visual-language.md`。
3. 组件外观读取 `references/components.md`。
4. Web/CSS 实现读取 `references/web-implementation.md`。
5. 先确认 `spatial-composition` 已建立空间关系、重心和注意力层级，再用灰度、明度和材质建立最终视觉层级。
6. 完成后做视觉审查，包含 Grayscale Test，避免页面依赖彩色才能成立，也避免退回默认 shadcn/组件库样式。

## 视觉不变量

- 使用 Apple-inspired，而不是 Apple clone；保留项目自己的品牌表达。
- 让排版、留白、颜色层级和空间关系先成立，避免“每个区块一圈灰边框”。
- 先用 Neutral / 灰度与明度建立信息层级，再让色相承担品牌、状态和重点语义；不能靠彩色本身弥补层级不足。
- 业务组件使用语义 token，不直接把 `gray-500`、`zinc-700` 等物理色阶当作组件语义。
- 圆角直接使用组件或 token 中已有的 `border-radius`；保持 radius 层级一致，不再叠加另一套全局角形状系统。
- 颜色使用语义 token；自定义色优先 OKLCH/Oklab，并同时验证浅色、深色和高对比环境。
- 渐变优先使用 Oklab/Oklch 插值；需要柔和过渡时优先项目 smootherstep 工具。
- 材质用于表达层级、保留背景上下文或聚焦临时层。不要把所有 Card 都做成玻璃。
- Progressive Blur 不进入长文正文核心背景；优先用于浮层、导航、局部工具和空间过渡。
- 阴影表达高度和分离，不作为所有组件默认装饰。
- 高级视觉效果必须允许自然降级，不影响语义和操作。

## 组件视觉

- Button、Input、Tabs、Switch、Dialog、Popover、Tooltip、Menu 等优先扩展 `@pzhown/ui`。
- React Aria 决定交互语义和状态；`interaction-affordance` 决定不同可交互元素应如何被识别；此 Skill 只统一最终视觉表达。
- 使用状态差异而不是粗暴边框表达 hovered、pressed、selected 和 focus-visible。
- Focus 必须可见，但可以与视觉语言协调，不要为了“干净”隐藏 focus ring。

## 视觉审查

- 页面第一眼是否先看到内容，而不是 Glass/Gradient/Shadow？
- 去掉边框后层级是否仍清楚？
- **Grayscale Test**：页面临时转为灰度后，标题、正文、导航、主要操作、状态和层级是否仍然清楚？如果不清楚，说明设计过度依赖色相。
- Neutral 层级是否足够但不过度？是否存在大量肉眼难以区分的近似灰色？
- 辅助文字是否因为“做灰”而低于可读对比度？
- radius、spacing、surface 和颜色是否来自统一体系？
- Blur/Glass 是否真的解释前后关系？
- 深色模式是否重新校准亮度和对比，而不是简单反色？
- 页面是否仍明显像默认 shadcn demo？如果是，继续调整。
- Apple-inspired 是否体现为清晰和克制，而不是堆叠 Apple 特效？

## 输出要求

做视觉方案时优先说明：

1. 当前视觉层级问题。
2. 需要保留和删除的装饰。
3. Neutral / Token / surface / typography / material 的具体变化。
4. 与阅读、布局、空间构图、交互可供性和动效 Skill 的边界。
