'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slayer = exports.Slayer = function (_Achievement) {
  _inherits(Slayer, _Achievement);

  function Slayer() {
    _classCallCheck(this, Slayer);

    return _possibleConstructorReturn(this, (Slayer.__proto__ || Object.getPrototypeOf(Slayer)).apply(this, arguments));
  }

  _createClass(Slayer, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.getStat('Combat.Kills.Monster');
      var baseValue = 10;

      var tier = 1;
      while (value >= baseValue * Math.pow(10, tier - 1)) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        str: 5 * tier,
        con: 5 * tier,
        dex: 5 * tier,
        int: 5 * tier,
        agi: 5 * tier,
        itemFindRangeMultiplier: (tier * 0.1).toFixed(1)
      }];

      if (tier >= 4) {
        rewards.push({ type: 'stats', itemFindRange: 100 });
      }

      if (tier >= 5) {
        rewards.push({ type: 'title', title: 'Slayer' });
      }

      if (tier >= 6) {
        rewards.push({ type: 'petattr', petattr: 'a talking hammer that talks about nailing monsters' });
      }

      return [{
        tier: tier,
        name: 'Slayer',
        desc: 'Gain +' + (tier * 5).toLocaleString() + ' STR/CON/DEX/INT/AGI and +' + (tier * 10).toLocaleString() + '% better item find for killing ' + (baseValue * Math.pow(10, tier - 1)).toLocaleString() + ' monsters.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: rewards
      }];
    }
  }]);

  return Slayer;
}(_achievement.Achievement);