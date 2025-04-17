const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/auth');
const roleMiddleware = require('../middlewares/role');

router.post(
  '/projects/:projectId/expenses',
  authMiddleware,
  roleMiddleware(['admin', 'project_manager']),
  expenseController.addExpense
);

router.get(
  '/projects/:projectId/expenses',
  authMiddleware,
  expenseController.getExpenses
);

router.put(
  '/expenses/:expenseId',
  authMiddleware,
  roleMiddleware(['admin', 'project_manager']),
  expenseController.updateExpense
);

router.delete(
  '/expenses/:expenseId',
  authMiddleware,
  roleMiddleware(['admin', 'project_manager']),
  expenseController.cancelExpense
);

module.exports = router;