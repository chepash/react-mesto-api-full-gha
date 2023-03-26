const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { logout } = require('../controllers/logout');

router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.post('/signout', logout);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('*', (req, res, next) => {
  const err = new NotFoundError();
  err.message = 'Page not found';
  next(err);
});

module.exports = router;
