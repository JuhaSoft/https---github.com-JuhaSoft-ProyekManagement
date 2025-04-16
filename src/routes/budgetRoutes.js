const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/auth');

router.post(
  '/projects/:projectId/budget',
  authMiddleware,
  budgetController.setBudget
);

router.get(
  '/projects/:projectId/budget',
  authMiddleware,
  budgetController.getBudget
);

module.exports = router;