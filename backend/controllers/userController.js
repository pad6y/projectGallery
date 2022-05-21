const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @Desc Get all user
// @route Get /api/admin/allUsers
// @access public
const getAllUsers = asyncHandler(async (req, res) => {
  const allUser = await User.find().select('-password');

  if (!allUser) {
    res.status(400);
    throw new Error('No users found');
  }

  res.status(200).json(allUser);
});

// @Desc Register new user
// @route POST /api/admin
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please ensure all fields are valid');
  }
  //Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create user
  const newUser = await User.create({ name, email, password: hashedPassword });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Something went wrong, try again');
  }
});

// @Desc Login user
// @route POST /api/admin/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('Check you login credentials and try again');
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Something went wrong, try again');
  }
});

// @Desc Get Logged in User Data
// @route GET /api/admin/me
// @access private
const loginUserDetail = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
// @Desc Get Logged in User Data
// @route GET /api/admin/me
// @access private
const userDetail = asyncHandler(async (req, res) => {
  const foundUser = await User.findOne({ _id: req.params.userId }).select([
    '-password',
    '-updatedAt',
  ]);

  res.status(200).json(foundUser);
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  getAllUsers,
  registerUser,
  userDetail,
  loginUser,
  loginUserDetail,
};
