---
version: "alpha"
name: "PzHown iOS 26 Liquid Glass"
description: "以 iOS 26 Liquid Glass 为视觉基准、以内容优先和跨输入密度为约束的 PzHown Web 设计系统。"
colors:
  canvas-light: "#F2F2F7"
  canvas-dark: "#000000"
  surface-primary-light: "#FFFFFF"
  surface-primary-dark: "#1C1C1E"
  surface-secondary-light: "#F2F2F7"
  surface-secondary-dark: "#2C2C2E"
  surface-tertiary-light: "#FFFFFF"
  surface-tertiary-dark: "#3A3A3C"
  label-primary-light: "#000000"
  label-primary-dark: "#FFFFFF"
  label-secondary-light: "rgb(60 60 67 / 0.60)"
  label-secondary-dark: "rgb(235 235 245 / 0.70)"
  label-tertiary-light: "rgb(60 60 67 / 0.30)"
  label-tertiary-dark: "rgb(235 235 245 / 0.30)"
  separator-light: "rgb(0 0 0 / 0.12)"
  separator-dark: "rgb(255 255 255 / 0.17)"
  blue-light: "#0088FF"
  blue-dark: "#0091FF"
  green-light: "#34C759"
  green-dark: "#30D158"
  red-light: "#FF383C"
  red-dark: "#FF4245"
  orange-light: "#FF8D28"
  orange-dark: "#FF9230"
  pink-light: "#FF2D55"
  pink-dark: "#FF375F"
  purple-light: "#CB30E0"
  purple-dark: "#DB34F2"
  glass-small-light: "rgb(247 247 247 / 0.86)"
  glass-small-dark: "rgb(0 0 0 / 0.60)"
  glass-medium-light: "rgb(245 245 245 / 0.60)"
  glass-medium-dark: "rgb(0 0 0 / 0.60)"
  glass-large-light: "rgb(250 250 250 / 0.70)"
  glass-large-dark: "rgb(0 0 0 / 0.80)"
  glass-clear-light: "rgb(255 255 255 / 0.07)"
  glass-clear-dark: "rgb(0 0 0 / 0.18)"
  fill-primary-light: "rgb(120 120 120 / 0.20)"
  fill-primary-dark: "rgb(120 120 128 / 0.36)"
  fill-secondary-light: "rgb(120 120 128 / 0.16)"
  fill-secondary-dark: "rgb(120 120 128 / 0.32)"
  fill-tertiary-light: "rgb(118 118 128 / 0.12)"
  fill-tertiary-dark: "rgb(118 118 128 / 0.24)"
typography:
  large-title:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 34px
    fontWeight: 400
    lineHeight: 41px
    letterSpacing: 0.4px
  title-1:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 34px
    letterSpacing: 0.38px
  title-2:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: -0.26px
  title-3:
    fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
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
  callout:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: -0.31px
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
  caption-1:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
  caption-2:
    fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 13px
    letterSpacing: 0.06px
rounded:
  none: 0px
  xs: 4px
  sm: 8px
  field: 10px
  button: 12px
  overlay: 14px
  xl: 16px
  notification: 20px
  glass-large: 24px
  sheet: 34px
  pill: 9999px
spacing:
  s0: 0px
  s1: 4px
  s2: 8px
  s3: 12px
  s4: 16px
  s5: 20px
  s6: 24px
  s8: 32px
  s10: 40px
  s12: 48px
  s16: 64px
  s20: 80px
  s24: 96px
