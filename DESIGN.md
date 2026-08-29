---
version: "alpha"
name: "PzHown iOS 27"
description: "以 iOS 27 / iPadOS 27 Web 设计系统为唯一视觉基准、从零实现组件结构，并保留 Progressive Blur 与感知渐变能力。"
colors:
  primary: "#0088FF"
  destructive: "#FF383C"
  success: "#34C759"
  warning: "#FF8D28"
  canvas-light: "#F2F2F7"
  canvas-dark: "#000000"
  surface-light: "#FFFFFF"
  surface-dark: "#1C1C1E"
  label-light: "#000000"
  label-dark: "#FFFFFF"
  label-secondary-light: "rgba(60, 60, 67, 0.60)"
  label-secondary-dark: "rgba(235, 235, 245, 0.60)"
  separator-light: "rgba(0, 0, 0, 0.12)"
  separator-dark: "rgba(84, 84, 88, 0.65)"
  glass-large-light: "rgba(250, 250, 250, 0.70)"
  glass-large-dark: "rgba(0, 0, 0, 0.80)"
  glass-medium-light: "rgba(245, 245, 245, 0.60)"
  glass-medium-dark: "rgba(0, 0, 0, 0.60)"
  glass-small-light: "#F7F7F7"
  glass-small-dark: "rgba(0, 0, 0, 0.60)"
typography:
  large-title:
    fontFamily: "SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 34px
    fontWeight: 400
    lineHeight: 41px
    letterSpacing: 0.4px
  title-1:
    fontFamily: "SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 34px
    letterSpacing: 0.38px
  title-2:
    fontFamily: "SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: -0.26px
  title-3:
    fontFamily: "SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 25px
    letterSpacing: -0.45px
  headline:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: -0.43px
  body:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: -0.43px
  subheadline:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: -0.23px
  footnote:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: -0.08px
rounded:
  small: 8px
  field: 10px
  control: 12px
  overlay: 14px
  glass-large: 14px
  sheet: 34px
  pill: 9999px
spacing:
  s1: 4px
  s2: 8px
  s3: 12px
  s4: 16px
  s5: 20px
  s6: 24px
  s7: 28px
  s8: 32px
  s10: 40px
  s12: 48px
  s16: 64px
  content-inset: 16px
components:
  button-small:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.subheadline}"
    rounded: 10px
    height: 28px
    padding: 12px
  button-medium:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: 36px
    padding: 16px
  button-large:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.body}"
    rounded: "{rounded.overlay}"
    height: 50px
    padding: 20px
  text-field:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.label-light}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    height: 36px
    padding: 12px
  list-row:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.label-light}"
    typography: "{typography.body}"
    height: 52px
    padding: 16px
  toolbar:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-light}"
    height: 54px
    padding: 16px
  tab-bar:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-secondary-light}"
    height: 95px
    padding: 12px
  dialog:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-light}"
    rounded: "{rounded.overlay}"
    padding: 20px
  sheet:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-light}"
    rounded: "{rounded.sheet}"
    padding: 20px
  popover:
    backgroundColor: "{colors.glass-medium-light}"
    textColor: "{colors.label-light}"
    rounded: "{rounded.overlay}"
    padding: 12px
  switch:
    backgroundColor: "rgba(120, 120, 128, 0.20)"
    rounded: "{rounded.pill}"
    width: 51px
    height: 31px
  switch-selected:
    backgroundColor: "{colors.success}"
    rounded: "{rounded.pill}"
    width: 51px
    height: 31px
---

## Overview

PzHown 的 UI 从零重建为 **iOS 27 Web Design System**。视觉唯一基准是 `seunghan91/ios27-design-system`；`react-cupertino-ui` 仅用于研究组件 anatomy、状态归属和组合方式，不作为第二套视觉来源。

旧 shadcn、aria-nova、Base UI 组件实现和用于修补它们的主题覆盖层全部退役。新组件必须从自身 DOM、状态和 CSS 开始符合 iOS 27，而不是先生成通用 Web 组件，再靠全局 CSS 把它“改得像 iOS”。

