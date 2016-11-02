'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Achievement = exports.Achievement = function () {
  function Achievement() {
    _classCallCheck(this, Achievement);
  }

  _createClass(Achievement, null, [{
    key: 'achievementData',
    value: function achievementData() {}
  }, {
    key: 'log',
    value: function log(base, number) {
      return Math.log(number) / Math.log(base);
    }
  }]);

  return Achievement;
}();

var AchievementTypes = exports.AchievementTypes = {
  PROGRESS: 'Progress',
  EXPLORE: 'Explore',
  COMBAT: 'Combat',
  SPECIAL: 'Special',
  EVENT: 'Event',
  PET: 'Pet'
};