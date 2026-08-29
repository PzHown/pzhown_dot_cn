# 组件与交互

## 总则

- 组件视觉严格服从根目录 `DESIGN.md` 与 `ios27-design-system`，不使用“泛 Apple / 泛玻璃”替代具体 iOS 27 规格。
- 组件结构优先复用 `@pzhown/ui`；缺少 primitive 时从原生语义 HTML + React 状态重新实现。
- `react-cupertino-ui` 只用于研究 anatomy、状态归属和组合方式，不是视觉源，也不是强制 runtime 依赖。
- 不恢复旧 shadcn / aria-nova / Base UI 组件壳和跨组件 CSS 修补链。
- 必须覆盖与组件有关的 rest / hover / pressed / focus-visible / selected / disabled / invalid / pending 状态。
- 不把所有组件都做成相同灰边框矩形，也不把所有组件都做成 Liquid Glass。

## Button

- iOS 27 视觉高度按 `DESIGN.md` 使用 Small 28、Medium 36、Large 50；视觉尺寸与触控命中区分离。
- 同一任务区只保留一个最强 filled action。
- pressed 必须立即可感知；不要依赖 Hover 才看得出可点击。
- icon-only 必须有可访问名称；桌面端必要时可以 Tooltip 补充，但 Tooltip 不能承担完成任务必需的信息。
- destructive 使用系统 Red，高风险动作还需要确认、Undo 或其他恢复机制。

## TextField / Textarea / Select

- 基础字段几何、圆角、字体和 Focus 以 `DESIGN.md` 为准。
- placeholder 不能替代 label；复杂表单保留字段名、帮助文本和错误文本。
- invalid 优先于普通 Focus 色，并且不能只靠红色表达错误。
- 原生 `<select>` 在能满足任务时优先，避免为了“像 iOS”重写一个键盘和屏幕阅读器都不可靠的伪选择器。
- 不用重 inset shadow 模拟原生控件。

## Switch / Checkbox / Radio / Slider

- Switch 表达即时开/关；需要提交才生效的选择不要伪装成 Switch。
- Switch 使用系统 Green，并通过 thumb 位置 + 颜色共同表达状态。
- Checkbox / Radio 优先保留原生表单语义，再用关联视觉层表达 iOS 27 状态。
- Slider 使用原生 range 语义；视觉 track/thumb 可以 iOS 化，但键盘和值语义不能丢失。

## SegmentedControl / TabBar

- 少量互斥视图使用 SegmentedControl；页面主导航使用 TabBar / Navigation，不把所有链接都做成 segmented。
- selected 必须通过 surface/indicator/位置等持续线索表达，不只变文字颜色。
- iOS 27 Tab Bar 使用 Large Liquid Glass system chrome；selected item 可以有局部 glass indicator，但禁止继续套第二层大面积玻璃。

## ListSection / ListRow

- 常规行高以 `DESIGN.md` 当前 iOS 27 值为准（52px）。
- Grouped Surface 是内容分组的默认手段，不把设置列表每一行单独做 Card。
- Separator 使用 0.5px 级别结构线，并按内容 inset，不用粗边框制造层级。
- disclosure、trailing value、switch 等末端内容必须保持稳定对齐和足够命中空间。

## Dialog / Sheet / Popover / ContextMenu

- 每个 Overlay 自己拥有 open state、Portal、Escape、外部点击/遮罩行为和 focus return；不要用跨组件 CSS 假装交互完整。
- Dialog 用于需要聚焦处理的任务，不把普通提示全部弹窗化。
- Bottom Sheet 使用系统 grabber、安全区和 34px 顶部圆角。
- Popover / ContextMenu 使用 Medium Liquid Glass，保持与触发点的空间关系。
- 菜单 destructive 项使用系统 Red；disabled 项不保留正常 Hover/Pressed 暗示。

## Badge / Avatar / Progress / Loading

- Badge 是轻量状态/元数据，不升级为第二个 CTA。
- Avatar 保持稳定圆形和清晰 fallback，不用装饰性玻璃覆盖人像。
- Progress 是确定性进度；Spinner 用于无法确定总进度的短时等待。
- Skeleton 保持布局稳定；Reduced Motion 下关闭 shimmer。

## Card 与 Surface

Card 不是默认组件。先判断是否真的需要容器：

- 如果内容通过 spacing 和标题已经能分组，不加 Card。
- 如果需要突出独立对象，再使用 Grouped Surface。
- Card 内避免继续套多个同级 Card。
- 内容面不默认 Liquid Glass；Glass 保留给 system chrome、浮层和必要控件。

## 官方与项目参考

- 根目录 `DESIGN.md`：本项目最终规范。
- iOS 27 Web 基准：https://github.com/seunghan91/ios27-design-system
- 结构参考：https://github.com/Andersonlimahw/react-cupertino-ui
- Apple HIG Components：https://developer.apple.com/design/human-interface-guidelines/components
