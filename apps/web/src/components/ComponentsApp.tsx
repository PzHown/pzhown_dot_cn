'use client'

import * as React from 'react'
import { LiquidGlassViewport } from '@pzhown/ui/react'
import ComponentShowcase from './ComponentShowcase'
import FoundationShowcase from './FoundationShowcase'

export default function ComponentsApp() {
  const [glassEnabled, setGlassEnabled] = React.useState(true)

  return (
    <LiquidGlassViewport
      enabled={glassEnabled}
      onEnabledChange={setGlassEnabled}
      className="components-liquid-viewport"
      sourceClassName="components-liquid-viewport__source"
    >
      <main className="components-page">
        <header className="components-page__header">
          <p className="hero-kicker">PZHOWN / CORE COMPONENTS</p>
          <h1>iOS 27 Components</h1>
          <p>这是新组件系统的唯一展示面。视觉以 ios27-design-system 为准，react-cupertino-ui 只用于 anatomy / 状态组织，Liquid Glass 只作为光学材质层。</p>
        </header>

        <ComponentShowcase
          glassEnabled={glassEnabled}
          onGlassEnabledChange={setGlassEnabled}
        />

        <section className="lab-section">
          <div className="section-heading">
            <div>
              <p className="hero-kicker">FOUNDATION / PRODUCT-READY</p>
              <h2>P0 Foundation Components</h2>
            </div>
            <p>补齐高频后台与公开站能力：导航、菜单、系统反馈、组合输入、日期、表格、分页与空状态。普通内容面保持 Grouped Surface，不为了展示效果滥用玻璃。</p>
          </div>
          <FoundationShowcase />
        </section>
      </main>
    </LiquidGlassViewport>
  )
}
