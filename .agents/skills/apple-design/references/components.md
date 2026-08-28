# 组件与交互

## 总则

- 交互语义优先使用 React Aria Components，不自行重写键盘导航、focus 管理和 ARIA。
- 视觉样式归 `@pzhown/ui` 所有；React Aria 只负责行为与状态。
- 必须覆盖 `hovered / pressed / focus-visible / selected / disabled / invalid / loading` 中与组件有关的状态。
- 不把所有组件都做成相同灰边框矩形。不同组件应通过角色、surface、层级和反馈区分。

## Button

- 主操作使用一个明确的 prominent/default 样式；同一区域不要同时出现多个“最强按钮”。
- 自定义按钮必须有可感知 pressed 状态。
- 视觉高度可以紧凑，但触控命中区域按项目标准至少约 44×44 CSS px；必要时用伪元素扩展 hit area。
- icon-only 按钮必须提供可访问名称；桌面端必要时提供 tooltip。
- destructive 操作使用明确语义色，并在高风险动作中增加确认或可撤销机制。

## Input / Form

- 输入框的 focus-visible 比 hover 更重要，focus ring 要清晰但不要刺眼。
- placeholder 不能替代 label；复杂表单优先保留明确字段名和帮助文本。
- 错误状态不能只靠红色，配合文本/图标说明。
- 不用过重 inset shadow 模拟原生控件。

## Tabs / Segmented

- 少量互斥视图优先使用 Tabs/segmented；不要把普通导航强行做成 segmented control。
- selected 状态应通过位置、surface 或 indicator 明确表达；避免只改变文字颜色。
- 切换内容时保持布局稳定；需要强调连续性时用 Motion layout 动画。

## Dialog / Popover / Menu / Tooltip

- Dialog 用于需要聚焦处理的任务，不要把普通信息都弹窗化。
- Overlay 的 blur/遮罩仅用于降低背景竞争，不应让背景完全失去上下文。
- Popover 和 Menu 保持与触发元素的空间关系，进出动画从触发方向产生。
- Tooltip 只补充说明，不承载完成任务必需的信息。
- 菜单项 highlight 使用柔和 surface 和足够对比； destructive 项语义明确。

## Switch

- Switch 表达即时开/关状态，不用于需要“提交”才能生效的设置。
- thumb 移动应短促自然；checked 状态同时通过位置与颜色表达。
- 不要只靠颜色区分开/关。

## Card 与 Surface

Card 不是默认组件。先判断是否真的需要容器：

- 如果内容通过 spacing 和标题已经能分组，不加 Card。
- 如果需要突出一个独立对象，再使用 surface。
- Card 内避免继续套多个同级 Card。
- 只有需要视觉分隔时才用边框；优先使用背景层级或极轻分隔线。

## 官方参考

- Buttons：https://developer.apple.com/design/human-interface-guidelines/buttons
- Feedback：https://developer.apple.com/design/human-interface-guidelines/feedback
- Components 总览：https://developer.apple.com/design/human-interface-guidelines/components
