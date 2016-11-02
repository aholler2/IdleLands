'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Unstoppable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Unstoppable = exports.Unstoppable = function (_Achievement) {
  _inherits(Unstoppable, _Achievement);

  function Unstoppable() {
    _classCallCheck(this, Unstoppable);

    return _possibleConstructorReturn(this, (Unstoppable.__proto__ || Object.getPrototypeOf(Unstoppable)).apply(this, arguments));
  }

  _createClass(Unstoppable, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.getStat('Combat.Give.Damage');
      var baseValue = 1000;

      var tier = 1;
      while (value >= baseValue * Math.pow(10, tier - 1)) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        hp: function hp(player, baseValue) {
          return baseValue * 0.01 * tier;
        },
        hpDisplay: '+' + tier + '% HP',
        str: 20 * tier
      }];

      if (tier >= 4) {
        rewards.push({ type: 'title', title: 'Unstoppable' });
      }

      if (tier >= 5) {
        rewards.push({ type: 'petattr', petattr: 'an unstoppable force' });
      }

      return [{
        tier: tier,
        name: 'Unstoppable',
        desc: 'Gain +' + tier + '% HP and +' + (20 * tier).toLocaleString() + ' STR for dealing ' + (baseValue * Math.pow(10, tier - 1)).toLocaleString() + ' damage.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: rewards
      }];
    }
  }]);

  return Unstoppable;
}(_achievement.Achievement);