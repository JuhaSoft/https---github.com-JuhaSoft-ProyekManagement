const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');
const verifyToken  = require('../middlewares/verifyToken');
const sendDataWithToken = require('../middlewares/sendDataWithToken') 

router.post(
  '/',
  authenticateToken,
      verifyToken,
      sendDataWithToken,
      authorizeRoles('super_admin'),
  projectController.createProject
);

router.get('/',  projectController.getProjects);
router.get('/:id',  projectController.getProjectDetails);

router.put(
  '/:id',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin'),
  projectController.updateProject
);

router.delete(
  '/:id',
  authenticateToken,
  verifyToken,
  sendDataWithToken,
  authorizeRoles('super_admin'),
  projectController.deleteProject
);

module.exports = router;