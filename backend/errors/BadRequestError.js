const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_BAD_REQUEST } = require('../utils/constants');

module.exports = class BadRequestError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_BAD_REQUEST, 'Incorrect data in request');
    this.name = 'BadRequestError';
  }
};
