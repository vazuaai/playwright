import { expect, Locator, Page } from '@playwright/test'

export class TransferFundsPage {
  readonly fromAccountSelectbox: Locator
  readonly toAccountSelectbox: Locator
  readonly amountInput: Locator
  readonly descriptionInput: Locator
  readonly transferSubmitButton: Locator
  readonly boardHeader: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.fromAccountSelectbox = page.locator('#tf_fromAccountId')
    this.toAccountSelectbox = page.locator('#tf_toAccountId')
    this.amountInput = page.locator('#tf_amount')
    this.descriptionInput = page.locator('#tf_description')
    this.transferSubmitButton = page.locator('#btn_submit')
    this.boardHeader = page.locator('h2.board-header')
    this.message = page.locator('.alert-success')
  }

  async createTransfer() {
    await this.fromAccountSelectbox.selectOption('2')
    await this.toAccountSelectbox.selectOption('3')
    await this.amountInput.type('500')
    await this.descriptionInput.type('Test message')
  }

  async clickOnSubmit() {
    await this.transferSubmitButton.click()
  }

  async assertVerification() {
    await expect(this.boardHeader).toContainText('Verify')
  }

  async assertSubmitTransaction() {
    await expect(this.message).toContainText(
      'You successfully submitted your transaction.'
    )
  }
}
