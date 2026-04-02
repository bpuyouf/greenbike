import { jest } from '@jest/globals';
import request from 'supertest';

const mockProducts = [
  {
    products_id: 1,
    name: 'Mock Bike',
    category: 'Urban',
    price: 199.99,
    description: 'A mocked product for tests',
  },
];

jest.unstable_mockModule('../services/productService.js', () => ({
  getProducts: jest.fn().mockResolvedValue(mockProducts),
  addProduct: jest.fn(),
}));

let app;
beforeAll(async () => {
  ({ app } = await import('../server.js'));
});

describe('/api/products route', () => {
  it('returns mocked product list structure', async () => {
    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toMatchObject({
      products_id: expect.any(Number),
      name: expect.any(String),
      category: expect.any(String),
      price: expect.any(Number),
      description: expect.any(String),
    });
  });
});
