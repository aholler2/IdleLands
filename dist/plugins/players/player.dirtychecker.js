'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirtyChecker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _statCalculator = require('../../shared/stat-calculator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DirtyChecker = exports.DirtyChecker = function () {
  function DirtyChecker() {
    var _this = this;

    _classCallCheck(this, DirtyChecker);

    this._flags = {};
    _lodash2.default.each(_statCalculator.ALL_STATS.concat(['itemFindRange', 'itemFindRangeMultiplier']), function (stat) {
      return _this._flags[stat] = true;
    });

    this.flags = new Proxy({}, {
      get: function get(target, name) {
        return _this._flags[name];
      },
      set: function set(target, name) {
        _this._flags[name] = name;
        return true;
      }
    });
  }

  _createClass(DirtyChecker, [{
    key: 'reset',
    value: function reset() {
      var _this2 = this;

      _lodash2.default.each(_lodash2.default.keys(this._flags), function (flag) {
        return _this2._flags[flag] = false;
      });
    }
  }]);

  return DirtyChecker;
}();