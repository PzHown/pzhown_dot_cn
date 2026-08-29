# PzHown Blog 人类导览

这是给人看的中文项目地图。它负责让你快速理解项目架构、UI 体系和设计规则应该去哪里看。

## 一句话理解项目

这是一个现代、跨设备、内容优先的个人博客：公共前台使用 Astro，内容与后台使用 Next.js + Payload，共享 UI 集中在 `@pzhown/ui`，设计规则由 `DESIGN.md` 与项目级 Skills 共同维护。

## 技术架构

```text
访问者
  ↓
apps/web · Astro
  ↓
内容 / API
  ↓
apps/cms · Next.js + Payload
  ↓
SQLite（本地）/ PostgreSQL（生产）

共享 UI：packages/ui · @pzhown/ui
```

- `apps/web`：公共博客前台。Astro-first，静态内容优先，只有真正需要交互状态时才使用 React Island。
- `apps/cms`：Payload CMS、Admin、API 与后续自定义后台业务界面。
- `packages/ui`：**PzHown 自己拥有的 iOS 27 React 组件系统**，以及 Progressive Blur、Oklab / smootherstep Gradient 等独立视觉效果。

## 当前 UI 体系

共享 UI 已经从零重建，不再建立在旧 React Aria / shadcn / aria-nova / Base UI 组件组合上。

设计来源分成两种职责：

1. `seunghan91/ios27-design-system`：唯一视觉基准。系统色、Typography、Spacing、组件尺寸、Liquid Glass 与 Motion 以它和本仓库 `DESIGN.md` 为准。
2. `Andersonlimahw/react-cupertino-ui`：组件结构研究资料。只参考 anatomy、状态归属、组合方式，不使用其视觉主题。

目前核心组件覆盖 Button、TextField、SearchBar、Toggle、Switch、Checkbox、Radio、Slider、SegmentedControl、Page、Toolbar、List、TabBar、Alert、Dialog、Sheet、Popover、ContextMenu。

原来的 `components.css / ios-theme.css / form-controls.css / liquid-glass*.css` 修补链已退出。缺少组件时应按照新规则新增，而不是恢复旧组件。

## 保留的两项旧视觉能力

### Progressive Blur

用于滚动边缘、上下文和空间过渡。它不是普通组件的默认皮肤，也不应该覆盖长文正文。

### 感知渐变

保留 Oklab interpolation 与 smootherstep 渐变，用于需要平滑色彩连续性的背景或媒体表达。它同样独立于 iOS 27 组件层。

## 设计决策链

```text
内容是什么
  ↓
怎么读最舒服
  ↓
不同空间怎么排
  ↓
空间关系、视觉重心和视线怎么组织
  ↓
我在哪里、怎么去、怎么回来
  ↓
用户需要想多少、记多少、判断多少
  ↓
怎么看出能操作
  ↓
系统操作后如何回应
  ↓
DESIGN.md / iOS 27 最终视觉
  ↓
操作以后怎么动
```

`inclusive-accessibility`、`perceptual-naturalness` 和 `refined-aesthetics` 都横向贯穿全部步骤。

## Skill 人类目录

| 领域 | 人类说明 | Agent 规范 |
| --- | --- | --- |
| 感知阅读 | [`perceptual-reading/HUMAN.md`](./.agents/skills/perceptual-reading/HUMAN.md) | [`SKILL.md`](./.agents/skills/perceptual-reading/SKILL.md) |
| 内容呈现 | [`content-presentation/HUMAN.md`](./.agents/skills/content-presentation/HUMAN.md) | [`SKILL.md`](./.agents/skills/content-presentation/SKILL.md) |
| 跨设备布局 | [`adaptive-layout/HUMAN.md`](./.agents/skills/adaptive-layout/HUMAN.md) | [`SKILL.md`](./.agents/skills/adaptive-layout/SKILL.md) |
| 空间构图 | [`spatial-composition/HUMAN.md`](./.agents/skills/spatial-composition/HUMAN.md) | [`SKILL.md`](./.agents/skills/spatial-composition/SKILL.md) |
| 导航与定向 | [`navigation-wayfinding/HUMAN.md`](./.agents/skills/navigation-wayfinding/HUMAN.md) | [`SKILL.md`](./.agents/skills/navigation-wayfinding/SKILL.md) |
| 认知工效 | [`cognitive-ergonomics/HUMAN.md`](./.agents/skills/cognitive-ergonomics/HUMAN.md) | [`SKILL.md`](./.agents/skills/cognitive-ergonomics/SKILL.md) |
| 交互可供性 | [`interaction-affordance/HUMAN.md`](./.agents/skills/interaction-affordance/HUMAN.md) | [`SKILL.md`](./.agents/skills/interaction-affordance/SKILL.md) |
| 系统反馈 | [`system-feedback/HUMAN.md`](./.agents/skills/system-feedback/HUMAN.md) | [`SKILL.md`](./.agents/skills/system-feedback/SKILL.md) |
| Apple 视觉语言 | [`apple-design/HUMAN.md`](./.agents/skills/apple-design/HUMAN.md) | [`SKILL.md`](./.agents/skills/apple-design/SKILL.md) |
| 高级感与完成度 | — | [`refined-aesthetics/SKILL.md`](./.agents/skills/refined-aesthetics/SKILL.md) |
| 交互与动效 | [`interaction-motion/HUMAN.md`](./.agents/skills/interaction-motion/HUMAN.md) | [`SKILL.md`](./.agents/skills/interaction-motion/SKILL.md) |
| 感知自然性 | [`perceptual-naturalness/HUMAN.md`](./.agents/skills/perceptual-naturalness/HUMAN.md) | [`SKILL.md`](./.agents/skills/perceptual-naturalness/SKILL.md) |
| 包容性与可访问性 | [`inclusive-accessibility/HUMAN.md`](./.agents/skills/inclusive-accessibility/HUMAN.md) | [`SKILL.md`](./.agents/skills/inclusive-accessibility/SKILL.md) |

## 怎么读这些文档

第一次了解项目：先看本页，再看 `README.md`。

准备做 UI：先看 `DESIGN.md`，再进入最相关的 Skill；需要精确执行规则时读取对应 `SKILL.md` 和 `references/`。

准备扩展组件：先检查 `@pzhown/ui` 是否已有对应 primitive。没有时，按 `DESIGN.md` 建立 iOS 27 anatomy、状态和视觉，不从旧 Git 历史复制旧组件。

准备改架构：先看 `README.md` 与实际 `apps/*`、`packages/*` 代码，不要把设计 Skill 当架构文档。

## 文档职责

- `HUMAN.md`：给人看的中文导览。
- `README.md`：项目运行、技术架构与 UI 使用说明。
- `DESIGN.md`：机器可读 token + 中文设计契约，是 UI 视觉事实来源。
- `AGENTS.md`：Agent 应如何选择和组合 Skills，以及实现时不能恢复哪些旧体系。
- `SKILL.md`：给 Agent 执行的精确规则。
- `packages/ui/THIRD_PARTY_NOTICES.md`：iOS 27 视觉来源和结构参考的许可证/职责边界。
