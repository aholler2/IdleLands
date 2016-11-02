'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Indecisive = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _personality = require('../personality');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Indecisive = exports.Indecisive = (_temp = _class = function (_Personality) {
  _inherits(Indecisive, _Personality);

  function Indecisive() {
    _classCallCheck(this, Indecisive);

    return _possibleConstructorReturn(this, (Indecisive.__proto__ || Object.getPrototypeOf(Indecisive)).apply(this, arguments));
  }

  _createClass(Indecisive, null, [{
    key: 'hasEarned',
    value: function hasEarned(player) {
      return player.$statistics.getStat('Character.Choice.Ignore') >= 10;
    }
  }]);

  return Indecisive;
}(_personality.Personality), _class.disableOnActivate = ['Affirmer', 'Denier'], _class.description = 'All choices that would be ignored are automatically accepted or denied.', _temp);