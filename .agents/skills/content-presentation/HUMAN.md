# 内容呈现 · Human Guide

[项目总览](../../../HUMAN.md) · [感知阅读](../perceptual-reading/HUMAN.md) · [跨设备布局](../adaptive-layout/HUMAN.md) · [空间构图](../spatial-composition/HUMAN.md) · [交互可供性](../interaction-affordance/HUMAN.md) · [Apple 视觉](../apple-design/HUMAN.md) · [交互动效](../interaction-motion/HUMAN.md)

## 它解决什么问题

这个 Skill 负责决定：**不同内容应该怎样被组织和呈现，而不是所有东西都套进 Card。**

博客首先是内容系统，不是 SaaS Dashboard。正文、代码、图片、引用、表格、脚注和目录应该根据自身语义形成不同版式。

## 核心理念

> 内容类型决定版式，组件不能反过来绑架内容。

## 什么时候看它

当任务涉及 Markdown/MDX/CMS 内容、文章结构、标题、引用、代码、图片、视频、图注、表格、脚注、目录、Callout、元数据、相关推荐时，看这里。

## 它主要负责

- 先建立语义结构，再决定组件和视觉容器。
- 区分 reading / wide / stage / ambient 等空间层级。
- 让图片、图表、代码和表格在需要时突破正文宽度。
- 保持脚注、目录、图注和正文之间的语义关联。
- 避免标题、作者、目录、引用、推荐等全部被做成相同 Card。
- 保证无 JS 时核心内容仍然成立。

## 它不负责

- 正文具体多宽、字号与行高：看[感知阅读](../perceptual-reading/HUMAN.md)。
- 不同容器下如何重排：看[跨设备布局](../adaptive-layout/HUMAN.md)。
- 这些内容之间具体离多远、谁更重、空白怎么分配：看[空间构图](../spatial-composition/HUMAN.md)。
- 内容里的 Link、Button 怎么表达可点击：看[交互可供性](../interaction-affordance/HUMAN.md)。
- Surface 最终颜色与材质：看[Apple 视觉](../apple-design/HUMAN.md)。
- 内容切换以后怎么动：看[交互动效](../interaction-motion/HUMAN.md)。

## 详细规则

- [Agent 执行规范](./SKILL.md)
- [各内容类型处理](./references/content-types.md)
- [文章整体结构](./references/article-anatomy.md)
- [项目总设计契约](../../../DESIGN.md)
