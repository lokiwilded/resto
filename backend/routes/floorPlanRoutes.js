// backend/routes/floorPlanRoutes.js
const express = require('express');
const FloorPlan = require('../models/FloorPlan');

const router = express.Router();

// Get all floor plans
router.get('/', async (req, res) => {
  try {
    const floorPlans = await FloorPlan.find();
    res.json(floorPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific floor plan by ID
router.get('/:id', async (req, res) => {
  try {
    const floorPlan = await FloorPlan.findById(req.params.id);
    res.json(floorPlan);
  } catch (err) {
    res.status(404).json({ error: 'Floor plan not found' });
  }
});

// Create a new floor plan
router.post('/', async (req, res) => {
  try {
    const newFloorPlan = new FloorPlan(req.body);
    await newFloorPlan.save();
    res.status(201).json(newFloorPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a floor plan
router.put('/:id', async (req, res) => {
  try {
    const updatedFloorPlan = await FloorPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFloorPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a floor plan
router.delete('/:id', async (req, res) => {
  try {
    await FloorPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Floor plan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
