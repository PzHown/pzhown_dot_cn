'use client'

import { ThemeProvider } from '@pzhown/ui/react'
import ComponentsDocument from './ComponentsDocument'

export default function ThemedComponentsDocument() {
  return (
    <ThemeProvider theme="ios27" defaultMode="light">
      <ComponentsDocument />
    </ThemeProvider>
  )
}
