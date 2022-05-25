const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Project = require('../models/projectModel');

const protect = asyncHandler(async (req, res, next) => {
  //Split headers authorization to get values Bearer and token

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      //Aquire token value from headers
      token = req.headers.authorization.split(' ')[1];
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user with user id from decoded token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      // console.log(err);
      res.status(401);
      throw new Error('Not authorised');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorised, token not found');
  }
});

const checkPermission = asyncHandler(async (req, res, next) => {
  const foundProject = await Project.findById(req.params.id);

  if (!foundProject) {
    res.status(400);
    throw new Error('Project not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Check logged in user matches project creator
  if (req.user.id !== foundProject.user.toString()) {
    res.status(401);
    throw new Error('You dont have permission to alter or delete this project');
  }
  next();
});
module.exports = { protect, checkPermission };
