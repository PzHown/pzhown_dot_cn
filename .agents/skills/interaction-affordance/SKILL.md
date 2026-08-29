---
name: interaction-affordance
description: 为 pzhown_dot_cn 统一所有可交互元素的“可点击感”和状态表达。用于正文链接、导航链接、Text Action、Button、Icon Button、Clickable Surface/Card、Tabs、Toggle、Menu Item，以及 hover、pressed、focus-visible、selected、disabled、pending 等交互状态。目标是在不把所有元素都做成同一种按钮的前提下，让用户无需试点就能判断哪里可操作，并区分导航、动作与状态变化；同时兼顾 Mouse、Touch、Keyboard 和 React Aria 语义。
---

# 交互可供性规范

统一的是交互语法，不是所有可点击元素的外观。

## 核心原则

- 先决定语义，再决定视觉 signifier。
- 重要交互在 Rest 状态就要有足够线索；Hover 只增强确认。
- 导航与动作保持不同心智模型：去往位置使用 Link，改变当前状态使用 Button/对应控件。
- 不依赖颜色、Hover 或动画单独表达“这里能点”。
- 同一种语义在 Mouse、Touch、Keyboard 下保持一致；输入方式只改变反馈方式，不改变含义。
- 优先使用原生语义与 React Aria，不使用 `div onClick` 模拟控件。

## 工作流程

1. 判断交互意图：导航、动作、状态切换、选择、菜单命令，还是进入一个对象。
2. 选择正确语义元素：`<a>` / Link、`<button>` / React Aria Button、Switch、Tab、MenuItem 等。
3. 为 Rest 状态选择最小充分 signifier：文字装饰、shape、surface、icon、位置、indicator 或组合。
4. 定义 Hover / Focus-visible / Pressed / Selected / Disabled / Pending；不要只做 Hover。
5. 检查无 Hover 环境是否仍可发现；检查键盘 Focus 是否清楚且不被裁切。
6. 检查命中区与误触风险；视觉尺寸与 hit area 可以分离。
7. 与 `system-feedback` 协作操作级 Loading/Success/Error/Retry，与 `interaction-motion` 协作复杂动画；本 Skill 只定义“应该如何被识别”和控件级状态反馈。

## 交互角色

### Inline Link

用于正文中的页面/资源跳转。

- 默认保留稳定非颜色线索，优先细 underline / text decoration。
- Hover 可增强 underline、foreground 或 decoration thickness。
- Visited 可轻微区分历史，但不能降到难读。
- 不把正文 Link 做成 Button，除非语义本身就是动作。

### Navigation Link

用于主导航、侧栏导航、面包屑、目录等结构化导航。

- 可以依赖固定位置、重复结构、selected/current indicator 提供导航语法，不要求每项下划线。
- 当前项必须持续可识别；避免只在 Hover 才出现当前/可点击线索。
- 导航项仍使用 Link 语义，不因为视觉像 Tab 就换成 Button。

### Text Action

用于复制、展开、重试、清除、编辑等动作型文字入口。

- 语义使用 Button/对应控件，不使用 Link 假装动作。
- 可以视觉上近似文字链接，但通过动词、位置、icon 或状态反馈保留动作语义。

### Button

用于提交、确认、创建、切换当前状态或调用操作。

- Shape + surface/foreground + label 共同形成 Rest signifier。
- 同一任务区只保留一个最强主操作。
- Pressed 必须即时可感知。
- Icon + label 的具体 gap/padding 使用 `spatial-composition`，不要在本 Skill 独立造 spacing scale。

### Icon Button

用于空间紧凑且 icon 心智模型稳定的动作。

- 必须有可访问名称。
- Rest 状态要能判断属于交互控件；如果裸 icon 无法成立，提供轻 surface 或固定工具栏上下文。
- 桌面端可用 Tooltip 补充解释，但 Tooltip 不承担完成任务必需的信息。

### Clickable Surface

用于“进入这个对象”而不是“执行这个对象上的所有动作”。

- 使用对象标题、缩略图、箭头/Link signal、布局和 hover surface 建立整体可进入感。
- Card 内存在 Menu、Bookmark、Checkbox 等次级操作时，不把整张 Card 包进一个 `<a>` 导致嵌套交互冲突。
- 主要入口可通过 stretched link/overlay 技术实现，但必须保护内部次级操作和焦点顺序。

## 状态方向

- **Rest**：静止时先成立。
- **Hovered**：提高确认度，不引入首次可发现功能。
- **Focus-visible**：比 Rest 更明显，且在复杂背景上保持可见。
- **Pressed**：短促的明度/surface/小位移/小 scale，立即响应。
- **Selected**：持续状态，优先组合位置/indicator/surface/字重/形状，不只变色。
- **Disabled**：降低操作暗示，不响应正常 Hover/Pressed；原因不能只藏 Tooltip。
- **Pending**：用户已触发且操作未完成；保持控件宽度/布局，避免 Label → Spinner 引发明显跳动。

详细状态规则读取 `references/states-feedback.md`。

## 输入能力

- 不把 `@media (max-width)` 等同于 Touch。
- `hover:hover` / `pointer:fine` 只用于增强鼠标体验。
- Touch 没有 Hover，因此关键可发现性必须在 Rest 成立。
- Keyboard 使用 Focus-visible 表达定位，不要求 Focus 和 Hover 完全一样。
- 命中区优先满足舒适触控；视觉外观可以更紧凑。

详细命中区规则读取 `references/hit-targets.md`。

## 与其他 Skill 的边界

- 正文 Link 的密度、行长和阅读影响：优先 `perceptual-reading`。
- Card/内容块应不应该存在：优先 `content-presentation`。
- 控件内部 inset、icon-label gap、相邻目标之间的视觉间距和静态重心：使用 `spatial-composition`。
- 不同设备的重排与输入能力：优先 `adaptive-layout`。
- 颜色、圆角、Surface、材质：使用 `apple-design`。
- Presence、共享元素、页面过渡和复杂 gesture：使用 `interaction-motion`。

## 参考资料

- 统一交互语法：读取 `references/interaction-grammar.md`。
- Link、Text Action 与 Button 的边界：读取 `references/links-actions.md`。
- hover / focus / pressed / selected 等状态：读取 `references/states-feedback.md`。
- 触控命中区、输入能力与可访问性：读取 `references/hit-targets.md`。

## 实现审查

实现交互项时检查：

- 元素语义是否正确，是否存在 `div onClick` 代替 Link/Button？
- 静止状态是否已有适量可操作线索？
- 正文 Link 是否脱离颜色仍能辨认？
- Hover 是否只是增强，而不是唯一发现方式？
- Focus-visible 是否清楚且不被裁切？
- Pressed 是否即时、短促、不会阻塞？
- Selected / Disabled / Pending 是否与默认状态清楚区分？
- 触控命中区是否足够，且没有误触高风险？
- 整块可点击 Surface 是否与内部次级操作冲突？
- 是否复用了 `@pzhown/ui` 与 React Aria，而不是重新实现交互语义？
