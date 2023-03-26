const router = require('express').Router();
const {
  getUser,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

const { validateDataWithJoi } = require('../utils/validation');

router.get('/', getUsers);

router.get('/me', getMe);
router.patch('/me', validateDataWithJoi, updateUserInfo);
router.patch('/me/avatar', validateDataWithJoi, updateUserAvatar);

router.get('/:id', validateDataWithJoi, getUser);

module.exports = router;
