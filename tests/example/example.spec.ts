import { test, expect } from '@playwright/test'
import { loadHomepage, assertTitle } from './helpers'

// page -> ez egy page object
test('Simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com')

  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on Elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button') // # -> akkor kell használni ha ID-ra hivatkozunk
  await page.click('text=Sign in')

  const errorMessage = await page.locator('.alert-error') // class hivatkozása esetén .-tal kell hivatkozni
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

// test.skip annotation is skip the actual test
test.skip('Selectors', async ({ page }) => {
  // Text
  await page.click('text=Some text')

  // Css selectors
  await page.click('button')
  await page.click('h1')
  await page.click('#id')
  await page.click('.class')

  // Only visible CSS selector
  await page.click('.submit-button:visible')

  // Combinations
  await page.click('#name .first') // id=username with a .first class

  // XPath
  await page.click('//button')
})

test.describe('My first test suite', () => {
  test('Working with Inputs @myTag', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.type('#user_login', 'some username')
    await page.type('#user_password', 'some pswd')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  // test.only annotation -> run only this test
  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://www.example.com')
    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe.parallel.only('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.example.com')
  })

  /* test.afterAll(async, ({ page }) => {}) */

  test('Screenshots', async ({ page }) => {
    await page.screenshot({ path: 'screenshot.png', fullPage: true })
  })

  test('Single element screenshot', async ({ page }) => {
    const element = await page.locator('h1')
    await element.screenshot({ path: 'single_element_screenshot.png' })
  })
})

test('Custom helpers', async ({ page }) => {
  await loadHomepage(page)
  //await page.pause()
  await assertTitle(page)
})
