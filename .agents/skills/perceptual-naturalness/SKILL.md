---
name: perceptual-naturalness
description: 为通用 Web/App 约束视觉与交互的“感知自然性”。用于自然动画、自然颜色、自然渐变、空间连续性、直接操控、因果反馈、材质/光影一致性、形状连续性、跨状态与跨设备变化，或任何“技术上平滑但看起来生硬、假、拼装、无原因”的视觉问题。以感知连续性、空间连续性、时间连续性、因果连续性和材质连续性为核心；不把自然等同于慢、柔、Spring、低饱和或自然主题。具体 Motion 实现交给 interaction-motion，颜色/材质造型交给 apple-design，空间构图交给 spatial-composition；inclusive-accessibility 横向约束全部结果。
---

# 感知自然性规范

让界面变化符合人的感知预期、空间预期和因果预期。不要模拟“自然的外观”，要维护**自然的连续性**。

## 核心原则

- **自然不是风格**：绿色、米色、圆角、柔和阴影、慢动画都不自动等于自然。
- **自然不是越像真实物理越好**：界面只需保留足以让人预测变化的物理线索，不模拟无关摩擦、重力或弹跳。
- **自然来自可解释连续性**：对象、颜色、位置、速度、光照、材质和结果之间的变化要让人看得出“为什么这样变”。
- **直接反馈优先**：用户操控对象时，视觉响应尽量即时、连续、可逆、可中断。
- **感知一致性优先于数值一致性**：数学插值、几何中心、相同阴影参数或相同 duration 只是起点；人眼看到的连续性才是最终标准。
- **不要用自然性掩盖语义问题**：状态、导航、层级或内容不清楚时，先修对应 Skill，不靠动画和材质圆场。

## 五种连续性

每次涉及自然感时依次检查：

```text
Perceptual Continuity  感知连续性：同一对象是否仍被看作同一对象
Spatial Continuity     空间连续性：变化是否保留来源、去向和位置关系
Temporal Continuity    时间连续性：速度、节奏和阶段是否连续可预测
Causal Continuity      因果连续性：用户动作与系统结果是否像同一事件链
Material Continuity    材质连续性：光、深度、透明、阴影和表面是否属于同一世界
```

五者不是必须同时出现；只检查当前变化真正涉及的维度。

## 工作流程

1. 明确变化前后“什么对象、什么状态、什么关系”保持不变。
2. 找出变化的触发原因：用户手势、点击、系统状态、布局重排、主题变化或内容更新。
3. 先判断对象身份与因果关系，再决定动画、颜色、材质和形状表现。
4. 检查五种连续性；优先修复最明显的断裂。
5. 具体 Motion 参数交给 `interaction-motion`；具体色彩/材质交给 `apple-design`；空间距离和重心交给 `spatial-composition`。
6. 如果用户直接操控对象，优先保证“跟手、可中断、可逆、结果与动作方向一致”。
7. 如果颜色或材质发生变化，检查明度、色度、背景、光照与相邻表面的关系是否连续，而不是只检查 HEX 是否接近。
8. 如果变化跨设备或容器发生，保持对象身份与关系语义；允许几何结构改变，不要求像素路径完全连续。
9. 最后用 `inclusive-accessibility` 检查 Reduced Motion、对比、非颜色线索和输入差异。

## 感知连续性

- 同一对象跨状态变化时，优先保留可识别的形状、位置、内容或运动线索。
- 不要无原因同时改变位置、大小、颜色、圆角、阴影和内容；同时变化的维度越多，越容易失去对象身份。
- 利用 Gestalt 的 good continuation、common fate、common region 等原则帮助人眼把变化前后组织成同一事件。
- Shared element 只有在语义上确实是“同一对象延续”时成立。
- 需要详细判断时读取 `references/continuity-framework.md`。

## 自然 Motion

先决定因果和路径，再决定 easing。

