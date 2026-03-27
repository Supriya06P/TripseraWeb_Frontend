// routes/templateRoutes.js
const express = require('express');
const router = express.Router();
const Template = require('../models/Template'); // Your Mongoose Model

// Get only the most recently created template
router.get('/latest', async (req, res) => {
  try {
    const latestTemplate = await Template.findOne()
      .sort({ createdAt: -1 }); // Sort by newest first
    
    if (!latestTemplate) {
      return res.status(404).json({ message: "No templates found" });
    }
    
    res.json(latestTemplate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;