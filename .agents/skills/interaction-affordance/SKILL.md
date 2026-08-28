---
name: interaction-affordance
description: 为 pzhown_dot_cn 统一可交互元素的“可点击性、可操作性与状态表达”。用于文字链接、导航链接、文字动作、Button、Icon Button、可点击 Card/Surface、Tabs、Toggle、Menu Item，以及 hover、pressed、focus-visible、selected、disabled、pending 等交互状态设计与实现。要求先区分导航与动作，再通过语义、形状、明度、装饰、位置和状态反馈建立清晰但克制的交互可供性；不能依赖 hover 或颜色作为唯一可点击线索。
---

# 交互可供性规范

把“用户无需试点就能大致判断哪里可操作、操作后会发生什么”设为交互表达目标。统一的是交互语法，不是把所有可点击元素做成同一种按钮。

## 工作流程

1. 先判断语义：这是**导航**、**动作**、**状态切换**、**选择**还是**进入一个对象**。
2. 根据语义选择元素：
   - 导航：`<a>` / Link。
   - 动作：`<button>` / React Aria Button。
   - 状态与选择：使用对应 React Aria primitive，不用 `div onClick` 伪装控件。
3. 根据上下文选择 signifier：Inline Link、Navigation Link、Text Action、Button、Icon Button、Clickable Surface 或 Selection Control。
4. 设计 Rest 状态先成立，再补 hover、focus-visible、pressed、selected、disabled、pending。不要让 hover 成为“终于看得出能点”的唯一时刻。
5. 在触控、键盘、鼠标三种输入下保持同一语义和可发现性。
6. 视觉细节交给 `apple-design`；复杂过渡与空间动画交给 `interaction-motion`。

## 交互不变量

- **导航与动作分离**：跳转到其他页面/位置用 Link；改变当前状态、提交、打开控件用 Button/对应控件。
- **Rest 状态有线索**：重要可交互项在静止状态下就应具备足够 signifier，不依赖 hover 才显现。
- **不只靠颜色**：正文链接、选择、错误、成功等不能只靠色相区分；同时使用下划线、形状、位置、图标、字重或 surface 差异。
- **Hover 是增强，不是发现机制**：手机没有 hover；关键功能不能只在 hover 时出现或变得可识别。
- **Focus 必须可见**：键盘焦点是独立状态，不等同于 hover。不要为了“干净”隐藏 focus-visible。
- **Pressed 必须有即时反馈**：动作控件在按下时产生短促的材质、明度或轻微位移/缩放反馈；反馈不能拖慢操作。
- **Selected 是持续状态**：用位置、surface、indicator、形状或文字权重表达，不只改变颜色。
- **Disabled 不伪装可用**：同时降低可操作暗示与反馈；不接受点击，不显示正常 hover/pressed。
- **命中区与视觉尺寸分离**：视觉可紧凑，触控 hit area 仍要足够；正文 inline link 属于自然例外。
- **整块可点击要有边界**：Card/Surface 若整体可进入，应让对象标题、构图或 hover/focus surface 明确表达；避免嵌套多个冲突点击目标。

## 表达优先级

优先使用多个低噪声信号共同表达，而不是一个过强信号：

```text
语义与位置
+ 文字/图标含义
+ 形状或装饰
+ 明度/Surface
+ 状态反馈
```

不要默认把“可点击”等同于“高饱和品牌色”。在内容型博客中，彩色应该比结构信号更稀缺。

## 状态语言

默认方向：

```text
Rest
→ Hover：可交互性更明确、对比适度增强
→ Focus-visible：定位能力明显增强
→ Pressed：产生即时按压反馈
→ Selected：形成可持续识别的状态
```

不要使用“交互越深，元素越淡到看不见”的状态体系。具体状态实现读取 `references/states-feedback.md`。

## 与其他 Skill 的边界

- 阅读正文与链接密度：优先 `perceptual-reading`。
- 文章卡片、目录、脚注等内容角色：优先 `content-presentation`。
- 不同设备的重排与输入能力：优先 `adaptive-layout`。
- 颜色、Squircle、Surface、材质：使用 `apple-design`。
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
