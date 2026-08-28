'use client'

import * as React from 'react'
import { componentDemos } from './ComponentDemos'
import { categories, componentDocs } from './catalog'

const labCss = `
  .component-document {
    --lab-sidebar-width: 232px;
  }

  .component-document [data-lab-state='focus'] [data-slot]:not(.pzhown-button):not(.pzhown-switch):not(.pzhown-tabs-trigger) {
    outline: 2px solid color-mix(in oklab, var(--ring), transparent 30%);
    outline-offset: 2px;
  }

  .component-document [data-lab-state='invalid'] [data-slot]:not(.pzhown-input) {
    border-color: color-mix(in oklab, var(--destructive), transparent 45%);
  }

  .component-document [data-lab-state='disabled'] [data-slot] {
    opacity: .5;
  }

  .component-document [data-component] {
    scroll-margin-top: 24px;
  }

  @media (max-width: 1023px) {
    .component-document {
      --lab-sidebar-width: 0px;
    }
  }
`

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="tw:size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  )
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="tw:size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="tw:size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  )
}

function ComponentCard({ id }: { id: string }) {
  const doc = componentDocs.find((item) => item.id === id)
  if (!doc) return null
  const Demo = componentDemos[id]

  return (
    <article
      id={doc.id}
      data-component={doc.id}
      className="tw:rounded-[28px] tw:border tw:border-border/80 tw:bg-card/72 tw:shadow-[0_12px_44px_rgb(17_24_39/0.045)] tw:backdrop-blur-xl"
    >
      <header className="tw:grid tw:gap-3 tw:border-b tw:border-border/70 tw:px-5 tw:py-5 tw:md:grid-cols-[minmax(0,1fr)_auto] tw:md:items-start tw:md:px-6">
        <div>
          <div className="tw:flex tw:flex-wrap tw:items-baseline tw:gap-x-2 tw:gap-y-1">
            <h3 className="tw:m-0 tw:text-xl tw:font-semibold tw:tracking-[-0.025em] tw:text-foreground">{doc.name}</h3>
            <span className="tw:text-sm tw:font-medium tw:text-muted-foreground">{doc.title}</span>
          </div>
          <p className="tw:mt-2 tw:max-w-3xl tw:text-sm tw:leading-6 tw:text-muted-foreground">{doc.description}</p>
        </div>
        <code className="tw:w-fit tw:rounded-md tw:bg-muted tw:px-2 tw:py-1 tw:text-[11px] tw:text-muted-foreground">data-component=&quot;{doc.id}&quot;</code>
      </header>

      <div className="tw:grid tw:gap-0 tw:xl:grid-cols-[minmax(0,1.5fr)_minmax(260px,.65fr)]">
        <section className="tw:min-w-0 tw:p-5 tw:md:p-6">
          <div className="tw:mb-3 tw:flex tw:items-center tw:justify-between tw:gap-3">
            <div>
              <p className="tw:m-0 tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.16em] tw:text-muted-foreground">Preview / 状态预览</p>
              <p className="tw:mt-1 tw:text-xs tw:text-muted-foreground">真实组件，可直接交互；基础控件同时固定展示瞬时状态。</p>
            </div>
          </div>
          <div className="tw:min-h-28 tw:rounded-2xl tw:border tw:border-border/65 tw:bg-background/70 tw:p-4 tw:shadow-[inset_0_1px_0_rgb(255_255_255/.42)] tw:md:p-5">
            {Demo ? <Demo /> : <p className="tw:text-sm tw:text-destructive">此组件尚未建立 Demo。</p>}
          </div>
        </section>

        <aside className="tw:grid tw:content-start tw:gap-5 tw:border-t tw:border-border/70 tw:bg-muted/18 tw:p-5 tw:xl:border-t-0 tw:xl:border-l tw:md:p-6">
          <div>
            <h4 className="tw:m-0 tw:text-xs tw:font-semibold tw:text-foreground">状态 / 变体</h4>
            <div className="tw:mt-2 tw:flex tw:flex-wrap tw:gap-1.5">
              {doc.states.map((state) => (
                <span key={state} className="tw:rounded-md tw:border tw:border-border/75 tw:bg-background/65 tw:px-2 tw:py-1 tw:text-[11px] tw:text-muted-foreground">
                  {state}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="tw:m-0 tw:text-xs tw:font-semibold tw:text-foreground">Composition / 组合结构</h4>
            <pre className="tw:mt-2 tw:overflow-x-auto tw:rounded-xl tw:border tw:border-border/65 tw:bg-background/65 tw:p-3 tw:text-[11px] tw:leading-5 tw:text-muted-foreground">
              {doc.composition.join('\n')}
            </pre>
          </div>
        </aside>
      </div>
    </article>
  )
}

export default function ComponentsDocument() {
  const [query, setQuery] = React.useState('')
  const [dark, setDark] = React.useState(false)
  const normalized = query.trim().toLowerCase()

  const filtered = normalized
    ? componentDocs.filter((item) =>
        [item.name, item.title, item.description, item.category, ...item.states]
          .join(' ')
          .toLowerCase()
          .includes(normalized),
      )
    : componentDocs

  return (
    <div className="component-document pzhown-ui tw:min-h-screen tw:bg-background tw:text-foreground" data-theme={dark ? 'dark' : 'light'}>
      <style>{labCss}</style>

      <header className="tw:border-b tw:border-border/70 tw:bg-background/88 tw:backdrop-blur-xl">
        <div className="tw:mx-auto tw:grid tw:w-[min(1480px,calc(100%-32px))] tw:gap-6 tw:py-8 tw:lg:grid-cols-[minmax(0,1fr)_auto] tw:lg:items-end">
          <div>
            <a href="/" className="tw:text-xs tw:font-semibold tw:text-muted-foreground tw:no-underline hover:tw:text-foreground">← 返回 UI Lab</a>
            <p className="tw:mt-5 tw:mb-0 tw:text-[11px] tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-muted-foreground">PzHown UI / Components Document</p>
            <h1 className="tw:mt-2 tw:mb-0 tw:text-[clamp(36px,6vw,72px)] tw:leading-[.95] tw:font-semibold tw:tracking-[-0.055em]">本地组件文档</h1>
            <p className="tw:mt-4 tw:mb-0 tw:max-w-3xl tw:text-sm tw:leading-6 tw:text-muted-foreground tw:md:text-base tw:md:leading-7">
              参考现代 Components Documentation 的组织方式，以中文说明本地 @pzhown/ui 的用途、组合关系、变体和状态。这里的目标不是演示成品页面，而是把所有组件摊开，作为后续 UI 调整和回归检查的视觉工作台。
            </p>
          </div>

          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <span className="tw:rounded-full tw:border tw:border-border tw:bg-card tw:px-3 tw:py-2 tw:text-xs tw:font-semibold">{componentDocs.length} 个本地组件</span>
            <button
              type="button"
              onClick={() => setDark((value) => !value)}
              className="tw:inline-flex tw:h-9 tw:items-center tw:gap-2 tw:rounded-xl tw:border tw:border-border tw:bg-card tw:px-3 tw:text-xs tw:font-semibold tw:text-foreground tw:transition hover:tw:bg-muted focus-visible:tw:outline-none focus-visible:tw:ring-3 focus-visible:tw:ring-ring/50"
            >
              <ThemeIcon dark={dark} />
              {dark ? '切到浅色' : '切到深色'}
            </button>
          </div>
        </div>
      </header>

      <div className="tw:mx-auto tw:grid tw:w-[min(1480px,calc(100%-32px))] tw:gap-8 tw:py-8 tw:lg:grid-cols-[232px_minmax(0,1fr)]">
        <aside className="tw:hidden tw:lg:block">
          <div className="tw:sticky tw:top-5 tw:max-h-[calc(100vh-40px)] tw:overflow-y-auto tw:rounded-2xl tw:border tw:border-border/75 tw:bg-card/72 tw:p-3 tw:backdrop-blur-xl">
            <div className="tw:relative tw:mb-3">
              <SearchIcon />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索组件或状态"
                aria-label="搜索组件或状态"
                className="tw:absolute tw:inset-0 tw:h-9 tw:w-full tw:rounded-xl tw:border tw:border-input tw:bg-background tw:pr-3 tw:pl-9 tw:text-xs tw:outline-none focus:tw:border-ring focus:tw:ring-3 focus:tw:ring-ring/50"
              />
              <div className="tw:pointer-events-none tw:relative tw:flex tw:h-9 tw:items-center tw:pl-3 tw:text-muted-foreground"><SearchIcon /></div>
            </div>

            <nav aria-label="组件目录" className="tw:grid tw:gap-4">
              {categories.map((category) => {
                const items = filtered.filter((item) => item.category === category)
                if (!items.length) return null
                return (
                  <div key={category}>
                    <p className="tw:mb-1.5 tw:px-2 tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.14em] tw:text-muted-foreground">{category}</p>
                    <div className="tw:grid tw:gap-0.5">
                      {items.map((item) => (
                        <a key={item.id} href={`#${item.id}`} className="tw:rounded-lg tw:px-2 tw:py-1.5 tw:text-xs tw:text-muted-foreground tw:no-underline tw:transition hover:tw:bg-muted hover:tw:text-foreground">
                          <span className="tw:font-medium tw:text-foreground">{item.name}</span>
                          <span className="tw:ml-1.5">{item.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </nav>
          </div>
        </aside>

        <main className="tw:min-w-0">
          <div className="tw:mb-6 tw:grid tw:gap-3 tw:lg:hidden">
            <label className="tw:text-xs tw:font-semibold" htmlFor="component-search-mobile">搜索组件</label>
            <input
              id="component-search-mobile"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例如 Button、无效、加载…"
              className="tw:h-10 tw:rounded-xl tw:border tw:border-input tw:bg-card tw:px-3 tw:text-sm tw:outline-none focus:tw:border-ring focus:tw:ring-3 focus:tw:ring-ring/50"
            />
          </div>

          <section className="tw:mb-8 tw:grid tw:gap-3 tw:rounded-2xl tw:border tw:border-border/75 tw:bg-card/60 tw:p-5 tw:text-sm tw:leading-6 tw:text-muted-foreground tw:md:grid-cols-3">
            <div>
              <strong className="tw:block tw:text-foreground">真实组件</strong>
              Preview 直接使用 packages/ui 中的本地源码，不复制视觉实现。
            </div>
            <div>
              <strong className="tw:block tw:text-foreground">状态矩阵</strong>
              控件类固定展示默认、悬停、按下、焦点、选中、无效和禁用等适用状态。
            </div>
            <div>
              <strong className="tw:block tw:text-foreground">实时交互</strong>
              Dialog、Menu、Popover、拖动、滚动等结构状态保留实际行为，直接操作检查。
            </div>
          </section>

          {filtered.length === 0 ? (
            <div className="tw:rounded-2xl tw:border tw:border-dashed tw:border-border tw:p-10 tw:text-center tw:text-sm tw:text-muted-foreground">没有找到匹配的组件或状态。</div>
          ) : (
            categories.map((category) => {
              const items = filtered.filter((item) => item.category === category)
              if (!items.length) return null
              return (
                <section key={category} className="tw:mb-12">
                  <div className="tw:mb-4 tw:flex tw:items-end tw:justify-between tw:gap-4">
                    <div>
                      <p className="tw:m-0 tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.16em] tw:text-muted-foreground">CATEGORY</p>
                      <h2 className="tw:mt-1 tw:mb-0 tw:text-2xl tw:font-semibold tw:tracking-[-0.03em]">{category}</h2>
                    </div>
                    <span className="tw:text-xs tw:text-muted-foreground">{items.length} 个</span>
                  </div>
                  <div className="tw:grid tw:gap-5">
                    {items.map((item) => <ComponentCard key={item.id} id={item.id} />)}
                  </div>
                </section>
              )
            })
          )}
        </main>
      </div>
    </div>
  )
}
