// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "e-police", // optional, replace with your DB name
      // DO NOT include useNewUrlParser or useUnifiedTopology
      // DO NOT include strictQuery here
    });

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Connection Failed ❌:", err.message);
    if (process.env.NODE_ENV !== "test") {
          process.exit(1);
        } else {
          throw err; // let Jest handle the error
}
  }
};

module.exports = connectDB;