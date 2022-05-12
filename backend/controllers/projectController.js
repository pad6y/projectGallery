const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');
// @Desc Get projects
// @route GET /api/projects
// @access private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();

  res.status(200).json({ projects });
});

// @Desc CREATE project
// @route post /api/projects
// @access private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, git_url, url } = req.body;
  if (!req.body.title || !req.body.description) {
    res.status(400);
    throw new Error('Missing title or description');
  }

  const newProject = await Project.create({ title, description, git_url, url });

  // Project.save(newProject);
  res.status(200).json({ newProject });
});

// @Desc edit project
// @route PUT /api/projects/:id
// @access private
const updateProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const foundProject = await Project.findById(id);

  if (!foundProject) {
    res.status(400);
    throw new Error('Project not found');
  }

  const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ updatedProject });
});

// @Desc del project
// @route DELETE /api/projects/:id
// @access private
const deleteProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const foundProject = await Project.findById(id);

  if (!foundProject) {
    res.status(400);
    throw new Error('Project not found');
  }

  await foundProject.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getProjects, createProject, updateProject, deleteProject };
