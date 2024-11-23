const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Status: Pending, In Progress, Resolved
    agentResponse: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
