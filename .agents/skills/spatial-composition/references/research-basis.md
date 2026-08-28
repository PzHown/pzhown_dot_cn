# 研究依据与现代设计规范

本 Skill 将公开设计规范与视觉/HCI 研究转译成项目规则，不把任何单一研究结论当作绝对定律。

## 现代设计系统

### Apple Human Interface Guidelines

- Layout: https://developer.apple.com/design/human-interface-guidelines/layout
- Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility

借鉴：negative space、alignment、hierarchy、safe area、跨设备适配和触控舒适性。

### Microsoft Fluent 2

- Layout: https://fluent2.microsoft.design/layout

借鉴：proximity 形成分组、whitespace 可建立层级与 focus、跨平台 spacing ramp。

### Atlassian Design System

- Spacing: https://atlassian.design/foundations/spacing

借鉴：受控 spacing scale、不同空间范围的用途和 optical adjustment。

### Carbon Design System

- Spacing: https://carbondesignsystem.com/elements/spacing/overview/

借鉴：统一 spacing scale；兄弟组件之间的空间应主要由父级 Stack/Layout 管理。

### Adobe Spectrum

- Spacing: https://spectrum.adobe.com/page/spacing/
- Platform scale: https://spectrum.adobe.com/page/platform-scale/

借鉴：组件之间 spacing 与组件内部 padding 的职责区分；不同输入/平台可重新映射密度，而不是全局同比缩放。

### Material / Android Adaptive Layout

- Adaptive guidance: https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout
- Content structure: https://developer.android.com/design/ui/mobile/guides/layout-and-content/content-structure

借鉴：margin、pane、spacer、component padding 的结构分工；窗口变化时重新组合而不是简单缩放。

## 学术研究

### Proximity / Gestalt grouping

视觉知觉研究长期支持 proximity 对早期分组的重要作用：相近对象更容易被感知为同一组。项目因此把 spacing 视为信息结构，而不是纯审美参数。

### Visual balance

Frontiers in Psychology 2016：
https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2016.00335/full

研究比较多种客观构图平衡指标，perceptual center-of-mass 对平衡判断具有一定预测价值，但不能单独解释审美偏好。因此本项目使用“视觉重心”作为推理模型，不编造物理公式。

### Visual weight in interface layout

International Journal of Human–Computer Interaction 2023：
https://www.tandfonline.com/doi/abs/10.1080/10447318.2023.2289294

研究视觉重量与界面构图，支持对比、形状、方向等因素会改变感知重量和平衡。

### Visual hierarchy on webpages

Computers in Human Behavior 2018：
https://www.sciencedirect.com/science/article/pii/S0747563218301195

研究表明 position、color、text style 等特征对用户首先注意的区域具有重要影响，不能把 visual hierarchy 简化成“越大越重要”。

### UI eye tracking

UEyes / Aalto University：
https://userinterfaces.aalto.fi/ueyeschi23/

数据覆盖 Web、Desktop、Mobile 等多种 UI，支持不同界面类型有不同 gaze pattern，不宜套用单一 F/Z scan pattern。

Mobile UI eye-tracking：
https://arxiv.org/abs/2101.09176

支持位置、文本/图像内容和用户经验会共同影响 mobile UI 注意力，单纯 bottom-up saliency 不足以解释实际 gaze。

### Visual complexity

网页视觉复杂度研究显示无组织的复杂度会增加视觉搜索和认知负荷，但信息丰富不等于必然复杂。项目因此追求“组织良好的丰富度”，而不是简单把所有页面做得极空。

## 如何使用这些研究

- 研究提供方向和约束，不提供万能像素值。
- 不把一个实验样本直接写成全项目硬编码。
- 遇到内容、语言、输入方式或设备差异时，优先服从项目的内容优先和可访问性目标。
- 如果科学证据与具体产品语境不完全一致，保留透明的设计判断，不制造“论文证明必须这样”的表述。
