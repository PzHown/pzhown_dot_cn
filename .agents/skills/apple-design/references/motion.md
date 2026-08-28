# 动效规范

## 原则

- 只为反馈、连续性、状态变化、空间关系或注意力引导添加动画。
- 高频操作的反馈要短促，不让用户等待动画结束。
- 动画必须可中断；状态更新优先于动画完整播放。
- 进入与退出保持空间逻辑一致：从哪里出现，通常就向相关方向退出。
- 避免持续摆动、无意义漂浮、背景大幅移动等干扰内容的效果。

## 项目默认分工

- CSS：hover、focus、颜色、opacity、小幅 transform。
- Motion：spring、layout、presence、gesture、共享元素、复杂时间关系。
- Progressive Blur：只负责材质/景深，不承担动画状态机。

## 推荐节奏

以下是项目默认范围，不是 Apple 官方硬编码时长：

- 微反馈：约 120–180ms。
- Popover/Menu/Tooltip：约 140–220ms。
- Dialog/Sheet/页面局部过渡：约 220–360ms。
- Spring：优先使用低回弹或轻回弹，避免“果冻式”过冲。

如果用户的直接操作已经提供强反馈，减少额外动画。

## 状态模式

### Button

- hover：轻微明暗/材质变化，可选极小上浮。
- pressed：建议 `scale(0.97–0.99)` 或轻微压低，不要明显跳动。
- release：使用短 spring 返回，避免长尾。

### Dialog / Popover

- opacity + 小幅 scale/translate 即可。
- transform origin 尽量与触发点或空间来源一致。
- backdrop 动画比内容稍柔和，但不要拖得更久。

### Tabs / Selection

- 需要连续感时使用 `layoutId` 或 transform indicator。
- indicator 不应在跨很远距离时慢速滑过整屏；大跨度时可直接淡入或缩短动画。

## Reduced Motion

必须支持 `prefers-reduced-motion: reduce`：

- 去掉大幅位移、缩放、旋转和视差。
- 保留必要的 opacity、instant state 或极短反馈。
- 不依赖动画作为唯一信息通道。

## 性能

- 优先 transform/opacity。
- 大面积 backdrop-filter、mask 与持续动画组合需要谨慎。
- 滚动时避免大量独立 blur layer 同时重绘。
- 动画前后不要改变用户当前滚动位置或焦点上下文。

## 官方参考

- Motion：https://developer.apple.com/design/human-interface-guidelines/motion
- Accessibility：https://developer.apple.com/design/human-interface-guidelines/accessibility
