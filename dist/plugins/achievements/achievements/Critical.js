'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Critical = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Critical = exports.Critical = function (_Achievement) {
  _inherits(Critical, _Achievement);

  function Critical() {
    _classCallCheck(this, Critical);

    return _possibleConstructorReturn(this, (Critical.__proto__ || Object.getPrototypeOf(Critical)).apply(this, arguments));
  }

  _createClass(Critical, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalCrits = player.$statistics.getStat('Combat.Give.CriticalHit');

      var tier = 1;
      while (totalCrits >= tier * 50) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        dex: function dex(player, baseValue) {
          return baseValue * 0.01 * tier;
        },
        dexDisplay: tier + '%'
      }];

      if (tier >= 10) {
        rewards.push({ type: 'title', title: 'Critical' });
        rewards.push({ type: 'stats', crit: 1 });
      }

      if (tier >= 11) {
        rewards.push({ type: 'petattr', petattr: 'a giant bullseye with a few arrows in it' });
      }

      return [{
        tier: tier,
        name: 'Critical',
        desc: 'Gain ' + tier + '% DEX for having ' + (tier * 50).toLocaleString() + ' critical hits.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: rewards
      }];
    }
  }]);

  return Critical;
}(_achievement.Achievement);