// controllers/policeController.js

const Complaint = require("../models/Complaint");
const Fine = require("../models/Fine");

// ==========================
// Police Controller
// ==========================

// View all complaints
exports.viewComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("citizen", "name email");
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Issue a fine
exports.issueFine = async (req, res) => {
  try {
    const { citizenId, amount, reason } = req.body;

    const fine = await Fine.create({
      citizen: citizenId,
      amount,
      reason,
      issuedBy: req.user.id,
    });

    res.status(201).json(fine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment for a fine
exports.verifyPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const fine = await Fine.findByIdAndUpdate(
      id,
      { paid: true },
      { new: true }
    );

    if (!fine) return res.status(404).json({ message: "Fine not found" });

    res.status(200).json(fine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate summary report
exports.generateReport = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    const fines = await Fine.find();

    res.status(200).json({
      totalComplaints: complaints.length,
      totalFines: fines.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};