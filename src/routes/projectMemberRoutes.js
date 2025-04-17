// routes/projectMemberRoutes.js
const express = require('express');
const router = express.Router();
const projectMemberController = require('../controllers/projectMemberController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');
const verifyToken  = require('../middlewares/verifyToken');
const sendDataWithToken = require('../middlewares/sendDataWithToken') 
router.post(
  '/projects/:projectId/members',
  authenticateToken,
    verifyToken,
    sendDataWithToken,
    authorizeRoles('super_admin',"admin"),
  projectMemberController.addMember
);

router.get(
  '/projects/:projectId/members',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin',"admin"),
  projectMemberController.getMembers
);
router.put(
  '/projects/:projectId/members/:userId',
    authenticateToken,
    verifyToken,
    sendDataWithToken,
    authorizeRoles('super_admin',"admin"),
  projectMemberController.updateMemberRole
);

router.delete(
  '/projects/:projectId/members/:userId',
  authenticateToken,
    verifyToken,
    sendDataWithToken,
    authorizeRoles('super_admin',"admin"),
  projectMemberController.removeMember
);
module.exports = router;