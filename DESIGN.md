# PzHown Blog Design System

## 目标

本项目要构建一套现代、跨设备、内容优先的个人博客体验。

设计不以“看起来像某个平台”为目标，而以以下结果为目标：

1. **内容最先被理解**：用户应先看到文章、作品和观点，而不是 UI 框架。
2. **人眼自然舒适**：降低视觉搜索、认知判断和精确操作负担，适合长时间阅读。
3. **跨设备连续**：手机、平板、桌面和可变窗口保持同一信息层级，但允许空间结构和交互方式自适应。
4. **先进但克制**：使用现代 CSS、React Aria、Motion、View Transitions、Progressive Blur 等能力时，必须服务于内容、状态和空间关系。
5. **渐进增强**：没有高级 CSS、动画或 JS 时，核心内容、导航和语义仍然成立。

## 设计优先级

任何设计冲突按以下顺序取舍：

```text
内容与语义
    ↓
阅读舒适与可访问性
    ↓
信息层级
    ↓
跨设备布局
    ↓
空间构图与视觉重心
    ↓
交互可供性
    ↓
视觉语言
    ↓
交互与动效
    ↓
装饰与氛围
```

低层级目标不得破坏高层级目标。

## Skill 分工

### `perceptual-reading`

负责阅读舒适、正文排版、行长、字号、行高、段落节奏、深色阅读、视觉负荷和长文体验。

### `content-presentation`

负责内容语义与版式：正文、引用、代码、图片、表格、脚注、目录、元数据、相关推荐等如何呈现。

### `adaptive-layout`

负责跨设备与可变窗口的**结构变化**，遵循“适配而不是缩小”，使用内容崩坏点、Container Queries 和输入能力决定列、pane、导航、目录和媒体何时重排。

### `spatial-composition`

负责结构确定后的**空间关系与视觉重心**：page/section/component/control 的 gap 与 padding、gutter、negative space、视觉重量、视觉平衡、光学校正和 attention flow。

核心区别：`adaptive-layout = WHERE`，`spatial-composition = RELATION + WEIGHT`。

### `interaction-affordance`

负责统一可交互元素的可发现性、语义与状态表达：Inline Link、Navigation Link、Text Action、Button、Icon Button、Clickable Surface，以及 Rest / Hover / Focus / Pressed / Selected / Disabled / Pending。

### `apple-design`

负责最终视觉语言：材质、色彩、灰度与 Neutral、Squircle、阴影、透明度和 Apple-inspired 的克制感。它不决定具体 gap/padding、视觉重心，也不决定一个元素应该是 Link、Button 还是可点击 Surface。

### `interaction-motion`

负责高级交互与动效：空间连续性、状态反馈、Presence、共享元素、手势和 View Transitions。

## 技术设计约束

- 公共前台保持 Astro-first；静态内容不要因为动效或样式无意义 React 化。
- 导航使用 `<a>` / Link；动作使用 `<button>` / React Aria 对应控件；禁止用 `div onClick` 代替真实交互语义。
- 需要复杂交互状态时使用 React Aria Components。
- Motion 用于 spring、presence、layout、gesture；简单状态优先 CSS。
- `@pzhown/ui` 是共享组件和视觉 token 的唯一优先入口；不要在页面里重复造基础控件。
- 圆角优先使用现有 `corner-shape: squircle` 体系。
- 自定义色彩优先使用 OKLCH/Oklab 和语义 token。
- Progressive Blur 仅用于建立上下文和空间层级，不能成为大面积阅读背景。
- Payload 原生 Admin 不做全局重皮；自定义业务界面才使用项目设计系统。

## 内容优先规则

- 文章不是 Dashboard，不把所有内容做成 Card。
- 去掉背景、边框和阴影后，信息层级仍应成立。
- 文章首屏优先回答“这是什么、为什么值得读、从哪里开始”。
- 宽屏多余空间用于留白、目录、注释和媒体，不无限拉宽正文。
- 正文周围减少持续动画、高对比装饰和大面积透明材质。
- 图片、代码、表格、引用等由内容类型决定版式，不由组件统一外观决定。

## 跨设备规则

- Breakpoint 由内容崩坏点产生，不机械按设备型号分类。
- 组件优先使用 Container Queries 对自身容器负责。
- 手机、平板、桌面保持相同信息优先级，但可以使用不同的导航、目录、侧栏和信息密度。
- Touch、hover、fine pointer、coarse pointer 分别判断，不把屏幕宽度等同于输入能力。
- 浏览器任意宽度、200% 文本缩放和系统字体变化下仍应保持可用。
- 跨设备保持内容优先级和关系语义，不要求保持完全相同的几何构图。

