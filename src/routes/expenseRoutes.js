const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/auth');

router.post(
  '/projects/:projectId/expenses',
  authMiddleware,
  expenseController.addExpense
);

router.get(
  '/projects/:projectId/expenses',
  authMiddleware,
  expenseController.getExpenses
);

module.exports = router;