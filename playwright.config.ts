import { defineConfig, devices } from '@playwright/test';

import { STORAGE_STATE } from './data/paths';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  // No CI cada shard gera um "blob", que depois é mesclado num relatório HTML único
  reporter: process.env.CI ? [['blob'], ['github']] : [['html', { open: 'never' }], ['list']],

  use: {
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // 1) Faz login uma vez e salva a sessão (cookies) em disco
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: { baseURL: 'https://www.saucedemo.com' },
    },

    // 2) Testes E2E de UI — reaproveitam a sessão salva pelo setup
    {
      name: 'e2e',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        testIdAttribute: 'data-test',
        storageState: STORAGE_STATE,
      },
    },

    // 3) Testes de API — sem navegador
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});
