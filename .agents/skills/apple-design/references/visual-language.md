# 视觉语言

## 目录
- 核心原则
- 层级与空间边界
- 圆角与形状
- 色彩与渐变
- 灰度与 Neutral
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

## 层级与空间边界

视觉层优先尊重已经由 `spatial-composition` 建立的距离关系、negative space、视觉重量、重心和 attention flow。

建立最终视觉层级时优先：

1. 已确定的空间与对齐关系。
2. 字号、字重、前景色层级。
3. surface/material 差异。
4. 阴影或分隔线。
5. 最后才使用可见边框。

避免：

- 每张 Card 都是 `1px #ddd border + white background`。
- 在同一屏使用过多不同 radius、阴影和渐变。
- 把次要信息做得和主任务同等抢眼。
- 在本 Skill 重新定义另一套 spacing scale。

具体 page gap、section gap、组件 gap、控件 padding、gutter 与 optical adjustment 统一使用 `spatial-composition`。本 Skill 只确保颜色、材质与形状不会破坏既有空间构图。

## 圆角与形状

- 默认使用 CSS `border-radius` 定尺寸，并由全局 `corner-shape: squircle` 在支持浏览器中升级为超椭圆。
- 推荐层级：紧凑控件 10–14px；普通控件 14–18px；Card 20–28px；Hero/大 Surface 28–40px。
- 胶囊只用于真正适合 pill/capsule 语义的控件，如筛选器、小型 segmented control、状态标签。
- 同一容器内的内外圆角保持层级关系，内层 radius 通常小于外层。

## 色彩与渐变

- 使用语义 token：background、surface、foreground、muted、accent、destructive、border、ring。
- **先用亮度与 Neutral 建立层级，再用色相表达品牌、状态和重点。** 页面即使去色，也应保留主要信息结构。
- 不把同一种强调色同时用于“可点击”和“纯装饰”，避免语义混淆。
- 自定义色优先使用 OKLCH；渐变优先 `in oklab` 或项目 smootherstep 工具。
- 渐变用于空间、氛围或聚焦，不用于弥补层级不足。
- 浅色、深色和高对比模式都必须验证；不要硬编码只在一种背景下成立的颜色。
- 高饱和色和大面积深色 surface 都会增加视觉重量；若与 `spatial-composition` 的主次冲突，优先降低错误视觉重量。

## 灰度与 Neutral

### 核心理念

灰度不是“没有设计的颜色”，而是项目视觉层级的基础骨架。

先回答：

1. 哪些内容最重要？
2. 哪些 surface 位于前景、背景或临时层？
3. 哪些信息属于正文、辅助说明、元数据、禁用态或分隔？

再用明度与低色度 Neutral 建立这些差异。彩色只在灰度骨架成立后加入。

### 语义层级

业务组件优先使用下列语义，而不是直接写 `gray-500`、`zinc-700` 等物理色阶：

```text
Canvas
Surface 1
Surface 2
Elevated Surface
Foreground
Secondary Foreground
Tertiary Foreground
Separator
Disabled
```

底层可以维护 OKLCH Neutral scale，但组件只消费语义 token。这样浅色、深色、高对比模式可以独立重映射，而不需要改组件。

### 使用原则

- **Foreground**：正文、关键标题、核心数据。保持稳定、清晰，不为了“柔和”把正文做成中灰。
- **Secondary Foreground**：说明、时间、作者、次级标签等。降低权重但仍需容易阅读。
- **Tertiary Foreground**：仅用于确实低优先级、短时可扫读的信息；不要让大量正文落到这一层。
- **Surface**：使用少量、可感知的亮度阶差表达深度；不要创建十几个肉眼难以区分的浅灰层。
- **Separator / Border**：只在空间和 surface 仍不足以分组时出现；它是辅助结构，不是默认 Card 装饰。
- **Disabled**：同时降低对比、交互反馈和可操作暗示；不能只把文字变成更浅的灰。
- Neutral 可以带极低的冷暖倾向以匹配品牌气质，但同一主题保持综合色偏一致，避免每个 surface 都有不同灰色相。

### 浅色模式

- 大面积 Canvas 与阅读 Surface 保持稳定、低刺激。
- 不用纯白与多个近白灰反复叠层制造“高级感”；如果层级差异肉眼几乎不可见，就减少层级数量。
- 辅助文字不能仅靠透明度无限降低；优先用独立语义色值，避免叠在不同背景后对比不可控。

### 深色模式

- 不把浅色 token 做简单 RGB 反转。
- 用重新设计的明度阶差区分 Canvas、Surface 和 Elevated Surface。
- 避免“纯黑背景 + 纯白正文 + 大量中灰边框”造成高眩光和噪声。
- 深色环境中的 separator、shadow、glass 与 muted text 都要重新校准；不要沿用浅色模式透明度。

### 彩色与灰度的职责边界

Neutral / 灰度主要负责：

- 信息层级。
- 阅读节奏。
- Surface 深度。
- 分隔与边界。
- Disabled 与辅助信息。

Chromatic / 彩色主要负责：

- 品牌强调。
- 主要交互重点。
- Success / Warning / Destructive 等语义状态。
- 少量视觉聚焦和氛围。

禁止用更多颜色代替信息结构，也不要让所有可点击元素都变成同一种高饱和色。

### Grayscale Test

重要页面或组件完成后执行灰度审查：

```css
html {
  filter: grayscale(1);
}
```

这只用于临时检查，不提交到生产样式。

灰度状态下仍应能够快速区分：

- 页面主标题与正文。
- 正文与元数据。
- 主导航与当前状态。
- 主要操作与次要操作。
- Surface 层级。
- Error / Warning / Success 的非颜色线索。

如果转成灰度后结构明显坍塌，先修正字号、字重、空间、形状、位置或明度层级，再恢复彩色。

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
- 强 elevation、shadow、glass contrast 会提升视觉重量，不能无视 `spatial-composition` 的主次设计。

## 排版

- 使用系统字体栈，Web 端优先 `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif`；不要把 Apple 字体文件打包进项目。
- 正文避免极细字重；优先 Regular / Medium / Semibold。
- 标题通过字号、字重和紧凑 tracking 建立层级，不靠全大写或高饱和颜色。
- 长正文保持舒适行高和可读宽度；控制单行过长。
- B 端密集界面可使用 14–16px 正文；C 端阅读内容通常优先 16–18px。具体以可读性为准。
- 排版本身会改变视觉重量；字号/字重的最终选择不能破坏既定 attention flow。

## 响应式

- 设计成“同一信息架构的不同排布”，不要把移动端当作简单缩小版。
- 结构重排由 `adaptive-layout` 负责；重排后的 spacing、negative space 和视觉重心由 `spatial-composition` 负责。
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