- 手势驱动运动应尽量跟随输入方向、距离和速度，不让对象明显脱手。
- Enter / Exit、展开 / 收起、打开 / 关闭应与来源、去向和空间层级一致。
- 运动过程中避免无原因的速度突变、方向反转或额外 overshoot。
- Linear 不是天然错误；恒定速率场景可以使用。不要为了“自然”强行 Spring。
- 大对象、长距离通常需要更充分的时间，小反馈应更快，但具体 duration 由 `interaction-motion` 决定。
- 新操作到来时允许中断并从当前状态继续，不回到动画起点重播。
- Motion 是高注意力信号；自然感不能以持续运动为代价。
- 详细规则读取 `references/natural-motion.md`。

## 自然 Color

自然颜色强调**感知关系连续**，不是“自然色系”。

- 颜色层级先服从语义与视觉重量，再考虑审美和品牌。
- 渐变、主题切换和状态过渡需要感知均匀时优先在 Oklab / OKLCH 等感知空间处理。
- 避免 RGB/HSL 线性插值导致中间亮度塌陷、脏灰、Hue 绕远或突变。
- 深色模式重新建立亮度、色度和背景关系，不做机械反色。
- 同一表面在不同状态下变化时，优先保持可辨认的色相/明度关系，不突然改变材质语义。
- 高色度 Accent 会增加视觉重量；如果抢过主内容，先降错误对象而不是继续增强其他对象。
- 详细规则读取 `references/natural-color.md`。

## 材质、光与深度

- 同一视图建立相对一致的光照与深度逻辑；不要每个组件各自选择阴影方向和高光语言。
- Shadow、Blur、Translucency、Vibrancy、Highlight 应共同说明前后关系，而不是独立装饰。
- 透明度越高不等于越高级；材质厚薄要同时考虑背景上下文和前景可读性。
- 材质感来自 illumination × shape × surface 的联合线索；互相矛盾会产生“塑料贴图”式假感。
- 不把 Glass 用在所有 Surface；材质语义和视觉层级先由 `apple-design` 决定。
- 详细规则读取 `references/material-light-depth.md`。

## 直接操控与因果连续性

- 用户动作与结果之间保持清楚的时空关联：在哪里操作，结果优先从相关对象或相关区域发生。
- 直接操控优先可见对象、快速增量反馈、可逆操作和即时结果。
- 拖拽、滑动、缩放等连续输入不要离散成迟滞的大步跳变，除非存在明确 snap 规则。
- 系统自动修正、吸附或预测不可突然“夺走”对象；辅助越强，越要保留用户可理解的控制权。
- 操作结果若因延迟无法立即出现，使用 `system-feedback` 保持因果链，不让用户误判为没触发。
- 详细规则读取 `references/causality-direct-manipulation.md`。

## 与其他 Skill 的边界

```text
perceptual-naturalness
= 变化是否自然、连续、可预测

interaction-motion
= 动画具体怎么实现、多久、用什么 easing/spring

apple-design
= 颜色、材质、Shape、Shadow、Blur 最终长什么样

spatial-composition
= 元素离多远、谁更重、整体怎么平衡

adaptive-layout
= 跨设备结构何时重排

system-feedback
= 操作后系统状态和恢复怎么表达

interaction-affordance
= 控件怎么看出能操作
```

`inclusive-accessibility` 与本 Skill 同为横向约束：自然性不得以眩晕、低对比、隐藏状态或精确输入要求换取。

## 设计审查

- 变化前后是否还能认出“同一个对象 / 同一个关系”？
- 用户能否从动作预测结果的位置、方向和时机？
- 动画是否因为统一套 Spring / ease 而产生无关物理感？
- 是否有突兀的速度、方向、位置、颜色、材质或深度跳变？
- 渐变和主题变化是否在感知上连续，而不只是数值连续？
- 同一视图的阴影、高光、Blur 和透明是否像属于同一空间？
- 自动吸附、预测或辅助是否削弱用户的控制感？
- 去掉动画后，因果、语义和层级是否仍成立？
- Reduced Motion 下是否保留必要的因果和对象连续性？

## 参考资料

- 五种连续性与 Gestalt：`references/continuity-framework.md`
- Motion 与时间连续性：`references/natural-motion.md`
- Color 与感知插值：`references/natural-color.md`
- Material / Light / Depth：`references/material-light-depth.md`
- 因果知觉与直接操控：`references/causality-direct-manipulation.md`
- 规范与学术来源：`references/research-basis.md`
