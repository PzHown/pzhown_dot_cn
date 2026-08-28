---
name: adaptive-layout
description: 为 pzhown_dot_cn 设计真正跨设备、跨窗口和跨输入方式的自适应结构。用于响应式页面、手机/平板/桌面布局、Container Queries、Grid/Subgrid、导航呈现重排、侧栏/目录、媒体布局、横竖屏、触控与鼠标差异、安全区域或任何需要在不同尺寸和交互能力下保持内容优先级的任务。遵循“适配而不是缩小”：允许列、pane、导航方式和信息密度随容器与输入能力改变；具体 gap、padding、视觉重量和重心由 spatial-composition 负责。
---

# 跨设备自适应布局

设计同一内容逻辑在不同空间中的最佳**结构**，不把桌面页面按比例缩成手机页面。

## 工作流程

1. 先列出内容优先级和核心任务，不先选 breakpoint。
2. 从最窄可用容器开始建立内容流，再逐步增加辅助列、宽媒体和导航呈现；导航的信息架构先由 `navigation-wayfinding` 确定。
3. 当内容真正“失效”时创建容器断点：文字过短、控件拥挤、导航冲突或辅助列无法成立。
4. 优先 Container Queries；只有页面级环境变化才使用 viewport media query。
5. 检查输入能力：`hover`、`pointer`、键盘、触控、可变窗口和安全区域。
6. 保持阅读层级和导航信息架构一致，允许不同设备使用不同空间结构与导航呈现。
7. 结构确定后联合 `spatial-composition` 重新映射 gap、gutter、negative space、视觉重量与 attention flow。
8. 联合 `perceptual-reading` 检查阅读舒适度，联合 `apple-design` 检查最终视觉语言。

## 布局不变量

- Breakpoint 由内容崩坏点产生，不按“手机 375 / 平板 768 / 桌面 1440”机械分类。
- 组件优先对自己的容器负责，不依赖全局 viewport 猜测使用场景。
- 使用 CSS Grid、Subgrid、Flex、`minmax()`、`clamp()`、逻辑属性和 Container Queries；避免大量 JS 读尺寸后重排。
- 不使用 UA sniffing 判断手机/平板；使用空间与能力查询。
- 同一页面在不同设备保持相同信息优先级，但可以改变目录、导航、侧栏、元数据和辅助操作的呈现方式。
- Touch 不是窄屏的同义词，鼠标也不是宽屏的同义词；输入能力单独处理。
- Hover 只能增强，不能成为发现关键功能的唯一方式。
- Sticky、fixed、浮动控件必须考虑虚拟键盘、安全区域、浏览器工具栏和可缩放文字。
- 极宽屏把多余空间用于留白、辅助信息和媒体，不无限拉宽阅读正文。
- 允许浏览器窗口被任意缩放；桌面窄窗口不能退化成错误布局。
- 本 Skill 决定 **WHERE**；不要在这里把具体 spacing ramp、视觉重心或 optical adjustment 写死，这些属于 `spatial-composition`。

## 文章页参考构图

```text
宽容器：  [目录/注释] [正文] [上下文/留白]
中容器：             [正文] + 可折叠目录
窄容器：             [正文]
                     目录变成轻量入口
```

这是信息关系示例，不是固定三档 breakpoint。每一种结构内部实际的 gutter、section rhythm 和视觉平衡由 `spatial-composition` 决定。

## 设计审查

- 缩放浏览器窗口时，布局是否平滑变化而不是突然跳成另一套页面？
- 每个断点是否有明确的“内容为何需要改变”的理由？
- 手机是否仍优先正文，而不是先看到导航和卡片框架？
- 平板横屏是否有效利用空间，而不是简单变成放大的手机？
- 宽屏是否避免超长正文行？
- 触控命中区、hover、键盘导航是否分别成立？
- 内容变化、长标题和国际化是否会把布局顶坏？
- 重排后是否交给 `spatial-composition` 重新检查关系距离、重心和注意力顺序，而不是沿用桌面 spacing？

## 参考资料

- 需要具体布局模式时读取 `references/layout-strategy.md`。
- 需要处理触控、鼠标、键盘和安全区域时读取 `references/device-input.md`。
