// routes/policeRoutes.js

const express = require("express");
const router = express.Router();

const {
  issueFine,
  verifyPayment,
  viewComplaints,
  generateReport,
  viewComplaintById,
  updateComplaint
} = require("../controllers/policeController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Protect all routes & allow only police
router.use(protect);
router.use(authorize("police"));

// Routes
router.post("/fine", issueFine);                  // Issue a fine
router.post("/fine/:id/verify", verifyPayment);   // Verify fine payment
router.get("/complaints", viewComplaints);        // View complaints
router.get("/report", generateReport);           // Generate summary report
router.get("/complaints/:id", viewComplaintById);
router.put("/complaints/:id", updateComplaint);



module.exports = router;