components:
  button-regular:
    backgroundColor: "{colors.blue-light}"
    textColor: "#FFFFFF"
    typography: "{typography.headline}"
    rounded: "{rounded.button}"
    height: 44px
    padding: 20px
  button-small:
    backgroundColor: "{colors.blue-light}"
    textColor: "#FFFFFF"
    typography: "{typography.subheadline}"
    rounded: "10px"
    height: 34px
    padding: 12px
  button-mini:
    backgroundColor: "{colors.blue-light}"
    textColor: "#FFFFFF"
    typography: "{typography.footnote}"
    rounded: "{rounded.sm}"
    height: 28px
    padding: 8px
  button-secondary-glass:
    backgroundColor: "{colors.glass-small-light}"
    textColor: "{colors.label-primary-light}"
    typography: "{typography.headline}"
    rounded: "{rounded.button}"
    height: 44px
    padding: 20px
  text-field:
    backgroundColor: "{colors.fill-tertiary-light}"
    textColor: "{colors.label-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    height: 44px
    padding: 12px
  segmented-control:
    backgroundColor: "{colors.fill-secondary-light}"
    textColor: "{colors.label-primary-light}"
    typography: "{typography.footnote}"
    rounded: "9px"
    height: 32px
    padding: 2px
  switch:
    backgroundColor: "{colors.fill-tertiary-light}"
    rounded: "{rounded.pill}"
    width: 51px
    height: 31px
  switch-selected:
    backgroundColor: "{colors.green-light}"
    rounded: "{rounded.pill}"
    width: 51px
    height: 31px
  menu-glass:
    backgroundColor: "{colors.glass-medium-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.overlay}"
  popover-glass:
    backgroundColor: "{colors.glass-medium-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.overlay}"
  dialog-glass:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.overlay}"
  alert-dialog:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.overlay}"
    width: 270px
    padding: 20px
  sheet:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.sheet}"
  tooltip-glass:
    backgroundColor: "{colors.glass-small-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.field}"
  card:
    backgroundColor: "{colors.surface-primary-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.button}"
  list-row:
    backgroundColor: "{colors.surface-primary-light}"
    textColor: "{colors.label-primary-light}"
    height: 44px
    padding: 16px
  sidebar-glass:
    backgroundColor: "{colors.glass-large-light}"
    textColor: "{colors.label-primary-light}"
    rounded: "{rounded.overlay}"
  progress-linear:
    backgroundColor: "{colors.fill-secondary-light}"
    rounded: "{rounded.pill}"
    height: 4px
  slider-thumb:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    width: 28px
    height: 28px
---

## Overview

PzHown 的主视觉语言采用 **iOS 26 Liquid Glass**：清晰的系统语义色、受控的圆角尺度、轻量的弹性反馈，以及位于内容上方的半透明玻璃导航/控制层。

这不是把整个页面做成毛玻璃。设计优先级仍然是：**内容与语义 → 阅读舒适 → 跨设备结构 → 空间关系 → 交互状态 → 材质与动效**。玻璃只能增强层级和上下文，不能替代层级本身。

视觉实现参考 `seunghan91/ios26-design-system`，该项目将 Apple iOS & iPadOS 26 Figma Community Kit 的设计令牌和组件规格转为 Web 可用数据。Apple 没有公开 Liquid Glass 的完整 Web 数值模型，因此 blur、tint、shadow 属于参考项目给出的 Web 近似；本项目以这些数值为统一基线，不再由页面自行发明材质参数。

## Colors

颜色使用 iOS 26 语义体系，而不是页面级任意灰度。

- 浅色画布使用 `#F2F2F7`，主要 Grouped Surface 使用 `#FFFFFF`。
- 深色画布使用 `#000000`，主要 Surface 使用 `#1C1C1E / #2C2C2E / #3A3A3C` 建立层级。
- 主交互 Tint 为浅色 `#0088FF`、深色 `#0091FF`。
- Switch 独立使用系统绿色：浅色 `#34C759`、深色 `#30D158`。
- 危险状态使用系统红，警告使用系统橙；不得把品牌蓝用作错误或警告语义。
- Secondary / Tertiary Label 必须保持语义透明度，不用随机 `gray-500` 替代。
- Separator 是低权重结构线；能通过留白和 Surface 区分层级时，不增加额外边框。

Liquid Glass 分三档：

