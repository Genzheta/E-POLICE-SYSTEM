// tests/citizen.test.js

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose"); // 
const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Fine = require("../models/Fine");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

describe("Citizen API Integration Tests", () => {
  let citizenUser;
  let token;

  beforeEach(async () => {
    citizenUser = await User.create({ name: "Citizen", email: "citizen@example.com", password: "123456", role: "citizen" });
    token = generateToken(citizenUser._id, citizenUser.role);
  });

  it("should submit a complaint", async () => {
    const res = await request(app)
      .post("/api/citizen/complaint")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Noise complaint", description: "Loud music at night", location: "Street 1" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Noise complaint");
  });

  it("should track a complaint by ID", async () => {
    const complaint = await Complaint.create({ title: "Test", description: "desc", citizen: citizenUser._id });

    const res = await request(app)
      .get(`/api/citizen/complaint/${complaint._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.complaint.title).toBe("Test");
  });

  it("should generate a citizen report", async () => {
    await Complaint.create({ title: "C1", description: "d1", citizen: citizenUser._id });
    await Fine.create({ complaint: new mongoose.Types.ObjectId(), amount: 100, issuedBy: citizenUser._id, issuedTo: citizenUser._id, dueDate: new Date() });

    const res = await request(app)
      .get("/api/citizen/report")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.report.complaints.length).toBeGreaterThanOrEqual(1);
  });
});