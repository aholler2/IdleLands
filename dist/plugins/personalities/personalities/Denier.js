'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Denier = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _personality = require('../personality');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Denier = exports.Denier = (_temp = _class = function (_Personality) {
  _inherits(Denier, _Personality);

  function Denier() {
    _classCallCheck(this, Denier);

    return _possibleConstructorReturn(this, (Denier.__proto__ || Object.getPrototypeOf(Denier)).apply(this, arguments));
  }

  _createClass(Denier, null, [{
    key: 'hasEarned',
    value: function hasEarned(player) {
      return player.$statistics.getStat('Character.Choice.Choose.No') >= 10;
    }
  }]);

  return Denier;
}(_personality.Personality), _class.disableOnActivate = ['Affirmer', 'Indecisive'], _class.description = 'All choices that would be ignored are automatically denied.', _temp);