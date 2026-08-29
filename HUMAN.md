# PzHown Blog 人类导览

这是给人看的中文项目地图。它只负责让你快速理解项目架构、设计决策链，以及每一类详细规范应该去哪里看。

## 一句话理解项目

这是一个现代、跨设备、内容优先的个人博客：公共前台使用 Astro，内容与后台使用 Next.js + Payload，共享组件集中在 `@pzhown/ui`，设计规则由 `DESIGN.md` 与项目级 Skills 共同维护。

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

- `apps/web`：公共博客前台。Astro-first，静态内容优先，只有真正需要状态时才使用 React Island。
- `apps/cms`：Payload CMS、Admin、API 与后续自定义后台业务界面。
- `packages/ui`：React Aria、Motion、标准圆角、Progressive Blur、颜色 Token 等共享 UI 能力。

更具体的安装、运行与代码结构看 [`README.md`](./README.md)。正式设计契约看 [`DESIGN.md`](./DESIGN.md)。Agent 执行规则看 [`AGENTS.md`](./AGENTS.md)。

## 设计决策链

```text
内容是什么
  ↓
怎么读最舒服
  ↓
不同设备怎么排
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
最终长什么样
  ↓
操作以后怎么动
```

`inclusive-accessibility` 与 `perceptual-naturalness` 都横向贯穿全部步骤：前者保证人人可用，后者保证变化符合人的感知与因果预期。

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
| Apple-inspired 视觉语言 | [`apple-design/HUMAN.md`](./.agents/skills/apple-design/HUMAN.md) | [`SKILL.md`](./.agents/skills/apple-design/SKILL.md) |
| 交互与动效 | [`interaction-motion/HUMAN.md`](./.agents/skills/interaction-motion/HUMAN.md) | [`SKILL.md`](./.agents/skills/interaction-motion/SKILL.md) |
| 感知自然性 | [`perceptual-naturalness/HUMAN.md`](./.agents/skills/perceptual-naturalness/HUMAN.md) | [`SKILL.md`](./.agents/skills/perceptual-naturalness/SKILL.md) |
| 包容性与可访问性 | [`inclusive-accessibility/HUMAN.md`](./.agents/skills/inclusive-accessibility/HUMAN.md) | [`SKILL.md`](./.agents/skills/inclusive-accessibility/SKILL.md) |

## 怎么读这些文档

第一次了解项目：先看本页，再看 `README.md`。

准备做 UI：先看 `DESIGN.md`，进入最相关的 Skill `HUMAN.md`；需要精确执行规则时再看对应 `SKILL.md` 和 `references/`。

每个 Skill 的 `HUMAN.md` 顶部都可以横跳到其他 Human Guide。

准备改架构：先看 `README.md` 与实际 `apps/*`、`packages/*` 代码，不要把设计 Skill 当架构文档。

## 文档职责

- `HUMAN.md`：给人看的中文导览。
- 每个 Skill 的 `HUMAN.md`：解释这个 Skill 为什么存在、管什么、不管什么。
- `README.md`：项目使用与技术说明。
- `DESIGN.md`：全项目正式设计契约。
- `AGENTS.md`：Agent 应如何选择和组合 Skills。
- `SKILL.md`：给 Agent 执行的精确规则。
