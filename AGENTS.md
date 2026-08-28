# 项目协作约定

## 项目设计目标

本项目是现代跨设备个人博客。所有用户界面优先实现：

1. 内容最先被理解。
2. 人眼自然舒适、适合长时间阅读。
3. 手机、平板、桌面和可变窗口保持连续体验。
4. 高级视觉和交互服务于内容与状态，不为炫技增加负荷。
5. 核心内容采用渐进增强，无高级 CSS/JS 时仍可访问。

执行任何重要 UI/UX 任务前先读取根目录 `DESIGN.md`。

## 项目级 Design Skills

根据任务按需加载以下 Skill，不要让一个 Skill 代替全部设计判断：

- `.agents/skills/perceptual-reading/SKILL.md`
  - 文章、正文、字体、字号、行高、行长、段落、深色阅读、长文、视觉舒适。
- `.agents/skills/content-presentation/SKILL.md`
  - Markdown/CMS 内容、引用、代码、图片、表格、脚注、目录、元数据、文章结构。
- `.agents/skills/adaptive-layout/SKILL.md`
  - 响应式、Container Queries、Grid/Subgrid、手机/平板/桌面、输入能力、侧栏/目录重排。
- `.agents/skills/spatial-composition/SKILL.md`
  - 页面/组件/控件 gap 与 padding、gutter、negative space、视觉重量、视觉重心、光学校正与 attention flow。
- `.agents/skills/interaction-affordance/SKILL.md`
  - 文字链接、导航、Text Action、Button、Icon Button、可点击 Surface，以及 hover/pressed/focus/selected/disabled 等状态表达。
- `.agents/skills/apple-design/SKILL.md`
  - Apple-inspired 视觉语言、Squircle、色彩、材质、阴影、透明与 Blur。
- `.agents/skills/interaction-motion/SKILL.md`
  - Motion、View Transitions、Presence、共享元素、手势、滚动联动和高级微交互。

## 设计判断顺序

涉及多个 Skill 时，按以下优先级解决冲突：

```text
内容语义
→ perceptual-reading
→ content-presentation
→ adaptive-layout
→ spatial-composition
→ interaction-affordance
→ apple-design
→ interaction-motion
```

可访问性、性能和渐进增强是所有层的共同底线。

## 前端实现约束

- 优先复用 `@pzhown/ui`，不要为单页重复造基础组件。
- 导航使用真实 Link；执行动作使用 Button/对应控件，不用 `div onClick` 伪装交互语义。
- React 交互底层优先使用 React Aria Components。
- 可点击性在 Rest 状态先成立；Hover 只能增强，不能成为唯一发现机制。
- Motion 用于 spring、presence、layout、gesture；简单 hover/focus/color/opacity 优先 CSS。
- Astro 前台保持 Astro-first，仅在真正需要状态或 React Aria 时使用 React Island。
- 使用 Container Queries、Grid/Subgrid、`clamp()`、`minmax()` 和逻辑属性实现现代布局。
- Breakpoint 由内容崩坏点产生，不机械按设备型号划分。
- 空间优先使用 `spatial-composition` 的语义关系；父布局负责兄弟 `gap`，组件负责自己的内部 inset/padding，不让基础组件携带上下文外 margin。
- 需要 raw spacing 时优先从受控 primitive ramp 选择，再映射为语义 token；不要在业务 UI 散落大量孤立 px。
- 视觉构图允许非对称，但必须保持主要注意力锚点、视觉重量和 attention flow 与内容优先级一致。
- 圆角优先使用全局 `corner-shape: squircle`。
- 色彩与渐变优先使用语义 token、OKLCH/Oklab 和现有 Smooth Gradient。
- Progressive Blur 只用于建立上下文/层级，不把长文正文放在持续高强度 Blur 上。
- Payload 原生 Admin 不做全局重皮；自定义 Dashboard/业务 UI 才使用共享设计系统。
- Hover 不得承载唯一功能；所有交互考虑 pressed、focus-visible、selected、disabled、keyboard、touch 和 reduced motion。
- 不默认给所有 Card 加 hover scale，不默认给所有 Section 加 scroll reveal。

## 完成标准

UI 任务完成前至少检查：

- 内容是否比 UI 装饰更突出？
- 连续阅读是否舒适？
- 去掉 Card/边框后层级是否仍然成立？
- 窄屏、平板、宽屏和可变窗口是否自然？
- gap / padding / gutter 是否表达真实关系，页面是否存在清楚的主要注意力锚点？
- 高对比图片、CTA、颜色块或 Motion 是否错误抢过主要内容？
- 静止状态下，主要可交互项是否已有合理 signifier，且导航与动作不会混淆？
- 键盘、触控、缩放、深色模式和 reduced motion 是否成立？
- 动效是否解释变化，而不是增加视觉忙碌？
- 是否优先复用项目设计系统，而不是制造一次性样式？
