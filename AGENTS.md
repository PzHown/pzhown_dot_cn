# 项目协作约定

## 设计系统

所有面向用户的 UI、UX、页面、组件、布局、动画和视觉审查任务，都必须遵循项目级 `apple-design` Skill：

`.agents/skills/apple-design/SKILL.md`

执行 UI 任务时：

- 先检查并优先复用 `@pzhown/ui`，不要为单页重复造基础组件。
- 采用 Apple-inspired Web Design System，而不是机械复刻 iOS/macOS。
- 使用排版、留白、材质和层级建立结构，避免默认 shadcn 式“每块一圈灰边框”。
- 圆角优先使用项目全局 `corner-shape: squircle` 体系。
- 色彩与渐变优先使用语义 token、OKLCH/Oklab 和现有 Smooth Gradient 工具。
- 景深与透明材质优先使用现有 Progressive Blur，并控制使用范围和 GPU 成本。
- React 交互底层优先使用 React Aria Components；Motion 用于 spring、presence、layout、gesture。
- Astro 前台保持 Astro-first，仅在真正需要交互状态时使用 React Island。
- Payload 原生 Admin 不做全局重皮，自定义业务 Dashboard 才使用共享设计系统。
- 所有交互必须考虑 hover、pressed、focus-visible、selected、disabled、键盘、触控、暗色模式和 reduced motion。

如任务涉及具体视觉、组件、动效、可访问性或 Web 实现细则，按 `apple-design` Skill 的指引读取对应 `references/` 文件。
