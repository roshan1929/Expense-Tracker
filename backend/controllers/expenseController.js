const Expense = require('../models/Expense');
const User = require('../models/User');
const mongoose = require('mongoose');

// Helper: get total expenses for user for the month of a given date
async function monthlyTotal(userId, date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const result = await Expense.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: start, $lt: end } } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  return (result[0] && result[0].total) || 0;
}

exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    if (!title || typeof amount !== 'number') return res.status(400).json({ message: 'Missing fields' });

    const expense = new Expense({ user: req.userId, title, amount, category, date: date ? new Date(date) : new Date(), notes });
    await expense.save();

    // Budget check
    const user = await User.findById(req.userId);
    const total = await monthlyTotal(req.userId, expense.date);
    const overBudget = user.budgetMonthly > 0 && total > user.budgetMonthly;

    res.status(201).json({ expense, monthlyTotal: total, budgetMonthly: user.budgetMonthly, overBudget });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = { user: req.userId };

    if (month && year) {
      const m = parseInt(month, 10) - 1;
      const y = parseInt(year, 10);
      const start = new Date(y, m, 1);
      const end = new Date(y, m + 1, 1);
      filter.date = { $gte: start, $lt: end };
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const expense = await Expense.findOneAndUpdate({ _id: id, user: req.userId }, updates, { new: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    res.json({ expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id, user: req.userId });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
