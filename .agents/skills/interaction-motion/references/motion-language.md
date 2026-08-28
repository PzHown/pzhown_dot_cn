# Motion Language

## 运动语义

### Feedback

用于按钮、Switch、菜单项、选择状态。范围小、时间短、可立即打断。

### Presence

用于 Dialog、Popover、Tooltip、菜单等临时层。动画要解释层级变化和来源关系，不只做统一淡入。

### Spatial

用于 Tabs 指示器、面板重排、卡片展开、共享元素和页面切换。优先保持对象身份连续。

### Ambient

用于背景、Hero 或实验性展示。默认关闭持续大幅运动；不能进入长文阅读核心区。

## 动效层级

同一时刻优先只让一个主要变化承担注意力。辅助对象使用更小位移、更低对比或仅 opacity 响应，避免整屏同时表演。

## Reduced Motion

减少运动时：

- 保留颜色、边框、opacity 等状态反馈。
- 移除大范围 translation、parallax、共享元素飞行和弹性 overshoot。
- Dialog/Popover 可以短淡入淡出，但不要改变可操作时机。
