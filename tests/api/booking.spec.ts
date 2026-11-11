import { test, expect, type APIRequestContext } from '@playwright/test';

const NEW_BOOKING = {
  firstname: 'Thiago',
  lastname: 'Luiz',
  totalprice: 350,
  depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
  additionalneeds: 'Breakfast',
};

async function getToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  expect(response.ok()).toBeTruthy();
  const { token } = await response.json();
  return token;
}

test.describe('API Restful-Booker', () => {
  test('health check', async ({ request }) => {
    const response = await request.get('/ping');
    expect(response.status()).toBe(201);
  });

  test('CRUD de reserva', async ({ request }) => {
    let bookingId: number;

    await test.step('criar', async () => {
      const response = await request.post('/booking', { data: NEW_BOOKING });
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      bookingId = body.bookingid;
      expect(body.booking).toMatchObject(NEW_BOOKING);
    });

    await test.step('consultar', async () => {
      const response = await request.get(`/booking/${bookingId}`);
      expect(response.ok()).toBeTruthy();
      expect(await response.json()).toMatchObject(NEW_BOOKING);
    });

    await test.step('excluir (com token)', async () => {
      const token = await getToken(request);
      const response = await request.delete(`/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
      });
      expect(response.status()).toBe(201);

      const check = await request.get(`/booking/${bookingId}`);
      expect(check.status()).toBe(404);
    });
  });

  // TODO (prática):
  // - PUT e PATCH (atualização total e parcial)
  // - DELETE sem token deve retornar 403
  // - validar o schema da resposta
});
