'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entitled = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _achievement = require('../achievement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entitled = exports.Entitled = function (_Achievement) {
  _inherits(Entitled, _Achievement);

  function Entitled() {
    _classCallCheck(this, Entitled);

    return _possibleConstructorReturn(this, (Entitled.__proto__ || Object.getPrototypeOf(Entitled)).apply(this, arguments));
  }

  _createClass(Entitled, null, [{
    key: 'achievementData',
    value: function achievementData(player) {

      var value = player.$achievements.titles().length;
      var baseValue = 15;

      if (value < baseValue) return [];

      return [{
        tier: 1,
        name: 'Entitled',
        desc: 'Gain a title for getting 15 titles.',
        type: _achievement.AchievementTypes.EVENT,
        rewards: [{
          type: 'title',
          title: 'Entitled'
        }, {
          type: 'petattr',
          petattr: 'a small child who wants a lot of things'
        }]
      }];
    }
  }]);

  return Entitled;
}(_achievement.Achievement);