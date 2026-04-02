import request from 'supertest';
import { app } from '../server.js';

describe('/health route', () => {
  it('returns 200 and healthcheck success', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ healthcheck: 'success' });
  });
});
