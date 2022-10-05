const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const supertest = require("supertest");

const api = supertest(app);

describe("initialized db with a user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("test", 10);
    const user = new User({
      username: "root",
      name: "matias root",
      passwordHash,
    });

    await user.save();
  });

  test("add new user in db", async () => {
    const usersAtStart = await User.find({});
    console.log(usersAtStart);
    const user = {
      username: "test",
      name: "test",
      password: "test",
    };

    await api.post("/api/users").send(user).expect(201);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
