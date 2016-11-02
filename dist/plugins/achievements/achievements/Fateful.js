'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fateful = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fateful = exports.Fateful = function (_Achievement) {
  _inherits(Fateful, _Achievement);

  function Fateful() {
    _classCallCheck(this, Fateful);

    return _possibleConstructorReturn(this, (Fateful.__proto__ || Object.getPrototypeOf(Fateful)).apply(this, arguments));
  }

  _createClass(Fateful, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalFates = player.$statistics.getStat('Character.Event.Providence');

      if (totalFates < 500) return [];

      return [{
        tier: 1,
        name: 'Fateful',
        desc: 'Gain a special title (and +5% max item score) for 500 fate pool uses.',
        type: _achievement.AchievementTypes.EXPLORE,
        rewards: [{
          type: 'title',
          title: 'Fateful'
        }, {
          type: 'petattr',
          petattr: 'a miniature pool with a question mark in it'
        }, {
          type: 'stats',
          itemFindRangeMultiplier: 0.05
        }]
      }];
    }
  }]);

  return Fateful;
}(_achievement.Achievement);