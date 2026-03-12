const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
    complaint: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint', required: true },
    amount: { type: Number, required: true },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issuedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['unpaid', 'paid'], 
        default: 'unpaid' 
    },
    dueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Fine', fineSchema);