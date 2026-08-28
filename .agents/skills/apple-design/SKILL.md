---
name: apple-design
description: 为 pzhown_dot_cn 提供项目级 Apple-inspired Web Design System 规范。用于任何 UI/UX、页面、组件、布局、色彩、排版、圆角、材质、模糊、动画、响应式、暗色模式、无障碍或设计审查任务；也用于修改 Astro 前台、React Aria 交互组件、Motion 动效和 @pzhown/ui。要求先复用现有设计系统，再按 Apple HIG 的原则进行 Web 端转译，避免机械复刻 iOS/macOS，也避免默认 shadcn 式重边框视觉。
---

# Apple Web 设计规范

把 Apple HIG 的设计原则转译为本项目的 Web 设计系统。优先保持内容层级、上下文、可用性和反馈质量，不要把页面机械做成 iOS/macOS 仿制品。

## 工作流程

1. 先检查现有实现，优先复用 `@pzhown/ui`、现有 tokens、Squircle、Smooth Gradient、Progressive Blur 和 Motion。
2. 判断任务类型：
   - 页面/视觉重构：读取 `references/visual-language.md`。
   - 组件/交互：读取 `references/components.md`。
   - 动画/过渡：读取 `references/motion.md`。
   - 可访问性、触控、键盘、暗色模式：读取 `references/accessibility.md`。
   - 写 Astro / React / CSS 代码：读取 `references/web-implementation.md`。
3. 先解决信息架构与层级，再处理装饰效果。不要用 blur、gradient、shadow 掩盖结构问题。
4. 实现后执行“设计审查”检查，不满足关键项时继续修正，不要把明显的默认库样式作为完成状态。

## 项目设计不变量

- 使用 Apple-inspired，而不是 Apple clone；保留本项目自己的品牌表达。
- 使用视觉层级、留白、材质和排版建立分组，减少“每个区块一圈灰边框”。
- 已设置 `border-radius` 的界面优先通过全局 `corner-shape: squircle` 获得超椭圆圆角；不要另造 SVG 圆角方案，除非需求明确要求严格曲率。
- 颜色使用语义 token；自定义色优先使用 OKLCH/Oklab，必须同时考虑浅色、深色和高对比环境。
- 渐变优先使用 Oklab/Oklch 插值；需要柔和渐变时优先使用项目的 smootherstep 工具。
- 材质只用于建立层级或保留上下文。不要把所有 Card 都做成玻璃；大面积滚动区域避免重度 backdrop blur。
- 动画必须有目的：反馈、连续性、状态变化或空间关系。高频操作保持短促，允许中断，尊重 `prefers-reduced-motion`。
- React 交互组件优先使用 React Aria Components；Motion 负责 spring、presence、layout 和 gesture；CSS 负责基础视觉状态。
- Astro 页面保持 Astro-first。仅在真正需要状态、复杂交互或 React Aria 时使用 React Island。
- Payload 自带 Admin 不做全局重皮；自定义 Dashboard/业务 UI 使用 `@pzhown/ui`。
- 不复制 Apple HIG 原文或受版权保护的设计资产；只保留项目需要的原则摘要与官方链接。

## 设计审查

完成任何 UI 任务前逐项检查：

- **目的**：首屏最重要的任务是否一眼可辨？主要操作是否唯一且突出？
- **层级**：是否主要靠排版、空间和材质区分层级，而不是靠大量边框？
- **一致性**：spacing、radius、颜色、阴影、控件尺寸是否来自统一体系？
- **交互**：hover、pressed、focus-visible、selected、disabled、loading 是否完整？
- **动效**：动画是否解释状态变化，而不是为了“炫”；是否能被 reduced motion 降级？
- **材质**：Blur/Glass 是否在帮助建立前后关系？是否存在无意义叠玻璃？
- **可访问性**：键盘、触控命中区、对比度、非颜色信息、文本缩放是否成立？
- **响应式**：窄屏、宽屏、可变窗口下是否保持相同的信息优先级？
- **复用**：是否优先修改/扩展 `@pzhown/ui`，而不是为单页重复造组件？
- **风格**：如果页面仍明显像“默认 shadcn demo”，继续调整，不要结束任务。

## 输出要求

做设计方案时，优先给出：

1. 当前问题与层级判断。
2. 设计方向与必要取舍。
3. 组件/Token/动效层面的具体修改。
4. 实现后的设计审查结果。

直接修改代码时，不需要额外写长篇设计说明，但必须遵守上述规则并在完成后简短说明关键视觉决策。
