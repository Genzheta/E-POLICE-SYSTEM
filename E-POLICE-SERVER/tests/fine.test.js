const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


describe("Fine API Test", () => {

  test("Get fines", async () => {

    const response = await request(app)
      .get("/api/police/fines");

    expect(response.statusCode).toBeDefined();
  });

});