`@samasante/liquid-glass` 作为**纯光学引擎**接入：它只负责 SDF displacement、折射、色散、边缘高光和 frost，不定义组件几何、颜色语义、交互状态或信息架构。所有产品组件仍由 `@pzhown/ui` 自己拥有 API 与 DOM。

项目原有两项视觉能力继续保留，但与组件体系解耦：**Progressive Blur** 用于滚动边缘和上下文过渡；**Oklab / smootherstep Gradient** 用于感知连续的渐变。

## Colors

颜色遵循 iOS 27 系统语义，而不是页面自行挑选 Tailwind 灰度。

- 主 Tint：浅色 `#0088FF`；深色模式按系统使用 `#0A84FF`。
- Success / Switch：`#34C759`，深色模式 `#30D158`。
- Destructive：浅色 `#FF383C`，深色模式 `#FF453A`。
- Grouped Canvas：浅色 `#F2F2F7`，深色 `#000000`。
- Secondary Label 使用系统透明度，禁止用随机 `gray-500` 代替。
- Separator 只有 `0.5px` 级结构作用；能由留白、Surface 或分组表达关系时，不增加多余边框。

Liquid Glass 分为 Large / Medium / Small。Large 用于系统 Chrome 和主要浮层；Medium 用于 Popover / Context Menu；Small 用于紧凑浮动控制。正文内容面默认保持 Grouped Surface，不做 glass-on-glass。

## Typography

排版使用 SF Pro 系统栈，并允许中文系统字体自然回退，不分发 Apple 字体文件。

- Large Title：34 / 41。
- Title 1：28 / 34；Title 2：22 / 28；Title 3：20 / 25。
- Headline 与 Body：17 / 22，Headline 使用 600。
- Subheadline：15 / 20；Footnote：13 / 18。
- 长文阅读仍服从仓库 `perceptual-reading` Skill；不能为了模仿手机系统界面，把博客正文强制套成设置页密度。

## Layout

基础节奏使用 4px 网格：`4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 64`。

iOS 27 相比 iOS 26 提高了系统 Chrome 尺寸，项目以新值为准：

- 普通 List Row：**52px**。
- Tall List Row：**68px**。
- 顶部 Toolbar / Navigation Bar：**54px**。
- Bottom Toolbar：**84px**。
- Tab Bar 控件行：**54px**；含玻璃托盘与安全区的总高度：**95px**；Minimized：**88px**。
- 标准内容水平 inset：**16px**。

响应式不通过“桌面/手机 UA”判断。布局变化服从 Container / viewport 的实际空间，命中区和 hover 则服从 pointer / hover 能力。

## Elevation & Depth

Liquid Glass 是内容上方的功能层，而不是背景装饰。

- Large Glass：`rgba(250,250,250,.70)` 作为 tint 语义；深色为 `rgba(0,0,0,.80)`。
- Medium Glass：浅色 `.60`，深色 `.60`。
- Small Glass：浅色 `#F7F7F7` + `0.5px #DDD`；深色为 `rgba(0,0,0,.60)` + 微弱白色内边缘。
- 真实光学层统一通过 `LiquidGlassSurface` / `LiquidGlassBackdrop` 调用 `@samasante/liquid-glass`，禁止组件自己重新实现一套 `feDisplacementMap` 或 WebGL shader。
- Chrome / Edge 的通用浮层允许直接折射 live DOM；Safari / Firefox 的通用浮层保持 frost / tint / edge-light。若某个已知背景必须跨浏览器出现位移折射，使用显式 `refract={backgroundCopy}` 模式。
- Reduce Transparency 时关闭光学层并降级到不透明 Grouped Surface；不能为了“真玻璃”违背系统可访问性设置。
- Card、文章、表格、长列表内容区域优先靠 Surface 和 spacing 建层级，不用重阴影，也不启用 displacement。

## Shapes

圆角必须与组件角色绑定：

- Small glass / compact：8px。
- Text Field：10px。
- 常规 Button：12px。
- Overlay：14px。
- Bottom Sheet 顶部：34px。
- Switch / Slider Thumb / Badge：full pill。

嵌套圆角优先保持同心关系，不机械把所有对象做成同一“大圆角卡片”。

## Components

