'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sponge = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sponge = exports.Sponge = function (_Achievement) {
  _inherits(Sponge, _Achievement);

  function Sponge() {
    _classCallCheck(this, Sponge);

    return _possibleConstructorReturn(this, (Sponge.__proto__ || Object.getPrototypeOf(Sponge)).apply(this, arguments));
  }

  _createClass(Sponge, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.getStat('Combat.Receive.Damage');
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
        con: 20 * tier
      }];

      if (tier >= 4) {
        rewards.push({ type: 'title', title: 'Sponge' });
      }

      if (tier >= 5) {
        rewards.push({ type: 'petattr', petattr: 'a sponge' });
      }

      return [{
        tier: tier,
        name: 'Sponge',
        desc: 'Gain +' + tier + '% HP and +' + (tier * 20).toLocaleString() + ' CON for taking ' + (baseValue * Math.pow(10, tier - 1)).toLocaleString() + ' damage.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: rewards
      }];
    }
  }]);

  return Sponge;
}(_achievement.Achievement);