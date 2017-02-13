'use strict'

const Joi = require('joi')

module.exports = {
  enable_force_variation: Joi.boolean(),
  exclude_disabled_experiments: Joi.boolean(),
  exclude_names: Joi.boolean(),
  include_jquery: Joi.boolean(),
  ip_anonymization: Joi.boolean(),
  ip_filter: Joi.string().max(1500),
  library: Joi.valid('jquery-1.11.3-trim', 'jquery-1.11.3-full', 'jquery-1.6.4-trim', 'jquery-1.6.4-full', 'none'),
  project_javascript: Joi.string()
}
