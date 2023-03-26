const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_UNAUTHORIZED } = require('../utils/constants');

module.exports = class AuthorizationError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_UNAUTHORIZED, 'User unauthorized');
    this.name = 'AuthorizationError';
  }
};
