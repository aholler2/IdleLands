'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Effective = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Effective = exports.Effective = function (_Achievement) {
  _inherits(Effective, _Achievement);

  function Effective() {
    _classCallCheck(this, Effective);

    return _possibleConstructorReturn(this, (Effective.__proto__ || Object.getPrototypeOf(Effective)).apply(this, arguments));
  }

  _createClass(Effective, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.countChild('Combat.Give.Effect');
      var baseValue = 200;

      var tier = 1;
      while (value >= baseValue * Math.pow(2, tier - 1)) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        mp: function mp(player, baseValue) {
          return baseValue * 0.01 * tier;
        },
        mpDisplay: '+' + tier + '% MP'
      }];

      if (tier >= 5) {
        rewards.push({ type: 'title', title: 'Effective' });
      }

      if (tier >= 6) {
        rewards.push({ type: 'petattr', petattr: 'a warped painting of the Mona Liza' });
      }

      return [{
        tier: tier,
        name: 'Effective',
        desc: 'Gain +' + tier + '% MP for ' + (baseValue * Math.pow(2, tier - 1)).toLocaleString() + ' combat effect usages.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: rewards
      }];
    }
  }]);

  return Effective;
}(_achievement.Achievement);