---
name: refined-aesthetics
description: 为 pzhown_dot_cn 诊断并提升 Web/App 的“高级感、精致感、完成度与非模板感”。用于用户说界面不够高级、太廉价、太花、太像 shadcn/demo、缺少质感、层级杂乱、细节粗糙，或需要做高级视觉审查、设计收敛、去装饰化和统一完成度时。以 processing fluency、受控复杂度、craftsmanship、视觉层级、材质克制和有限差异化为核心；不把 Apple、Glass、渐变、阴影、大圆角或极简本身当作高级。优先编排仓库现有 perceptual-reading、spatial-composition、interaction-affordance、adaptive-layout、perceptual-naturalness、apple-design 与 inclusive-accessibility，而不是重复它们的职责。
---

# 高级感与精致度审查

把“高级感”视为**感知秩序与完成度的结果**，不是某一种视觉风格。

核心模型：

```text
refined feeling
≈ processing fluency
+ controlled complexity
+ craftsmanship
+ clear hierarchy
+ material restraint
+ limited signature differentiation
```

不要把这条表达当成可计算公式；它只是审查顺序。

## 先判断是不是本 Skill 的问题

先定位根因，再决定是否做“高级感”优化：

- 正文难读、行长/字号/段落节奏有问题：先用 `perceptual-reading`。
- gap、padding、重心、留白、attention flow 有问题：先用 `spatial-composition`。
- Button/Input/Clickable Surface 不像可操作对象或状态不完整：先用 `interaction-affordance`。
- 手机/桌面只是同比缩放、密度不适配输入方式：先用 `adaptive-layout`。
- 动画、颜色、材质变化生硬或不连续：先用 `perceptual-naturalness`。
- Neutral、surface、radius、shadow、blur、glass 的最终视觉语言：交给 `apple-design`。
- 可访问性始终由 `inclusive-accessibility` 横向约束。

不要用“更高级”掩盖结构、语义、阅读或交互问题。

## 审查顺序

### 1. Processing fluency：先降低视觉摩擦

检查用户能否在第一眼快速理解页面：

- 是否有清楚的 primary anchor。
- 相似对象是否使用相似视觉语法。
- 相同状态是否具有一致反馈。
- 是否存在大量无意义近似灰、边框、Badge、Icon、阴影互相竞争。
- 是否因为为了“设计感”破坏常见 Web 心智模型。

优先删掉错误复杂度，而不是继续增强正确内容。

### 2. Controlled complexity：控制复杂度，不追求空

目标是“组织良好的丰富度”，不是页面越空越高级。

- 内容可以丰富，但同一视区不要出现多个同强度视觉中心。
- 先用 proximity、alignment、typography、negative space 分组，再考虑 border/card。
- 同一 section 中控制 shape、radius、surface、色相和装饰语言的种类。
- 熟悉的组件骨架优先；创新放在有限的 signature detail，而不是重写所有基础控件。

### 3. Craftsmanship：检查完成度

“精致”主要体现在小误差是否被系统性消除：

- icon 与文字是否光学居中，而不只几何居中。
- Button、Input、Select、Menu 等跨组件高度和 baseline 是否合理。
- default / hover / pressed / focus-visible / disabled / invalid / selected 状态是否完整。
- radius 是否形成层级，而不是每个组件随意取值。
- shadow、border、surface 是否表达真实层级。
- dark mode 是否重新校准，而非机械反色。
- desktop fine pointer 与 touch density 是否分别成立。
- 同类控件是否仍残留 32/36/40/44 等无解释尺寸混用。

细节例外应在共享组件/token 层收敛，不在页面散落 magic numbers。

### 4. Hierarchy：让强弱关系先于颜色成立

做 Grayscale Test：临时忽略色相后，仍应能辨认：

```text
primary content
→ supporting context
→ primary action
→ secondary actions
→ metadata / decoration
```

如果必须依靠蓝色、红色或高饱和渐变才能看出层级，先修 typography、position、spacing、area 和 luminance。

### 5. Material restraint：材质必须解释关系

Glass、Blur、Shadow、Gradient、Translucency 只在以下情况使用：

- 表达浮层与背景的前后关系。
- 保留上下文同时聚焦临时任务。
- 表达明确的 elevation 或状态变化。
- 作为有限品牌签名，而不是基础布局工具。

默认删除以下装饰：

- 每张 Card 都有 shadow。
- 每个 section 都有 border。
- 每个 floating surface 都做 glass。
- 多层 blur + gradient + glow 同时出现。
- 为“高级”而添加的大面积透明和低对比文字。

### 6. Limited differentiation：稳定规则上保留少量意外

高级感不是完全同质化。

允许 1–2 个明显 signature：

- 独特但克制的 Hero composition。
- 项目 Smooth Gradient / Progressive Blur 的明确场景。
- 特定 editorial typography。
- 一种具有品牌识别度的 motion / shape / material pattern。

Signature 不得扩散到所有组件，否则会从“辨识度”变成“噪声”。

## 高级感反模式

遇到下列模式优先降级或删除：

- `Apple = 大圆角 + 毛玻璃 + 蓝色`。
- `高级 = 黑金 / 高级灰 / 低饱和`。
- `简洁 = 所有内容都变灰、变小、变轻`。
- `精致 = 每个对象都有 hover animation`。
- `层级 = 每一层都加一圈 border`。
- `卡片感 = 每段内容都包 Card`。
- `现代 = 所有按钮移动端 44px 直接搬到桌面 fine pointer`。
- `品牌感 = 每个区块都用不同渐变和形状`。
- `非模板 = 故意破坏常见导航、表单和控件心智模型`。

## 输出设计审查时

不要只说“更高级”“更现代”。按优先级输出：

```text
P0 结构/语义/可用性问题
P1 高级感主要阻断项
P2 craftsmanship 细节
P3 signature / polish
```

每个问题至少包含：

```text
现象 → 为什么显得廉价/粗糙 → 修改方向 → 应交给哪个现有 Skill
```

优先指出**应该删除什么**，再指出应该新增什么。

如果用户要求实际修改代码，先收敛共享 token / primitive / component，再改具体页面；避免仅在 demo 页面做视觉补丁。

## 研究与工程依据

需要解释“为什么这样设计”、做系统级审查或更新规则时，读取：

- `references/research-basis.md`：学术研究与 GitHub 设计系统证据。
- `references/audit-rubric.md`：快速审查矩阵和优先级。

研究结论提供方向，不提供万能像素值。不要把单个实验结果写成“论文证明必须这样”。
