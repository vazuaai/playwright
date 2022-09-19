import { test } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Feedback Form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)
    await homePage.visit()
    await homePage.clickOnFeedback()
  })

  // Reset feedback form
  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'John Doe',
      'johndoe@gmail.com',
      'Something',
      'lorem ipsum'
    )
    await feedbackPage.clearForm()
    await feedbackPage.assertReset()
  })

  // Submit feedback form
  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'John Doe',
      'johndoe@gmail.com',
      'Something',
      'lorem ipsum'
    )
    await feedbackPage.submitButton.click()
    await feedbackPage.feedBackFromSent()
  })
})
