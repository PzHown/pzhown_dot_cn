# 可访问性与适配

## 对比度

按项目最低标准检查：

- 普通文本至少 4.5:1。
- 大号文本或足够粗的文本至少 3:1。
- 浅色和深色模式分别验证。
- 低透明 glass surface 上的文字要按实际合成背景检查，不只看 token 数值。

## 颜色

- 不依赖颜色单独表达状态、错误、成功、选择或交互性。
- 为状态提供文字、图标、形状、位置或其他冗余线索。
- destructive、success 等语义色在不同文化语境中使用时保持业务语义清晰。

## 焦点与键盘

- 所有可交互控件必须可通过键盘到达。
- `focus-visible` 必须可见，不能为了“干净”而去掉 outline 后不补替代方案。
- Dialog 打开后焦点进入正确区域，关闭后返回触发点；优先依赖 React Aria 行为。
- Menu/Tabs 等组件使用 React Aria 原生键盘模型，不自行发明快捷键。

## 触控与指针

- 触控命中区域按项目标准至少约 44×44 CSS px；紧凑桌面控件可通过不可见 hit area 扩展。
- 不把 hover 作为发现关键功能的唯一方式。
- icon-only 控件必须有 aria-label 或等价可访问名称。

## 文本与缩放

- 使用相对单位和可重排布局，避免用户放大字体后文字裁切。
- 标题/正文保持层级，即使字号变化也不能变成同等视觉权重。
- 避免过细字重和过低对比的辅助文本。

## 动效与透明度

- 尊重 `prefers-reduced-motion`。
- 如果使用透明/模糊材质，确保在背景复杂时仍能读清内容。
- 不让大面积、高对比动画持续出现在外围视觉区域。

## 暗色模式

- 默认跟随系统 `prefers-color-scheme` 或项目统一 theme 策略。
- 不只是“把白变黑”：重新验证 surface 层级、边框、阴影、透明度和强调色。
- 黑色背景避免全部使用纯黑 + 纯白造成刺眼；通过语义 surface 建立层级。

## 官方参考

- Accessibility：https://developer.apple.com/design/human-interface-guidelines/accessibility
- Color：https://developer.apple.com/design/human-interface-guidelines/color
- Dark Mode：https://developer.apple.com/design/human-interface-guidelines/dark-mode
- Typography：https://developer.apple.com/design/human-interface-guidelines/typography