- **Small / 7px frost**：次级按钮、圆形图标按钮、Tooltip、小型浮控件。
- **Medium / 12px frost**：Menu、Popover、Select、Combobox、Context Menu。
- **Large / 14px frost**：Dialog、Sheet、Drawer、Sidebar 等主要浮动层。

深色模式不能机械反色；必须使用独立的玻璃 tint、边缘高光和阴影强度。

## Typography

字体优先使用 SF Pro 系统栈：`SF Pro Text / SF Pro Display / -apple-system / system-ui`。

- 20px 以下优先 Text 观感，20px 及以上优先 Display 观感。
- Large Title 34/41，Title 1 28/34，Title 2 22/28，Title 3 20/25。
- Headline 与 Body 均以 17/22 为核心，Headline 使用 600 权重。
- 中文环境不强制依赖 SF Pro 字体文件；由系统中文字体回退，但保持相同字号、行高和视觉层级。
- 正文宽度、长文行长与段落节奏继续服从 `perceptual-reading`，不能为了“像 iOS”把博客正文全部放大到 17px 或限制成手机式布局。
- 禁止用大量粗体、全大写或低对比灰字制造“高级感”。层级主要依赖字号、字重、留白和位置共同建立。

## Layout

基础 spacing 继承 iOS 26 的 8pt 体系，并允许 4pt 半步：`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96`。

- 手机内容边距默认 16px；宽容器可增加，但不能机械放大正文宽度。
- List Row 标准高度 44px；紧凑场景可以 36px，大型信息行可以 58px。
- Text Field 标准高度 44px。
- Touch 环境独立交互目标保持约 44×44px。
- Fine pointer 桌面按钮采用 iOS 26 Small 档 34px，避免桌面控件显得过大；触控端 Regular 档保持 44px。
- `adaptive-layout` 决定不同容器下组件放在哪里；本文件只规定视觉尺寸和关系基线。
- 父容器负责 sibling gap，组件只负责自己的 inset。禁止基础组件携带上下文外 margin。

## Elevation & Depth

Liquid Glass 的深度由 **背景透明度 + backdrop blur + 边缘高光 + 阴影 + 上下文** 联合表达。

参考参数：

- Small frost radius：7px。
- Medium frost radius：12px。
- Large frost radius：14px。
- Layer shadow blur 参考 40px；大型背景材质可到 80px。
- 玻璃高光方向保持左上到右下的统一光照关系，不允许同一页面不同组件出现相反高光方向。

材质职责：

- Button primary / destructive 采用高对比实色，不强制玻璃化。
- Secondary / Outline / Icon controls 可以使用 Small Glass。
- Menu / Popover / Select / Combobox 使用 Medium Glass。
- Dialog / Sheet / Drawer / Sidebar 使用 Large Glass。
- Card、文章正文、表格主体等内容 Surface 默认保持 Grouped Surface，不进行 glass-on-glass 堆叠。

任何 `backdrop-filter` 不可用、`prefers-reduced-transparency: reduce` 或高对比环境下，必须自然降级为不透明 Surface，语义和操作不受影响。

## Shapes

圆角不是统一“大圆角”，而是按组件语义分级：

- 4px：微型几何和局部装饰。
- 8px：Mini 控件。
- 10px：Text Field、Small Button、Tooltip。
- 12px：Regular Button、Card、普通 Surface。
- 14px：Alert、Menu、Popover、Dialog。
- 20px：Notification、Medium Liquid Glass。
- 24px：Large Liquid Glass。
- 34px：iPhone Bottom Sheet 顶部。
- Pill：Switch、Icon Glass Button、部分 Liquid Glass 浮动控件。

嵌套圆角优先保持同心关系：内层 radius ≈ 外层 radius − padding。不要给所有容器统一套 24px/30px 大圆角。

## Components

`@pzhown/ui` 是唯一共享视觉入口。所有现有组件必须使用语义 token 和统一材质层，不允许业务页面自行复制一份 iOS CSS。

