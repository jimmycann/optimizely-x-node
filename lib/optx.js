'use strict'

Optimizely.DEFAULT_HOST = 'https://api.optimizely.com'
Optimizely.DEFAULT_API_VERSION = '/v2'

// Use node's default timeout:
Optimizely.DEFAULT_TIMEOUT = require('http').createServer().timeout
Optimizely.PACKAGE_VERSION = require('../package.json').version

function Optimizely (opts) {
  if (!opts) opts = {}
  if (!(this instanceof Optimizely)) return new Optimizely(opts)

  this._api = {
    auth: null,
    host: Optimizely.DEFAULT_HOST,
    version: Optimizely.DEFAULT_API_VERSION,
    timeout: Optimizely.DEFAULT_TIMEOUT
  }
  this.setApiKey(opts.token)
  this.setApiVersion(opts.version)
  this.setServerTimeout(opts.timeout)
  this._prepResources()
}

Optimizely.Constructor = require('./services/Constructor')

const resources = {
  Project: require('./resources/Project'),
  Campaign: require('./resources/Campaign')
}

Optimizely.prototype = {
  setApiKey: function (token) {
    this._setApiField('Authorization', `Bearer ${token}`)
  },

  setApiVersion: function (version) {
    if (version) this._setApiField('version', version)
  },

  setServerTimeout: function (timeout) {
    this._setApiField('timeout', !timeout ? Optimizely.DEFAULT_TIMEOUT : timeout)
  },

  _setApiField: function (key, value) {
    this._api[key] = value
  },

  getApiField: function (key) {
    return this._api[key]
  },

  getConstant: function (c) {
    return Optimizely[c]
  },

  constructBaseUrl: function () {
    return `${this._api.host}${this._api.version}`
  },

  _prepResources: function () {
    for (var name in resources) {
      this[name] = new resources[name](this)
    }
  }
}

module.exports = Optimizely
