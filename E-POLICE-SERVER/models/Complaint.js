const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    citizen: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedPolice: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { 
        type: String, 
        enum: ['pending', 'in-progress', 'resolved'], 
        default: 'pending' 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);