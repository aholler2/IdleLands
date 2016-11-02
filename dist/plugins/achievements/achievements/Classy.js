'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Classy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _achievement = require('../achievement');

var _all = require('../../../core/professions/_all');

var Professions = _interopRequireWildcard(_all);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var allStats = ['Con', 'Dex', 'Agi', 'Str', 'Int', 'Luk'];

var Classy = exports.Classy = function (_Achievement) {
  _inherits(Classy, _Achievement);

  function Classy() {
    _classCallCheck(this, Classy);

    return _possibleConstructorReturn(this, (Classy.__proto__ || Object.getPrototypeOf(Classy)).apply(this, arguments));
  }

  _createClass(Classy, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var allProfessionsBeen = _lodash2.default.keys(player.$statistics.getStat('Character.Professions'));

      return _lodash2.default.map(allProfessionsBeen, function (prof) {

        var statReward = {
          type: 'stats'
        };

        _lodash2.default.each(allStats, function (stat) {
          var profStat = Professions[prof]['base' + stat + 'PerLevel'];
          if (!profStat) return;
          statReward[stat] = profStat;
        });

        return {
          tier: 1,
          name: 'Classy: ' + prof,
          desc: 'You\'ve been a ' + prof + '. Gain their base stats as a bonus!',
          type: _achievement.AchievementTypes.PROGRESS,
          rewards: [statReward]
        };
      });
    }
  }]);

  return Classy;
}(_achievement.Achievement);