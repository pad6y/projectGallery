const asyncHandler = require('express-async-handler');
// @Desc Get projects
// @route GET /api/projects
// @access private
const getProjects = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'get all projects' });
});

// @Desc CREATE project
// @route post /api/projects
// @access private
const createProject = asyncHandler(async (req, res) => {
  // console.log(req.body);
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add a title');
  }
  res.status(200).json({ message: 'create projects' });
});

// @Desc edit project
// @route PUT /api/projects/:id
// @access private
const updateProject = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update projects ${req.params.id}` });
});

// @Desc del project
// @route DELETE /api/projects/:id
// @access private
const deleteProject = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete projects ${req.params.id}` });
});

module.exports = { getProjects, createProject, updateProject, deleteProject };
