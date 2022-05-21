const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  loginUserDetail,
  userDetail,
  getAllUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

//Register user
router.post('/', registerUser);
//Login user
router.post('/login', loginUser);
//Get logged in user details
router.get('/user', protect, loginUserDetail);
//Get specific user
router.get('/user/:userId', userDetail);
//Get all users
router.get('/allusers', getAllUsers);

module.exports = router;
