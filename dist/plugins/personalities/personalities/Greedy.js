'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Greedy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _personality = require('../personality');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Greedy = exports.Greedy = (_temp = _class = function (_Personality) {
  _inherits(Greedy, _Personality);

  function Greedy() {
    _classCallCheck(this, Greedy);

    return _possibleConstructorReturn(this, (Greedy.__proto__ || Object.getPrototypeOf(Greedy)).apply(this, arguments));
  }

  _createClass(Greedy, null, [{
    key: 'disable',
    value: function disable(player) {
      this.flagDirty(player, ['xp', 'gold']);
    }
  }, {
    key: 'enable',
    value: function enable(player) {
      this.flagDirty(player, ['xp', 'gold']);
    }
  }, {
    key: 'hasEarned',
    value: function hasEarned(player) {
      return player.$statistics.getStat('Character.Gold.Gain') >= 100000;
    }
  }]);

  return Greedy;
}(_personality.Personality), _class.disableOnActivate = ['Seeker'], _class.description = 'Gain more gold, but gain less xp.', _class.stats = {
  xp: function xp(player, baseValue) {
    return -baseValue * 0.25;
  },
  gold: function gold(player, baseValue) {
    return baseValue * 0.25;
  }
}, _temp);