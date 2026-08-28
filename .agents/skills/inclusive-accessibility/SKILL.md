---
name: inclusive-accessibility
description: 作为所有通用 Web/App 设计 Skill 的横向可访问性基线。用于语义结构、键盘、Focus、屏幕阅读器、可访问名称、对比度、非颜色线索、缩放与 Reflow、触控目标、替代输入、Reduced Motion、状态公告、错误可理解性或任何需要保证不同视觉、运动、认知与输入能力用户都能完成核心任务的设计与实现。此 Skill 不决定产品视觉风格或业务流程，而是约束其他 Skill 的输出。
---

# 包容性与可访问性基线

把可访问性作为设计输入，而不是上线前补丁。它横向约束内容、布局、导航、交互、反馈、视觉与动效。

## 核心原则

- **语义先于 ARIA 补丁**：能用原生 HTML/平台语义就不要用自定义角色模拟。
- **多通道表达**：关键状态、选择、错误和交互性不能只依赖颜色、声音、位置或动画单一通道。
- **键盘与触控都成立**：不把 Hover、细指针或精确点击当成唯一输入方式。
- **Focus 是导航信息**：不能为了视觉简洁隐藏 Focus-visible。
- **缩放后仍可完成任务**：字体放大、Reflow、系统字体变化时不裁切核心内容。
- **减少运动不等于减少反馈**：Reduced Motion 下保留状态因果关系。
- **可理解性属于可访问性**：错误、标签、状态和下一步要明确。

## 工作流程

1. 先使用正确语义元素和结构。
2. 确认所有核心操作可通过键盘和至少一种非精确指针输入完成。
3. 确认 Focus 顺序与视觉/阅读顺序一致，Focus-visible 清楚且不被裁切。
4. 检查文本、非文本 UI 与状态的对比和非颜色冗余线索。
5. 检查缩放、Reflow、长文本、系统字体替换下是否丢失内容或操作。
6. 检查 icon-only、图片、表单与动态状态是否具有可访问名称/替代信息。
7. 检查 loading、error、success 等动态状态是否能被辅助技术感知，又不会产生公告噪声。
8. 检查 Reduced Motion 下是否保留必要反馈与空间关系。
9. 不要求业务团队额外创建“无障碍版本”；优先让同一产品结构本身可访问。

## 横向职责

### Perceivable

- 文本保持可读对比。
- 非颜色线索补充选择、错误、成功和交互状态。
- 图片与有意义图标提供等价文本信息。
- 透明/Blur 背景不能破坏前景可读性。

### Operable

- 核心功能键盘可达。
- Focus 顺序稳定。
- 命中区域与控件间距适应触控和运动能力差异。
- 不设置无法退出的键盘陷阱。
- 时间限制与自动变化不得无必要剥夺控制权。

### Understandable

- 标签、导航和错误表达一致。
- 状态变化可预测。
- 输入错误说明原因和修复方向。
- 不依赖用户记忆隐藏规则。

### Robust

- 优先原生 HTML 与成熟可访问组件。
- React Aria 等组件负责底层语义时，不重复构造冲突 ARIA。
- DOM 顺序、可访问树和视觉顺序避免产生严重分歧。

## 项目默认最低标准

- 普通文本目标至少满足 WCAG AA 对比要求；大文本/非文本 UI 按对应标准处理。
- Focus-visible 必须清楚可见。
- 独立交互控件优先提供舒适触控命中区域；紧凑视觉尺寸可通过不可见 hit area 扩展。
- 200% 文本缩放与常见 Reflow 场景下核心任务不能失效。
- 不以 `outline: none`、`tabindex=-1`、ARIA role 滥用换取视觉效果。

## 边界

本 Skill 是约束层，不取代其他 Skill：

- 阅读参数：`perceptual-reading`。
- 布局结构：`adaptive-layout`。
- 导航信息架构：`navigation-wayfinding`。
- 交互 signifier：`interaction-affordance`。
- 系统状态反馈：`system-feedback`。
- Motion：`interaction-motion`。
- 最终视觉语言：`apple-design`。

## 参考资料

- 感知：`references/perceivable.md`。
- 操作：`references/operable.md`。
- 可理解与健壮：`references/understandable-robust.md`。
- 输入与适配：`references/adaptive-input.md`。
- 来源：`references/research-basis.md`。
