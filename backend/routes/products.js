import express from 'express';
import { getProducts, addProduct } from '../services/productService.js';

const router = express.Router();

// Simple CRUD endpoints for demonstration.
// In a production app, add request validation, authorization, and proper error handling.

router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    if (!name || !category || price === undefined || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof name !== 'string' || typeof category !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid field types' });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const product = await addProduct({ name, category, price: numericPrice, description });
    res.status(201).json(product);
  } catch (error) {
    console.error('Failed to create product', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
