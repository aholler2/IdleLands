'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rollbar = require('rollbar');

var _rollbar2 = _interopRequireDefault(_rollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rollbarToken = process.env.ROLLBAR_ACCESS_TOKEN;
var isQuiet = process.env.QUIET;

if (rollbarToken) {
  _rollbar2.default.init(rollbarToken);
}

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
    key: '_formatMessage',
    value: function _formatMessage(tag, message) {
      return '[' + new Date() + '] {' + tag + '} ' + message;
    }
  }, {
    key: 'error',
    value: function error(tag, _error, payload) {
      console.error(this._formatMessage(tag, _error.message));
      if (_error.stack) {
        console.error(_error.stack);
      }

      if (payload) {
        console.error('PAYLOAD', payload);
      }

      if (rollbarToken) {
        if (payload) {
          _rollbar2.default.handleErrorWithPayloadData(_error, payload);
        } else {
          _rollbar2.default.handleError(_error);
        }
      }
    }
  }, {
    key: 'info',
    value: function info(tag, message) {
      if (isQuiet) return;
      console.info(this._formatMessage(tag, message));
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;


process.on('uncaughtException', function (err) {
  Logger.error('PROCESS:BAD', err);
});