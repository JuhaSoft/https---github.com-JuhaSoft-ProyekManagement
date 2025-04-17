const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');
const verifyToken  = require('../middlewares/verifyToken');
const sendDataWithToken = require('../middlewares/sendDataWithToken') 

router.post(
  '/projects/:projectId/budget',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin','admin'),
  budgetController.setBudget
);

router.get(
  '/projects/:projectId/budget',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin','admin'),
  budgetController.getBudget
);

module.exports = router;