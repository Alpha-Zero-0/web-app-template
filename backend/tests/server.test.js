const request = require('supertest');
const app = require('../server');

describe('Server Health Check', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
      
    expect(response.body.message).toBe('Server is running');
  });

  test('GET / should return API info', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);
      
    expect(response.body.message).toBe('Web App Template API');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app)
      .get('/nonexistent')
      .expect(404);
      
    expect(response.body.message).toBe('Route not found');
  });
});

describe('Auth Routes', () => {
  test('POST /api/auth/register should validate required fields', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({})
      .expect(400);
      
    expect(response.body.message).toBe('Validation failed');
  });

  test('POST /api/auth/login should validate required fields', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({})
      .expect(400);
      
    expect(response.body.message).toBe('Validation failed');
  });
});
