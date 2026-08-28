# 阅读体验实现指南

## CSS 优先

优先使用：

- `clamp()` 建立流体字号和间距。
- `max-inline-size` 控制阅读测量，使用逻辑属性支持不同书写方向。
- Container Queries 根据内容容器而不是整个 viewport 调整排版。
- `text-wrap: balance` 仅用于标题等短文本；正文保持自然换行。
- `overflow-wrap: anywhere` 或更精细策略处理极长 URL/代码标识符，避免破坏页面宽度。
- `font-size-adjust`、合理 fallback 和系统字体栈降低字体加载变化。

## 推荐结构

```text
article-shell
├── article-header        元数据与标题
├── reading-grid
│   ├── article-body      阅读核心
│   └── toc/notes         宽屏辅助层
└── article-footer        作者、关联内容、导航
```

正文与媒体至少区分：

- `--measure-reading`: 正文测量。
- `--measure-wide`: 图表、代码、表格和重点媒体。
- `--measure-stage`: 需要沉浸式呈现的宽媒体，可受页面容器约束。

不要把这些值理解成固定像素；根据实际页面和语言测试后定义 token。

## 透明材质

- 正文主表面优先稳定、不透明或足够高的不透明度。
- Blur 可用于 sticky TOC、浮动工具栏、导航或临时 overlay，但不要降低文字边缘清晰度。
- 动态背景经过正文时必须提供稳定的阅读 surface。

## 代码与表格

- 代码块允许局部水平滚动，不让整页横向滚动。
- 长代码块提供复制、语言标识和必要时折叠，而不是缩小字体塞进去。
- 表格在窄屏优先局部滚动或语义重排，避免把文字压到不可读。
