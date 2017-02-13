'use strict'

const Joi = require('joi')
const WEB_SNIPPET = require('./WebSnippet')

module.exports = {
  CREATE_PROJECT: {
    name: Joi.string().required(),
    confidence_threshold: Joi.number(),
    dcp_service_id: Joi.number().integer(),
    platform: Joi.valid('web', 'ios', 'android', 'custom'),
    sdks: Joi.array().items(Joi.string()),
    status: Joi.valid('active', 'archived'),
    web_snippet: Joi.object().keys(WEB_SNIPPET)
  }
}
