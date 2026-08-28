---
name: navigation-wayfinding
description: 为通用 Web/App 设计信息架构、全局/局部导航与用户定向。用于 navigation hierarchy、global/local nav、current location、back/forward、breadcrumb、deep link、URL、信息 scent、导航标签、层级深度、Search vs Browse、页面间上下文保持或任何“我在哪里、这里有什么、下一步去哪、怎么回去”的问题。Link/Button 的视觉可供性由 interaction-affordance 负责；跨设备导航重排由 adaptive-layout 负责。
---

# 导航与定向规范

让用户能持续回答：我在哪里、我能去哪、我是怎么来的、如何回去。

## 核心原则

- **导航先表达信息结构，再表达视觉样式。**
- **当前位置必须可感知**：不要要求用户从 URL 或记忆推断位置。
- **层级应浅而清楚**：不要为了“整洁”无限增加嵌套。
- **标签提供 Information Scent**：名称应帮助用户预测目的地，而不是内部组织术语。
- **Browse 与 Search 互补**：搜索不能替代 coherent navigation。
- **返回应保留上下文**：尽量恢复用户刚才的位置、滚动与筛选。
- **深链接必须成立**：关键页面不依赖“必须从某个入口进入”才能理解。

## 工作流程

1. 列出用户需要到达的主要信息空间，不先画导航栏。
2. 建立概念分组和层级；同层级名称保持相似抽象程度。
3. 选择 Global / Local / Contextual navigation 的职责。
4. 明确 Current Location 和 Parent / Previous context。
5. 检查标签是否能让用户预测目的地。
6. 检查返回、刷新、深链接和新窗口进入时是否仍能定向。
7. Search 只作为补充，不用来掩盖分类和导航结构问题。
8. 跨设备呈现交给 `adaptive-layout`，Link 的视觉 signifier 交给 `interaction-affordance`。

## 导航层级

- Global navigation：产品或站点的主要信息空间。
- Local navigation：当前区域内的子层级。
- Contextual navigation：与当前对象直接相关的下一步或关联入口。
- Utility navigation：账号、帮助、设置等辅助能力。

不要让同一个入口在多个层级反复出现而语义不清。

## Wayfinding

页面至少应通过结构回答：

```text
当前位置
+ 当前页面身份
+ 上级或返回路径
+ 邻近可去位置
```

具体表现可用标题、当前导航态、Breadcrumb、Back、层级标签等组合，不要求所有页面同时出现所有组件。

## 信息 scent

导航标签：

- 使用用户能预测目的地的词。
- 避免团队内部缩写和组织结构名称。
- 同一层级避免一个是名词、一个是长句、一个是营销口号。
- 图标不能替代不明确的核心标签，除非是高度稳定的通用图标语义。

## Search 与 Browse

- Browse 负责可发现的信息结构。
- Search 负责已知目标或大规模内容定位。
- 不能因为有搜索框就省略高频信息的基本导航。
- 搜索结果页仍需保留当前位置与退出路径。

## 边界

- Link 是否看得出可以点：`interaction-affordance`。
- 移动/桌面如何重排导航：`adaptive-layout`。
- 导航密度与视觉重心：`spatial-composition`。
- 导航是否造成过多记忆和决策：`cognitive-ergonomics`。
- 键盘、语义 landmark、Skip Link 等：`inclusive-accessibility` 横向覆盖。

## 参考资料

- 信息架构：`references/information-architecture.md`。
- Wayfinding：`references/wayfinding.md`。
- 导航模式：`references/navigation-patterns.md`。
- Search 与 Browse：`references/search-browse.md`。
- 来源：`references/research-basis.md`。
