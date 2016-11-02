'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bossy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bossy = exports.Bossy = function (_Achievement) {
  _inherits(Bossy, _Achievement);

  function Bossy() {
    _classCallCheck(this, Bossy);

    return _possibleConstructorReturn(this, (Bossy.__proto__ || Object.getPrototypeOf(Bossy)).apply(this, arguments));
  }

  _createClass(Bossy, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.countChild('Character.BossKills');
      var baseValue = 15;

      var tier = 1;
      while (value >= baseValue * tier) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        str: tier * 10,
        con: tier * 10
      }];

      if (tier >= 4) {
        rewards.push({ type: 'stats', itemFindRange: 100 });
      }

      if (tier >= 5) {
        rewards.push({ type: 'title', title: 'Bossy' });
      }

      if (tier >= 6) {
        rewards.push({ type: 'petattr', petattr: 'a goblin head on a spear' });
      }

      return [{
        tier: tier,
        name: 'Bossy',
        desc: 'Gain +' + (tier * 10).toLocaleString() + ' STR/CON for killing ' + baseValue * tier + ' bosses.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: rewards
      }];
    }
  }]);

  return Bossy;
}(_achievement.Achievement);