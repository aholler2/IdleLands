'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Classfluid = undefined;

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

var Classfluid = exports.Classfluid = function (_Achievement) {
  _inherits(Classfluid, _Achievement);

  function Classfluid() {
    _classCallCheck(this, Classfluid);

    return _possibleConstructorReturn(this, (Classfluid.__proto__ || Object.getPrototypeOf(Classfluid)).apply(this, arguments));
  }

  _createClass(Classfluid, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var allProfessionsBeen = player.$statistics.getStat('Character.Professions');
      var allProfessionBeenCount = _lodash2.default.keys(allProfessionsBeen);
      var allProfessions = _lodash2.default.keys(Professions);

      if (allProfessions.length !== allProfessionBeenCount.length) return [];

      var tier = 0;
      while (++tier) {
        if (!_lodash2.default.every(allProfessions, function (prof) {
          return allProfessionsBeen[prof] >= tier;
        })) break;
      }

      tier--;

      return [{
        tier: tier,
        name: 'Classfluid',
        desc: '+' + 3 * tier + '% STR/CON/DEX/INT/AGI/LUK and +' + tier * 100 + ' max item score for being each profession ' + tier + ' times.',
        type: _achievement.AchievementTypes.PROGRESS,
        rewards: [{
          type: 'title',
          title: 'Fluidic'
        }, {
          type: 'petattr',
          petattr: 'a drop of water'
        }, {
          type: 'stats',
          agi: function agi(player, baseValue) {
            return baseValue * 0.03 * tier;
          },
          agiDisplay: tier * 3 + '%',
          str: function str(player, baseValue) {
            return baseValue * 0.03 * tier;
          },
          strDisplay: tier * 3 + '%',
          dex: function dex(player, baseValue) {
            return baseValue * 0.03 * tier;
          },
          dexDisplay: tier * 3 + '%',
          con: function con(player, baseValue) {
            return baseValue * 0.03 * tier;
          },
          conDisplay: tier * 3 + '%',
          int: function int(player, baseValue) {
            return baseValue * 0.03 * tier;
          },
          intDisplay: tier * 3 + '%',
          luk: function luk(player, baseValue) {
            return baseValue * 0.03 * tier;
          },
          lukDisplay: tier * 3 + '%',
          itemFindRange: tier * 100
        }]
      }];
    }
  }]);

  return Classfluid;
}(_achievement.Achievement);