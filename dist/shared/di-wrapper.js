'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConstituteContainer = exports.constitute = undefined;

var _constitute = require('constitute');

var _constitute2 = _interopRequireDefault(_constitute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = null;

var constitute = exports.constitute = function constitute(Class) {
  if (!container) {
    return (0, _constitute2.default)(Class);
  }

  return container.constitute(Class);
};

// used for intercepting constitutes during tests, otherwise regular constitute is used.
var setConstituteContainer = exports.setConstituteContainer = function setConstituteContainer(newContainer) {
  container = newContainer;
};