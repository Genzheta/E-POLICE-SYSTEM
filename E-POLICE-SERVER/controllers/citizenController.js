// controllers/citizenController.js

const Complaint = require("../models/Complaint");
const Fine = require("../models/Fine");

// Submit a new complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      citizen: req.user.id, // from JWT middleware
      status: "pending",
    });

    res.status(201).json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Track a complaint by ID
exports.trackComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      citizen: req.user.id, // ensure the citizen owns it
    });

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.status(200).json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Pay a fine by ID
exports.payFine = async (req, res) => {
  try {
    const fine = await Fine.findOne({
      _id: req.params.id,
      citizen: req.user.id, // ensure the citizen owns it
    });

    if (!fine) {
      return res.status(404).json({ success: false, message: "Fine not found" });
    }

    if (fine.status === "paid") {
      return res.status(400).json({ success: false, message: "Fine already paid" });
    }

    fine.status = "paid";
    fine.paidAt = new Date();
    await fine.save();

    res.status(200).json({ success: true, fine, message: "Fine paid successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate a report for the citizen (all complaints + fines)
exports.generateReport = async (req, res) => {
  try {
    const complaints = await Complaint.find({ citizen: req.user.id });
    const fines = await Fine.find({ citizen: req.user.id });

    res.status(200).json({
      success: true,
      report: {
        complaints,
        fines
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitComplaint = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      location,
      citizen: req.user._id
    });

    res.status(201).json(complaint); // <-- check this line
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};