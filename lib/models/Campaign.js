'use strict'

const Joi = require('joi')

const METRICS = Joi.object().keys({
  aggregator: Joi.valid('unique', 'count', 'sum'),
  event_id: Joi.number().integer(),
  field: Joi.valid('revenue', 'value'),
  scope: Joi.valid('session', 'visitor', 'event')
})
const ATTRIBUTES = Joi.object().keys({
  class: Joi.string(),
  hide: Joi.boolean(),
  href: Joi.string(),
  html: Joi.string(),
  remove: Joi.boolean(),
  src: Joi.string(),
  style: Joi.string(),
  text: Joi.string()
})
const CSS = Joi.object().keys({
  'background-color': Joi.string(),
  'background-image': Joi.string(),
  'border-color': Joi.string(),
  'border-style': Joi.string(),
  'border-width': Joi.string(),
  'color': Joi.string(),
  'font-size': Joi.string(),
  'font-weight': Joi.string(),
  'height': Joi.string(),
  'position': Joi.string(),
  'width': Joi.string()
})
const CHANGES = Joi.object().keys({
  type: Joi.valid('attribute', 'custom_code', 'custom_css', 'extension', 'insert_html', 'insert_image', 'redirect').required(),
  allow_additional_redirect: Joi.boolean(),
  async: Joi.boolean(),
  attributes: ATTRIBUTES,
  config: Joi.object(),
  css: CSS,
  css_selector: Joi.string(),
  dependencies: Joi.array().items(Joi.alternatives().try(Joi.number().integer(), Joi.string())),
  destination: Joi.string(),
  name: Joi.string(),
  operator: Joi.string(),
  preserve_parameters: Joi.boolean(),
  rearrange: Joi.object(),
  value: Joi.string(),
  extension_id: Joi.string(),
  id: Joi.string(),
  src: Joi.string()
}).required()

module.exports = {
  CAMPAIGN_REQ: {
    project_id: Joi.number().required(),
    changes: Joi.array().items(CHANGES),
    earliest: Joi.date().iso(),
    experiment_ids: Joi.array().items(Joi.alternatives().try(Joi.number().integer(), Joi.string())),
    holdback: Joi.number().integer(),
    latest: Joi.date().iso(),
    metrics: Joi.array().items(METRICS),
    name: Joi.string(),
    page_ids: Joi.array().items(Joi.alternatives().try(Joi.number().integer(), Joi.string())),
    type: Joi.valid('a/b', 'personalization')
  }
}
