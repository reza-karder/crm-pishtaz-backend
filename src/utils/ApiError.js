import errorMessages from "../constants/errorMessages.js";

/**
 * @param {number} statusCode
 * @param {string} message
 * @param {object} details
 */
class ApiError extends Error {
  constructor(statusCode, message= "", details = {}) {
    super(message)
    this.statusCode = statusCode
    this.details = details
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = errorMessages.badRequest, details = {}) {
    return new ApiError(400,message, details)
  }

  static unauthorized(message = errorMessages.unauthorized, details = {}) {
    return new ApiError(401, message, details)
  }

  static notFound(message = errorMessages.notFound, details = {}) {
    return new ApiError(404, message, details)
  }
  
  static serverError(message = errorMessages.serverError, details = {}) {
    return new ApiError(500, message, details)
  }
}

export default ApiError