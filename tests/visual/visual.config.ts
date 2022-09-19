import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  testDir: '../visual',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    // meghatározza, hogy mennyit várjon egy adott action-re, click, type stb. mielőtt hibára fut
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    // készíthet videót és képet is a tesztekről, de ezt most kikapcsoltuk
    video: 'off',
    screenshot: 'off',
  },

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },

    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },

    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
}

export default config
