# 设备与输入能力

## 不要把设备类别当能力

使用：

- `@media (hover: hover)`：存在 hover 能力。
- `@media (pointer: fine)`：主要指针适合精细操作。
- `@media (pointer: coarse)`：主要指针更适合大命中区。
- `prefers-reduced-motion`：用户希望减少运动。
- `prefers-contrast`：支持时增强可辨识度。

不要因为 viewport 宽就假定鼠标，也不要因为窄就假定触控。

## 命中区

- 满足 WCAG 2.2 Target Size (Minimum) 的要求或合法例外。
- 高频手机操作优先提供更宽松的有效命中区，不只扩大图标视觉尺寸。
- 紧凑桌面工具栏仍需保持键盘 focus 和可辨识状态。

参考：
- WCAG 2.2 Target Size Minimum: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG 2.2 Target Size Enhanced: https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html

## 安全区域与动态视口

- iOS/Android 全屏页面考虑 `env(safe-area-inset-*)`。
- 高度敏感布局优先 `svh/dvh/lvh` 中适合场景的单位，不盲目使用 `100vh`。
- 固定底栏需要考虑虚拟键盘和浏览器 UI。
