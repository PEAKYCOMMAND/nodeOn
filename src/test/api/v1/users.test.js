const ROUTE = "http://localhost:3000/api/v1/users";

test("GET /api/v1/users espera 200", async () => {
  const status = await fetch(ROUTE);
  expect(status.status).toBe(200);
});

test("POST /api/v1/users sem dados espera 401", async () => {
  const status = await fetch(ROUTE, {
    method: "POST",
  });

  expect(status.status).toBe(401);
});

test("POST /api/v1/users (dados existentes) espera 401", async () => {
  const status = await fetch(ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "d5ece353-e103-40c0-883a-b80f4e0912ce",
      name: "teste",
      email: "testandoPost@teste.com",
      password: "testeum324236543",
    }),
  });

  expect(status.status).toBe(401);
});
