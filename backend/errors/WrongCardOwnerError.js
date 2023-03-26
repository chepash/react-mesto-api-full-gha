const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_FORBIDDEN } = require('../utils/constants');

module.exports = class WrongCardOwnerError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_FORBIDDEN, 'User is not the owner of the card');
    this.name = 'WrongCardOwnerError';
  }
};
