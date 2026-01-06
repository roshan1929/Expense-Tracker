# Expense Tracker - Backend

Prerequisites:
- Node.js >= 16
- MongoDB (local or remote)

Setup:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.

2. Install dependencies:

```bash
cd backend
npm install
```

3. Run in development:

```bash
npm run dev
```

API endpoints:

- `POST /api/auth/register` { name, email, password, budgetMonthly? }
- `POST /api/auth/login` { email, password }
- `GET /api/auth/me` (requires `Authorization: Bearer <token>`)

- `POST /api/expenses` (create) { title, amount, category?, date?, notes? }
- `GET /api/expenses` (list) optional query `?month=MM&year=YYYY`
- `PUT /api/expenses/:id` (update)
- `DELETE /api/expenses/:id` (delete)

Budget logic:
- User has `budgetMonthly` on profile.
- When creating an expense, API returns `monthlyTotal`, `budgetMonthly`, and `overBudget` boolean.
