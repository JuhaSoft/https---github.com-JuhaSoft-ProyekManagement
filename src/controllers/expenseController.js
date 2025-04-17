const ExpenseService = require('../services/ExpenseService');
const validateRequest = require('../middlewares/validateRequest');
const { createExpense, updateExpense } = require('../validations/expenseValidation');

exports.addExpense = [
  validateRequest(createExpense),
  async (req, res) => {
    try {
      const expense = await ExpenseService.addExpense(
        req.user.id,
        req.params.projectId,
        req.body
      );
      res.status(201).json(expense);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
];

exports.updateExpense = [
  validateRequest(updateExpense),
  async (req, res) => {
    try {
      const expense = await ExpenseService.updateExpense(
        req.user.id,
        req.params.expenseId,
        req.body
      );
      res.json(expense);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
];

exports.cancelExpense = async (req, res) => {
  try {
    await ExpenseService.cancelExpense(
      req.user.id,
      req.params.expenseId
    );
    res.json({ message: 'Expense cancelled successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseService.getExpenses(req.params.projectId);
    res.json(expenses);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};