/**
 * Create a response object for HTTP responses.
 *
 * @param {boolean} success - Indicates whether the operation was successful.
 * @param {number} code - The HTTP response status code.
 * @param {string} message - A descriptive message about the response.
 * @param {any} data - The data to include in the response.
 * @returns {object} The response object with the provided properties.
 */
function resHandler(success, code, message, data) {
  return {
    success,
    code,
    message,
    data,
  }
}

module.exports = { resHandler }
