// Get all complaints (Admin)
router.get('/all', protect, async (req, res) => {
    if (req.user.isAdmin) {
      const complaints = await Complaint.find().populate('user', 'name email');
      res.json(complaints);
    } else {
      res.status(403).json({ message: 'Not authorized as admin' });
    }
  });
  
  // Update complaint status
  router.put('/:id', protect, async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    if (complaint && req.user.isAdmin) {
      complaint.status = req.body.status || complaint.status;
      complaint.agentResponse = req.body.agentResponse || complaint.agentResponse;
      const updatedComplaint = await complaint.save();
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ message: 'Complaint not found or unauthorized' });
    }
  });
  