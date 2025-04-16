const BudgetService = require('../services/BudgetService');

exports.setBudget = async (req, res) => {
  try {
    const budget = await BudgetService.setBudget(
      req.user.id,
      req.params.projectId,
      req.body.amount
    );
    res.status(200).json(budget);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.getBudget = async (req, res) => {
  try {
    const budget = await BudgetService.getBudget(
      req.params.projectId
    );
    res.json(budget);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};