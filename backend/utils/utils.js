const ApplicationError = require('../errors/ApplicationError');

module.exports.appErrorHandler = (err, req, res, next) => {
  // в теории советуют работать именно с инстансами классов,
  // а не c именами ошибок

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
