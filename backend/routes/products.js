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
    const product = await addProduct({ name, category, price, description });
    res.status(201).json(product);
  } catch (error) {
    console.error('Failed to create product', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
