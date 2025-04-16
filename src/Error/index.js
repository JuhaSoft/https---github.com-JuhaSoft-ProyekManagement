class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 404;
      this.name = 'NotFoundError';
    }
  }
  
  class ForbiddenError extends Error {
    constructor(message) {
      super(message);
      this.statusCode = 403;
      this.name = 'ForbiddenError';
    }
  }
  
  module.exports = { NotFoundError, ForbiddenError };