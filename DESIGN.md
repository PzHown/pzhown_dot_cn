# PzHown Blog Design System

## 目标

本项目要构建一套现代、跨设备、内容优先的个人博客体验。

设计不以“像某个平台”为目标，而以以下结果为目标：

1. **内容最先被理解**：用户先看到文章、作品和观点，而不是 UI 框架。
2. **视觉与认知都舒适**：降低视觉搜索、记忆、判断、模式切换和精确操作负担。
3. **跨设备连续**：手机、平板、桌面和可变窗口保持同一信息优先级，但允许结构和交互自适应。
4. **先进但克制**：现代 CSS、React Aria、Motion、View Transitions、Progressive Blur 必须服务于内容、状态与空间关系。
5. **状态可理解、错误可恢复**：用户始终知道系统正在做什么，失败后能继续。
6. **渐进增强与包容性**：没有高级 CSS、动画或 JS 时核心内容和导航仍成立；可访问性从设计开始。

## 设计决策链

```text
内容与语义
    ↓
阅读舒适
    ↓
跨设备结构
    ↓
空间关系与视觉重心
    ↓
导航与定向
    ↓
认知负荷与任务连续性
    ↓
交互可供性
    ↓
系统反馈与恢复
    ↓
视觉语言
    ↓
交互与动效
    ↓
装饰与氛围
```

低层级目标不得破坏高层级目标。

`inclusive-accessibility` 是横向基线，贯穿全部步骤；性能与渐进增强同样横向生效。

## Skill 分工

### `perceptual-reading`

负责阅读舒适、正文排版、行长、字号、行高、段落节奏、深色阅读和长文视觉负荷。

### `content-presentation`

负责内容语义与版式：正文、引用、代码、图片、表格、脚注、目录、元数据等如何呈现。

### `adaptive-layout`

负责跨设备与可变窗口的**结构变化**：Container Queries、Grid/Subgrid、pane、侧栏、目录、媒体与导航呈现何时重排。

### `spatial-composition`

负责结构确定后的**空间关系与视觉重心**：page/section/component/control 的 gap 与 padding、gutter、negative space、视觉重量、视觉平衡、光学校正和 attention flow。

核心区别：`adaptive-layout = WHERE`，`spatial-composition = RELATION + WEIGHT`。

### `navigation-wayfinding`

负责**信息空间与路径**：Information Architecture、Global/Local/Contextual Navigation、Current Location、Back、Breadcrumb、Deep Link、Search vs Browse 和信息 scent。

它决定“去哪里、路径如何组织”；`adaptive-layout` 只决定这些导航在不同空间中如何呈现。

### `cognitive-ergonomics`

负责**用户需要想多少、记多少、判断多少**：Recognition vs Recall、决策数量、默认值、一致性、渐进披露、上下文保持、模式切换和中断恢复。

### `interaction-affordance`

负责**控件可发现性和局部状态**：Inline Link、Navigation Link、Text Action、Button、Icon Button、Clickable Surface，以及 Rest / Hover / Focus / Pressed / Selected / Disabled / 控件级 Pending。

### `system-feedback`

负责**操作、区域和任务级状态**：Loading、Progress、Skeleton、Empty、Success、Error、Partial Failure、Retry、Undo、Optimistic UI 和长任务反馈。

### `apple-design`

负责最终视觉语言：材质、色彩、Neutral、Squircle、阴影、透明度和 Apple-inspired 的克制感。它不重新定义空间、导航、认知、交互或系统状态语义。

### `interaction-motion`

负责高级动态表达：空间连续性、Presence、共享元素、手势和 View Transitions。先由其他 Skill 决定状态和因果，再决定是否需要动画。

### `inclusive-accessibility`

作为横向约束，负责 Semantic HTML、Keyboard、Focus、Screen Reader、Contrast、非颜色线索、Zoom/Reflow、Touch Target、替代输入、Reduced Motion 和动态状态公告。

## 技术设计约束

- 公共前台保持 Astro-first；静态内容不要因为样式或动效无意义 React 化。
- 导航使用 `<a>` / Link；动作使用 `<button>` / React Aria 对应控件；禁止 `div onClick` 代替语义控件。
- 需要复杂交互状态时优先 React Aria Components。
- Motion 用于 spring、presence、layout、gesture；简单状态优先 CSS。
- `@pzhown/ui` 是共享组件、Token 与基础视觉规则的优先入口。
- 圆角优先使用现有 `corner-shape: squircle` 体系。
- 自定义色彩优先使用 OKLCH/Oklab 和语义 token。
- Progressive Blur 只用于建立上下文和空间层级，不能成为大面积阅读背景。
- Payload 原生 Admin 不做全局重皮；自定义业务界面才使用共享设计系统。

## 内容优先

- 博客不是 Dashboard，不把所有内容做成 Card。
- 去掉背景、边框和阴影后，信息层级仍应成立。
- 首屏优先回答“这是什么、为什么值得看、从哪里开始”。
- 宽屏多余空间用于留白、目录、注释和媒体，不无限拉宽正文。
- 正文周围减少持续动画、高对比装饰和大面积透明材质。
- 图片、代码、表格、引用等由内容类型决定版式，不由统一组件外观决定。

