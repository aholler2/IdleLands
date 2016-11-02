'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Eventful = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Eventful = exports.Eventful = function (_Achievement) {
  _inherits(Eventful, _Achievement);

  function Eventful() {
    _classCallCheck(this, Eventful);

    return _possibleConstructorReturn(this, (Eventful.__proto__ || Object.getPrototypeOf(Eventful)).apply(this, arguments));
  }

  _createClass(Eventful, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalEvents = player.$statistics.getStat('Character.Events');
      var baseValue = 100;

      var tier = 1;
      while (totalEvents >= baseValue * Math.pow(10, tier - 1)) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        itemFindRangeMultiplier: (tier * 0.1).toFixed(1)
      }];

      if (tier >= 5) {
        rewards.push({ type: 'title', title: 'Center of Attention' });
      }

      if (tier >= 6) {
        rewards.push({ type: 'petattr', petattr: 'a megaphone' });
      }

      return [{
        tier: tier,
        name: 'Eventful',
        desc: 'Equip items that are ' + (10 * tier).toLocaleString() + '% better for experiencing ' + (baseValue * Math.pow(10, tier)).toLocaleString() + ' events.',
        type: _achievement.AchievementTypes.EVENT,
        rewards: rewards
      }];
    }
  }]);

  return Eventful;
}(_achievement.Achievement);