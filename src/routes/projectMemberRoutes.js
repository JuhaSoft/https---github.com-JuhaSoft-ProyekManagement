// routes/projectMemberRoutes.js
const express = require('express');
const router = express.Router();
const projectMemberController = require('../controllers/projectMemberController');
const authMiddleware = require('../middlewares/auth');

router.post(
  '/projects/:projectId/members',
  authMiddleware,
  projectMemberController.addMember
);

router.get(
  '/projects/:projectId/members',
  authMiddleware,
  projectMemberController.getMembers
);

module.exports = router;