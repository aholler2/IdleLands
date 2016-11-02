'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Boxer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boxer = exports.Boxer = function (_Achievement) {
  _inherits(Boxer, _Achievement);

  function Boxer() {
    _classCallCheck(this, Boxer);

    return _possibleConstructorReturn(this, (Boxer.__proto__ || Object.getPrototypeOf(Boxer)).apply(this, arguments));
  }

  _createClass(Boxer, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$statistics.countChild('Character.Treasure');
      var baseValue = 15;

      var tier = 1;
      while (value >= baseValue * tier) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        dex: tier * 10,
        agi: tier * 10
      }];

      if (tier >= 4) {
        rewards.push({ type: 'stats', itemFindRange: 100 });
      }

      if (tier >= 5) {
        rewards.push({ type: 'title', title: 'Boxer' });
      }

      if (tier >= 6) {
        rewards.push({ type: 'petattr', petattr: 'a mini treasure chest containing an even smaller treasure chest' });
      }

      return [{
        tier: tier,
        name: 'Boxer',
        desc: '+' + (tier * 10).toLocaleString() + ' DEX/AGI for opening ' + baseValue * tier + ' chests.',
        type: _achievement.AchievementTypes.EXPLORE,
        rewards: rewards
      }];
    }
  }]);

  return Boxer;
}(_achievement.Achievement);