组件源码必须自己拥有 anatomy 与状态，不再依赖跨组件修补 CSS。

- **Button**：视觉高度 28 / 36 / 50px；触控命中区可独立扩展，不能为了 44px hit target 破坏 iOS 27 的视觉尺寸。只有 `variant="glass"` 启用 Small Optical Glass。
- **TextField / SearchBar**：36px 基础字段几何，Focus 使用系统 Blue ring；错误状态优先于普通 Focus 色；普通输入面不启用 displacement。
- **Switch**：51×31px，开启使用系统 Green。
- **Checkbox / Radio / Slider / SegmentedControl**：原生表单语义优先，状态视觉按系统 Tint。
- **ListSection / ListRow**：52px 常规行，0.5px inset separator；内容列表保持 Grouped Surface。
- **Toolbar / TabBar**：Large Optical Liquid Glass；TabBar selected item 可以形成局部玻璃 indicator，但禁止叠加第二层大面积玻璃。
- **Dialog / Sheet**：Large Optical Liquid Glass；各自拥有 Portal、Escape、遮罩/外部点击行为。
- **Popover / ContextMenu**：Medium Optical Liquid Glass；不再套旧 Base UI DOM。
- **Tooltip / DropdownMenu / Toast**：只承担补充说明、上下文命令与操作结果反馈；Tooltip 使用 Small Optical Glass，DropdownMenu / Toast 使用 Medium Optical Glass。Tooltip 不承载完成任务必需的信息。
- **AlertDialog**：用于不可逆或高风险确认，使用 Large Optical Glass；低风险可逆操作优先直接执行并提供 Undo，而不是滥用确认框。
- **Tabs / Breadcrumb / Sidebar**：属于导航与定向层，默认依靠 System Surface、当前位置和 selected/current state，不启用 displacement。Sidebar 使用 Regular Material，不做强折射。
- **CommandPalette**：属于全局快捷导航/命令浮层，使用 Large Optical Glass；搜索、Arrow Keys、Enter 与 Escape 必须可用。
- **FormField / Combobox / DatePicker / DateRangePicker**：原生语义和表单关联优先。Combobox 选项层允许使用稳定 Medium Material，但不为了视觉效果在频繁输入过程中强制启用高成本 displacement。
- **DataTable / Pagination / EmptyState**：属于数据与 View State 层，使用 Grouped Surface。DataTable API 保持可承接 TanStack Table 产出的行/列状态，但基础组件本身不绑定第二套视觉或行为系统。
- **LiquidGlassSurface**：是公开的低层材质 primitive，只有需要自定义浮动镜片或已知背景 `refract` 时直接使用；普通业务组件优先用上面的高层组件。
- **Progressive Blur / Gradient**：属于 Effects，不是普通组件皮肤，也不参与 displacement。

新业务只从 `@pzhown/ui/react` 使用新核心组件。缺少组件时按本 DESIGN.md 和仓库 Skills 新建，不从旧目录恢复。

## Do's and Don'ts

- Do：以 `ios27-design-system` token 和组件规格为视觉事实来源。
- Do：只把 `@samasante/liquid-glass` 当光学引擎，不允许它反过来决定 Button / Sheet / Toolbar 的 iOS 27 几何。
- Do：可以研究 `react-cupertino-ui` 的结构，但必须映射回本项目自己的语义、状态与样式。
- Do：优先系统语义色、Grouped Surface、清晰 spacing 和状态反馈。
- Do：为 keyboard、pointer、touch、Reduced Motion、Reduced Transparency 提供完整路径。
- Don't：恢复旧 `components.css / ios-theme.css / form-controls.css / liquid-glass*.css` 覆盖链。
- Don't：用单纯 `backdrop-filter: blur()` 冒充已经启用的 Optical Liquid Glass；需要玻璃折射的核心浮层必须走统一材质 primitive。
- Don't：为了兼容旧 import 而保留旧组件壳；业务代码应迁移到新 API。
- Don't：把每个 Card、正文容器、表单组都做成玻璃。
- Don't：用 viewport 宽度推断鼠标或触控能力。
- Don't：把 Progressive Blur 或 Gradient 当成 iOS 27 本身的强制装饰。
