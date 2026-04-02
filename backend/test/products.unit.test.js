import { jest } from '@jest/globals';
import request from 'supertest';

jest.unstable_mockModule('../services/productService.js', () => ({
  getProducts: jest.fn(),
  addProduct: jest.fn(),
}));

let app;
beforeAll(async () => {
  ({ app } = await import('../server.js'));
});

describe('/api/products POST (unit-style validation)', () => {
  it('creates product with valid data and returns 201', async () => {
    const payload = {
      name: 'Unit Bike',
      category: 'Test',
      price: 999.99,
      description: 'Test product',
    };

    const created = {
      products_id: 2,
      ...payload,
    };

    const service = await import('../services/productService.js');
    service.addProduct.mockResolvedValue(created);

    const response = await request(app)
      .post('/api/products')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toEqual(created);
  });

  it('fails with missing required fields and returns 400', async () => {
    const payload = {
      category: 'Test',
      price: 199,
      description: 'Missing name',
    };

    const response = await request(app)
      .post('/api/products')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing required fields' });
  });

  it('fails with invalid price type and returns 400', async () => {
    const payload = {
      name: 'Bad Bike',
      category: 'Test',
      price: 'NaN',
      description: 'Invalid price',
    };

    const response = await request(app)
      .post('/api/products')
      .send(payload)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Price must be a positive number' });
  });
});