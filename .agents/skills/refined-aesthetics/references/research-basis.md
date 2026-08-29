# 高级感设计：研究与工程依据

## 目录

1. 研究结论如何使用
2. Processing fluency
3. Visual complexity 与 prototypicality
4. VisAWI：Simplicity / Diversity / Colorfulness / Craftsmanship
5. Structure 与 Color 的不同作用
6. GitHub 设计系统的工程化证据
7. 对 pzhown_dot_cn 的转译

## 1. 研究结论如何使用

这些研究用于解释设计方向，不用于制造伪科学硬规则：

- 不从论文直接推导固定 px、radius、色相或动画时长。
- 不把实验中的总体偏好写成所有产品/文化/用户都必须遵守的定律。
- 具体实现仍服从内容、可访问性、输入方式、品牌和产品语境。

## 2. Processing fluency

Reber, Schwarz & Winkielman (2004) 提出 processing fluency 框架：对象越容易被感知系统处理，通常越容易获得积极审美反应。其综述涉及 figure-ground contrast、symmetry、prototypicality、repetition 等影响流畅性的因素。

来源：
- R. Reber, N. Schwarz, P. Winkielman. *Processing Fluency and Aesthetic Pleasure: Is Beauty in the Perceiver's Processing Experience?* Personality and Social Psychology Review, 2004.
- DOI: https://doi.org/10.1207/S15327957PSPR0804_3

项目转译：

- 高级感首先来自低视觉摩擦和容易预测的规则。
- 一致性不是为了“整齐”，而是减少重新学习和重新解释。
- 熟悉骨架 + 有限创新通常比全界面反常规更稳定。

## 3. Visual complexity 与 prototypicality

Tuch et al. (2012) 用网站截图实验研究 visual complexity (VC) 与 prototypicality (PT)。两者在极短曝光时间内就会影响审美判断；总体上 low VC + high PT 的网站获得较高吸引力评价。

来源：
- A. N. Tuch, E. E. Presslaber, M. Stöcklin, K. Opwis, J. A. Bargas-Avila. *The role of visual complexity and prototypicality regarding first impression of websites.* International Journal of Human-Computer Studies 70(11), 2012.
- DOI: https://doi.org/10.1016/j.ijhcs.2012.06.003

项目转译：

- 第一眼的结构轮廓和噪声水平非常重要。
- 降低“无组织复杂度”，不等于减少真实内容。
- 常见组件模式可作为稳定骨架，把品牌差异放在有限区域。

## 4. VisAWI：四个审美维度

Moshagen & Thielsch (2010) 通过多项研究建立 Visual Aesthetics of Websites Inventory (VisAWI)，将网页视觉审美归纳为四个可区分但相关的维度：

- Simplicity
- Diversity
- Colorfulness
- Craftsmanship

其中 Craftsmanship 指设计维度是否被熟练、连贯地整合，最接近产品语境中的“完成度 / 精致度”。

来源：
- M. Moshagen, M. T. Thielsch. *Facets of visual aesthetics.* International Journal of Human-Computer Studies 68(10), 2010.
- DOI: https://doi.org/10.1016/j.ijhcs.2010.05.006

项目转译：

- 高级不等于纯极简，因为 Diversity 也是审美维度。
- 高级感更接近“稳定秩序 + 有限变化 + 高 craftsmanship”。
- 组件状态、baseline、optical alignment、density、dark mode 等细节属于 craftsmanship。

## 5. Structure 与 Color 的不同作用

Seckler 等后续实验将 symmetry、visual complexity 与 hue、saturation、brightness 分开研究，并比较它们对 VisAWI 各维度的影响。结构变量广泛影响 simplicity、diversity、craftsmanship；颜色变量对 colorfulness 的影响更直接。

来源：
- S. Seckler et al. *Linking objective design factors with subjective aesthetics: An experimental study on how structure and color of websites affect the facets of users' visual aesthetic perception.* Computers in Human Behavior, 2015.
- https://www.sciencedirect.com/science/article/pii/S0747563215001776

项目转译：

- 结构乱时，换“高级灰”“Apple 蓝”“黑金”通常治标不治本。
- 优先修 layout / spacing / hierarchy / complexity，再调整 palette。

## 6. GitHub 设计系统的工程化证据

### Radix Themes

仓库：
- https://github.com/radix-ui/themes

值得借鉴的不是视觉风格，而是约束方式：

- 独立管理 color、radius、shadow、space、typography、scaling token。
- spacing 使用有限 scale，而不是组件各自随机取值。
- scaling 本身被建模成系统参数（如 90% / 95% / 100% / 105% / 110%），说明 density 可以整体映射，而不是页面级乱缩放。

对应源码：
- `packages/radix-ui-themes/src/styles/tokens/space.css`
- `packages/radix-ui-themes/src/styles/tokens/scaling.css`
- `packages/radix-ui-themes/src/styles/tokens/radius.css`
- `packages/radix-ui-themes/src/styles/tokens/shadow.css`
- `packages/radix-ui-themes/src/styles/tokens/typography.css`

### GitHub Primer Primitives

仓库：
- https://github.com/primer/primitives

仓库本身将 color、typography、spacing primitives 作为独立 design-token 数据维护。

项目转译：

- 高级感需要由 primitive / semantic token / component state 长期维护。
- 页面层不应反复重新发明颜色、spacing、radius 和状态规则。

### Adobe Spectrum Design Data

仓库：
- https://github.com/adobe/spectrum-design-data

Spectrum 2 将 tokens、component schemas、mode sets、guidelines、registry、validation 等作为 canonical design data 管理。

项目转译：

- 成熟设计最终应从“设计师感觉”变成可版本化、可校验、可复用的系统约束。
- Craftsmanship 不应依赖每次人工补丁，而应尽量收敛到 token、component API 和规范。

## 7. 对 pzhown_dot_cn 的转译

将研究与仓库现有 Skills 合并后，优先级为：

```text
1. readability / semantics
2. spatial order / hierarchy
3. interaction completeness
4. craftsmanship / system consistency
5. neutral + surface hierarchy
6. material / motion polish
7. limited signature differentiation
```

现有 Skill 分工：

- `perceptual-reading`：阅读稳定性与低视觉负荷。
- `spatial-composition`：距离、视觉重量、negative space、attention flow。
- `interaction-affordance`：控件语义与状态。
- `adaptive-layout`：空间和输入方式变化时重新映射结构与 density。
- `perceptual-naturalness`：连续性、自然性、因果和材质一致性。
- `apple-design`：Neutral、surface、radius、shadow、blur、glass 的最终语言。
- `inclusive-accessibility`：横向可访问性约束。

因此“高级感”不再作为单一视觉效果，而是这些约束完成后的综合感知结果。
