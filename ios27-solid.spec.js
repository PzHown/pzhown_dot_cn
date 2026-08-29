const { test, expect } = require('@playwright/test')

test('iOS 26/27 theme is solid, round, and provider-owned', async ({ page }) => {
  const pageErrors = []
  page.on('pageerror', error => pageErrors.push(error.message))

  await page.goto('http://127.0.0.1:4321/components/', { waitUntil: 'networkidle' })
  await expect(page.locator('[data-component]')).toHaveCount(58)
  await expect(page.locator('[data-demo-error]')).toHaveCount(0)

  const root = page.locator('html')
  await expect(root).toHaveAttribute('data-pzhown-theme', 'ios27')
  await expect(root).toHaveAttribute('data-theme', 'light')

  const base = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement)
    const card = document.querySelector('[data-slot="card"]')
    const selectedSwitch = document.querySelector('[data-component="switch"] [data-slot="switch"][data-selected]')
    return {
      primary: rootStyle.getPropertyValue('--pzhown-ui-primary').trim(),
      radiusSurface: rootStyle.getPropertyValue('--pzhown-ui-radius-surface').trim(),
      switchOn: rootStyle.getPropertyValue('--pzhown-ui-switch-on').trim(),
      cardShadow: card ? getComputedStyle(card).boxShadow : null,
      switchBackground: selectedSwitch ? getComputedStyle(selectedSwitch).backgroundColor : null,
    }
  })
  console.log('IOS27_SOLID', JSON.stringify(base))
  expect(base.primary).toContain('oklch')
  expect(base.radiusSurface).toBe('22px')
  expect(base.switchOn).toContain('oklch')
  expect(base.cardShadow).toBe('none')

  await page.getByRole('button', { name: '切到深色' }).click()
  await expect(root).toHaveAttribute('data-theme', 'dark')
  await expect(root).toHaveClass(/dark/)

  const alertSection = page.locator('[data-component="alert-dialog"]')
  await alertSection.getByRole('button', { name: '打开确认对话框' }).click()
  const dialog = page.locator('[data-slot="alert-dialog-content"]')
  await expect(dialog).toBeVisible()
  const floating = await dialog.evaluate(element => {
    const style = getComputedStyle(element)
    return {
      background: style.backgroundColor,
      backdrop: style.backdropFilter,
      radius: style.borderRadius,
      shadow: style.boxShadow,
    }
  })
  console.log('IOS27_FLOATING', JSON.stringify(floating))
  expect(floating.background).not.toBe('rgba(0, 0, 0, 0)')
  expect(floating.backdrop).toBe('none')
  expect(floating.radius).toBe('30px')
  expect(floating.shadow).not.toBe('none')
  expect(pageErrors).toEqual([])
})
