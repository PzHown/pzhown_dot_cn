# PzHown Blog Design System

## 目标

本项目要构建一套现代、跨设备、内容优先的个人博客体验。

设计不以“看起来像某个平台”为目标，而以以下结果为目标：

1. **内容最先被理解**：用户应先看到文章、作品和观点，而不是 UI 框架。
2. **人眼自然舒适**：降低视觉搜索、认知判断和精确操作负担，适合长时间阅读。
3. **跨设备连续**：手机、平板、桌面和可变窗口保持同一信息层级，但允许空间结构和交互方式自适应。
4. **先进但克制**：使用现代 CSS、React Aria、Motion、View Transitions、Progressive Blur 等能力时，必须服务于内容、状态和空间关系。
5. **渐进增强**：没有高级 CSS、动画或 JS 时，核心内容、导航和语义仍然成立。

## 设计优先级

任何设计冲突按以下顺序取舍：

```text
内容与语义
    ↓
阅读舒适与可访问性
    ↓
信息层级
    ↓
跨设备布局
    ↓
视觉语言
    ↓
交互与动效
    ↓
装饰与氛围
```

低层级目标不得破坏高层级目标。

## Skill 分工

### `perceptual-reading`

负责阅读舒适、正文排版、行长、字号、行高、段落节奏、深色阅读、视觉负荷和长文体验。

### `content-presentation`

负责内容语义与版式：正文、引用、代码、图片、表格、脚注、目录、元数据、相关推荐等如何呈现。

### `adaptive-layout`

负责跨设备与可变窗口布局，遵循“适配而不是缩小”，使用内容崩坏点、Container Queries 和输入能力驱动布局变化。

### `apple-design`

负责视觉语言：层级、材质、色彩、Squircle、留白、阴影、透明度和 Apple-inspired 的克制感。它不是阅读、布局和动效的最高级规范。

### `interaction-motion`

负责高级交互与动效：空间连续性、状态反馈、Presence、共享元素、手势和 View Transitions。

## 技术设计约束

- 公共前台保持 Astro-first；静态内容不要因为动效或样式无意义 React 化。
- 需要复杂交互状态时使用 React Aria Components。
- Motion 用于 spring、presence、layout、gesture；简单状态优先 CSS。
- `@pzhown/ui` 是共享组件和视觉 token 的唯一优先入口；不要在页面里重复造基础控件。
- 圆角优先使用现有 `corner-shape: squircle` 体系。
- 自定义色彩优先使用 OKLCH/Oklab 和语义 token。
- Progressive Blur 仅用于建立上下文和空间层级，不能成为大面积阅读背景。
- Payload 原生 Admin 不做全局重皮；自定义业务界面才使用项目设计系统。

## 内容优先规则

- 文章不是 Dashboard，不把所有内容做成 Card。
- 去掉背景、边框和阴影后，信息层级仍应成立。
- 文章首屏优先回答“这是什么、为什么值得读、从哪里开始”。
- 宽屏多余空间用于留白、目录、注释和媒体，不无限拉宽正文。
- 正文周围减少持续动画、高对比装饰和大面积透明材质。
- 图片、代码、表格、引用等由内容类型决定版式，不由组件统一外观决定。

## 跨设备规则

- Breakpoint 由内容崩坏点产生，不机械按设备型号分类。
- 组件优先使用 Container Queries 对自身容器负责。
- 手机、平板、桌面保持相同信息优先级，但可以使用不同的导航、目录、侧栏和信息密度。
- Touch、hover、fine pointer、coarse pointer 分别判断，不把屏幕宽度等同于输入能力。
- 浏览器任意宽度、200% 文本缩放和系统字体变化下仍应保持可用。

## 动效规则

动效优先级：

```text
空间连续性
> 状态反馈
> 操作反馈
> 注意力引导
> 氛围装饰
```

- 动画必须解释变化，不给所有 Card、Section 和按钮无差别加动画。
- 页面阅读区域的动效密度低于首页实验区或作品展示区。
- 允许中断，不能让用户等待动画结束才能继续操作。
- Reduced Motion 下移除大范围移动、视差和弹性 overshoot，但保留必要状态反馈。

## 视觉语言

- 采用 Apple-inspired，而不是 Apple clone。
- 使用排版、留白、材质和空间建立层级，减少“每块一圈灰边框”。
- Squircle、Smooth Gradient、Progressive Blur 是工具，不是必须出现的装饰。
- 玻璃/透明材质只在需要保留上下文或表达前后层级时使用。
- 深色模式重新验证亮度、对比和眩光，不简单反色。

## 设计审查顺序

每次重要 UI 任务按此顺序审查：

1. 内容和语义是否正确？
2. 阅读是否舒适，视觉负荷是否合理？
3. 信息层级是否脱离 Card/边框也成立？
4. 窄屏、平板、宽屏和可变窗口是否自然？
5. React Aria 的键盘、触控、focus、selected、disabled 是否完整？
6. 视觉语言是否统一且克制？
7. 动效是否解释变化且支持 reduced motion？
8. Astro hydration、图片、Blur、动画是否带来不必要性能成本？
9. 是否优先复用了 `@pzhown/ui` 和现有 token？

## 参考理念来源

项目 Skill 的规则参考并转译以下公开资料，不复制其受版权保护内容：

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
- Vercel Agent Skills: https://github.com/vercel-labs/agent-skills
- Anthropic frontend-design Skill: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Visual comfort review: https://pmc.ncbi.nlm.nih.gov/articles/PMC10512131/
- Font/display size reading study: https://pmc.ncbi.nlm.nih.gov/articles/PMC7720185/
- Typography and eye movements in web reading: https://pubmed.ncbi.nlm.nih.gov/31481744/
