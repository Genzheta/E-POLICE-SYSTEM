// tests/admin.test.js

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose"); 
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

describe("Admin API Integration Tests", () => {
  let adminToken;
  let adminUser;

  beforeEach(async () => {
    adminUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });

    adminToken = generateToken(adminUser._id, adminUser.role);
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Citizen 1", email: "citizen1@example.com", password: "123456", role: "citizen" });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("citizen1@example.com");
  });

  it("should get all users", async () => {
    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a user by ID", async () => {
    const newUser = await User.create({ name: "UserX", email: "userx@example.com", password: "123456" });
    const res = await request(app)
      .get(`/api/admin/users/${newUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("userx@example.com");
  });

  it("should update a user", async () => {
    const user = await User.create({ name: "Old Name", email: "old@example.com", password: "123456" });

    const res = await request(app)
      .put(`/api/admin/users/${user._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "New Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("New Name");
  });

  it("should delete a user", async () => {
    const user = await User.create({ name: "To Delete", email: "delete@example.com", password: "123456" });

    const res = await request(app)
      .delete(`/api/admin/users/${user._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });
});