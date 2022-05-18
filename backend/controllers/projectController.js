const asyncHandler = require('express-async-handler');

const Project = require('../models/projectModel');
const User = require('../models/userModel');

// @Desc Get projects
// @route GET /api/projects
// @access private
const getProjects = asyncHandler(async (req, res) => {
  // const owner = await User.findOne({ email: process.env.MY_ACC });

  // let projects;
  // if (req.user.id) {
  //   projects = await Project.find({ user: req.user.id });
  //   return res.status(200).json(projects);
  // } else {
  //   projects = await Project.find({ user: owner._id });
  //   return res.status(200).json(projects);
  // }
  const projects = await Project.find();

  res.status(200).json(projects);
});
// @Desc Get projects
// @route GET /api/projects
// @access private
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id });

  res.status(200).json(project);
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

  const newProject = await Project.create({
    user: req.user._id,
    title,
    description,
    git_url,
    url,
  });

  // Project.save(newProject);
  res.status(200).json({ newProject });
});

// @Desc edit project
// @route PUT /api/projects/:id
// @access private
const updateProject = asyncHandler(async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProject);
});

// @Desc del project
// @route DELETE /api/projects/:id
// @access private
const deleteProject = asyncHandler(async (req, res) => {
  const foundProject = await Project.findById(req.params.id);

  await foundProject.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProject,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
