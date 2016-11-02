'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SharpEye = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _personality = require('../personality');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SharpEye = exports.SharpEye = (_temp = _class = function (_Personality) {
  _inherits(SharpEye, _Personality);

  function SharpEye() {
    _classCallCheck(this, SharpEye);

    return _possibleConstructorReturn(this, (SharpEye.__proto__ || Object.getPrototypeOf(SharpEye)).apply(this, arguments));
  }

  _createClass(SharpEye, null, [{
    key: 'hasEarned',
    value: function hasEarned(player) {
      return player.$statistics.getStat('Character.Item.Equip') >= 25;
    }
  }]);

  return SharpEye;
}(_personality.Personality), _class.description = 'You can more easily discern valuable equipment.', _temp);