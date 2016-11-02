'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LUKBoost = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _effect = require('../effect');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LUKBoost = exports.LUKBoost = function (_Effect) {
  _inherits(LUKBoost, _Effect);

  function LUKBoost() {
    _classCallCheck(this, LUKBoost);

    return _possibleConstructorReturn(this, (LUKBoost.__proto__ || Object.getPrototypeOf(LUKBoost)).apply(this, arguments));
  }

  _createClass(LUKBoost, [{
    key: 'affect',
    value: function affect(target) {
      this.setStat(target, 'luk', this.statByPercent(target, 'luk', this.potency));
    }
  }]);

  return LUKBoost;
}(_effect.Effect);