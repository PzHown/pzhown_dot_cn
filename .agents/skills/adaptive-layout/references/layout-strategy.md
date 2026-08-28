# 自适应布局策略

## 从内容流开始

先得到不依赖辅助列也成立的核心顺序：

1. 页面身份/标题。
2. 主要内容。
3. 与当前内容直接相关的导航。
4. 次级元数据和关联内容。
5. 装饰与品牌表达。

再根据可用空间逐层“增加能力”，不要从桌面布局一路删除到手机。

## Container Query 优先场景

- 文章卡片在不同父容器中切换横向/纵向布局。
- 组件自身决定工具栏是否折叠。
- 目录组件根据所在阅读 grid 的空间改变形态。
- 媒体组件根据自身宽度决定图注与操作位置。

Viewport query 更适合：

- 页面级全局导航。
- safe-area / viewport 高度相关结构。
- 输入媒介与系统偏好。

## Grid 设计

优先建立可读的轨道关系：

```css
.article-layout {
  display: grid;
  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, var(--reading-measure))
    minmax(0, 1fr);
}
```

实际项目可采用更复杂的 named lines / subgrid。核心原则是让正文测量稳定，而不是让所有内容平均分栏。

## Progressive Enhancement

先进布局能力必须有自然降级：

- 没有 Container Query 时仍有可用单列流。
- 没有 Subgrid 时不丢内容。
- 没有 View Transition 时导航仍正常。
- JS 未加载时文章与核心导航仍可阅读。
