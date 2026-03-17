// tests/auth.test.js

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose"); // For direct DB operations in tests
const User = require("../models/User");// Import User model for test setup
const jwt = require("jsonwebtoken");

// Helper function to generate JWT token for authenticated requests
const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });


describe("Auth API Integration Tests", () => {
  // Clear users before each test
  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "123456",
    role: "citizen",
  };
  
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.token).toBeDefined();
  });
  // Additional tests for login, logout, and error cases
  it("should not register duplicate email", async () => {
    await User.create(testUser);

    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBeDefined();
  });
  // Login tests
  it("should login an existing user", async () => {
    await User.create(testUser);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.token).toBeDefined();
  });
  // Error case for login
  it("should fail login with wrong password", async () => {
    await User.create(testUser);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpass" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBeDefined();
  });
  // Logout test
  it("should logout a user", async () => {
    const res = await request(app).post("/api/auth/logout");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User logged out successfully");
  });
});