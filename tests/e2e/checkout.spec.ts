import { test, expect } from '../../fixtures';
import { CHECKOUT_INFO } from '../../data/users';

test.describe('Checkout', () => {
  test('compra completa de dois produtos', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.goto();

    await test.step('adicionar produtos ao carrinho', async () => {
      await inventoryPage.addToCart('Sauce Labs Backpack');
      await inventoryPage.addToCart('Sauce Labs Bike Light');
      await inventoryPage.expectCartCount(2);
    });

    await test.step('validar carrinho', async () => {
      await inventoryPage.openCart();
      await expect(cartPage.items).toHaveCount(2);
      await cartPage.checkout();
    });

    await test.step('preencher dados e finalizar', async () => {
      await checkoutPage.fillInformation(CHECKOUT_INFO);
      // 29.99 + 9.99
      await expect(checkoutPage.itemTotal).toHaveText('Item total: $39.98');
      await checkoutPage.finish();
      await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    });
  });

  // TODO (prática):
  // - checkout sem preencher o CEP deve mostrar erro
  // - remover produto do carrinho e validar o badge
  // - ordenar por preço (low to high) e validar a ordem da lista
});
