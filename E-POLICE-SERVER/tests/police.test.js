// tests/citizen.test.js

const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Fine = require("../models/Fine");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

describe("Police API Integration Tests", () => {
  let policeUser, citizenUser, token;

  beforeEach(async () => {
    policeUser = await User.create({ name: "Police", email: "police@example.com", password: "123456", role: "police" });
    citizenUser = await User.create({ name: "Citizen", email: "citizen@example.com", password: "123456", role: "citizen" });
    token = generateToken(policeUser._id, policeUser.role);
  });

  it("should view all complaints", async () => {
    await Complaint.create({ title: "Complaint1", description: "desc", citizen: citizenUser._id });

    const res = await request(app)
      .get("/api/officer/complaints")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should issue a fine", async () => {
    const complaint = await Complaint.create({ title: "Complaint2", description: "desc", citizen: citizenUser._id });

    const res = await request(app)
      .post("/api/officer/fine")
      .set("Authorization", `Bearer ${token}`)
      .send({ complaint: complaint._id, amount: 200, issuedTo: citizenUser._id, dueDate: new Date() });

    expect(res.statusCode).toBe(201);
    expect(res.body.amount).toBe(200);
  });

  it("should update a complaint status", async () => {
    const complaint = await Complaint.create({ title: "Complaint3", description: "desc", citizen: citizenUser._id });

    const res = await request(app)
      .put(`/api/officer/complaints/${complaint._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "resolved" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("resolved");
  });
});