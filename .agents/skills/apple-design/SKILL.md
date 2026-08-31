---
name: apple-design
description: 为 pzhown_dot_cn 提供 Apple / iOS 27 Web 视觉语言规范。用于系统色、Neutral、材质、层级、圆角、阴影、透明度、Liquid Glass、视觉组件外观、品牌气质和视觉审查；也用于在信息架构、阅读、布局、空间构图与交互可供性确定后统一 @pzhown/ui 的最终视觉表达。具体 iOS 27 数值以根目录 DESIGN.md 为准。此 Skill 不负责具体 gap/padding、视觉重心、正文行长、跨设备结构、Link/Button 语义或复杂动效逻辑；相关任务应优先使用对应 Skills，inclusive-accessibility 横向约束全部视觉输出。
---

# Apple / iOS 27 视觉语言

本项目当前不是泛化的“Apple-inspired”主题，而是有明确版本基准的 **iOS 27 Web Design System**。视觉实现必须先读取根目录 `DESIGN.md`，再用 `seunghan91/ios27-design-system` 核对系统色、Typography、组件几何、Liquid Glass 与 Motion。

`react-cupertino-ui` 只能用于研究组件 anatomy 和状态组织，不能成为第二套视觉主题。

`PallavAg/liquid-glass-web-react` 只能作为**显式真实折射镜片**使用。它不能决定标准 Button / Toolbar / TabBar / Sheet / Menu 的默认材质；这些组件必须先忠实匹配 `ios27-design-system` 的 tint、blur、shadow、radius 与 geometry。

## 使用前提

先确认更高优先级问题已经处理：

- 阅读舒适与正文排版：`perceptual-reading`。
- 内容语义与文章结构：`content-presentation`。
- 跨设备空间结构：`adaptive-layout`。
- gap、padding、gutter、negative space、视觉重量、重心和 attention flow：`spatial-composition`。
- Link、Button、Icon Button、Clickable Surface 与局部状态：`interaction-affordance`。
- 全局导航与当前位置：`navigation-wayfinding`。
- Loading、Success、Error、恢复：`system-feedback`。
- 可访问性：`inclusive-accessibility`。
- 高级感与完成度：`refined-aesthetics`。
- 动画与空间连续性：`interaction-motion`。

视觉语言不得反向破坏这些决定。

## 工作流程

1. **先读 `DESIGN.md`**，确认当前 iOS 27 token、System Chrome、Radius、Material 和组件尺寸。
2. 检查现有 `@pzhown/ui`；已有 primitive 必须优先复用。
3. 页面/视觉重构读取 `references/visual-language.md`。
4. 组件外观与 anatomy 读取 `references/components.md`。
5. Web/CSS 实现读取 `references/web-implementation.md`。
6. 如果 iOS27 上游参考与旧仓库 CSS/旧组件冲突，以上游 + `DESIGN.md` 为准，不恢复旧兼容层。
7. 若需求明确要求真实折射：局部 lens 使用 `LiquidGlassSurface`；Dialog / Sheet 这类 Portal 浮层优先使用 `LiquidGlassViewport` 的 **viewport-sized source + sibling portal layer**。不得把 PallavAg lens 当普通 backdrop 塞进任意长页面 DOM。
8. 完成后做 Grayscale、Light/Dark、Reduced Transparency、Reduced Motion 与输入能力审查。

## 视觉不变量

