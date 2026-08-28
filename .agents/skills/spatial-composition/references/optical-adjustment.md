# 光学校正

## 原则

统一网格和 token 提供几何一致性；光学校正解决“数学上对齐但人眼看起来不齐”的问题。

顺序必须是：

```text
先语义关系
→ 再统一 scale
→ 再几何对齐
→ 最后做最小 optical adjustment
```

不要反过来先凭感觉写 magic number。

## 常见场景

### Icon + text

图标 bounding box 的几何中心不一定等于视觉中心，尤其是：

- 三角形 / chevron。
- 不对称 pictogram。
- stroke 密度偏向一侧的 icon。

允许通过极小 translate 或内部 padding 修正，但不要改变真实 hit area。

### Button / Chip

icon + label 组合可能因图标重量造成左右不平衡。优先调整 icon-label gap、图标尺寸或内侧 inset，而不是整体把按钮内容大幅平移。

### Typography

大标题的字形墨色、cap height、中文字符结构会改变感知距离。

- 不把 line box 当作真实可见字形边界。
- 标题上方/下方可能需要不同的视觉空间。
- 中英文混排时不要假定相同 `line-height` 会产生相同视觉节奏。

### Circular / asymmetric geometry

圆形、三角形和不规则形状在同样 bounding box 中的可见面积不同。需要时通过尺寸或位置做轻微补偿。

### Nested surface

内外 radius、border、shadow 会改变“可见边界”。组件 inset 应依据实际视觉边界，而不是只看 CSS box。

## 校正规则

- 首选从邻近 primitive scale 换档，例如 6 ↔ 8、12 ↔ 16。
- 只有邻近 scale 都无法解决时才使用局部自定义值。
- 局部自定义值应收敛到共享组件/token，而不是在多个页面复制。
- 不创建全站万能 `.optical-center { transform: ... }`。
- 不通过负 margin 修复本应由正确 line-height、icon viewBox 或布局结构解决的问题。

## 几何中心不是错误

不要把 optical adjustment 变成“所有东西都要偏一点”。绝大多数组件仍应使用标准布局、baseline、flex/grid alignment。

只有明显的视觉错位才校正。

## 可访问性

光学偏移不能改变：

- DOM 顺序。
- keyboard focus 顺序。
- hit target 的真实范围与视觉范围关系。
- 用户缩放后内容可见性。

## 与其他 Skill 的关系

- 字号/行高的阅读问题归 `perceptual-reading`。
- icon/button 的可点击语义归 `interaction-affordance`。
- icon 与 surface 的最终颜色/形状归 `apple-design`。
- 本文只处理这些元素在空间中的感知对齐。
