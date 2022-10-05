const app = require("../app");
const supertest = require("supertest");

const api = supertest(app);

test("login db", async () => {
  const user = {
    username: "test",
    password: "test",
  };

  await api.post("/api/login").send(user).expect(200);
});
