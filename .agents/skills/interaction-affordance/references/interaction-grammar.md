# 交互可供性语法

## 核心概念

把交互表达拆成两部分：

- **Affordance**：一个对象允许用户做什么。
- **Signifier**：界面通过什么线索让用户知道它可以这样操作。

项目目标不是“所有可点击元素长得一样”，而是让相同语义共享相同交互语法，让不同语义保持可区分。

## 六类基础交互表达

### 1. Inline Link

用于正文内部跳转。

Rest 必须在阅读流中可识别；通常使用细下划线 + 适度前景差异。不要只把文字染成另一种颜色。

### 2. Navigation Link

用于全局导航、局部导航、目录、面包屑等。

可依赖位置、重复结构、当前项 indicator 和文字权重，不要求所有导航项都下划线。语义必须仍是 Link。

### 3. Text Action

外观近似文字，但执行当前上下文动作，例如“复制”“展开”“重试”。

语义必须是 Button。使用明确动词；可配小图标。不要因为视觉像文字就改用 `<a>`。

### 4. Button

用于明确动作。通过 Shape + Surface + Label 提供强 signifier。

同一区域通常只保留一个最强 Primary；其余动作降低 surface 或采用 quiet/ghost 表达。

### 5. Icon Button

用于高频、空间紧凑且图标语义足够稳定的动作。

必须有可访问名称。图标不够自解释时提供 Tooltip，但 Tooltip 不能承载完成任务所必需的信息。

### 6. Clickable Surface

用于“进入一个对象”，例如文章摘要、项目卡片、媒体对象。

优先让标题/对象本身首先表达可进入性；整个 Surface 可扩大点击区域，但要避免与 Bookmark、Menu 等内部操作产生嵌套冲突。

## 强弱层级

交互表达强度应对应任务重要性，而不是对应开发者喜好：

```text
Primary Action
> Secondary Action
> Quiet Action
> Navigation / Inline Link
> Passive information
```

但“弱”不等于“不可发现”。Quiet Action 仍需在 Rest 或上下文中有合理 signifier。

## 内容型博客的特殊原则

- 正文是主角，交互 signifier 不应把文章变成控制台。
- Inline Link 保留传统链接心智模型，减少视觉搜索成本。
- 文章列表优先让标题/摘要形成可进入对象，不默认把所有 Card 做成高饱和按钮。
- 元数据（作者、日期、标签）只有真的可点击时才给交互 signifier；避免看起来像 Link 却不可点。
- 可交互图标不要与纯装饰图标使用完全相同的 Rest 表达。

## 参考

- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- W3C G183（正文链接不能只依赖颜色）: https://www.w3.org/WAI/WCAG22/Techniques/general/G183
- Nielsen Norman Group 关于 Signifiers/Affordances 的经典 HCI 思想可作为概念背景；项目实现仍以语义 HTML、WCAG 和 React Aria 为准。
