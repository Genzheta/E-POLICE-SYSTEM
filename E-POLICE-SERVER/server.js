//server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

//const mongoose = require("mongoose");
const connectDB = require("./config/db");


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/officer", require("./routes/policeRoutes"));
app.use("/api/citizen", require("./routes/citizenRoutes"));


// Test Route
app.get("/", (req, res) => {
    res.send("E-Police Server Running Successfully 🚔");
});

// MongoDB Connection
//mongoose.connect(process.env.MONGO_URI)
//.then(() => console.log("MongoDB Connected"))
//.catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

