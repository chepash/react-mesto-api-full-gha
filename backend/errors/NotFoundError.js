const ApplicationError = require('./ApplicationError');
const { ERR_STATUS_NOT_FOUND } = require('../utils/constants');

module.exports = class NotFoundError extends ApplicationError {
  constructor() {
    super(ERR_STATUS_NOT_FOUND, 'Document not found');
    this.name = 'NotFoundError';
  }
};
