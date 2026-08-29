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

## iOS 27 UI 基线

共享 UI 已从零重建，不再以旧 shadcn / aria-nova / Base UI 组件为实现基础。

- **唯一视觉基准**：`seunghan91/ios27-design-system`。系统色、Typography、Spacing、组件几何、Liquid Glass 与 Motion 参数以它和根目录 `DESIGN.md` 为准。
- **结构参考**：`Andersonlimahw/react-cupertino-ui`。只研究 anatomy、状态归属和组合方式，不复制它的视觉主题。
- **实现所有权**：`packages/ui` 中的 React 组件由 PzHown 自己实现和维护。
- **禁止恢复旧兼容链**：不得重新引入 `components.css`、`ios-theme.css`、`form-controls.css`、`liquid-glass.css`、`liquid-glass-components.css` 来修补通用 Web 组件。
- **保留效果**：Progressive Blur 与 Oklab / smootherstep Gradient 是独立 Effects，不是普通组件皮肤。

缺少共享组件时，先依据 `DESIGN.md`、相关 Skills 和 iOS 27 上游规范新建组件；不要从 Git 历史恢复旧组件壳以维持旧 API。

## 项目级 Design Skills

根据任务按需加载以下 Skill，不要让一个 Skill 代替全部设计判断：

- `.agents/skills/perceptual-reading/SKILL.md`：正文、字体、字号、行高、行长、段落、长文与视觉舒适。
- `.agents/skills/content-presentation/SKILL.md`：内容语义、引用、代码、图片、表格、脚注、目录、元数据与文章结构。
- `.agents/skills/adaptive-layout/SKILL.md`：响应式、Container Queries、Grid/Subgrid、跨窗口与输入能力、结构重排。
- `.agents/skills/spatial-composition/SKILL.md`：gap/padding/gutter、negative space、视觉重量、视觉重心、光学校正与 attention flow。
- `.agents/skills/navigation-wayfinding/SKILL.md`：信息架构、全局/局部导航、当前位置、返回、Breadcrumb、Search vs Browse 与 Deep Link。
- `.agents/skills/cognitive-ergonomics/SKILL.md`：认知负荷、决策数量、Recognition vs Recall、渐进披露、一致性、上下文与中断恢复。
- `.agents/skills/interaction-affordance/SKILL.md`：Link、Button、Icon Button、可点击 Surface 与 Rest/Hover/Pressed/Focus/Selected/Disabled 等控件状态。
- `.agents/skills/system-feedback/SKILL.md`：Loading、Progress、Skeleton、Empty、Success、Error、Retry、Undo 与长任务反馈。
- `.agents/skills/apple-design/SKILL.md`：Apple 视觉语言、色彩、Neutral、圆角、材质、阴影、透明与 Blur；具体视觉值仍服从 `DESIGN.md` 的 iOS 27 基线。
- `.agents/skills/interaction-motion/SKILL.md`：Motion、View Transitions、Presence、共享元素、手势与高级微交互。
- `.agents/skills/perceptual-naturalness/SKILL.md`：横向质量层；负责感知、空间、时间、因果与材质连续性。
- `.agents/skills/inclusive-accessibility/SKILL.md`：横向基线；负责 Semantic HTML、Keyboard、Focus、Screen Reader、Contrast、Zoom/Reflow、Touch、Reduced Motion。
- `.agents/skills/refined-aesthetics/SKILL.md`：高级感、完成度、克制、层级与视觉系统一致性审查。

## 设计判断顺序

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
→ apple-design / DESIGN.md iOS 27
→ interaction-motion
```

`inclusive-accessibility`、`perceptual-naturalness` 与 `refined-aesthetics` 作为横向质量约束贯穿全过程。

## 前端实现约束

- 优先复用 `@pzhown/ui` 的 **PzHown-owned iOS 27 primitives**，不要为单页重复造基础组件。
- 导航使用真实 `<a>` / Link；执行动作使用 `<button>` / 对应语义控件，不用 `div onClick` 伪装。
- 共享控件优先原生语义 HTML + React。复杂交互若确实需要第三方 primitive，必须按需、局部引入，并保持 iOS 27 anatomy；不得恢复旧 shadcn / aria-nova / Base UI 组件链。
- Astro 前台保持 Astro-first，仅在真正需要交互状态时使用 React Island。
- Payload 原生 Admin 不做全局重皮；自定义 Dashboard / 业务 UI 才使用共享设计系统。
- 组件视觉尺寸遵循 iOS 27 规格；Touch Hit Area 可以独立扩展，不为了 44px hit target 把所有视觉控件强制做成 44px。
- 不用 viewport 宽度推断输入设备；hover、fine pointer、coarse pointer、keyboard、touch 分开判断。
- Rest 状态必须先成立；Hover 只能增强确认，不能承担唯一功能。
- Focus-visible 独立清晰；Selected、Disabled、Invalid 等状态必须具有稳定优先级。
- Motion 用于解释状态、空间与因果；简单 hover/focus/color/opacity 优先 CSS。
- 使用 Container Queries、Grid/Subgrid、`clamp()`、`minmax()` 和逻辑属性实现现代布局。
- Breakpoint 由内容崩坏点产生，不机械按设备型号划分。
- 空间关系服从 `spatial-composition`：组件负责内部 inset，父布局负责 sibling gap，页面负责 section/gutter/page-edge。
- 视觉构图允许非对称，但注意力锚点、视觉重量和阅读顺序必须与内容优先级一致。
- 系统状态变化后尽量保留滚动、输入、选择与上下文；失败时提供可恢复路径。
- 色彩、Typography、Spacing、Radius、System Chrome 与 Liquid Glass 数值优先读取 `DESIGN.md`，不要在业务页面散落另一套“看起来像 iOS”的 token。
- Liquid Glass 只用于导航、浮层、控制等功能层；正文、Card、Table、长列表内容面优先使用 Grouped Surface，避免 glass-on-glass。
- Progressive Blur 只用于滚动边缘、上下文和空间过渡；不要把正文长期置于高强度 Blur 上。
- Oklab / smootherstep Gradient 用于确有连续性需求的渐变，不作为每个 Section 的默认装饰。
- Reduced Motion、Reduced Transparency、无 backdrop-filter 环境必须有可用降级。

## 完成标准

UI 任务完成前至少检查：

- 是否遵守根目录 `DESIGN.md` 的 iOS 27 token、几何和材质？
- 是否意外恢复或依赖旧 shadcn / aria-nova / Base UI 组件链？
- 内容是否比 UI 装饰更突出？
- 连续阅读是否舒适？
- 去掉 Glass、Card、边框后信息层级是否仍成立？
- 窄屏、平板、宽屏和可变窗口是否自然？
- gap / padding / gutter 是否表达真实关系？
- 用户能否理解当前位置、返回路径和主要可去位置？
- 是否存在不必要的记忆、比较、模式切换或同权重决策？
- 主要可交互项在静止状态是否已有合理 signifier？
- 用户操作后是否能理解系统正在做什么、结果是什么、失败后怎么办？
- 语义、键盘、Focus、缩放、触控、深色模式、Reduced Motion、Reduced Transparency 是否成立？
- 动画、颜色、材质和跨状态变化是否符合人的感知与因果预期？
- 是否优先复用了新共享组件，而不是制造一次性样式？
