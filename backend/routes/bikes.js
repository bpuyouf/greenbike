import express from 'express';
import { getBikes, addBike } from '../services/bikeService.js';

const router = express.Router();

// Simple CRUD endpoints for demonstration.
// In a real app, add validation + proper error handling.

router.get('/', async (req, res) => {
  try {
    const bikes = await getBikes();
    res.json(bikes);
  } catch (error) {
    console.error('Failed to fetch bikes', error);
    res.status(500).json({ error: 'Failed to fetch bikes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, location } = req.body;
    const bike = await addBike({ name, location });
    res.status(201).json(bike);
  } catch (error) {
    console.error('Failed to create bike', error);
    res.status(500).json({ error: 'Failed to create bike' });
  }
});

export default router;
