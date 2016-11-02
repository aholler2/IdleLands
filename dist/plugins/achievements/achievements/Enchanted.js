'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enchanted = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _achievement = require('../achievement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enchanted = exports.Enchanted = (_temp = _class = function (_Achievement) {
  _inherits(Enchanted, _Achievement);

  function Enchanted() {
    _classCallCheck(this, Enchanted);

    return _possibleConstructorReturn(this, (Enchanted.__proto__ || Object.getPrototypeOf(Enchanted)).apply(this, arguments));
  }

  _createClass(Enchanted, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var isValid = _lodash2.default.get(player, 'permanentAchievements.' + this.permanentProp);
      if (!isValid) {
        var secondCheck = _lodash2.default.reduce(_lodash2.default.values(player.equipment), function (prev, item) {
          return prev + (item.enchantLevel || 0);
        }, 0) >= 100;
        if (secondCheck) {
          _lodash2.default.set(player, 'permanentAchievements.' + this.permanentProp, true);
        } else {
          return [];
        }
      }

      return [{
        tier: 1,
        name: 'Enchanted',
        desc: 'Gain a special title (and +10% max item score) for having 100 concurrent enchantments.',
        type: _achievement.AchievementTypes.PROGRESS,
        rewards: [{
          type: 'title',
          title: 'Enchanted'
        }, {
          type: 'petattr',
          petattr: 'a blob of arcane dust'
        }, {
          type: 'stats',
          itemFindRangeMultiplier: 0.1
        }]
      }];
    }
  }]);

  return Enchanted;
}(_achievement.Achievement), _class.permanentProp = 'enchanted', _temp);