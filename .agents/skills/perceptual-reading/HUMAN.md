# 感知阅读 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [内容呈现](../content-presentation/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [导航与定向](../navigation-wayfinding/HUMAN.md) · [认知工效](../cognitive-ergonomics/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [系统反馈](../system-feedback/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md) · [感知自然性](../perceptual-naturalness/HUMAN.md) · [包容性与可访问性](../inclusive-accessibility/HUMAN.md)

## 它解决什么问题

这个 Skill 负责一件事：**让博客长期阅读自然、清楚、低负担。**

它不追求某个固定字号、固定 `65ch` 或某套模板，而是根据中文/英文、内容类型、容器宽度、设备和用户缩放共同决定排版。

## 核心理念

> 读得舒服、看得明白、长时间不累，优先级高于视觉装饰。

因此正文宽度、字号、行高、段落节奏、对比度和周边视觉噪声，都要围绕持续阅读来判断。

## 什么时候看它

当任务涉及文章页、正文、标题层级、字体、行长、深色阅读、中英混排、目录、脚注、代码与正文混排、长文阅读体验时，看这里。

## 它主要负责

- 正文的视觉稳定性与阅读节奏。
- 中文、英文和中英混排的可读性。
- 宽屏不过度拉长正文，窄屏不过度压缩阅读。
- 深色模式下的眩光、对比与灰阶舒适度。
- 200% 文本缩放、系统字体替换等可读性约束。
- 限制会持续抢夺注意力的动画、玻璃和高对比装饰。

## 它不负责

- 文章中的图片、表格、引用应该属于哪种版式：看[内容呈现](../content-presentation/HUMAN.md)。
- 手机、平板、桌面的空间结构怎么重排：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- 页面/组件的 gap、padding、视觉重心和 attention flow：看[空间构图](../spatial-composition/HUMAN.md)。
- 选择、记忆与流程的认知负担：看[认知工效](../cognitive-ergonomics/HUMAN.md)。
- Link/Button 怎么看起来可操作：看[交互可供性](../interaction-affordance/HUMAN.md)。
- 最终颜色、材质、Squircle：看[Apple 视觉](../apple-design/HUMAN.md)。
- 页面切换和复杂动画：看[交互动效](../interaction-motion/HUMAN.md)。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [阅读科学依据](./references/reading-science.md)
- [实际实现方式](./references/implementation.md)
- [项目总设计契约](../../../DESIGN.md)
