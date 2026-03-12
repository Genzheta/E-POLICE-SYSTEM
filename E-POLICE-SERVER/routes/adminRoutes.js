const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  assignRoles,
  viewSystemReports
} = require("../controllers/adminController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Protect all routes & allow only admin
router.use(protect);
router.use(authorize("admin")); // now works correctly

// CRUD operations
router.post("/users", createUser);       // Create
router.get("/users", getAllUsers);       // Read all
router.get("/users/:id", getUserById);   // Read one
router.put("/users/:id", updateUser);    // Update
router.delete("/users/:id", deleteUser); // Delete

// Admin specific actions
router.put("/users/:id/role", assignRoles);
router.get("/reports", viewSystemReports);

module.exports = router;