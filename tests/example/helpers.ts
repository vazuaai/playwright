export async function loadHomepage(page) {
  await page.goto('https://www.example.com')
}

export async function assertTitle(page) {
  await page.waitForSelector('h1')
}
