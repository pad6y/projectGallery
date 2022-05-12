const express = require('express');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const router = express.Router();
// router.get('/', getProjects);
// router.post('/', createProject);
router.route('/').get(getProjects).post(createProject);

router.put('/:id/edit', updateProject);

router.delete('/:id/delete', deleteProject);

module.exports = router;
