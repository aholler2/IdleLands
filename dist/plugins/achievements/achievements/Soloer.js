'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Soloer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Soloer = exports.Soloer = function (_Achievement) {
  _inherits(Soloer, _Achievement);

  function Soloer() {
    _classCallCheck(this, Soloer);

    return _possibleConstructorReturn(this, (Soloer.__proto__ || Object.getPrototypeOf(Soloer)).apply(this, arguments));
  }

  _createClass(Soloer, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var totalSoloCombats = player.$statistics.getStat('CombatSolo');

      if (totalSoloCombats < 5000) return [];

      return [{
        tier: 1,
        name: 'Soloer',
        desc: 'Gain a special title (and +10% max item score) for ' + 5000 .toLocaleString() + ' solo battles.',
        type: _achievement.AchievementTypes.COMBAT,
        rewards: [{
          type: 'title',
          title: 'Soloer'
        }, {
          type: 'petattr',
          petattr: 'a shield that you probably need by now'
        }, {
          type: 'stats',
          itemFindRangeMultiplier: 0.1
        }]
      }];
    }
  }]);

  return Soloer;
}(_achievement.Achievement);