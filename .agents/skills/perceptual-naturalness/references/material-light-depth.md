# 材质、光与深度

## 材质是关系，不是贴纸

视觉研究表明，人对材质的判断依赖 shape、illumination、reflectance、translucency、specular highlight 等线索的联合结构。单个“玻璃参数”不能独立决定材质是否真实。

UI 不需要物理正确，但需要**线索不互相打架**。

## 光照一致性

同一视觉空间中：

- 阴影方向和扩散趋势保持大体一致。
- 高光与凸起/凹陷关系不要相互矛盾。
- 同层对象的 elevation 语言保持同一逻辑。
- 不给每个组件随机一套 glow、inner shadow、drop shadow。

允许局部光源或特殊强调，但必须看得出是有意的局部规则。

## Shadow

Shadow 主要表达：

- separation。
- elevation。
- occlusion。
- focus / temporary layer。

不要让 Shadow 同时承担边框、品牌色和发光装饰三种角色。

## Blur 与 Translucency

Apple HIG 将 material 用于 foreground/background 分层和上下文保留，并指出 thinner material 更能保留背景上下文，thicker material 更有利于前景对比。

项目转译：

- Blur 强度与透明度共同决定“看得见背景多少”。
- 背景上下文重要时可更薄；细文字和复杂背景需要更实。
- Progressive Blur 用于空间边界和上下文过渡时，梯度方向应与实际遮挡关系一致。
- 不把内容层全部做成 Glass。

## Surface hierarchy

材质层级至少要回答：

```text
谁在前？
谁在后？
谁能移动？
谁是临时层？
背景还需不需要被看见？
```

回答不清楚时，不要先加 Blur / Shadow。

## Shape 与材质

- 连续曲率、圆角、圆形等形状会影响高光和阴影的视觉解释。
- 内外容器曲率关系不自然时，先修几何关系，再加阴影掩盖。
- 图标、控件和 Surface 的边缘光学关系由 `spatial-composition` 做最小 optical adjustment，最终形状风格由 `apple-design` 决定。