## 跨设备布局

- Breakpoint 由内容崩坏点产生，不机械按设备型号分类。
- 组件优先使用 Container Queries 对自身容器负责。
- 手机、平板、桌面保持相同信息优先级，但允许不同空间结构和导航呈现。
- Touch、hover、fine pointer、coarse pointer 分别判断，不把屏幕宽度等同于输入能力。
- 浏览器任意宽度、200% 文本缩放和系统字体变化下仍保持可用。
- 跨设备保持关系语义，不要求保持完全相同的几何构图。

## 空间构图

空间本身是信息层。

```text
Spatial Rhythm  → 距离表达关系
Visual Weight   → 强弱表达重要性
Visual Balance  → 重心组织整体构图
Attention Flow  → 视线组织阅读顺序
```

### 空间节奏

受控 primitive scale：

```text
2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
```

业务 UI 按语义消费空间：

```text
inline
inset
stack
group
section
gutter
page-edge
```

- 组件负责 internal inset / padding。
- 父布局负责 siblings gap。
- 页面/布局系统负责 section、gutter、page-edge。
- 基础组件不要通过外部 margin 决定自己在所有上下文中的位置。
- 流体 spacing 可使用 `clamp()` / Container Query，但上下限优先来自受控 scale。

### 视觉重量与平衡

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

- 大不一定更重；高对比标题可能比大面积低对比图片更强。
- 如果视觉重量与内容优先级冲突，优先降低错误对象，而不是继续增强正确对象。
- 平衡不等于左右对称；允许 asymmetric / editorial balance。
- Negative space 可以作为 counterweight，不因为一侧为空就机械填满。
- 几何中心是起点，不建立全局固定 optical-center 偏移公式。

### 注意力与光学校正

主要 viewport / section 通常应有清楚主锚点：

```text
Primary anchor
→ Supporting context
→ Main content / Next action
→ Secondary information
```

- 不强制 F/Z pattern。
- 手机上优先把桌面的多个并行重心转为清楚的滚动顺序。
- 几何一致性是起点，光学一致性是最终目标。
- icon、中文/英文大标题、圆形/三角形在确实视觉错位时允许最小校正。
- Optical adjustment 不能破坏 DOM、Focus、Hit Target 和缩放可用性。

## 导航与定向

导航首先是信息结构，不是 Header 样式。

用户应能持续回答：

```text
我在哪里？
这里有什么？
我从哪里来？
下一步能去哪？
怎么回去？
```

- Global、Local、Contextual、Utility Navigation 职责分开。
- Current Location 必须可感知，不要求用户从 URL 或记忆推断。
- 标签提供 Information Scent，使用用户能预测目的地的词。
- 同一层级保持相似抽象程度，避免无意义深层嵌套。
- Search 与 Browse 互补；搜索不能替代 coherent navigation。
- Deep Link、刷新、新窗口直接进入时仍能理解页面身份和返回路径。
- 返回时尽量保留滚动、筛选和上下文。

## 认知工效

目标是减少与任务本身无关的认知工作。

- Recognition 优先于 Recall：能看见、能比较、能识别，就不要求记忆。
- 减少没有实际决策价值的选项。
- 同类对象保持稳定名称、位置、图标和结果。
- 使用合理默认值，但不替用户做不可逆决定。
- 复杂能力按“当前必须 → 可能需要 → 高级 → 专家”渐进披露。
- 风险、成本、权限和不可逆结果不能藏进高级区域。
- 切换、返回或中断后尽量保留当前状态和未完成意图。
- 不把“简洁”误解为隐藏关键入口或状态。

## 交互可供性

统一的是交互语法，不是所有可点击元素的外观。

- 导航与动作分离：进入位置使用 Link；改变状态、提交、打开控件使用 Button 或对应组件。
- Rest 状态先成立；Hover 只增强确认。
- 正文链接不能只靠颜色表达。
- Text Action 是 Button 的视觉变体，语义仍是 Button。
- Pressed 提供即时反馈；Focus-visible 独立且清楚。
- Selected 使用位置、indicator、surface、形状或字重等多线索，不只变色。
- Disabled 不保留正常 Hover/Pressed 暗示。
- Clickable Surface 避免与内部 Menu、Bookmark 等次级操作形成嵌套冲突。
- 独立触控控件保持舒适 Hit Area；视觉尺寸与命中区可以分离。

## 系统反馈与恢复

区分：

```text
Control state   → interaction-affordance
Operation state → system-feedback
View state      → system-feedback
Task state      → system-feedback
```

- 用户操作后尽快确认系统已接收。
- 等待期间保持原上下文，不用全屏 Loading 取代局部状态。
- 极短操作不闪烁 Spinner；短等待使用局部 Pending；区域加载可用稳定 Skeleton；长任务说明进度和取消/离开策略。
- 成功结果已经明显时，不重复弹“成功”。
- 错误说明“发生什么 + 影响什么 + 能做什么”，保留可恢复输入。
- Partial Failure 不伪装成全部失败。
- 可逆低风险操作优先 Undo；不可逆高风险操作再使用确认。
- Optimistic UI 只用于结果高度可预测且失败可安全恢复的操作。

