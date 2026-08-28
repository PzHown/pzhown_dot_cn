# 视觉平衡与重心

## 核心定义

视觉平衡不是“左右一样”，而是多个视觉重量在构图场中形成稳定关系，让用户感到页面有意图而不是偶然偏斜。

## 几何中心与感知重心

- 几何中心是布局起点。
- 感知重心受到对比、位置、面积、排版、密度、图片内容和空白共同影响。
- 不定义全局固定的 optical-center 偏移量。

因此：

```text
geometric center
≠ guaranteed perceptual center
```

但这不意味着所有组件都要手工偏移。

## 平衡形式

### Symmetric balance

适合需要稳定、正式、可预测的构图，例如部分 Dialog、登录页或简单 Empty State。

### Asymmetric balance

通过不同重量对象相互抵消形成稳定关系。适合博客 Hero、Editorial layout、作品展示等。

不对称不是“随便放”。需要一个清楚的主轴、对齐关系或视觉张力逻辑。

### Editorial balance

使用不同文本尺度、媒体、边缘留白和错位关系形成版面节奏。内容型博客可以使用，但必须保持阅读顺序清楚。

### Radial / centered balance

适合明确中心任务的场景，但不要因为 `place-items:center` 很方便就把所有页面做成中心构图。

## Negative space 作为 counterweight

空白可以平衡另一侧的高重量对象：

- 大标题旁的空白可增强标题而不是“浪费空间”。
- 高复杂度图片周围更多空白可以隔离其重量。
- 页面一侧为空并不自动意味着需要填东西。

## 边缘张力

靠近容器边缘的高重量元素需要额外判断：

- 是否像要掉出画面？
- 是否被 safe area / page gutter 压得过紧？
- 元素内部的方向、人物视线、箭头是否朝外进一步增强拉力？

必要时通过增加 inset、调整 crop、减弱对比或改变对齐来恢复稳定。

## Typography 与重心

大标题是高重量对象。判断时考虑：

- 字号和字重。
- 中文字形墨色差异。
- 行数变化导致的块面积变化。
- 标题与摘要之间的 negative space。
- 左对齐、居中或非对称定位产生的方向感。

长标题不能只靠固定高度或固定 offset 维持视觉平衡。

## Image 与重心

媒体常成为强注意锚点。根据内容目标选择：

- 如果图片是主内容，让它成为明确主重心。
- 如果图片只是 supporting media，限制对比、面积或复杂度，不让它抢过标题/正文。
- crop 是构图工具；人物脸、视线和高对比区域的位置会改变整张页面的重心。

## 平衡不等于审美偏好

研究显示 perceptual balance 与 aesthetic preference 相关但不等价。不要为了“平衡”把所有富有张力的非对称布局消灭。

项目目标是：

> 有控制的张力，而不是机械对称；稳定的主次，而不是完全均匀。

## 研究依据

- Frontiers in Psychology 2016：比较多种 visual balance 指标，perceptual center-of-mass 可较好预测平衡判断，但不足以单独预测审美偏好。
- 经典 compositional strategy 研究区分 symmetry 与 dynamic balance，支持非对称构图通过视觉重量形成平衡。
- 近年的 symmetry / balance / proximity 实验进一步说明局部分组与整体平衡是不同尺度的知觉判断。
