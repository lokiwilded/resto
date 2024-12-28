// backend/app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const floorPlanRoutes = require('./routes/floorPlanRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/floor-plans', floorPlanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
