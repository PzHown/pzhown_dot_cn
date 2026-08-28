# 视觉重量

## 定义

视觉重量是一个元素吸引注意力、影响构图重心的相对强度。它不是物理质量，也不存在可靠的单一计算公式。

## 主要影响因素

### Contrast

高明暗对比通常会增加视觉重量。项目已有 Neutral/Grayscale 体系，因此调整 foreground、surface 和图片明度时，也是在调整视觉重量。

### Typography mass

字号、字重、字形墨色、行数和文本块面积共同影响重量。不要把“更重要”机械翻译为“更大字号”。

### Area

大面积对象可能更重，但面积不是唯一变量。低对比的大图可以比一个小而高对比的标题更轻。

### Position

位置会改变注意和构图张力。靠边对象、孤立对象、偏离主轴对象可能产生更强的拉力。

### Density

高信息密度区域会形成视觉块。即使单个元素很弱，聚集后也可能成为强重心。

### Chroma

在中性页面中，高饱和色非常稀缺，因此会获得额外重量。不要把品牌色同时用于大量可点击项和纯装饰。

### Image complexity

高纹理、高人脸/主体密度、高局部对比的图片通常比简单插画更容易吸引视线。

### Shape and direction

形状与方向感会影响构图力。强烈向外的箭头、人物视线或倾斜线条可能把注意力拉向画面边缘。

### Depth

大阴影、高 elevation、强 blur contrast 或悬浮材质会提升“前景感”，因此也提升重量。

### Motion

运动是高优先级注意信号。持续动画、滚动联动、闪烁和大位移会迅速压过静态内容，所以 `interaction-motion` 必须服从内容层级。

### Isolation / negative space

被大面积空白隔离的对象通常会显得更重要。空白不只是减重，也可能通过 isolation 增加某个对象的显著性。

## 项目判断顺序

对博客和内容型页面优先看：

```text
Position
→ Contrast
→ Typography
→ Negative space / grouping
→ Image complexity
→ Area
→ Chroma / depth / motion
```

这不是科学排序公式，而是项目设计时的实用检查顺序。

## 主要注意力锚点

一个 viewport 或主要 section 通常应有一个明确主锚点。

允许存在多个次级锚点，但不要让它们达到相同强度而互相争抢，例如：

```text
超大标题
+ 高饱和 CTA
+ 深色大图
+ 动态渐变
+ 大 Badge
```

全部同时成为强刺激。

如果内容优先级是标题 > 正文 > CTA，那么视觉重量也应大体服从这个顺序。

## 修正错误重量

出现竞争时，优先降低错误对象，而不是无限增强正确对象：

- 降低图片局部对比或面积。
- 增加图片周围 negative space，而不是继续给标题加颜色。
- 降低次级 CTA 的 surface / chroma。
- 减少 Badge 数量和背景填充。
- 移除无意义 Motion。
- 将密集辅助信息移入次级区域。

## 不要伪造公式

禁止在 Skill 或实现中使用类似：

```text
visualWeight = area * contrast * distance
```

并据此生成 CSS。视觉平衡研究支持“感知质量中心”等模型作为分析工具，但人的判断是整体性的，且 aesthetic preference 还受 symmetry、homogeneity、语义和经验影响。

## 研究依据

- Frontiers in Psychology 2016：客观平衡指标与感知平衡关系，说明 perceptual center-of-mass 有预测价值，但不能解释全部审美判断。
- International Journal of Human–Computer Interaction 2023：界面 visual weight 研究显示对比、形状与方向等因素会影响视觉重量与平衡。
- Computers in Human Behavior 2018：网页 visual hierarchy 研究表明 position、color、text style 对最初注意区域的重要性不能被单纯 size 替代。
