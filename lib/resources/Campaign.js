'use strict'

const Bluebird = require('bluebird')
const Constructor = require('../services/Constructor')
const Schema = require('../services/Schema')
const Model = require('../models/Campaign')
const Error = require('../services/Error')

module.exports = Constructor.extend({
  list: function (data) {
    return new Bluebird((resolve, reject) => {
      if (!data || !data.project_id) throw new Error.OptimizelyInvalidRequestError('A project_id is required')
      this.constructRequest({
        method: 'GET',
        path: `/campaigns?project_id=${data.project_id}&per_page=${data.per_page || 100}&page=${data.page || 1}`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  },

  read: function (id) {
    return new Bluebird((resolve, reject) => {
      if (!id) throw new Error.OptimizelyInvalidRequestError('A campaign_id is required')
      this.constructRequest({
        method: 'GET',
        path: `/campaigns/${id}`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  },

  results: function (id) {
    return new Bluebird((resolve, reject) => {
      if (!id) throw new Error.OptimizelyInvalidRequestError('A campaign_id is required')
      this.constructRequest({
        method: 'GET',
        path: `/campaigns/${id}/results`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  },

  create: function (body, action) {
    return new Bluebird((resolve, reject) => {
      if (!body) throw new Error.OptimizelyInvalidRequestError('A payload is required')
      let qs = action ? `?action=${action}` : ''
      return Schema.validate(Model.CAMPAIGN_REQ, body, { isCreate: true })
        .then(validated => this.constructRequest({
          method: 'POST',
          path: `/campaigns${qs}`,
          body: validated
        }))
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  },

  update: function (id, body, action) {
    return new Bluebird((resolve, reject) => {
      if (!id) throw new Error.OptimizelyInvalidRequestError('A campaign_id is required')
      if (!body) throw new Error.OptimizelyInvalidRequestError('A payload is required')
      let qs = action ? `?action=${action}` : ''
      return Schema.validate(Model.CAMPAIGN_REQ, body, { isUpdate: true })
        .then(validated => this.constructRequest({
          method: 'PATCH',
          path: `/campaigns/${id}${qs}`,
          body: validated
        }))
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  },

  del: function (id) {
    return new Bluebird((resolve, reject) => {
      if (!id) throw new Error.OptimizelyInvalidRequestError('A campaign_id is required')
      this.constructRequest({
        method: 'DELETE',
        path: `/campaigns/${id}`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  }
})
