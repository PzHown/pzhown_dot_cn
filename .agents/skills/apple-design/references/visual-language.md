# 视觉语言

## 目录
- 核心原则
- 层级与留白
- 圆角与形状
- 色彩与渐变
- 材质与深度
- 排版
- 响应式
- 官方参考

## 核心原则

把 Apple HIG 的 Purpose、Agency、Flexibility 等原则转译成 Web 端规则：

- **内容先于装饰**：先识别用户最重要的任务，再决定视觉重点。
- **保留上下文**：弹层、过渡和导航变化应让用户知道“从哪里来、到哪里去”。
- **让用户掌控**：避免不可取消的长动画、突兀自动切换和阻断式反馈。
- **适应不同输入和尺寸**：同时考虑鼠标、触控、键盘，以及窗口大小变化。
- **可访问性从设计开始**：不要在最后补救对比度、焦点和 reduced motion。

## 层级与留白

优先用以下顺序建立层级：

1. 空间与对齐。
2. 字号、字重、前景色层级。
3. surface/material 差异。
4. 阴影或分隔线。
5. 最后才使用可见边框。

避免：

- 每张 Card 都是 `1px #ddd border + white background`。
- 在同一屏使用过多不同 radius、阴影和渐变。
- 把次要信息做得和主任务同等抢眼。

项目 spacing 优先从 `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` 中选择。局部可微调，但不要形成大量孤立数值。

## 圆角与形状

- 默认使用 CSS `border-radius` 定尺寸，并由全局 `corner-shape: squircle` 在支持浏览器中升级为超椭圆。
- 推荐层级：紧凑控件 10–14px；普通控件 14–18px；Card 20–28px；Hero/大 Surface 28–40px。
- 胶囊只用于真正适合 pill/capsule 语义的控件，如筛选器、小型 segmented control、状态标签。
- 同一容器内的内外圆角保持层级关系，内层 radius 通常小于外层。

## 色彩与渐变

- 使用语义 token：background、surface、foreground、muted、accent、destructive、border、ring。
- 不把同一种强调色同时用于“可点击”和“纯装饰”，避免语义混淆。
- 自定义色优先使用 OKLCH；渐变优先 `in oklab` 或项目 smootherstep 工具。
- 渐变用于空间、氛围或聚焦，不用于弥补层级不足。
- 浅色、深色和高对比模式都必须验证；不要硬编码只在一种背景下成立的颜色。

## 材质与深度

Apple HIG 将 material 用于建立前景/背景的深度与层级。本项目对应为：

- **Solid surface**：正文、长列表、表格、需要稳定可读性的内容。
- **Translucent surface**：导航、浮层、工具条、局部悬浮控制。
- **Progressive blur**：需要保留背景上下文但又保证前景信息可读的边缘/局部区域。

限制：

- 同一层级不要重复叠 2–3 层透明玻璃。
- 长列表和持续滚动区域减少 backdrop-filter，避免 GPU 成本。
- 文本对比不足时先提高 surface 的不透明度，而不是继续加 shadow。
- Liquid Glass 是 Apple 平台的系统材质；Web 端只借鉴层级与反馈原则，不模拟其全部物理效果。

## 排版

- 使用系统字体栈，Web 端优先 `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif`；不要把 Apple 字体文件打包进项目。
- 正文避免极细字重；优先 Regular / Medium / Semibold。
- 标题通过字号、字重和紧凑 tracking 建立层级，不靠全大写或高饱和颜色。
- 长正文保持舒适行高和可读宽度；控制单行过长。
- B 端密集界面可使用 14–16px 正文；C 端阅读内容通常优先 16–18px。具体以可读性为准。

## 响应式

- 设计成“同一信息架构的不同排布”，不要把移动端当作简单缩小版。
- 宽屏增加留白和并列关系，不要无节制拉长文本。
- 窄屏保持主要操作可达，并避免关键按钮被折叠到不可发现位置。
- 尺寸变化时保持控件与内容关系稳定，用自然布局变化维持上下文。

## 官方参考

以下为原则来源，项目内只做摘要：

- Apple HIG 总览：https://developer.apple.com/design/human-interface-guidelines/
- Design principles：https://developer.apple.com/design/human-interface-guidelines/design-principles
- Layout：https://developer.apple.com/design/human-interface-guidelines/layout
- Materials：https://developer.apple.com/design/human-interface-guidelines/materials
- Color：https://developer.apple.com/design/human-interface-guidelines/color
- Typography：https://developer.apple.com/design/human-interface-guidelines/typography
- Dark Mode：https://developer.apple.com/design/human-interface-guidelines/dark-mode
