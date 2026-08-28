# 研究与现代规范依据

本 Skill 将下列研究和设计规范转译为可执行 Web/App 规则，不把单个实验结论扩张成万能定律。

## 现代设计规范

### Apple Human Interface Guidelines — Motion

https://developer.apple.com/design/human-interface-guidelines/motion

关键启发：
- Motion 应服务状态、反馈和理解。
- 自定义反馈运动要符合人的手势和预期。
- 不要为了动画而动画。
- 系统会根据输入方式和 Accessibility 调整 Motion。

### Apple Human Interface Guidelines — Color

https://developer.apple.com/design/human-interface-guidelines/color

关键启发：
- Color 服务沟通、连续性、状态和层级。
- Light/Dark/Increase Contrast 需要环境化映射。
- 环境光、显示设备和周围颜色会改变颜色感知。

### Apple Human Interface Guidelines — Materials

https://developer.apple.com/design/human-interface-guidelines/materials

关键启发：
- Material 用于深度、层级和上下文。
- thinner / thicker material 在上下文保留与可读性之间有不同作用。
- 不按“看起来是什么颜色”选择材质，而按语义和层级使用。

### Fluent 2 — Motion

https://fluent2.microsoft.design/motion

关键启发：
- Motion 同时要求 Functional、Natural、Consistent、Appealing。
- Natural motion 使用 inertia、gravity、weight、velocity 等物理直觉建立可预测性。
- duration/easing 应考虑对象尺寸与移动距离，不全局套同一参数。

### Fluent 2 — Color

https://fluent2.microsoft.design/color

关键启发：
- Neutral、Shared、Brand、Semantic 各有职责。
- Dark Mode 重新调整 saturation / brightness。
- Color token 保持跨体验连续性。

### W3C CSS Color Module Level 4

https://www.w3.org/TR/css-color-4/

关键启发：
- Oklab / OKLCH 用于更接近感知均匀的颜色表达。
- Oklab 适合需要视觉等距的插值；OKLCH 适合需要控制 Chroma/Hue 的混色路径。

## 视觉与感知研究

### Wagemans et al. — Gestalt perceptual grouping review

https://pmc.ncbi.nlm.nih.gov/articles/PMC3482144/

关键启发：proximity、similarity、good continuation、common fate、common region、connectedness 等仍是现代视觉组织研究的重要原则。

### Chalbi et al. — Common Fate for Animated Transitions

https://arxiv.org/abs/1908.00661

关键启发：动态变化本身会制造强分组关系；Motion 不是中性装饰。

### Kominsky et al. — Retinotopic adaptation reveals distinct categories of causal perception

https://pmc.ncbi.nlm.nih.gov/articles/PMC7484022/

关键启发：简单时空运动关系即可产生直接的因果知觉；UI 动画的时间/空间连续会改变人对“谁导致谁”的理解。

### Michotte replication study

https://pmc.ncbi.nlm.nih.gov/articles/PMC12434928/

关键启发：launching、entraining、pulling 等因果印象可以由简单几何运动产生，但不同条件和历史研究结果并不完全一致，因此不要把“物理正确动画”写成硬公式。

## Direct Manipulation 与 Agency

### Shneiderman — Direct Manipulation: A Step Beyond Programming Languages

DOI: https://doi.org/10.1109/MC.1983.1654471

公开作者索引：https://www.cs.umd.edu/~ben/publications.html

关键启发：可见对象、直接动作、快速增量反馈、可逆操作与立即可见的结果。

### Shneiderman — Direct manipulation for comprehensible, predictable and controllable user interfaces

https://doi.org/10.1145/238218.238281

关键启发：Direct Manipulation 让界面更可理解、可预测、可控制。

### The experience of agency in human-computer interactions: a review

https://pmc.ncbi.nlm.nih.gov/articles/PMC4140386/

### The sense of agency in emerging technologies for human–computer integration: A review

https://pmc.ncbi.nlm.nih.gov/articles/PMC9511170/

关键启发：输入可靠性、预测结果与实际反馈的匹配会影响用户的控制感。

## Material Perception

### Fleming — Material Perception

https://pubmed.ncbi.nlm.nih.gov/28697677/

### Interactions Between 3D Surface Shape and Material Perception

https://pubmed.ncbi.nlm.nih.gov/38848608/

### Translucency perception: A review

https://pmc.ncbi.nlm.nih.gov/articles/PMC8340651/

关键启发：材质知觉依赖 illumination、shape、surface、gloss、translucency 等联合线索；UI 材质虽非真实物理材质，但互相矛盾的线索仍容易显得“假”。
