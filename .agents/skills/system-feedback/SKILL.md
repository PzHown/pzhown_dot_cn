---
name: system-feedback
description: 为通用 Web/App 设计系统状态、进度、结果与恢复反馈。用于 loading、pending、progress、skeleton、empty、success、error、partial failure、retry、undo、optimistic UI、destructive confirmation、长耗时任务、后台任务或任何“用户操作后系统正在发生什么、结果是什么、失败后怎么办”的问题。控件 hover/pressed/focus 等局部 signifier 仍由 interaction-affordance 负责；复杂动画由 interaction-motion 负责。
---

# 系统反馈规范

让用户始终理解：系统是否收到操作、正在发生什么、结果是什么、下一步能做什么。

## 核心原则

- **动作必须有结果**：用户操作后尽快确认系统已接收。
- **状态必须可理解**：不要只显示 Spinner，让用户猜系统在做什么。
- **等待不等于冻结**：等待期间保留上下文与可用控制。
- **失败必须可恢复**：错误信息应解释当前影响，并提供下一步。
- **结果比动画重要**：反馈清楚后再决定是否需要 Motion。
- **避免状态竞争**：同一视图不要同时出现多个高注意力 loading / success / error 动画。

## 状态层级

区分：

```text
Control state
→ 局部控件状态，由 interaction-affordance 负责

Operation state
→ 一次操作正在执行 / 成功 / 失败

View state
→ 整个区域 empty / loading / error / partial

Task state
→ 长流程、后台任务或跨步骤进度
```

本 Skill 主要负责后三层。

## 工作流程

1. 确认用户触发的动作和预期结果。
2. 判断操作预期延迟：瞬时、短等待、可感知等待、长任务。
3. 选择最小充分反馈：即时状态、inline progress、区域级 skeleton、明确进度或后台任务状态。
4. 保持原始上下文，避免 loading 覆盖全部页面。
5. 成功时只在结果不明显时额外提示；不要所有成功都弹 Toast。
6. 失败时说明“发生了什么 + 影响什么 + 能做什么”，避免错误代码作为主文案。
7. 对可逆操作优先 Undo；对不可逆高风险操作在执行前确认。
8. 如涉及复杂进出场动画，再调用 `interaction-motion`。

## 等待与进度

- 极短操作：优先即时 pressed/pending 状态，不闪烁 Spinner。
- 短等待：在触发点或局部区域显示 pending，保持布局稳定。
- 内容区域等待：Skeleton 只模拟稳定结构，不伪造最终数据。
- 有可测进度的长任务：使用 determinate progress。
- 无法测进度的长任务：说明正在做什么，并提供取消/离开后的状态策略。
- 不让多个独立 Spinner 同时争夺注意力。

## 成功与失败

成功：
- 结果本身已经明显时，不重复弹“成功”。
- 对重要、异步或跨页面结果，提供持久但不过度打扰的确认。

失败：
- 指明失败范围：本项、当前区域还是整个任务。
- 保留可恢复的数据和输入。
- 提供 Retry、修改输入、返回或联系支持等实际路径。
- Partial failure 不应把已成功部分伪装成全部失败。

## Undo 与确认

- 可逆、低风险操作优先“先执行 + Undo”。
- 不可逆、高风险或涉及权限/支付/永久删除时再使用确认。
- 确认对话框必须说明具体后果，不使用模糊“确定吗”。

## 边界

- 控件自身 Rest/Hover/Pressed/Disabled/Pending signifier：`interaction-affordance`。
- 复杂 Presence、进度过渡和共享元素动画：`interaction-motion`。
- 错误是否由于用户理解负担过高：`cognitive-ergonomics`。
- 可访问状态公告：由 `inclusive-accessibility` 横向约束。

## 参考资料

- 状态语言：`references/status-language.md`。
- 等待与进度：`references/progress-latency.md`。
- 错误与恢复：`references/error-recovery.md`。
- Optimistic UI / Undo：`references/optimistic-undo.md`。
- 来源：`references/research-basis.md`。
