const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');
const verifyToken  = require('../middlewares/verifyToken');
const sendDataWithToken = require('../middlewares/sendDataWithToken') 
const budgetController = require('../controllers/budgetController');
router.post(
  '/',
  authenticateToken,
    verifyToken,
    sendDataWithToken,
    authorizeRoles('super_admin',"admin"),
  projectController.createProject
);

router.get('/',  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin',"admin"),projectController.getProjects);
router.get('/:id', authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin',"admin"), projectController.getProjectDetails);

router.put(
  '/:id',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin',"admin"),
  projectController.updateProject
);

router.delete(
  '/:id',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin',"admin"),
  projectController.deleteProject
);
router.delete(
  '/projects/:projectId/budget',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin',"admin"),
  budgetController.deleteBudget
);
module.exports = router;