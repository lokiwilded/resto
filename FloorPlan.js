// Backend Updates: MongoDB Schema and Routes

// File: backend/models/FloorPlan.js
const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  seats: { type: Number, required: true },
  combinable: { type: Boolean, required: true },
  coordinates: { type: [Number], required: true }, // [row, column]
});

const FloorPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tables: [TableSchema],
});

module.exports = mongoose.model('FloorPlan', FloorPlanSchema);

// File: backend/routes/floorPlanRoutes.js
const express = require('express');
const FloorPlan = require('../models/FloorPlan');

const router = express.Router();

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

// Get all floor plans
router.get('/', async (req, res) => {
  try {
    const floorPlans = await FloorPlan.find();
    res.json(floorPlans);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// File: backend/app.js (or index.js, ensure route integration)
const express = require('express');
const mongoose = require('mongoose');
const floorPlanRoutes = require('./routes/floorPlanRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/floor-plans', floorPlanRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

// Admin Panel Updates: Component Structure and API Integration

// File: admin-panel/src/api/floorPlanAPI.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/floor-plans';

export const createFloorPlan = async (data) => axios.post(API_BASE, data);
export const getFloorPlans = async () => axios.get(API_BASE);
export const updateFloorPlan = async (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteFloorPlan = async (id) => axios.delete(`${API_BASE}/${id}`);

// File: admin-panel/src/contexts/FloorPlanContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getFloorPlans } from '../api/floorPlanAPI';

export const FloorPlanContext = createContext();

export const FloorPlanProvider = ({ children }) => {
  const [floorPlans, setFloorPlans] = useState([]);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      const { data } = await getFloorPlans();
      setFloorPlans(data);
    };
    fetchFloorPlans();
  }, []);

  return (
    <FloorPlanContext.Provider value={{ floorPlans, setFloorPlans }}>
      {children}
    </FloorPlanContext.Provider>
  );
};

// Additional files for components will follow. This ensures the backend and context are set up properly.
