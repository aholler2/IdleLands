'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Territorial = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _achievement = require('../achievement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Territorial = exports.Territorial = function (_Achievement) {
  _inherits(Territorial, _Achievement);

  function Territorial() {
    _classCallCheck(this, Territorial);

    return _possibleConstructorReturn(this, (Territorial.__proto__ || Object.getPrototypeOf(Territorial)).apply(this, arguments));
  }

  _createClass(Territorial, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalRegions = _lodash2.default.size(player.$statistics.getStat('Character.Regions'));

      var tier = 1;
      while (totalRegions >= tier * 10) {
        tier++;
      }

      tier--;

      if (tier === 0) return [];

      var rewards = [{
        type: 'stats',
        str: function str(player, baseValue) {
          return baseValue * 0.01 * tier;
        },
        strDisplay: tier + '%'
      }];

      if (tier >= 10) {
        rewards.push({ type: 'title', title: 'Territorial' });
      }

      if (tier >= 11) {
        rewards.push({ type: 'petattr', petattr: 'a dog to help guard your territory' });
      }

      return [{
        tier: tier,
        name: 'Territorial',
        desc: 'Gain +' + tier + '% STR for every ' + (tier * 10).toLocaleString() + ' unique regions explored.',
        type: _achievement.AchievementTypes.EXPLORE,
        rewards: rewards
      }];
    }
  }]);

  return Territorial;
}(_achievement.Achievement);