'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TempterOfFate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TempterOfFate = exports.TempterOfFate = function (_Achievement) {
  _inherits(TempterOfFate, _Achievement);

  function TempterOfFate() {
    _classCallCheck(this, TempterOfFate);

    return _possibleConstructorReturn(this, (TempterOfFate.__proto__ || Object.getPrototypeOf(TempterOfFate)).apply(this, arguments));
  }

  _createClass(TempterOfFate, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalFates = player.$statistics.getStat('Character.Event.Providence');

      if (totalFates < 100000) return [];

      return [{
        tier: 1,
        name: 'Tempter of Fate',
        desc: 'Gain a special title for 100,000 fate pool uses (AKA: being literally insane).',
        type: _achievement.AchievementTypes.EXPLORE,
        rewards: [{
          type: 'title',
          title: 'Tempter of Fate'
        }, {
          type: 'petattr',
          petattr: 'a crazy hat that instills craziness'
        }]
      }];
    }
  }]);

  return TempterOfFate;
}(_achievement.Achievement);