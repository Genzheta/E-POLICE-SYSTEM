// server.js


const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database connection
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// Initialize Express app
const app = express();

// Set Mongoose strictQuery globally (Mongoose 9+)
const mongoose = require("mongoose");

// New rule for Mongoose 9+
mongoose.set("strictQuery", true);

// Connect to MongoDB
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/officer", require("./routes/policeRoutes"));
app.use("/api/citizen", require("./routes/citizenRoutes"));

// Test Route (must be before error middleware)
app.get("/", (req, res) => {
  res.send("E-Police Server Running Successfully 🚔");
});

// 404 middleware
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

// Start server ONLY if not running tests
const PORT = process.env.PORT || 4000;

// Only start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`E-Police Server is up and running at http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;