const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Link = require("../models/links");

const api = supertest(app);

describe("init with a link", () => {
  // beforeEach(async () => {
  //   await Link.deleteMany({});
  // });

  test("add a new link", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYzM2RiMzhlODkwOTQzNTU5NzExZmMzYyIsImlhdCI6MTY2NDk4ODA2N30.s4AAjV_4r4cBUxzLztznUjKX-Q_QOpwgJfQ4Qc_5_Ks";
    const link = {
      title: "new test1",
      url: "none",
      description: "none",
      category: "other",
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

  // test("delete a link in db", async () => {
  //   const id = "63289e9b56de359f4e5e4871";
  //   await api.delete(`/api/links/63289e9b56de359f4e5e4871`).expect(204);
  // });

  test("update link", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYzM2RiMzhlODkwOTQzNTU5NzExZmMzYyIsImlhdCI6MTY2NDk4ODA2N30.s4AAjV_4r4cBUxzLztznUjKX-Q_QOpwgJfQ4Qc_5_Ks";

    const newLink = {
      title: "test update",
      url: "none",
      description: "description updated",
      category: "other",
      fav: true,
      user: "633db38e890943559711fc3c",
    };

    await api
      .put("/api/links/633db61c5d487fd66b631f5c")
      .send(newLink)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
