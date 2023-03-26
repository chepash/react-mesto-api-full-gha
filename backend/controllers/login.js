const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const AuthorizationError = require('../errors/AuthorizationError');
const { JWT_SECRET } = require('../config');

// POST /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email }).select('+password')
    .orFail(() => {
      throw new AuthorizationError();
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      throw new AuthorizationError();
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie('jwt', jwt, {
        maxAge: 3600000 * 24 * 7, // expiresIn: '7d'
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'Successful authorization' }).end();
    })
    .catch(next);
};
