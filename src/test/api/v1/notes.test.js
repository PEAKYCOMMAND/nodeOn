const ROUTE = "http://localhost:3000/api/v1/notes";

test("GET /api/v1/notes espera 200", async () => {
  const status = await fetch(ROUTE);
  expect(status.status).toBe(401);
});
