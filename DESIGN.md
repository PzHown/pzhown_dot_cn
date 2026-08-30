---
version: "alpha"
name: "PzHown iOS 27"
description: "以 iOS 27 / iPadOS 27 Web 设计系统为唯一视觉基准、从零实现组件结构，并保留 Progressive Blur、感知渐变与可选真实折射能力。"
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
    rounded: "{rounded.pill}"
    height: 28px
    padding: 12px
  button-medium:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: 36px
    padding: 16px
  button-large:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
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

`liquid-glass-web-react`（PallavAg）是**可选光学引擎**。它负责 live-DOM displacement、chromatic aberration 与 specular edge，但不定义 Button / Toolbar / TabBar / Sheet 等标准组件的默认外观。标准组件仍严格使用 `ios27-design-system` 的 tint、blur、shadow、radius 与 geometry。

项目原有两项视觉能力继续保留，但与组件体系解耦：**Progressive Blur** 用于滚动边缘和上下文过渡；**Oklab / smootherstep Gradient** 用于感知连续的渐变。

## Source of Truth

1. **视觉**：`seunghan91/ios27-design-system`。
2. **组件结构参考**：`react-cupertino-ui`，仅 anatomy/state reference。
3. **真实折射**：`PallavAg/liquid-glass-web-react`，仅 opt-in optical lens。
4. **项目实现**：`@pzhown/ui` 自己拥有 DOM、API、状态、可访问性和最终 CSS。

任何第三方光学库都不得覆盖第 1 条。

## Colors

颜色遵循 iOS 27 系统语义，而不是页面自行挑选 Tailwind 灰度。

- 主 Tint：浅色 `#0088FF`；深色模式按系统使用 `#0A84FF`。
- Success / Switch：`#34C759`，深色模式 `#30D158`。
- Destructive：浅色 `#FF383C`，深色模式 `#FF453A`。
- Grouped Canvas：浅色 `#F2F2F7`，深色 `#000000`。
- Secondary Label 使用系统透明度，禁止用随机 `gray-500` 代替。
- Separator 只有 `0.5px` 级结构作用；能由留白、Surface 或分组表达关系时，不增加多余边框。

## Typography

排版使用 SF Pro 系统栈，并允许中文系统字体自然回退，不分发 Apple 字体文件。

- Large Title：34 / 41。
- Title 1：28 / 34；Title 2：22 / 28；Title 3：20 / 25。
- Headline 与 Body：17 / 22，Headline 使用 600。
- Subheadline：15 / 20；Footnote：13 / 18。
- 长文阅读仍服从仓库 `perceptual-reading` Skill；不能为了模仿手机系统界面，把博客正文强制套成设置页密度。

## Layout

基础节奏使用 4px 网格：`4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 64`。

- 普通 List Row：**52px**。
- Tall List Row：**68px**。
- 顶部 Toolbar / Navigation Bar：**54px**。
- Bottom Toolbar：**84px**。
- Tab Bar 控件行：**54px**；总高度：**95px**；Minimized：**88px**。
- 标准内容水平 inset：**16px**。

响应式不通过“桌面/手机 UA”判断。布局变化服从 Container / viewport 的实际空间，命中区和 hover 则服从 pointer / hover 能力。

## Materials & Depth

### Standard iOS 27 Liquid Glass

默认组件使用 `ios27-design-system` 的材料配方，不使用 displacement engine 模拟“更真实”的另一套外观。

- **Large Glass**：浅色 `rgba(250,250,250,.70)`，深色 `rgba(0,0,0,.80)`，`40px` backdrop blur；用于 Toolbar、TabBar、Navigation Chrome。
- **Medium Glass**：浅色 `rgba(245,245,245,.60)`，深色 `rgba(0,0,0,.60)`，`40px` backdrop blur；用于 Popover 等中型浮层。
- **Small Glass**：浅色 `#F7F7F7` + `0.5px #DDD`，深色 `rgba(0,0,0,.60)` + 微弱白色内边缘，`40px` blur；用于小型 Glass Button / compact control。
- **Thick Material**：系统浮层使用 `material-thick` 语义，浅色/深色按系统材质 opacity，`100px` blur；用于 Sheet、Alert/AlertDialog、Context Menu、Command Palette 与需要稳定可读性的厚浮层。

标准 iOS 27 Liquid Glass 本身允许 Small 在浅色下接近不透明。这不是 bug，也不应为了“看到折射”擅自把它改成另一套透明度。

### Optional Real Optical Lens

`LiquidGlassSurface` 使用 `liquid-glass-web-react`：

- 对**自身容器内的 live DOM**应用生成式 displacement map + SVG `feDisplacementMap`。
- 支持 `strength`、`chromaticAberration`、`depth`、`curvature`、`glow`、`edgeHighlight`、`specular` 等参数。
- 仅用于明确需要真实镜片/折射的局部交互、演示、selection lens 或特殊视觉对象。
- 不作为 Button / Toolbar / TabBar / Dialog / Sheet 的默认 backdrop 实现。
- 不把光学库的默认 shadow、radius、色彩当成 iOS 27 token。
- Safari / Firefox / Chromium 都走上游支持路径；iOS 的 SVG filter region 由上游引擎处理。
- Safari 对超大 filter source 和 `<video>` 有 WebKit 限制，避免把整个长页面包进一个 lens source。

### Accessibility

