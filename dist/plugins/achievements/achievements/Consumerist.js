'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumerist = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Consumerist = exports.Consumerist = function (_Achievement) {
  _inherits(Consumerist, _Achievement);

  function Consumerist() {
    _classCallCheck(this, Consumerist);

    return _possibleConstructorReturn(this, (Consumerist.__proto__ || Object.getPrototypeOf(Consumerist)).apply(this, arguments));
  }

  _createClass(Consumerist, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.getStat('Character.Gold.Spent');
      var baseValue = 1000;

      var tier = 1;
      while (value >= baseValue * Math.pow(10, tier - 1)) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        itemValueMultiplier: (tier * 0.05).toFixed(2),
        dex: function dex(player, baseValue) {
          return baseValue * 0.01 * tier;
        },
        dexDisplay: tier + '%'
      }];

      if (tier >= 3) {
        rewards.push({ type: 'title', title: 'Consumerist' });
      }

      if (tier >= 4) {
        rewards.push({ type: 'petattr', petattr: 'a bronze coin that looks like it got chewed on' });
      }

      return [{
        tier: tier,
        name: 'Consumerist',
        desc: 'Sell items for ' + (tier * 5).toLocaleString() + '% more for spending ' + (baseValue * Math.pow(10, tier - 1)).toLocaleString() + ' gold, and gain +' + tier + '% DEX.',
        type: _achievement.AchievementTypes.EVENT,
        rewards: rewards
      }];
    }
  }]);

  return Consumerist;
}(_achievement.Achievement);