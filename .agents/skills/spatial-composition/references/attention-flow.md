# 注意力顺序与视线流动

## 目标

让用户在一个页面或 section 中形成可预测的视觉进入顺序，而不是被多个同强度对象反复拉扯。

## 基本模型

重要内容通常组织为：

```text
Primary anchor
→ Supporting context
→ Main content / Next action
→ Secondary information
```

具体顺序由页面任务决定，不要求所有页面使用同一种 F/Z pattern。

## 页面级

### 首页

常见合理顺序：

```text
Identity / Hero title
→ short description
→ primary article / work
→ recent or secondary content
```

### 文章页

常见合理顺序：

```text
Title
→ dek / summary
→ metadata
→ article body
→ related / references
```

### 作品页

可以让核心作品视觉先于长说明，但仍需要让项目身份和下一步操作可理解。

## Section 级

每个主要 section 也应有局部主次：

- 一个主要 heading / object。
- 相关支持内容。
- 一组次级操作或元数据。

避免在同一 section 同时使用多个大型标题、高饱和按钮、大图和 Badge 作为并列主焦点。

## Attention competition

以下元素容易截断内容路径：

- 高对比大图。
- 大面积品牌色。
- 高饱和 CTA。
- 持续 Motion。
- 强烈 Blur/Glass 边缘。
- Badge / notification cluster。
- 高密度工具栏。

出现竞争时先降低非核心对象的重量，而不是继续增强主内容。

## Desktop 与 Mobile

桌面可以并列多个区域，但主次仍应清楚。

移动端屏幕窄，多个并行重心应优先转成时间顺序：

```text
Desktop
目录 | 正文 | supporting media

Mobile
正文
↓
media
↓
辅助信息
```

不要只是把桌面三列按 DOM 顺序堆叠而保留相同视觉重量。

## Scroll 与视线

长页面的 attention flow 是连续的：

- section 之间用 spacing 明确阶段变化。
- sticky/fixed 元素不能长期成为比正文更强的视觉锚点。
- scroll reveal 不应成为每段内容都必须经过的注意力障碍。
- 重要 CTA 可以在自然阅读节点出现，不要持续浮在正文边缘争夺视线。

## 与 Motion 的关系

Motion 是强注意信号。只有当用户需要理解状态变化或空间关系时才提高其注意权重。

`interaction-motion` 决定怎么动；本 Skill 决定这个运动在整张页面的注意力层级上是否过重。

## 研究依据

- UEyes 数据集覆盖 Web/Desktop/Mobile 等多类 UI，说明不同界面类型存在不同 gaze pattern，不能把单一网页扫描模板视为普遍规律。
- Mobile UI eye-tracking 研究显示 position、text/image 内容和用户预期都会影响注意力，单纯 bottom-up saliency 不足以解释 UI 视线。
- Web visual hierarchy 研究显示 position、color、text style 对注意区域的重要性显著，不能只通过放大对象建立 hierarchy。
