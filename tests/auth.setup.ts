import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, PASSWORD } from '../data/users';
import { STORAGE_STATE } from '../data/paths';

// Loga uma única vez e salva a sessão; os testes E2E reaproveitam esse estado
setup('autenticar standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard, PASSWORD);
  await expect(page).toHaveURL(/inventory\.html/);

  await page.context().storageState({ path: STORAGE_STATE });
});
