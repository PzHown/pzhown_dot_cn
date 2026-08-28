# Link、Text Action 与 Button

## 先判断结果，再决定外观

### Link

使用场景：

- 打开文章、项目、分类、作者页。
- 跳转到页面内锚点。
- 访问外部资源。

使用 `<a href>` 或框架 Link。让浏览器提供真实链接语义、复制地址、在新标签页打开等能力。

### Button

使用场景：

- 提交。
- 打开 Dialog / Popover / Menu。
- 切换状态。
- 复制、收藏、删除、重试。
- 改变当前页面数据或 UI 状态。

使用 `<button>` 或 React Aria 对应组件。

### Text Action

Text Action 只是 Button 的一种视觉变体，不是第三种 HTML 语义。

适合：

- “展开全文”
- “复制链接”
- “清除筛选”
- “重试”

用动词明确结果，避免含糊的“更多”“这里”“点击”。

## Inline Link

正文链接推荐：

- 默认存在细 underline 或等价非颜色线索。
- underline 与文字保持足够间距，避免穿过中文/英文字符主体。
- Hover 时可增强 underline、前景或 decoration thickness。
- Focus-visible 提供独立而清楚的焦点表现。
- Visited 是否区分由信息架构决定；长资料文章可轻度区分已访问链接帮助定位，但不得降低可读性。

不要：

- 只依赖蓝色/Accent 色。
- Hover 才出现唯一 underline。
- 用低对比灰让 Link 比正文更难读。

## Navigation Link

导航的可点击性主要来自：

- 固定/重复位置。
- 导航容器语义。
- 当前项 indicator。
- Hover / focus 的适度 surface 或前景变化。

不要求强制 underline。当前项必须与 hover 临时状态不同。

## 外部链接

- 不默认强制新窗口/新标签页。
- 如果行为确实与普通 Link 不同，要给用户可预期线索。
- 外链图标只在它能降低歧义时出现，不给每个普通外链机械加图标造成噪声。

## Button 视觉层级

建议语义层：

- Primary：区域内最重要动作。
- Secondary：重要但不是默认推进路径。
- Quiet/Ghost：低优先级工具动作。
- Destructive：高风险动作；颜色不是唯一警示线索。

同一区域不要出现多个视觉强度相同的 Primary。

## 参考

- W3C Link Purpose: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html
- W3C G183: https://www.w3.org/WAI/WCAG22/Techniques/general/G183
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines
