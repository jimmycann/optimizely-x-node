'use strict'

const utils = require('./Utils')

module.exports = _Error

/**
 * Generic Error klass to wrap any errors returned by optimizely-node
 */
function _Error (raw) {
  this.populate.apply(this, arguments)
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype)

_Error.prototype.type = 'GenericError'
_Error.prototype.populate = function (type, message) {
  this.type = type
  this.message = message
}

_Error.extend = utils.protoExtend

/**
 * Create subclass of internal Error class
 * (Specifically for errors returned from Optimizely's REST API)
 */
const OptimizelyError = _Error.OptimizelyError = _Error.extend({
  type: 'OptimizelyError',
  populate: function (raw) {
    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type
    this.message = raw.statusMessage || raw
    this.statusCode = raw.statusCode || 'N/A'
  }
})

/**
 * Helper factory which takes raw optimizely errors and outputs wrapping instances
 */
OptimizelyError.generate = function (rawOptimizelyError) {
  switch (rawOptimizelyError.type) {
    case 'card_error':
      return new _Error.OptimizelyCardError(rawOptimizelyError)
    case 'invalid_request_error':
      return new _Error.OptimizelyInvalidRequestError(rawOptimizelyError)
    case 'api_error':
      return new _Error.OptimizelyAPIError(rawOptimizelyError)
  }
  return new _Error('Generic', 'Unknown Error')
}

// Specific Optimizely Error types:
_Error.OptimizelyInvalidRequestError = OptimizelyError.extend({type: 'OptimizelyInvalidRequestError'})
_Error.OptimizelyAPIError = OptimizelyError.extend({type: 'OptimizelyAPIError'})
_Error.OptimizelyAuthenticationError = OptimizelyError.extend({type: 'OptimizelyAuthenticationError'})
_Error.OptimizelyPermissionError = OptimizelyError.extend({type: 'OptimizelyPermissionError'})
_Error.OptimizelyRateLimitError = OptimizelyError.extend({type: 'OptimizelyRateLimitError'})
_Error.OptimizelyConnectionError = OptimizelyError.extend({type: 'OptimizelyConnectionError'})
