const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Auth API Integration Test", () => {

  test("User Login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "123456"
      });

    expect(response.statusCode).toBeDefined();
  });

});

// Close DB connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});