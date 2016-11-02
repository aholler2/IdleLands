'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Generator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _statCalculator = require('../../shared/stat-calculator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = exports.Generator = (_temp = _class = function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, null, [{
    key: 'mergePropInto',
    value: function mergePropInto(baseItem, prop) {
      var handleName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!prop) return;

      if (handleName) {
        if (prop.type === 'suffix') {
          baseItem.name = baseItem.name + ' of the ' + prop.name;
        } else {
          baseItem.name = prop.name + ' ' + baseItem.name;
        }
      }

      _lodash2.default.each(prop, function (val, attr) {
        if (!_lodash2.default.isNumber(val) || _lodash2.default.isEmpty(attr)) return;

        if (baseItem[attr]) {
          baseItem[attr] += prop[attr];
        } else {
          baseItem[attr] = _lodash2.default.isNaN(prop[attr]) ? true : prop[attr];
        }
      });

      baseItem.name = _lodash2.default.trim(baseItem.name);
    }
  }]);

  return Generator;
}(), _class.types = ['body', 'charm', 'feet', 'finger', 'hands', 'head', 'legs', 'neck', 'mainhand', 'offhand'], _class.stats = _statCalculator.ALL_STATS, _temp);