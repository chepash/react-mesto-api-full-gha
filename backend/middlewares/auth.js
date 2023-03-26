const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const AuthorizationError = require('../errors/AuthorizationError');

// POST /signin
module.exports.auth = (req, res, next) => {
  let payload;
  const { jwt } = req.cookies;
  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch {
    throw new AuthorizationError();
  }

  req.user = payload;
  next();
};
