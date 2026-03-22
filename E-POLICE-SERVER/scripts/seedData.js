const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Fine = require("../models/Fine");

mongoose.connect(process.env.MONGO_URI, {
    dbName: "e-police"
})
    .then(() => console.log("MongoDB Connected for Seeding"))
    .catch(err => console.log(err));

async function seedData() {
    try {
        // Clear old data
        await User.deleteMany();
        await Complaint.deleteMany();
        await Fine.deleteMany();

        // 1️⃣ ADMINS (3)
        const admins = await User.insertMany([
            { name: "Admin 1", email: "admin1@gmail.com", password: "123456", role: "admin" },
            { name: "Admin 2", email: "admin2@gmail.com", password: "123456", role: "admin" },
            { name: "Admin 3", email: "admin3@gmail.com", password: "123456", role: "admin" }
        ]);

        // 2️⃣ POLICE (5)
        const police = await User.insertMany([
            { name: "Police 1", email: "police1@gmail.com", password: "123456", role: "police" },
            { name: "Police 2", email: "police2@gmail.com", password: "123456", role: "police" },
            { name: "Police 3", email: "police3@gmail.com", password: "123456", role: "police" },
            { name: "Police 4", email: "police4@gmail.com", password: "123456", role: "police" },
            { name: "Police 5", email: "police5@gmail.com", password: "123456", role: "police" }
        ]);

        // 3️⃣ CITIZENS (10)
        const citizens = await User.insertMany(
            Array.from({ length: 10 }, (_, i) => ({
                name: `Citizen ${i + 1}`,
                email: `citizen${i + 1}@gmail.com`,
                password: "123456",
                role: "citizen"
            }))
        );

        // 4️⃣ COMPLAINTS (20)
        const complaints = await Complaint.insertMany(
            Array.from({ length: 20 }, (_, i) => ({
                title: `Complaint ${i + 1}`,
                description: "Sample complaint description",
                citizen: citizens[i % 10]._id,
                status: "pending"
            }))
        );

        // 5️⃣ FINES (15)
        const fines = await Fine.insertMany(
            Array.from({ length: 15 }, (_, i) => {
                const complaint = complaints[i % complaints.length];
                return {
                    complaint: complaint._id,
                    amount: 1000 + i * 100,
                    issuedBy: police[i % police.length]._id,
                    issuedTo: complaint.citizen, // The fine is issued to the citizen who made the complaint, or we can just randomly pick a citizen
                    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 7 days
                    status: 'unpaid'
                };
            })
        );

        console.log("✅ Data Seeded Successfully!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedData();