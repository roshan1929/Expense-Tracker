jest.setTimeout(20000);
const request = require('supertest');
const app = require('../testApp');
const setup = require('./setup');

beforeAll(async () => {
  await setup.connect();
});

afterAll(async () => {
  await setup.closeDatabase();
});

afterEach(async () => {
  await setup.clearDatabase();
});

describe('Auth endpoints', () => {
  test('Register -> Login -> Me', async () => {
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: 'password', budgetMonthly: 500 });
    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body.token).toBeDefined();

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeDefined();

    const token = loginRes.body.token;
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(meRes.statusCode).toBe(200);
    expect(meRes.body.user.email).toBe('test@example.com');
  });
});
