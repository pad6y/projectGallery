const express = require('express');
const {
  getProject,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

const router = express.Router();
// router.get('/', getProjects);
// router.post('/', createProject);
router.route('/').get(getProjects).post(protect, createProject);
router.get('/:id', getProject);
router.put('/:id/edit', protect, checkPermission, updateProject);

router.delete('/:id/delete', protect, checkPermission, deleteProject);

module.exports = router;