- **项目级精确基准优先**：当 `DESIGN.md` 已定义 iOS 27 数值时，不再用模糊的“Apple-like”感觉替代明确 token。
- 让排版、留白、颜色层级和空间关系先成立，避免每个区块一圈边框或一层玻璃。
- 先用 Label / Fill / Grouped Surface / Separator 建立系统层级，再使用 Tint 表达动作和状态。
- 业务组件使用 `DESIGN.md` / `styles/tokens.css` 的语义 token，不直接把 `gray-500`、`zinc-700` 等物理色阶当组件语义。
- 圆角与组件角色绑定；Field、Control、Overlay、Sheet、Pill 不混为同一大圆角。
- 自定义非系统色优先 OKLCH/Oklab，并同时验证浅色、深色和高对比环境。
- 渐变使用 Oklab/Oklch；需要柔和起止时使用 smootherstep，但 Gradient 属于独立 Effects，不是 iOS 27 组件默认装饰。
- Liquid Glass 用于 System Chrome、浮层与必要控制层；Card、文章、Table、长列表内容面优先 Grouped Surface。
- **Standard Liquid Glass != Optical Lens**：Large / Medium / Small 默认按 iOS 27 原始 tint + backdrop blur + shadow 实现；PallavAg displacement 是 opt-in 特效。
- External PallavAg displacement 必须按**固定 CSS 像素强度**归一化，不能直接让 `strength` 随 filtered source 对角线放大；否则长页面会把 Dialog / Sheet 的折射横向拉跑。
- Dialog / Sheet 的 external source 与 portal layer 必须共享同一 viewport coordinate root，但 portal layer 必须是 source 的 sibling，不能成为 filtered source 的后代。
- Small Glass 在浅色下允许接近不透明；不要为了“看见折射”擅改为另一套透明度。
- Sheet / Alert / Context Menu 等高可读性浮层优先保证可读性，不以 optical 强度压过内容。
- 禁止无意义 glass-on-glass。
- Progressive Blur 不进入长文核心背景，也不替代 Liquid Glass；只用于边缘、上下文和空间过渡。
- 阴影用于高度和分离，不作为所有组件默认装饰。
- 高级视觉效果必须可降级，不能影响语义和操作。

## 组件视觉

- Button、TextField、Textarea、Select、SegmentedControl、Switch、List、Toolbar、TabBar、Dialog、Sheet、Popover、ContextMenu、Tooltip、DropdownMenu、Toast、AlertDialog、Tabs、Breadcrumb、Sidebar、CommandPalette、FormField、Combobox、DatePicker、DataTable、Pagination、EmptyState 等优先扩展 `@pzhown/ui`。
- 新组件从原生语义 HTML + React 状态开始；复杂行为确实需要第三方 primitive 时才局部引入，不恢复旧 shadcn / aria-nova / Base UI 体系。
- 交互语义和状态由组件自身/必要的行为 primitive 决定；`interaction-affordance` 决定可发现性；本 Skill 负责最终 iOS 27 视觉。
- 使用 surface、position、indicator、opacity、motion 等状态差异，不粗暴用重边框表达所有 hovered / pressed / selected。
- Focus 必须清楚可见，不能为了“像原生截图”隐藏键盘导航状态。
- 小视觉控件可以通过不可见 hit area 扩展触控命中区，不要求视觉高度统一 44px。
- `LiquidGlassSurface` 只用于显式 local lens / selection / 特殊 optical object，其 source 是自身容器内 live DOM。
- `LiquidGlassViewport` 是 Dialog / Sheet external refraction 的标准容器：source layer 固定为 viewport box 并负责滚动，portal layer 与它同尺寸且为 sibling；不要用超长 `document.body` 或任意内容 grid 直接充当这类浮层的 source。

## 视觉审查

- 是否先看到内容，而不是 Glass/Gradient/Shadow？
- 是否严格使用 `DESIGN.md` 当前 iOS 27 系统色、几何和材质？
- 是否出现另一套自造 token 或“泛 glassmorphism”？
- 是否误把 PallavAg 的默认 lens 参数当成 iOS 27 官方材质？
- Dialog / Sheet 的 source 与 portal 是否同坐标根？是否出现 source 尺寸越大、折射位移越强的错误？
- 去掉边框和 Glass 后层级是否仍清楚？
- **Grayscale Test**：转灰度后标题、正文、导航、主要操作和状态是否仍清楚？
- 辅助文字是否因为“做灰”而低于可读对比度？
- radius、spacing、surface、Typography 和颜色是否来自统一体系？
- Liquid Glass 是否真的解释前后关系，还是只是装饰？
- 深色模式是否重新校准亮度、透明度和边缘，而不是简单反色？
- 是否意外恢复默认 shadcn / Base UI 视觉或 DOM 语法？
- Reduced Transparency 后是否仍有清楚层级？

## 输出要求

做视觉方案时优先说明：

1. 当前视觉层级问题。
2. `DESIGN.md` / iOS 27 对应的具体 token 与组件规格。
3. 需要保留和删除的材质/装饰。
4. 与阅读、布局、空间构图、交互可供性、可访问性和动效 Skills 的边界。
