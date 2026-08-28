---
name: interaction-motion
description: 为 pzhown_dot_cn 设计高级但克制的交互与动效系统。用于 Motion、View Transitions、页面切换、共享元素、hover/pressed/focus、Popover/Dialog/Menu 出入场、Tabs、手势、拖拽、滚动联动、空间连续性、微交互或任何动画任务。核心原则是“动画解释变化”：优先状态反馈、空间关系和操作因果，不为炫技让所有元素持续运动；所有高级效果必须可中断、渐进增强、尊重 reduced motion 并保护阅读与性能。
---

# 交互与动效规范

把 Motion 当作信息层，而不是装饰层。先进交互应让用户更容易理解“发生了什么、元素去了哪里、下一步能做什么”。

## 动效优先级

按以下顺序判断是否值得加入动画：

1. **空间连续性**：解释页面、卡片、目录、overlay 之间的空间关系。
2. **状态反馈**：确认 pressed、selected、loading、success、error、drag 状态。
3. **操作反馈**：响应点击、拖拽、展开和排序。
4. **注意力引导**：短暂引导用户看到真正重要的新变化。
5. **氛围与装饰**：只有不竞争内容、不持续消耗注意力时才使用。

低优先级效果不得破坏高优先级体验。

## 工作流程

1. 写清动画前后的两个状态和用户需要理解的变化。
2. 如果 CSS transition 足够，优先 CSS；需要 spring、presence、layout、gesture 或共享元素时使用 Motion。
3. 页面级导航优先考虑原生 View Transitions / Astro 能力，并提供无动画降级。
4. 选择最少的运动属性。优先 `transform`、`opacity`，避免高频 layout thrashing。
5. 确保动画可被新操作中断，不让用户等待动画结束才能继续操作。
6. 为 `prefers-reduced-motion` 设计真正的降级状态，不只是把 duration 改成 1ms。
7. 在手机触控和桌面键鼠分别测试，不让 hover 成为必要交互。
8. 联合 `perceptual-reading` 检查动画是否打扰阅读。

## 动效不变量

- 不给所有 Card 默认 `hover: scale()`；如果没有状态或空间意义，就不要动。
- 不给所有 section 默认 scroll reveal；内容进入视口不是值得反复动画的状态变化。
- 按钮 pressed 反馈要快且小，不制造明显位移导致指针目标漂移。
- Overlay 出入场应表达来源/层级，避免所有组件统一从 `scale(.95)` 凭空出现。
- Shared element 只用于用户能理解的同一对象延续，例如文章卡片标题/封面到文章页。
- 滚动联动效果必须允许用户保持阅读控制权；不要劫持滚动或加入不可预测惯性。
- 大面积 blur、filter、box-shadow 动画谨慎使用，避免持续 GPU 成本和文字采样不稳定。
- 高频交互比营销展示更克制。博客阅读页动效密度低于作品展示或首页特效区。
- 动效 token 表达意图而不是组件名，例如 `motion-feedback-fast`、`motion-overlay`、`motion-spatial`。

## 时间与物理感

不要把单一 duration/spring 用遍全站。可从以下范围开始，再根据距离与对象质量调整：

- 微反馈：约 100–180ms。
- 小型状态切换：约 160–260ms。
- Overlay / 局部空间变化：约 180–320ms。
- 页面或大型共享元素：约 260–450ms。

Spring 优先通过“响应速度 + 阻尼感”判断，不追求弹跳本身。阅读型界面通常接近临界阻尼或轻微欠阻尼，避免明显来回弹跳。

## 设计审查

- 去掉动画后功能是否仍完整？
- 动画是否让空间关系更清楚，而不是只让页面更忙？
- 同一屏同时运动的对象是否过多？
- 用户能否在动画中途继续点击、滚动或关闭？
- Reduced Motion 下是否保留状态反馈且没有大范围位移？
- 60/120Hz 屏幕与中端移动设备上是否流畅？
- 动画期间文字是否保持清晰？

## 参考资料

- 需要建立项目 motion language 时读取 `references/motion-language.md`。
- 需要 Motion / CSS / View Transition 实现选择时读取 `references/implementation.md`。

## 与系统反馈的边界

先由 `system-feedback` 决定 Loading / Success / Error / Progress / Undo 的语义与持续方式；本 Skill 只决定必要的动态呈现，不用动画替代状态说明。
