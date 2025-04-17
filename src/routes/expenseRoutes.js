const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');
const verifyToken  = require('../middlewares/verifyToken');
const sendDataWithToken = require('../middlewares/sendDataWithToken') 

router.post(
  '/projects/:projectId/expenses',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin','admin'),
  expenseController.addExpense
);

router.get(
  '/projects/:projectId/expenses',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin','admin'),
  expenseController.getExpenses
);

router.put(
  '/expenses/:expenseId',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin','admin'),
  expenseController.updateExpense
);

router.delete(
  '/expenses/:expenseId',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin','admin'),
  expenseController.cancelExpense
);

module.exports = router;