'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explorer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _personality = require('../personality');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explorer = exports.Explorer = (_temp = _class = function (_Personality) {
  _inherits(Explorer, _Personality);

  function Explorer() {
    _classCallCheck(this, Explorer);

    return _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).apply(this, arguments));
  }

  _createClass(Explorer, null, [{
    key: 'disable',
    value: function disable(player) {
      this.flagDirty(player, ['xp', 'str', 'con', 'agi', 'dex', 'int']);
    }
  }, {
    key: 'enable',
    value: function enable(player) {
      this.flagDirty(player, ['xp', 'str', 'con', 'agi', 'dex', 'int']);
    }
  }, {
    key: 'hasEarned',
    value: function hasEarned(player) {
      return player.$statistics.getStat('Character.Steps') >= 100000;
    }
  }]);

  return Explorer;
}(_personality.Personality), _class.description = 'You gain 50% more xp, but your stats are lowered by 25%.', _class.stats = {
  xp: function xp(player, baseValue) {
    return baseValue * 0.5;
  },
  str: function str(player, baseValue) {
    return -baseValue * 0.25;
  },
  con: function con(player, baseValue) {
    return -baseValue * 0.25;
  },
  dex: function dex(player, baseValue) {
    return -baseValue * 0.25;
  },
  agi: function agi(player, baseValue) {
    return -baseValue * 0.25;
  },
  int: function int(player, baseValue) {
    return -baseValue * 0.25;
  }
}, _temp);