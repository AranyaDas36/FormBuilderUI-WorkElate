const express = require('express');
const FormResponse = require('../models/FormResponse');

const router = express.Router();

// POST /api/forms/submit - Save a new form response
router.post('/submit', async (req, res) => {
  try {
    const { formed, answers } = req.body;
    if (!formed || !answers) {
      return res.status(400).json({ message: 'Form structure and answers are required.' });
    }

    const newFormResponse = new FormResponse({
      formed,
      answers,
    });

    await newFormResponse.save();
    res.status(201).json({ message: 'Form response saved successfully!', data: newFormResponse });
  } catch (error) {
    console.error('Error saving form response:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/forms/summary - Get all form responses for summary
router.get('/summary', async (req, res) => {
  try {
    const responses = await FormResponse.find().sort({ submittedAt: -1 });
    res.status(200).json({ data: responses });
  } catch (error) {
    console.error('Error fetching form responses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;