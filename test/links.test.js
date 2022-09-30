const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Link = require("../models/links");

const api = supertest(app);

describe("init with a link", () => {
  beforeEach(async () => {
    await Link.deleteMany({});
  });

  test("add a new link", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYzMzFjNmYxNDAyNzI0MGU4MzRjZjFkZSIsImlhdCI6MTY2NDIwOTI5Nn0.LjhCsT7sHS1vNTCIsL8AqMl7d8h_ez8ozrQmmskhmeI";
    const link = {
      title: "new test1",
      url: "none",
      description: "none",
    };

    await api
      .post("/api/links")
      .send(link)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // const links = await Link.find({});
    // expect(links).toHaveLength(2);
  });

  test("delete a link in db", async () => {
    const id = "63289e9b56de359f4e5e4871";
    await api.delete(`/api/links/63289e9b56de359f4e5e4871`).expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
