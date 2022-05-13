const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  userDetail,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/user', protect, userDetail);

module.exports = router;
