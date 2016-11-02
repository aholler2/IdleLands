'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Explorative = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _achievement = require('../achievement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explorative = exports.Explorative = function (_Achievement) {
  _inherits(Explorative, _Achievement);

  function Explorative() {
    _classCallCheck(this, Explorative);

    return _possibleConstructorReturn(this, (Explorative.__proto__ || Object.getPrototypeOf(Explorative)).apply(this, arguments));
  }

  _createClass(Explorative, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalMaps = _lodash2.default.size(player.$statistics.getStat('Character.Maps'));

      var tier = 1;
      while (totalMaps >= tier * 5) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        int: function int(player, baseValue) {
          return baseValue * 0.01 * tier;
        },
        intDisplay: tier + '%'
      }];

      if (tier >= 4) {
        rewards.push({ type: 'stats', itemFindRange: 100 });
      }

      if (tier >= 5) {
        rewards.push({ type: 'title', title: 'Explorative' });
      }

      if (tier >= 6) {
        rewards.push({ type: 'petattr', petattr: 'a map that only works when held upside down' });
      }

      return [{
        tier: tier,
        name: 'Explorative',
        desc: 'Gain +' + tier + '% INT for exploring ' + (tier * 5).toLocaleString() + ' unique maps.',
        type: _achievement.AchievementTypes.EXPLORE,
        rewards: rewards
      }];
    }
  }]);

  return Explorative;
}(_achievement.Achievement);