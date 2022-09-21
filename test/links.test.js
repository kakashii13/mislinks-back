const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
const Link = require("../models/links");

const api = supertest(app);

describe("init with a link", () => {
  // beforeEach(async () => {
  //   await Link.deleteMany({});

  //   const link = new Link({
  //     title: "test",
  //     url: "http://localhost:3001",
  //     description: "none",
  //   });

  //   await link.save();
  //   const links = await Link.find({});
  //   const linksContent = links.map((l) => l.title);
  //   expect(linksContent).toContain("test");
  // });

  test("add a new link", async () => {
    const link = {
      title: "new test1",
      url: "none",
      description: "none",
    };

    await api
      .post("/api/links")
      .send(link)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const links = await Link.find({});
    expect(links).toHaveLength(2);
  });

  test("delete a link in db", async () => {
    const id = "63289e9b56de359f4e5e4871";
    await api.delete(`/api/links/63289e9b56de359f4e5e4871`).expect(204);
  });
});
