# 高级感快速审查矩阵

## 先看 P0：不能用 polish 掩盖的问题

- 阅读困难、对比不足、信息结构不清。
- 控件语义不明确、状态缺失、focus 不可见。
- 响应式结构错误、触控与 fine pointer 密度混为一谈。
- 页面主要任务不清楚。

出现 P0 时，先调用对应基础 Skill，暂停装饰优化。

## P1：最影响“高级感”的问题

### Fluency

- 第一眼是否知道该看哪里？
- 相似对象是否像同一系统？
- 是否有过多边框、Badge、Icon、色块、阴影同时竞争？

### Complexity

- 是否存在“卡片套卡片”？
- 同一视区是否有 3 个以上同强度视觉中心？
- 是否为了非模板感故意破坏常见组件骨架？

### Hierarchy

- 灰度下层级是否仍成立？
- primary / secondary / metadata 是否强弱明确？
- 辅助信息是否因高对比抢过正文或主操作？

## P2：Craftsmanship

- Button / Input / Select / Menu 高度和 baseline。
- Icon 与 label 的光学对齐。
- radius 层级是否统一。
- border / shadow / surface 是否有明确职责。
- default / hover / pressed / focus / disabled / invalid / selected 是否完整。
- light / dark 是否各自校准。
- coarse / fine pointer density 是否合理。
- 是否存在无理由 magic number。

## P3：Signature / polish

只在 P0–P2 成立后检查：

- 是否有 1–2 个可识别 signature。
- Motion 是否增加空间/因果解释，而不是抢注意力。
- Blur / Glass / Gradient 是否有层级语义。
- 品牌差异是否集中，而不是污染每个组件。

## 输出模板

```text
[P1] 输入区域过度分框
现象：Input、Card、section 三层边框叠加。
原因：重复边界提高视觉复杂度，削弱层级，并产生默认组件库感。
方向：保留真实 owner surface；其余用 spacing / surface luminance 分组。
委托：spatial-composition + apple-design
```

不要输出模糊建议，例如“增加高级感”“优化留白”“颜色更高级”。
