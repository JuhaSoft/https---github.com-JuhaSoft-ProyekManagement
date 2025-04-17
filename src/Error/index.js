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
  class BadRequestError extends Error {
    constructor(message, details = []) {
      super(message);
      this.statusCode = 400;
      this.name = 'BadRequestError';
      this.details = details; // Detail error validasi
    }
  }
  module.exports = { NotFoundError, ForbiddenError, BadRequestError};