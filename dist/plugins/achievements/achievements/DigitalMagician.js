'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalMagician = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DigitalMagician = exports.DigitalMagician = function (_Achievement) {
  _inherits(DigitalMagician, _Achievement);

  function DigitalMagician() {
    _classCallCheck(this, DigitalMagician);

    return _possibleConstructorReturn(this, (DigitalMagician.__proto__ || Object.getPrototypeOf(DigitalMagician)).apply(this, arguments));
  }

  _createClass(DigitalMagician, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalDigitals = player.$statistics.getStat('Combat.Utilize.Digital');

      if (totalDigitals < 100000) return [];

      return [{
        tier: 1,
        name: 'Digital Magician',
        desc: 'Gain a special title (and +5% max item score) for ' + 100000 .toLocaleString() + ' Digital skill uses.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: [{
          type: 'title',
          title: 'Digital Magician'
        }, {
          type: 'petattr',
          petattr: 'a digitally signed certificate'
        }, {
          type: 'stats',
          itemFindRangeMultiplier: 0.05
        }]
      }];
    }
  }]);

  return DigitalMagician;
}(_achievement.Achievement);