const express = require('express');
const Complaint = require('../models/Complaint');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a complaint
router.post('/', protect, async (req, res) => {
  const { description } = req.body;
  try {
    const complaint = await Complaint.create({ user: req.user.id, description });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user complaints
router.get('/', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

