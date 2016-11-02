'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrate = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var migrate = exports.migrate = function migrate(player) {
  var choiceMigrate = _lodash2.default.get(player.$statistics.stats, 'Character.Choice.Choose');
  if (!_lodash2.default.isObject(choiceMigrate)) {
    _lodash2.default.set(player.$statistics.stats, 'Character.Choice.Choose', {});
  }
};