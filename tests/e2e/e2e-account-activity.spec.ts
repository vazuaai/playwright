import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Account activity', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)

    await homePage.visit()
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
  })

  test('Show saving transactions 1', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '2')

    const checkingTable = await page.locator('tr > td')
    await expect(checkingTable).not.toBeEmpty
  })

  test('Show saving transactions 2', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '2')

    const checkingTable = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(checkingTable).toHaveCount(3)
  })

  test('Show brokerage transactions', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '6')

    const checkingTable = await page.locator('.well')
    await expect(checkingTable).toContainText('No results.')
  })
})
