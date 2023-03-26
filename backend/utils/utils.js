const mongoose = require('mongoose');

const ApplicationError = require('../errors/ApplicationError');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateKeyError = require('../errors/DuplicateKeyError');

module.exports.appErrorHandler = (err, req, res, next) => {
  // в теории советуют работать именно с инстансами классов,
  // а не c именами ошибок

  // если создаётся еще один пользователь, а базе уже
  // есть пользователь с таким email
  if (err.code === 11000) {
    const conflictErr = new DuplicateKeyError();
    res.status(conflictErr.status).send({ message: conflictErr.message });
    return;
  }

  // если ошибка произошла на уровне валидации схемы mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    const validationError = new BadRequestError();
    validationError.message = err.message;
    res.status(validationError.status).send({ message: validationError.message });
    return;
  }

  // ApplicationError(500) ошибка по умолчанию и её наследники
  //  - BadRequestError(400)
  //  - AuthorizationError(401)
  //  - DuplicateKeyError(403)
  //  - NotFoundError(404)
  //  - WrongCardOwnerError(409)
  if (err instanceof ApplicationError) {
    res.status(err.status).send({ message: err.message });
    return;
  }

  // если новая неисзветная ошибка, то отправим стандартную ApplicationError(500)
  if (err) {
    const defautlError = new ApplicationError();
    res.status(defautlError.status).send({ message: defautlError.message });
    return;
  }

  next();
};
