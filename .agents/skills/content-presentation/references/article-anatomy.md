# 文章页结构

## 推荐顺序

```text
article
├── header
│   ├── breadcrumb/context（需要时）
│   ├── title
│   ├── dek / summary（需要时）
│   └── metadata
├── reading navigation（可选）
├── body
│   ├── prose
│   ├── wide media/code/table
│   └── notes/footnotes
└── footer
    ├── author/context（需要时）
    ├── previous/next
    └── related content
```

## 首屏

首屏优先让用户知道：

1. 这是什么内容。
2. 为什么值得读。
3. 内容从哪里开始。

不要先用巨大导航、作者卡片、标签云、分享栏和装饰 hero 把正文推到屏幕外。

## 目录

- 从真实 heading hierarchy 生成。
- 宽屏可成为侧栏；窄屏转为折叠入口。
- 当前章节指示必须同时支持键盘和滚动状态。
- 不为单层短文章强行显示目录。

## 关联内容

关联内容位于阅读完成之后，视觉权重低于当前文章。推荐算法和卡片样式不得破坏文章结束感。
