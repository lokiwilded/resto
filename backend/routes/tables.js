const express = require('express');
const Table = require('../models/Table');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { number, seats, combinable } = req.body;
    const newTable = new Table({ number, seats, combinable });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(500).json({ error: 'Error creating table' });
  }
});

module.exports = router;
