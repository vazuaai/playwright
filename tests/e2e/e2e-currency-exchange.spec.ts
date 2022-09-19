import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Exchange', () => {
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

  test('Purchase foreign currency', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click('text=Purchase Foreign Currency')
    await page.selectOption('#pc_currency', 'CAD')
    await page.waitForSelector('#sp_sell_rate')
    await page.type('#pc_amount', '500')
    await page.click('#pc_inDollars_false')
    await page.click('#pc_calculate_costs')
    await page.waitForSelector('#pc_conversion_amount')
    await page.click('#purchase_cash')

    const message = await page.locator('#alert_content')
    await expect(message).toContainText(
      'Foreign currency cash was successfully purchased.'
    )
  })
})
