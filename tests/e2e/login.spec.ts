import { test, expect } from '../../fixtures';
import { USERS, PASSWORD } from '../../data/users';

// Testes de login precisam começar deslogados, então ignoram a sessão salva
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('usuário válido acessa a vitrine', async ({ loginPage, page }) => {
    await loginPage.login(USERS.standard, PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('usuário bloqueado vê mensagem de erro', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut, PASSWORD);
    await loginPage.expectError('Sorry, this user has been locked out.');
  });

  test('senha inválida vê mensagem de erro', async ({ loginPage }) => {
    await loginPage.login(USERS.standard, 'senha_errada');
    await loginPage.expectError('Username and password do not match');
  });

  // TODO (prática): transforme os casos de erro em um teste data-driven
  // iterando sobre um array de { usuario, senha, mensagem }.
});
