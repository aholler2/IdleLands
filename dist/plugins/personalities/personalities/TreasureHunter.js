'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureHunter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _personality = require('../personality');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreasureHunter = exports.TreasureHunter = (_temp = _class = function (_Personality) {
  _inherits(TreasureHunter, _Personality);

  function TreasureHunter() {
    _classCallCheck(this, TreasureHunter);

    return _possibleConstructorReturn(this, (TreasureHunter.__proto__ || Object.getPrototypeOf(TreasureHunter)).apply(this, arguments));
  }

  _createClass(TreasureHunter, null, [{
    key: 'disable',
    value: function disable(player) {
      this.flagDirty(player, ['xp', 'gold', 'itemFindRange']);
    }
  }, {
    key: 'enable',
    value: function enable(player) {
      this.flagDirty(player, ['xp', 'gold', 'itemFindRange']);
    }
  }, {
    key: 'hasEarned',
    value: function hasEarned(player) {
      return player.$statistics.getStat('Character.Item.Sell') >= 100;
    }
  }]);

  return TreasureHunter;
}(_personality.Personality), _class.description = 'Find better items, but gain significantly less gold and xp.', _class.stats = {
  xp: function xp(player, baseValue) {
    return -baseValue * 0.9;
  },
  gold: function gold(player, baseValue) {
    return -baseValue * 0.9;
  },
  itemFindRangeMultiplier: function itemFindRangeMultiplier(player) {
    return player.level * 0.05;
  }
}, _temp);