const httpStatus = require('http-status')
const { uuid } = require('uuidv4')
const ContactUs = require('../models/contactus.model')
const { createAPIError } = require('../utils/ApiError')
const { resHandler } = require('../utils/handlers')

const { ContactUsModel, retrieveAll, getOneData } = ContactUs

/**
 * Handle an HTTP GET request to retrieve a list of items with optional pagination.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
async function list(req, res) {
  const { limit = 10, skip = 0 } = req.query
  try {
    const data = await retrieveAll({ skip, limit })
    return res.status(httpStatus.OK).json(data)
  }
  catch (e) {
    /**
     * @type {import("../utils/ApiError").APIError}
     */
    const err = createAPIError(httpStatus.INTERNAL_SERVER_ERROR, e.message)
    return Promise.reject(err)
  }
}

/**
 * Handle an HTTP GET request to retrieve a ContactUs record by its ID.
 *
 * @param {import('express').Request} req - The Express request object containing the ID parameter.
 * @param {import('express').Response} res - The Express response object to send the retrieved data.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
async function get(req, res) {
  const { id } = req.params
  try {
    const data = await getOneData(id)
    return res
      .status(data.data !== undefined ? httpStatus.OK : httpStatus.NOT_FOUND)
      .json(data)
  }
  catch (e) {
    /**
     * @type {import("../utils/ApiError").APIError}
     */
    const err = createAPIError(httpStatus.INTERNAL_SERVER_ERROR, e.message)
    return Promise.reject(err)
  }
}

/**
 * Handle an HTTP POST request to add a new ContactUs record.
 *
 * @param {import('express').Request} req - The Express request object containing the data to be added.
 * @param {import('express').Response} res - The Express response object to send the result of the operation.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
async function add(req, res) {
  const { name, email, company_name, message } = req.body
  try {
    const data = {
      id: uuid(),
      name,
      email,
      company_name,
      message,
      created_at: new Date(),
    }

    const createdData = await ContactUsModel.create(data)

    return res
      .status(httpStatus.CREATED)
      .json(
        resHandler(
          true,
          httpStatus.CREATED,
          'Successfully send data',
          createdData,
        ),
      )
  }
  catch (e) {
    /**
     * @type {import("../utils/ApiError").APIError}
     */
    const err = createAPIError(httpStatus[500], e.message)
    return Promise.reject(err)
  }
}

module.exports = { list, add, get }
