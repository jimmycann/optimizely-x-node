const faker = require('faker')
const Joi = require('Joi')
const Schema = require('../../lib/services/Schema')

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
  config: Joi.string(),
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

const RES_SCHEMA = {
  project_id: Joi.number().required(),
  changes: Joi.array().items(CHANGES),
  earliest: Joi.date().iso(),
  experiment_ids: Joi.array().items(Joi.alternatives().try(Joi.number().integer(), Joi.string())),
  holdback: Joi.number().integer(),
  latest: Joi.date().iso(),
  metrics: Joi.array().items(METRICS),
  name: Joi.string(),
  page_ids: Joi.array().items(Joi.alternatives().try(Joi.number().integer(), Joi.string())),
  type: Joi.valid('a/b', 'personalization'),
  created: Joi.date().iso(),
  id: Joi.number().integer().required(),
  last_modified: Joi.date().iso(),
  status: Joi.valid('not_started', 'running', 'paused', 'archived')
}

module.exports = {
  new: function (payload) {
    return Object.assign({
      changes: [
        {
          type: 'attribute',
          allow_additional_redirect: true,
          async: true,
          attributes: {
            class: faker.random.word(),
            hide: true,
            href: faker.internet.url(),
            html: faker.lorem.sentence(),
            remove: true,
            src: faker.system.fileName(),
            style: 'background-color:blue;',
            text: faker.lorem.sentence()
          },
          config: {
            name: faker.lorem.words(),
            color: faker.commerce.color()
          },
          css: {
            'background-color': faker.commerce.color()
          },
          css_selector: 'a[href*=\optimizely\]',
          dependencies: [
            '24',
            '26'
          ],
          destination: faker.internet.url(),
          name: faker.lorem.words(),
          operator: 'after',
          preserve_parameters: true,
          rearrange: {
            insertSelector: '.greyBox',
            operator: 'before'
          },
          value: 'window.someGlobalFunction();'
        }
      ],
      earliest: new Date(),
      experiment_ids: [
        0
      ],
      holdback: 0,
      latest: new Date(),
      metrics: [
        {
          aggregator: 'unique',
          event_id: 0,
          field: 'revenue',
          scope: 'session'
        }
      ],
      name: faker.company.companyName(),
      page_ids: [
        0
      ],
      type: 'personalization'
    }, payload)
  },

  validate: function (payload, context = {}) {
    return Schema.validate(RES_SCHEMA, payload, context)
  },

  validateBulk: function (payload, context = {}) {
    return Schema.validate(Joi.array().items(RES_SCHEMA).min(1), payload, context)
  }
}
