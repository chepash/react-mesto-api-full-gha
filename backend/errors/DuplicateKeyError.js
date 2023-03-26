const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_CONFLICT } = require('../utils/constants');

module.exports = class DuplicateKeyError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_CONFLICT, 'User with this email already exist');
    this.name = 'DuplicateKeyError';
  }
};