## 空间构图

空间本身是信息层，不只是“空出来的地方”。

项目使用四个相互作用的概念：

```text
Spatial Rhythm
距离表达关系

Visual Weight
强弱表达重要性

Visual Balance
重心组织整体构图

Attention Flow
视线组织阅读顺序
```

### 空间节奏

优先从受控 primitive scale 选择空间值：

```text
2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
```

这是底层候选值，不是要求所有数值都出现。业务 UI 应按语义消费空间，例如：

```text
inline
inset
stack
group
section
gutter
page-edge
```

职责约束：

- 组件负责自己的 internal inset / padding。
- 父布局负责 siblings gap。
- 页面/布局系统负责 section、gutter、page-edge。
- 基础组件不要通过外部 margin 决定自己在所有上下文中的位置。
- 局部需要流体 spacing 时，可使用 `clamp()` / Container Query，但上下限优先来自受控 scale。

### 视觉重量

视觉重量不是物理质量，不使用伪精确公式。综合判断：

```text
contrast
+ typography mass
+ area
+ position
+ density
+ chroma
+ image complexity
+ shape / direction
+ depth
+ motion
+ isolation / negative space
```

内容型页面优先关注**位置、对比、排版、空白**。大不一定更重；一个高对比标题可能比大面积低对比图片更强。

如果视觉重量与内容优先级冲突，优先降低错误对象的重量，而不是不断增强正确对象。

### 视觉平衡

- 平衡不等于左右对称。
- 几何中心是起点，不是感知中心的万能答案。
- 允许 asymmetric / editorial balance，但要有明确主轴、对齐或张力逻辑。
- Negative space 可以作为 counterweight，不因为一侧为空就机械填满。
- 不建立全局固定 optical-center 偏移公式。

### 注意力顺序

一个 viewport 或主要 section 通常应有清楚的主要注意力锚点：

```text
Primary anchor
→ Supporting context
→ Main content / Next action
→ Secondary information
```

不强制套用 F/Z pattern。手机上优先把桌面的多个并行重心转成清楚的滚动顺序，而不是把同样强度的对象直接纵向堆叠。

### 光学校正

几何一致性是起点，光学一致性是最终目标。

- 先使用统一 scale、baseline、Grid/Flex 对齐。
- icon、中文/英文大标题、圆形/三角形等几何在确实存在视觉错位时允许最小校正。
- 优先换用邻近 scale；仍需例外时在共享组件/token 层收敛，不在页面散落 magic numbers。
- Optical adjustment 不能破坏 DOM、focus、hit target 和缩放可用性。

## 交互可供性

统一的是“交互语法”，不是所有可点击元素的外观。

- **导航与动作分离**：进入页面/位置使用 Link；改变当前状态、提交、打开控件使用 Button 或对应组件。
- **Rest 状态先成立**：重要可交互项在静止状态下已有足够线索；Hover 只增强确认，不负责第一次告诉用户“这里能点”。
- **正文链接保留链接心智模型**：不能只靠颜色表达，优先使用细 underline 或其他稳定的非颜色线索。
- **Navigation Link 与 Inline Link 可以不同**：导航可依赖固定位置、结构和当前项 indicator，不要求全部下划线。
- **Text Action 是 Button 的视觉变体**：例如复制、展开、重试，语义仍是 Button。
- **Pressed 提供即时反馈**：使用短促的明度、surface、位移或小幅 scale；不让用户等待动画。
- **Focus-visible 独立且清楚**：不能因追求简洁而隐藏，且不被容器裁切。
- **Selected 是持续状态**：使用位置、indicator、surface、形状或字重等多线索，不只变色。
- **Disabled 不保留正常操作暗示**：不显示正常 hover/pressed，也不能让状态只能靠低 opacity 猜测。
- **Clickable Surface 避免嵌套冲突**：Card 内若有 Menu、Bookmark 等次级操作，不把整个交互结构塞进一个 `<a>`。
- **触控与视觉尺寸分离**：独立控件保持舒适 hit area，正文 inline link 保持自然文本流。

## 动效规则

动效优先级：

```text
空间连续性
> 状态反馈
> 操作反馈
> 注意力引导
> 氛围装饰
```

- 动画必须解释变化，不给所有 Card、Section 和按钮无差别加动画。
- 页面阅读区域的动效密度低于首页实验区或作品展示区。
- 允许中断，不能让用户等待动画结束才能继续操作。
- Reduced Motion 下移除大范围移动、视差和弹性 overshoot，但保留必要状态反馈。
- Motion 是高注意力重量信号；静态构图已经存在多个强焦点时，不再用运动继续争夺主导权。

