# 自然 Color

## 自然颜色不是自然色系

本规范不偏好绿色、棕色、米色或低饱和色。自然性来自颜色关系符合人的感知和环境适应，而不是模仿植物、天空或泥土。

## 感知均匀性

W3C CSS Color 4 将 Oklab / OKLCH 纳入 CSS，并指出 Oklab 相比 CIE Lab 在 hue/chroma uniformity 上更好；当渐变需要感知上均匀的间隔时，Oklab 是合适的插值空间，OKLCH 可在需要保持色度时使用。

项目规则：

- 需要“看起来匀速”的颜色变化，优先 Oklab。
- 需要控制 Hue 与 Chroma 路径，优先 OKLCH，并明确 hue interpolation direction。
- RGB / HSL 插值只有在它产生正确视觉结果时才使用，不作为默认自然方案。
- 低 Chroma 附近的 Hue 没有稳定视觉意义，不做强行 Hue 动画。

## 明度优先

- 先检查 Lightness 路径，再看 Hue。
- 渐变中间如果出现意外暗带/亮带，即使端点漂亮也不自然。
- 状态色变化不能突然改变文字/Surface 的明度层级。
- 深色模式不是对 L 做 `1-L`；重新定义 Canvas、Surface、Foreground 的关系。

## 环境适应

Apple HIG 强调颜色会随环境光、显示设备和周围颜色被不同地感知。

Web 端转译：

- 浅色 / 深色 / 高对比分别建立语义映射。
- 大面积高 Chroma 背景会改变前景感知，避免只在孤立色板上调色。
- Blur / translucency 会把背景颜色带入前景，实际颜色需在真实上下文验证。
- Display P3 等 wide gamut 是增强能力，不应导致 sRGB 回退时语义层级坍塌。

## 自然的状态变化

- Hover / Selected / Pressed 的颜色变化应保持控件身份，不突然换成另一套完全不同的 Hue/Material。
- 状态越接近，颜色变化通常越局部；语义状态改变才允许明显 Hue 变化。
- 颜色不能单独承担错误、成功、选中等必要信息；交给 `inclusive-accessibility` 检查冗余线索。

## Gradient

自然渐变优先保持：

```text
明度连续
+ 色度路径可控
+ Hue 方向明确
+ 无意外灰脏/色相绕远
+ 与空间/光照语义一致
```

如果渐变用于模拟光照，应同时服从 `material-light-depth.md`，不要只追求色彩漂亮。
