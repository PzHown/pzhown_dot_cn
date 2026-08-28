# 项目协作约定

## 项目设计目标

本项目是现代跨设备个人博客。所有用户界面优先实现：

1. 内容最先被理解。
2. 人眼自然舒适、适合长时间阅读。
3. 手机、平板、桌面和可变窗口保持连续体验。
4. 降低不必要的视觉、认知、记忆和操作负担。
5. 高级视觉和交互服务于内容、状态与空间关系，不为炫技增加负荷。
6. 核心内容采用渐进增强，无高级 CSS/JS 时仍可访问。

执行任何重要 UI/UX 任务前先读取根目录 `DESIGN.md`。

## 项目级 Design Skills

根据任务按需加载以下 Skill，不要让一个 Skill 代替全部设计判断：

- `.agents/skills/perceptual-reading/SKILL.md`
  - 正文、字体、字号、行高、行长、段落、长文与视觉舒适。
- `.agents/skills/content-presentation/SKILL.md`
  - 内容语义、引用、代码、图片、表格、脚注、目录、元数据与文章结构。
- `.agents/skills/adaptive-layout/SKILL.md`
  - 响应式、Container Queries、Grid/Subgrid、跨窗口与输入能力、结构重排。
- `.agents/skills/spatial-composition/SKILL.md`
  - gap/padding/gutter、negative space、视觉重量、视觉重心、光学校正与 attention flow。
- `.agents/skills/navigation-wayfinding/SKILL.md`
  - 信息架构、全局/局部导航、当前位置、返回、Breadcrumb、Search vs Browse 与 Deep Link。
- `.agents/skills/cognitive-ergonomics/SKILL.md`
  - 认知负荷、决策数量、Recognition vs Recall、渐进披露、一致性、上下文与中断恢复。
- `.agents/skills/interaction-affordance/SKILL.md`
  - Link、Button、Icon Button、可点击 Surface 与 Rest/Hover/Pressed/Focus/Selected/Disabled 等控件状态。
- `.agents/skills/system-feedback/SKILL.md`
  - Loading、Progress、Skeleton、Empty、Success、Error、Retry、Undo 与长任务反馈。
- `.agents/skills/apple-design/SKILL.md`
  - Apple-inspired 视觉语言、Squircle、色彩、Neutral、材质、阴影、透明与 Blur。
- `.agents/skills/interaction-motion/SKILL.md`
  - Motion、View Transitions、Presence、共享元素、手势与高级微交互。
- `.agents/skills/inclusive-accessibility/SKILL.md`
  - 横向基线：Semantic HTML、Keyboard、Focus、Screen Reader、Contrast、Zoom/Reflow、Touch、Reduced Motion。

## 设计判断顺序

涉及多个 Skill 时，按以下顺序建立设计决策：

```text
内容语义
→ perceptual-reading
→ content-presentation
→ adaptive-layout
→ spatial-composition
→ navigation-wayfinding
→ cognitive-ergonomics
→ interaction-affordance
→ system-feedback
→ apple-design
→ interaction-motion
```

`inclusive-accessibility` 不位于链尾，而是横向约束全部步骤。性能与渐进增强同样是共同底线。

## 前端实现约束

- 优先复用 `@pzhown/ui`，不要为单页重复造基础组件。
- 导航使用真实 Link；执行动作使用 Button/对应控件，不用 `div onClick` 伪装语义。
- React 交互底层优先使用 React Aria Components。
- 导航信息架构先由 `navigation-wayfinding` 确定；`adaptive-layout` 只决定不同空间下如何重排呈现。
- 可点击性在 Rest 状态先成立；Hover 只能增强，不能成为唯一发现机制。
- 操作级 Loading/Success/Error/Retry 使用 `system-feedback`；不要把所有状态都塞进 Button 的视觉状态。
- Motion 用于 spring、presence、layout、gesture；简单 hover/focus/color/opacity 优先 CSS。
- Astro 前台保持 Astro-first，仅在真正需要状态或 React Aria 时使用 React Island。
- 使用 Container Queries、Grid/Subgrid、`clamp()`、`minmax()` 和逻辑属性实现现代布局。
- Breakpoint 由内容崩坏点产生，不机械按设备型号划分。
- 空间优先使用 `spatial-composition` 的语义关系；父布局负责 siblings gap，组件负责内部 inset/padding。
- 需要 raw spacing 时从受控 primitive ramp 选择，再映射为语义 token；不要散落大量孤立 px。
- 视觉构图允许非对称，但主要注意力锚点、视觉重量和 attention flow 必须与内容优先级一致。
- 不把实现层的所有选项直接暴露给用户；优先 Recognition、合理默认值和渐进披露。
- 系统状态变化后尽量保持滚动、输入、选择与上下文，失败时提供可恢复路径。
- 圆角优先使用全局 `corner-shape: squircle`。
- 色彩与渐变优先使用语义 token、OKLCH/Oklab 和现有 Smooth Gradient。
- Progressive Blur 只用于建立上下文/层级，不把长文正文放在持续高强度 Blur 上。
- Payload 原生 Admin 不做全局重皮；自定义 Dashboard/业务 UI 才使用共享设计系统。
- Hover 不得承载唯一功能；所有交互考虑 keyboard、touch、focus-visible、selected、disabled、reduced motion。
- 不默认给所有 Card 加 hover scale，不默认给所有 Section 加 scroll reveal。

## 完成标准

UI 任务完成前至少检查：

- 内容是否比 UI 装饰更突出？
- 连续阅读是否舒适？
- 去掉 Card/边框后层级是否仍成立？
- 窄屏、平板、宽屏和可变窗口是否自然？
- gap / padding / gutter 是否表达真实关系，页面是否有清楚主注意力锚点？
- 用户能否理解当前位置、返回路径和主要可去位置？
- 是否存在不必要的记忆、比较、模式切换或同权重决策？
- 主要可交互项在静止状态是否已有合理 signifier？
- 用户操作后是否能理解系统正在做什么、结果是什么、失败后怎么办？
- 语义、键盘、Focus、缩放、触控、深色模式和 Reduced Motion 是否成立？
- 动效是否解释变化，而不是增加视觉忙碌？
- 是否优先复用了项目设计系统，而不是制造一次性样式？
