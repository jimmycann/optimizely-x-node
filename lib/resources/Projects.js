'use strict'

const Bluebird = require('bluebird')
const Constructor = require('../constructor')

module.exports = Constructor.extend({
  listProjects: function (data) {
    return new Bluebird((resolve, reject) => {
      this.constructRequest({
        method: 'GET',
        path: `/projects?per_page=${data.per_page || 100}&page=${data.page || 1}`
      })
      .then(response => resolve(response))
      .catch(err => reject(err))
    })
  }
})
