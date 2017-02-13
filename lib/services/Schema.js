'use strict'

const Joi = require('joi')
const Bluebird = require('bluebird')
const Error = require('./Error')

module.exports = {
  validate: function (schema, payload, context) {
    return new Bluebird((resolve, reject) => {
      Joi.validate(payload, schema, { context }, err => {
        if (err) return reject(new Error.OptimizelyInvalidRequestError('Validation Error: ' + err.details[0].message))
        return resolve(payload)
      })
    })
  }
}