## 视觉语言

- 采用 Apple-inspired，而不是 Apple clone。
- 在空间、导航、认知和交互关系成立后，再用灰度、材质、形状和色彩完成表达。
- **先用 Neutral 与明度建立层级，再用色相承载品牌、状态和重点。**
- Squircle、Smooth Gradient、Progressive Blur 是工具，不是必须装饰。
- Glass/Blur 只在需要保留上下文或表达前后层级时使用。
- 深色模式重新验证亮度、对比和眩光，不简单反色。

## 灰度与色彩

Neutral 主要负责：信息层级、阅读节奏、Surface 深度、Foreground 权重、Separator 和 Disabled。

彩色主要负责：品牌强调、主要交互重点、Success/Warning/Destructive 和少量视觉聚焦。

业务组件消费语义 token，而不是直接依赖 `gray-500` / `zinc-700`：

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

底层可使用 OKLCH Neutral scale；浅色、深色和高对比分别映射，不做简单 RGB 反转。

重要页面临时去色后，标题、正文、导航、主要操作、状态和 Surface 层级仍应清楚。若结构坍塌，先修字号、字重、空间、形状、位置和明度，再恢复色相。

## 动效

```text
空间连续性
> 状态反馈
> 操作反馈
> 注意力引导
> 氛围装饰
```

- 动画解释变化，不给所有 Card、Section 和 Button 无差别加动画。
- 允许中断，不能让用户等待动画结束才能继续。
- Reduced Motion 下移除大位移、视差和 overshoot，但保留必要因果和状态反馈。
- Motion 是高注意力重量信号；静态构图已有多个强焦点时不再增加运动竞争。
- `system-feedback` 先决定 Loading/Success/Error/Progress 的语义，本 Skill 只决定动态表达。

## 包容性与可访问性基线

可访问性不是最后的独立步骤。

- 优先原生 Semantic HTML；能用原生元素就不要用 ARIA 模拟。
- 所有核心操作支持 Keyboard，并考虑 Touch / coarse pointer 等非精确输入。
- Focus-visible 必须清楚，不被 overflow、mask 或 transform 裁切。
- 关键状态、错误、选择和交互性不能只依赖颜色。
- 普通文本、非文本 UI 与状态对比满足项目 WCAG AA 基线。
- 200% 文本缩放、常见 Reflow 和系统字体变化下核心任务不失效。
- icon-only 控件提供可访问名称；有意义图片提供等价文本信息。
- 动态状态只在有意义时向辅助技术公告，避免 live region 噪声。
- Reduced Motion 不应导致 Pressed/Focus/Selected/Loading 等必要反馈消失。
- 不通过 `outline: none`、滥用 `tabindex=-1` 或冲突 ARIA 换取视觉效果。

## 设计审查顺序

重要 UI 任务按以下顺序审查：

1. 内容和语义是否正确？
2. 阅读是否舒适？
3. 跨设备结构是否自然？
4. gap / padding / gutter、视觉重心和 attention flow 是否合理？
5. 用户能否理解当前位置与返回路径？
6. 是否存在不必要的记忆、决策、隐藏规则或模式切换？
7. 可交互项在 Rest 状态是否有合理 signifier？
8. 用户操作后是否理解 Loading / Success / Error / Recovery？
9. Semantic HTML、Keyboard、Focus、Touch、Zoom/Reflow 与 Reduced Motion 是否成立？
10. 视觉语言是否统一且克制？
11. 灰度下主要层级是否仍清楚？
12. 动效是否解释变化？
13. Astro hydration、图片、Blur、动画是否带来不必要性能成本？
14. 是否优先复用了 `@pzhown/ui` 和现有 token？

## 参考理念来源

项目 Skill 的规则参考并转译公开资料，不复制其受版权保护内容：

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Microsoft Fluent 2: https://fluent2.microsoft.design/
- Atlassian Design System: https://atlassian.design/
- Carbon Design System: https://carbondesignsystem.com/
- Adobe Spectrum: https://spectrum.adobe.com/
- Material adaptive layout: https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C Cognitive Accessibility Guidance: https://www.w3.org/TR/coga-usable/
- React Aria Components: https://react-aria.adobe.com/
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- Visual balance research: https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2016.00335/full
- Web visual hierarchy: https://www.sciencedirect.com/science/article/pii/S0747563218301195
- UEyes: https://userinterfaces.aalto.fi/ueyeschi23/
- Navigation complexity research: https://pubmed.ncbi.nlm.nih.gov/25802803/
- Cognitive load systematic review: https://pubmed.ncbi.nlm.nih.gov/41849193/
- Visual comfort review: https://pmc.ncbi.nlm.nih.gov/articles/PMC10512131/
- Typography and eye movements in web reading: https://pubmed.ncbi.nlm.nih.gov/31481744/
