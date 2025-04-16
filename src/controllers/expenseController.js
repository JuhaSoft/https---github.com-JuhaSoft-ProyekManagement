const ExpenseService = require('../services/ExpenseService');

exports.addExpense = async (req, res) => {
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
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseService.getExpenses(
      req.params.projectId
    );
    res.json(expenses);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};