'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Levelable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Levelable = exports.Levelable = function (_Achievement) {
  _inherits(Levelable, _Achievement);

  function Levelable() {
    _classCallCheck(this, Levelable);

    return _possibleConstructorReturn(this, (Levelable.__proto__ || Object.getPrototypeOf(Levelable)).apply(this, arguments));
  }

  _createClass(Levelable, null, [{
    key: 'achievementData',
    value: function achievementData(player) {
      var tier = Math.floor(player.level / 10);
      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        luk: tier,
        xp: tier
      }];

      if (tier >= 10) {
        rewards.push({ type: 'title', title: 'Centennial' });
      }

      if (tier >= 15) {
        rewards.push({ type: 'petattr', petattr: 'an old person' });
      }

      if (tier >= 20) {
        rewards.push({ type: 'title', title: 'Bicentennial' });
      }

      if (tier >= 25) {
        rewards.push({ type: 'petattr', petattr: 'a really old person' });
      }

      return [{
        tier: tier,
        name: 'Levelable',
        desc: 'Gain +' + tier + ' LUK and +' + tier + ' Bonus XP (added every time XP is gained) for being level ' + (tier * 10).toLocaleString() + '.',
        type: _achievement.AchievementTypes.PROGRESS,
        rewards: rewards
      }];
    }
  }]);

  return Levelable;
}(_achievement.Achievement);