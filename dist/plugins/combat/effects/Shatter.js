'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shatter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _effect = require('../effect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shatter = exports.Shatter = function (_Effect) {
  _inherits(Shatter, _Effect);

  function Shatter(opts) {
    _classCallCheck(this, Shatter);

    if (!opts.duration) opts.duration = 5;
    return _possibleConstructorReturn(this, (Shatter.__proto__ || Object.getPrototypeOf(Shatter)).call(this, opts));
  }

  _createClass(Shatter, [{
    key: 'affect',
    value: function affect(target) {
      var _this2 = this;

      _lodash2.default.each(['str', 'dex', 'con'], function (stat) {
        _this2.setStat(target, 'agi', -_this2.statByPercent(target, stat, _this2.potency * 10));
      });

      this._emitMessage(this.target, '%player\'s defenses were shattered!');
    }
  }]);

  return Shatter;
}(_effect.Effect);