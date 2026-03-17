const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

describe("Complaint API Test", () => {

  let token;

  beforeAll(async () => {
    // Register test citizen user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser@gmail.com",
        password: "123456",
        role: "citizen"
      });

    // Login to get JWT
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "123456"
      });

    token = res.body.token; // Save JWT
  });

  test("Create Complaint", async () => {
    const res = await request(app)
      .post("/api/citizen/complaint")  // singular now
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Robbery",
        description: "Phone stolen",
        location: "Colombo"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.title).toBe("Robbery");
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});