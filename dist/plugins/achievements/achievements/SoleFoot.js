'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoleFoot = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoleFoot = exports.SoleFoot = function (_Achievement) {
  _inherits(SoleFoot, _Achievement);

  function SoleFoot() {
    _classCallCheck(this, SoleFoot);

    return _possibleConstructorReturn(this, (SoleFoot.__proto__ || Object.getPrototypeOf(SoleFoot)).apply(this, arguments));
  }

  _createClass(SoleFoot, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var soloSteps = player.$statistics.getStat('Character.Movement.Solo');

      if (soloSteps < 100000) return [];

      return [{
        tier: 1,
        name: 'Sole Foot',
        desc: 'Gain a special title (and +5% max item score) for taking ' + 100000 .toLocaleString() + ' solo steps.',
        type: _achievement.AchievementTypes.EXPLORE,
        rewards: [{
          type: 'title',
          title: 'Sole Foot'
        }, {
          type: 'petattr',
          petattr: 'a literal rabbit foot'
        }, {
          type: 'stats',
          itemFindRangeMultiplier: 0.05
        }]
      }];
    }
  }]);

  return SoleFoot;
}(_achievement.Achievement);