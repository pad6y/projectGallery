const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  userDetail,
  getAllUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

//Register user
router.post('/', registerUser);
//Login user
router.post('/login', loginUser);
//Get logged in user details
router.get('/user', protect, userDetail);
//Get all users
router.get('/allusers', getAllUsers);

module.exports = router;
