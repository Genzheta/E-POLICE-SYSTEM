const express = require("express");
const router = express.Router();

const {
  submitComplaint,
  trackComplaint,
  payFine,
  generateReport
} = require("../controllers/citizenController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Protect all routes & allow only citizens
router.use(protect);
router.use(authorize("citizen"));

// Routes
router.post("/complaint", submitComplaint);          // Submit a complaint
router.get("/complaint/:id", trackComplaint);       // Track a specific complaint
router.post("/fine/:id/pay", payFine);             // Pay a fine
router.get("/report", generateReport);             // Generate a report

module.exports = router;