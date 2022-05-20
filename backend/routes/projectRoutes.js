const express = require('express');
const {
  getProject,
  getProjects,
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { protect, checkPermission } = require('../middleware/authMiddleware');

const router = express.Router();

//Get app owners projects, allows logged in users to create
router.route('/').get(getProjects).post(protect, createProject);

//Get specific project
router.get('/:id', getProject);

//Get specific user projects
router.get('/:userId/user', getUserProjects);

//If user is logged in and permitted to edit project
router.put('/:id/edit', protect, checkPermission, updateProject);

//If user is logged in and permitted to delete project
router.delete('/:id/delete', protect, checkPermission, deleteProject);

module.exports = router;
