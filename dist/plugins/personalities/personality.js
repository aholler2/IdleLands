'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Personality = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Personality = exports.Personality = (_temp = _class = function () {
  function Personality() {
    _classCallCheck(this, Personality);
  }

  _createClass(Personality, null, [{
    key: 'hasEarned',
    value: function hasEarned() {}
  }, {
    key: 'enable',
    value: function enable(player) {
      _lodash2.default.each(this.disableOnActivate, function (personality) {
        if (!player.$personalities.activePersonalities[personality]) return;
        player.$personalities.activePersonalities[personality] = false;
      });

      if (_lodash2.default.size(this.stats) > 0) {
        player.recalculateStats();
        player._updatePlayer();
      }
    }
  }, {
    key: 'disable',
    value: function disable(player) {
      if (_lodash2.default.size(this.stats) > 0) {
        player.recalculateStats();
        player._updatePlayer();
      }
    }
  }, {
    key: 'flagDirty',
    value: function flagDirty(player, stats) {
      _lodash2.default.each(stats, function (stat) {
        player.$dirty.flags[stat] = true;
      });

      player.recalculateStats(stats);
    }
  }]);

  return Personality;
}(), _class.disableOnActivate = [], _class.description = 'This personality has no description', _class.stats = {}, _temp);