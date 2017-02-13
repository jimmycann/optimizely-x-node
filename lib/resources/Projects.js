'use strict'

const Bluebird = require('bluebird')
const Constructor = require('../constructor')
const Error = require('../Error')

module.exports = Constructor.extend({
  listProjects: function (data) {
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

  readProject: function (id) {
    return new Bluebird((resolve, reject) => {
      if (!id) throw new Error.OptimizelyInvalidRequestError('A project ID is required')
      this.constructRequest({
        method: 'GET',
        path: `/projects/${id}`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  }
})
