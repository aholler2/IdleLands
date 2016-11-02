'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Walker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Walker = exports.Walker = function (_Achievement) {
  _inherits(Walker, _Achievement);

  function Walker() {
    _classCallCheck(this, Walker);

    return _possibleConstructorReturn(this, (Walker.__proto__ || Object.getPrototypeOf(Walker)).apply(this, arguments));
  }

  _createClass(Walker, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var playerSteps = player.$statistics.getStat('Character.Steps');

      var tier = 1;
      while (playerSteps >= Math.pow(10, tier)) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        xp: tier
      }];

      if (tier >= 6) {
        rewards.push({ type: 'title', title: 'Tired Foot' });
      }

      if (tier >= 7) {
        rewards.push({ type: 'petattr', petattr: 'a pair of sneakers that are a size too small' });
      }

      return [{
        tier: tier,
        name: 'Walker',
        desc: 'Gain +' + tier + ' Bonus XP (added every time XP is gained) for taking ' + Math.pow(10, tier).toLocaleString() + ' steps.',
        type: _achievement.AchievementTypes.EXPLORE,
        rewards: rewards
      }];
    }
  }]);

  return Walker;
}(_achievement.Achievement);