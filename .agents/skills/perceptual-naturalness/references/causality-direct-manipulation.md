# 因果知觉与直接操控

## Direct Manipulation

Shneiderman 对 Direct Manipulation 的经典描述强调：

- 对象和动作可见。
- 使用直接动作而不是复杂命令语法。
- 操作快速、增量、可逆。
- 结果对对象立即可见。

这些原则仍然适用于触控、拖拽、滑动、缩放、排序和现代图形界面。

## Sense of Agency

HCI 研究显示，用户的 sense of agency 与输入是否可靠、结果是否符合预期、系统反馈是否匹配动作有关。

项目规则：

- 用户应能感到“是我的动作导致了这个结果”。
- 辅助、预测、自动吸附不能突然改变用户意图。
- 反馈延迟或结果不匹配时，必须补充明确系统状态。
- 自动化越强，越要保留取消、撤销、修正和结果可解释性。

## Causal Perception

视觉因果研究中的 launching effect 表明：空间接触、时间连续和运动关系可以让人直接感知因果，而不只是事后推理。

UI 转译：

- 动作和反馈尽量发生在接近的时间窗口内。
- 反馈从相关对象或区域出现。
- 如果结果与触发位置相距很远，用空间过渡、状态提示或导航上下文连接它们。
- 不用同时发生的无关动画制造错误因果。

## Drag / Swipe / Resize

连续操控：

```text
input delta
→ visible delta
→ constraint / snap
→ release
→ optional settling
```

- 前三步尽量保持可预测映射。
- Snap 可以非线性，但阈值和吸附强度应避免突然夺权。
- Release 后的惯性与用户释放速度有关系时更自然；不需要每次都惯性。
- 边界碰撞可以有阻尼/限制感，但不要让视觉对象穿过不可穿越边界再弹回，除非这是明确语义。

## 与 System Feedback 的关系

自然因果只负责“动作与结果像同一事件”。

如果结果需要等待：

- 由 `system-feedback` 表达 Pending / Progress / Success / Error。
- 不要为了保持动画连续而伪造已经完成的结果。
- Optimistic UI 只有在失败可安全恢复时使用。
