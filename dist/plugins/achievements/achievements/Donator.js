'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Donator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _achievement = require('../achievement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Donator = exports.Donator = (_temp = _class = function (_Achievement) {
  _inherits(Donator, _Achievement);

  function Donator() {
    _classCallCheck(this, Donator);

    return _possibleConstructorReturn(this, (Donator.__proto__ || Object.getPrototypeOf(Donator)).apply(this, arguments));
  }

  _createClass(Donator, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var isValid = _lodash2.default.get(player, 'permanentAchievements.' + this.permanentProp);
      if (!isValid) return [];

      var tier = 1;

      var rewards = [{ type: 'title', title: 'Donator' }, { type: 'petattr', petattr: 'a platinum bar that says thank you so much, literally' }];

      return [{
        tier: tier,
        name: 'Donator',
        desc: 'You donated (via PayPal)! Yay! Thanks for being an early supporter!',
        type: _achievement.AchievementTypes.SPECIAL,
        rewards: rewards
      }];
    }
  }]);

  return Donator;
}(_achievement.Achievement), _class.permanentProp = 'paypalDonator', _temp);