- Reduce Transparency 时关闭透明材质并回退到稳定的 Grouped / Secondary Surface。
- Reduce Motion 时关闭非必要的 spring / scale / morph。
- Glass 不能削弱内容对比度、Focus、点击命中区或可读性。

## Shapes

圆角与组件角色绑定：

- **文字 Action Button 默认是 Capsule**：所有 `filled / gray / tinted / plain / glass / destructive` Button 都使用 full pill；28 / 36 / 50px 高度分别形成 14 / 18 / 25px 的视觉半径关系，但实现统一使用 `rounded.pill`，避免尺寸变化时退化成普通 rounded-rect。
- **IconButton 是正圆**：28×28 / 36×36 / 50×50，不使用“圆角方块”替代。
- Toggle、SegmentedControl 这类按钮型选择控件使用 pill 外形；selected indicator 也保持胶囊语义。
- Text Field：10px；字段属于输入 Surface，不因为 Action Button 胶囊化而强制改成 pill。
- Overlay：14px。
- Bottom Sheet 顶部：34px。
- Switch / Slider Thumb / Badge：full pill / circle。

嵌套圆角优先保持同心关系。**Action 使用 Capsule，Content Surface 使用连续圆角容器**，不要把两者混成同一种 12px 圆角矩形。

## Components

组件源码必须自己拥有 anatomy 与状态，不再依赖跨组件修补 CSS。

- **Button**：视觉高度 28 / 36 / 50px，默认全部是 Capsule；`variant` 只改变颜色/材质层级，不改变胶囊几何。`variant="glass"` 使用标准 Small iOS 27 Liquid Glass，不默认启用 PallavAg displacement。
- **IconButton**：28 / 36 / 50px 正圆，Lucide 图标居中，必须有可访问名称。
- **TextField / SearchBar**：36px 基础字段几何，Focus 使用系统 Blue ring；普通输入面不启用 displacement。
- **Switch**：51×31px，开启使用系统 Green。
- **Checkbox / Radio / Slider / SegmentedControl**：原生表单语义优先，状态视觉按系统 Tint；SegmentedControl 的可点击项使用 capsule indicator。
- **ListSection / ListRow**：52px 常规行，0.5px inset separator；内容列表保持 Grouped Surface。
- **Toolbar / TabBar**：标准 Large iOS 27 Liquid Glass。TabBar selected item 可形成局部 indicator，但不叠加第二套大面积 glass。
- **Dialog / Sheet**：高可读性浮层；Sheet/确认类浮层优先 Thick Material，保留 Portal、Escape、遮罩和 focus restore。
- **Popover**：Medium Liquid Glass。
- **ContextMenu / DropdownMenu**：Thick Material；菜单内容可读性优先于“看见背景”。
- **Tooltip**：Small Liquid Glass；不得承载完成任务必需的信息。
- **Toast**：Thick Material；反馈层不能因为过度透明降低可读性。
- **AlertDialog**：高风险确认使用 Thick Material；低风险可逆操作优先执行 + Undo。
- **Tabs / Breadcrumb / Sidebar**：System Surface / Regular Material，不启用 displacement。
- **CommandPalette**：Thick Material；搜索、Arrow Keys、Enter 与 Escape 必须可用。
- **FormField / Combobox / DatePicker / DateRangePicker**：原生语义和字段关联优先；Combobox 列表使用稳定 Material，不在频繁输入时启用 displacement。
- **DataTable / Pagination / EmptyState**：Grouped Surface，不做 glass-on-glass。
- **LiquidGlassSurface**：唯一公开的真实折射低层 primitive；只在显式需要 optical lens 时使用。
- **Progressive Blur / Gradient**：Effects，不是普通组件皮肤，也不参与 PallavAg displacement。

新业务只从 `@pzhown/ui/react` 使用新核心组件。缺少组件时按本 DESIGN.md 和仓库 Skills 新建，不从旧目录恢复。

## Do's and Don'ts

- Do：以 `ios27-design-system` token、materials 和组件规格为视觉事实来源。
- Do：把 PallavAg 当**可选光学引擎**，而不是 iOS 27 视觉主题。
- Do：标准 Action Button 默认使用 capsule，IconButton 使用 circle；不要再回到 10/12/14px 的通用 Web 圆角矩形。
- Do：标准组件先匹配 iOS 27 tint / blur / shadow / radius，再讨论是否额外需要真实 lens。
- Do：可以研究 `react-cupertino-ui` 的结构，但必须映射回本项目自己的语义、状态与样式。
- Do：优先系统语义色、Grouped Surface、清晰 spacing 和状态反馈。
- Do：为 keyboard、pointer、touch、Reduced Motion、Reduced Transparency 提供完整路径。
- Don't：为了“真实折射”修改 iOS 27 官方参考中的 Small/Medium/Large tint 值。
- Don't：把 `LiquidGlassSurface` 绝对定位到每个 Button/Toolbar 背后冒充 backdrop；PallavAg lens 的 source 必须是它自身容器内的 live DOM。
- Don't：恢复旧 `components.css / ios-theme.css / form-controls.css / liquid-glass*.css` 覆盖链。
- Don't：把每个 Card、正文容器、表单组都做成玻璃。
- Don't：用 viewport 宽度推断鼠标或触控能力。
- Don't：把 Progressive Blur 或 Gradient 当成 iOS 27 本身的强制装饰。