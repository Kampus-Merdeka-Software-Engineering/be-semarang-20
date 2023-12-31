const { DataTypes } = require('sequelize')
const httpStatus = require('http-status')
const { createAPIError } = require('../utils/ApiError')
const { resHandler } = require('../utils/handlers')
const { sequelize: db } = require('../config/db.js')

const ContactUsModel = db.define(
  'contactus',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    db,
    tableName: 'contact-us',
    underscored: true,
    timestamps: true,
  },
)

/**
 * Retrieve a list of ContactUs records with optional pagination.
 *
 * @async
 * @param {object} options - Options for pagination.
 * @param {number} [options.skip] - The number of records to skip.
 * @param {number} [options.limit] - The maximum number of records to return.
 * @returns {Promise<Array>} A Promise that resolves to an array of ContactUs records.
 * @throws {import("../utils/ApiError").APIError} If an error occurs while retrieving the records.
 */
async function retrieveAll({ skip = 0, limit = 10 }) {
  try {
    const data = await ContactUsModel.findAll({
      limit,
      offset: skip,
    })

    return resHandler(
      true,
      httpStatus.OK,
      'Success retrieve contact us data',
      data,
    )
  }
  catch (e) {
    /**
     * @type {import("../utils/ApiError").APIError}
     */
    const err = createAPIError(httpStatus.INTERNAL_SERVER_ERROR, e.message)
    throw err
  }
}

/**
 * Retrieve a single ContactUs record by its ID.
 *
 * @async
 * @param {string} id - The unique identifier of the ContactUs record to retrieve.
 * @returns {Promise<object>} A Promise that resolves to a response object containing the retrieved ContactUs record.
 * @throws {import("../utils/ApiError").APIError} If an error occurs while retrieving the record or if the record is not found.
 */
async function getOneData(id) {
  try {
    const data = await ContactUsModel.findOne({
      where: { id },
    })

    if (!data) {
      return resHandler(
        false,
        httpStatus.NOT_FOUND,
        'Contact us data not found!',
      )
    }

    return resHandler(
      true,
      httpStatus.OK,
      'Success get data contact us',
      data,
    )
  }
  catch (e) {
    /**
     * @type {import("../utils/ApiError").APIError}
     */
    const err = createAPIError(httpStatus.BAD_REQUEST, e.message)
    throw err
  }
}

/**
 * @typedef {import('sequelize').Model} ContactUsModel
 */
module.exports = { ContactUsModel, retrieveAll, getOneData }
