'use strict'

const utils = require('./Utils')
const Error = require('./Error')
const Bluebird = require('bluebird')
const request = Bluebird.promisify(require('request'))
Bluebird.promisifyAll(request)

// Provide extension mechanism for Optimizely Resource Sub-Classes
Constructor.extend = utils.protoExtend

/**
 * Encapsulates request logic for a Optimizely Resource
 */
function Constructor (optimizely) {
  this._optimizely = optimizely
  this.initialize.apply(this, arguments)
}

Constructor.prototype = {

  initialize: function () {},

  _responseHandler: function (response) {
    if (response.statusCode === 401) {
      throw new Error.OptimizelyAuthenticationError(response)
    }
    if (response.statusCode === 403) {
      throw new Error.OptimizelyPermissionError(response)
    }
    if (response.statusCode === 429) {
      throw new Error.OptimizelyRateLimitError(response)
    }
    return response.body
  },

  constructRequest: function (data) {
    return request({
      url: `${this._optimizely.constructBaseUrl()}${data.path}`,
      method: data.method,
      gzip: true,
      json: true,
      timeout: this._optimizely.getApiField('timeout'),
      headers: {
        'Authorization': this._optimizely.getApiField('Authorization')
      },
      body: data.body
    })
    .then(result => this._responseHandler({
      statusCode: result.statusCode,
      statusMessage: result.statusMessage,
      body: result.body
    }))
  }
}

module.exports = Constructor
