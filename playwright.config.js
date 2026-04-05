import {defineConfig} from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  retries: 1,
  reporter: [['html'], ['list']],
  use: {
    headless: true,
    baseURL: process.env.BASE_URL,
    screenshot  : 'only-on-failure',
    video       : 'retain-on-failure',
    trace       : 'retain-on-failure',
  },
});