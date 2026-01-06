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

describe('Expense endpoints', () => {
  test('Create expense and check budget logic', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'E', email: 'e@example.com', password: 'pass', budgetMonthly: 100 });
    expect(reg.statusCode).toBe(201);
    const token = reg.body.token;

    const createRes = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Coffee', amount: 30 });
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.expense.title).toBe('Coffee');
    expect(createRes.body.monthlyTotal).toBe(30);
    expect(createRes.body.budgetMonthly).toBe(100);
    expect(createRes.body.overBudget).toBe(false);

    // Add another expense to exceed budget
    await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Groceries', amount: 80 });

    const res2 = await request(app)
      .get('/api/expenses')
      .set('Authorization', `Bearer ${token}`);
    expect(res2.statusCode).toBe(200);
    expect(res2.body.expenses.length).toBe(2);

    const createRes2 = await request(app)
      .post('/api/expenses')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Dinner', amount: 10 });

    // Now monthly total 120 > 100
    expect(createRes2.body.overBudget).toBe(true);
  });
});