## 视觉语言

- 采用 Apple-inspired，而不是 Apple clone。
- 在 `spatial-composition` 已建立空间关系和视觉重心后，再用灰度、材质、形状与色彩完成最终视觉表达。
- **先用灰度 / Neutral 与明度建立层级，再用色相承载品牌、状态和重点。**
- Squircle、Smooth Gradient、Progressive Blur 是工具，不是必须出现的装饰。
- 玻璃/透明材质只在需要保留上下文或表达前后层级时使用。
- 深色模式重新验证亮度、对比和眩光，不简单反色。

## 灰度与色彩策略

灰度是项目视觉层级的基础骨架，不是“没有颜色时的备用方案”。

### Neutral 负责

- 信息层级。
- 阅读节奏。
- Canvas / Surface / Elevated Surface 的深度关系。
- Foreground / Secondary / Tertiary 文本权重。
- Separator / Disabled 等辅助状态。

### 彩色负责

- 品牌强调。
- 主要交互重点。
- Success / Warning / Destructive 等语义状态。
- 少量视觉聚焦和氛围。

### Token 规则

业务组件不得直接依赖 `gray-500`、`zinc-700` 等物理色阶，应消费语义 token，例如：

```text
Canvas
Surface 1
Surface 2
Elevated Surface
Foreground
Secondary Foreground
Tertiary Foreground
Separator
Disabled
Accent
Success
Warning
Destructive
```

底层可以使用 OKLCH 构造 Neutral scale，但浅色、深色和高对比主题分别映射语义 token，而不是对同一灰阶做简单反转。

### Grayscale Test

重要页面和关键组件完成后进行灰度审查。临时去掉色相后，以下关系仍必须成立：

- 主标题与正文。
- 正文与元数据。
- 主导航与当前状态。
- 主要操作与次要操作。
- Surface 层级。
- Error / Warning / Success 的非颜色线索。

如果页面转成灰度后结构明显坍塌，先调整字号、字重、空间、形状、位置和明度层级，再恢复彩色。

## 设计审查顺序

每次重要 UI 任务按此顺序审查：

1. 内容和语义是否正确？
2. 阅读是否舒适，视觉负荷是否合理？
3. 信息层级是否脱离 Card/边框也成立？
4. 窄屏、平板、宽屏和可变窗口是否自然？
5. gap / padding / gutter 是否表达真实关系，主要注意力锚点与视觉重心是否符合内容优先级？
6. 可交互项在 Rest 状态是否已有合理 signifier，且导航与动作语义是否正确？
7. React Aria 的键盘、触控、focus、selected、disabled 是否完整？
8. 视觉语言是否统一且克制？
9. **转为灰度后，标题、正文、导航、主要操作和状态层级是否仍然清楚？**
10. 动效是否解释变化且支持 reduced motion？
11. Astro hydration、图片、Blur、动画是否带来不必要性能成本？
12. 是否优先复用了 `@pzhown/ui` 和现有 token？

## 参考理念来源

项目 Skill 的规则参考并转译以下公开资料，不复制其受版权保护内容：

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Microsoft Fluent 2 Layout: https://fluent2.microsoft.design/layout
- Atlassian Spacing: https://atlassian.design/foundations/spacing
- Carbon Spacing: https://carbondesignsystem.com/elements/spacing/overview/
- Adobe Spectrum Spacing: https://spectrum.adobe.com/page/spacing/
- Material adaptive layout: https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- React Aria Components: https://react-aria.adobe.com/
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- Vercel Agent Skills: https://github.com/vercel-labs/agent-skills
- Anthropic frontend-design Skill: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Visual balance research: https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2016.00335/full
- Visual weight in interface layout: https://www.tandfonline.com/doi/abs/10.1080/10447318.2023.2289294
- Web visual hierarchy: https://www.sciencedirect.com/science/article/pii/S0747563218301195
- UEyes: https://userinterfaces.aalto.fi/ueyeschi23/
- Mobile UI eye tracking: https://arxiv.org/abs/2101.09176
- Visual comfort review: https://pmc.ncbi.nlm.nih.gov/articles/PMC10512131/
- Font/display size reading study: https://pmc.ncbi.nlm.nih.gov/articles/PMC7720185/
- Typography and eye movements in web reading: https://pubmed.ncbi.nlm.nih.gov/31481744/
