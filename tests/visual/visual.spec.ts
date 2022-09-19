import { test, expect } from '@playwright/test'

test.describe.only('Visual Regression Testing Example', () => {
  test('Full Page Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })

  test('Single Element Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageElement = await page.locator('h1')
    expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png')
  })
})
