'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapceptional = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _achievement = require('../achievement');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mapceptional = exports.Mapceptional = function (_Achievement) {
  _inherits(Mapceptional, _Achievement);

  function Mapceptional() {
    _classCallCheck(this, Mapceptional);

    return _possibleConstructorReturn(this, (Mapceptional.__proto__ || Object.getPrototypeOf(Mapceptional)).apply(this, arguments));
  }

  _createClass(Mapceptional, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var allMaps = player.$statistics.getStat('Character.Maps');

      var validMaps = [{ name: 'Norkos Secret -1', rewards: { con: 20 } }, { name: 'Dark Tower +1', rewards: { con: 25 } }, { name: 'Hall of Heroes', rewards: { con: 100 } }, { name: 'Norkos Dungeon -11', rewards: { con: 100 } }, { name: 'Fate Lake', rewards: { con: 500 } }, { name: 'Fate Pools -2', rewards: { con: 50 } }, { name: 'The Astral Plane', rewards: { con: 1000 } }, { name: 'The Elemental Plane -3', rewards: { con: 750 } }, { name: 'Merchant\'s Guild', rewards: { con: 250 } }];

      return _lodash2.default.compact(_lodash2.default.map(validMaps, function (mapData) {
        if (!allMaps[mapData.name]) return;
        mapData.tier = 1;
        mapData.type = _achievement.AchievementTypes.EXPLORE;
        mapData.desc = 'Gain +' + mapData.rewards.con + ' CON for visiting ' + mapData.name + '.';
        mapData.name = 'Mapceptional: ' + mapData.name;
        mapData.rewards = [_lodash2.default.extend({ type: 'stats' }, mapData.rewards)];
        return mapData;
      }));
    }
  }]);

  return Mapceptional;
}(_achievement.Achievement);