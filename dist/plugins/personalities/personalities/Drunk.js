'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drunk = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _personality = require('../personality');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drunk = exports.Drunk = (_temp = _class = function (_Personality) {
  _inherits(Drunk, _Personality);

  function Drunk() {
    _classCallCheck(this, Drunk);

    return _possibleConstructorReturn(this, (Drunk.__proto__ || Object.getPrototypeOf(Drunk)).apply(this, arguments));
  }

  _createClass(Drunk, null, [{
    key: 'hasEarned',
    value: function hasEarned(player) {
      return player.level >= 18;
    }
  }]);

  return Drunk;
}(_personality.Personality), _class.description = 'You stumble around randomly like a drunk.', _temp);