关键组件规范：

- **Button**：Mini 28、Small 34、Regular 44、Large 50。Primary 为系统蓝实色；Secondary/Outline 可为 Small Glass；Icon Button 为圆形 Liquid Glass。
- **Input / Textarea / Select / Combobox**：44px 单行基线，10px radius，12px 水平 inset。Focus 使用系统蓝且不得被玻璃材质覆盖。
- **Tabs / Toggle Group**：Segmented Control 32px 高，2px track inset，选中项使用浅色实体层和轻阴影。
- **Switch**：51×31，Thumb 27px，On 使用系统绿。
- **Slider**：Track 4px，Thumb 28px。
- **Menu / Context Menu**：14px radius，行高约 44px，Medium Glass；组间 separator 保持低权重。
- **Alert Dialog**：270px 参考宽度，14px radius，Large Glass；动作按钮保持 44px 触控高度。
- **Sheet / Drawer**：底部 Sheet 顶部 radius 34px；Large Glass；遮罩使用独立 scrim，不通过加深玻璃自身解决背景干扰。
- **Popover**：14px radius，Medium Glass；定位和箭头语义由具体组件负责。
- **Tooltip**：Small Glass，10px radius；不得成为承载长文的容器。
- **Sidebar**：允许 Large Glass，因为它属于持续导航层；正文内容不得叠加第二层 glass。
- **Card / Attachment / Table / Message**：按 Grouped Surface 处理；它们仍属于 iOS 26 体系，但不是 Liquid Glass 导航层。
- **Progress / Skeleton / Calendar / Chart**：采用系统 Tint、Fill 和 Separator，不为展示“玻璃感”加入无意义 blur。

状态优先级统一为：`default < hover < focus-visible < invalid/selected < disabled`。Hover 不是触屏必需状态；Focus 必须独立可见。

## Do's and Don'ts

### Do

- 先用结构、排版、留白建立层级，再使用玻璃。
- 让玻璃说明“这是浮在内容上方的导航或控制层”。
- 保持单一光照方向、单一 blur 档位体系和统一阴影逻辑。
- 浅色、深色分别校准 tint 和对比，不机械反色。
- 支持 `prefers-reduced-motion`、`prefers-reduced-transparency`、`prefers-contrast`。
- 使用 `interaction-affordance` 处理 Rest/Hover/Focus/Pressed/Selected/Disabled。
- 使用 `spatial-composition` 处理 gap、padding、视觉重量和 optical alignment。
- 使用 `perceptual-naturalness` 检查玻璃、阴影、形状和运动是否属于同一视觉世界。
- 使用 `refined-aesthetics` 做最终“高级感 / 完成度 / 模板感”审查。

### Don't

- 不把所有 Card、Section、文章段落都做成毛玻璃。
- 不允许 Glass 嵌 Glass；同一区域最多一个 backdrop-filter 材质层。
- 不用 Blur、Gradient、Shadow 掩盖错误的信息架构和空间关系。
- 不在组件内部散落任意 `#hex`、blur、shadow、radius magic number。
- 不为了“Apple 感”牺牲键盘 Focus、文字对比、缩放和 Reduced Motion。
- 不把手机 44px 控件无条件复制到桌面 fine-pointer 密度；桌面按钮优先映射 iOS Small 34px 档。
- 不把 `DESIGN.md` 当普通说明文档：YAML token 是规范值，正文解释这些值为什么存在以及如何应用。

### 来源与维护

- iOS 26 Web 参考：`https://github.com/seunghan91/ios26-design-system`
- Google DESIGN.md 格式：`https://github.com/google-labs-code/design.md`
- 项目视觉实现：`packages/ui/src/components.css`、`ios-theme.css`、`form-controls.css`、`liquid-glass.css`
- 更新视觉 token 时必须同步本文件；组件改动不得与 YAML token 长期漂移。
