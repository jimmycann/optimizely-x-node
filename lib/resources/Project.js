'use strict'

const Bluebird = require('bluebird')
const Constructor = require('../services/Constructor')
const Schema = require('../services/Schema')
const Model = require('../models/Project')
const Error = require('../services/Error')

module.exports = Constructor.extend({
  list: function (data) {
    return new Bluebird((resolve, reject) => {
      if (!data) data = {}
      this.constructRequest({
        method: 'GET',
        path: `/projects?per_page=${data.per_page || 100}&page=${data.page || 1}`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  },

  read: function (id) {
    return new Bluebird((resolve, reject) => {
      if (!id) throw new Error.OptimizelyInvalidRequestError('A project ID is required')
      this.constructRequest({
        method: 'GET',
        path: `/projects/${id}`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  },

  create: function (body) {
    return new Bluebird((resolve, reject) => {
      if (!body) throw new Error.OptimizelyInvalidRequestError('A payload is required')
      return Schema.validate(Model.PROJECT_REQ, body, { isCreate: true })
        .then(validated => this.constructRequest({
          method: 'POST',
          path: `/projects`,
          body: validated
        }))
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  },

  update: function (body, id) {
    return new Bluebird((resolve, reject) => {
      if (!body) throw new Error.OptimizelyInvalidRequestError('A payload is required')
      return Schema.validate(Model.PROJECT_REQ, body, { isUpdate: true })
        .then(validated => this.constructRequest({
          method: 'PUT',
          path: `/projects/${id}`,
          body: validated
        }))
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }
})
