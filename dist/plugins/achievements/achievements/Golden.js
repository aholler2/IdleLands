'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Golden = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Golden = exports.Golden = function (_Achievement) {
  _inherits(Golden, _Achievement);

  function Golden() {
    _classCallCheck(this, Golden);

    return _possibleConstructorReturn(this, (Golden.__proto__ || Object.getPrototypeOf(Golden)).apply(this, arguments));
  }

  _createClass(Golden, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.getStat('Character.Gold.Gain') + player.$statistics.getStat('Character.Gold.Lose');
      var baseValue = 20000;

      var tier = 1;
      while (value >= baseValue * Math.pow(10, tier - 1)) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        itemValueMultiplier: (tier * 0.05).toFixed(2),
        agi: function agi(player, baseValue) {
          return baseValue * 0.01 * tier;
        },
        agiDisplay: tier + '%'
      }];

      if (tier >= 3) {
        rewards.push({ type: 'title', title: 'Golden Child' });
      }

      if (tier >= 4) {
        rewards.push({ type: 'petattr', petattr: 'a chunk of metal that is painted gold' });
      }

      return [{
        tier: tier,
        name: 'Golden',
        desc: 'Sell items for ' + (tier * 5).toLocaleString() + '% more for gaining and losing at least ' + (baseValue * Math.pow(10, tier - 1)).toLocaleString() + ' gold, and +' + tier + '% AGI.',
        type: _achievement.AchievementTypes.EVENT,
        rewards: rewards
      }];
    }
  }]);

  return Golden;
}(_achievement.Achievement);