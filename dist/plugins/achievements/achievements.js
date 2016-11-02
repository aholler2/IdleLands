'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Achievements = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _all = require('./achievements/_all');

var AllAchievements = _interopRequireWildcard(_all);

var _logger = require('../../shared/logger');

var _settings = require('../../static/settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Achievements = exports.Achievements = (_dec = (0, _constitute.Dependencies)(_constitute.Container), _dec(_class = function () {
  function Achievements(container) {
    var _this = this;

    _classCallCheck(this, Achievements);

    var AchievementsDb = require('./achievements.db').AchievementsDb;
    try {
      container.schedulePostConstructor(function (achievementsDb) {
        _this.achievementsDb = achievementsDb;
      }, [AchievementsDb]);
    } catch (e) {
      _logger.Logger.error('Achievements', e);
    }
  }

  // clear current variables and set new


  _createClass(Achievements, [{
    key: 'init',
    value: function init(opts) {
      this._id = undefined;
      this.achievements = undefined;
      _lodash2.default.extend(this, opts);
    }
  }, {
    key: 'petAttributes',
    value: function petAttributes() {
      return (0, _lodash2.default)(this.achievements).values().map(function (achi) {
        return achi.rewards;
      }).flattenDeep().filter(function (reward) {
        return reward.type === 'petattr';
      }).map(function (reward) {
        return reward.petattr;
      }).value().concat(_settings.SETTINGS.validPetAttributes);
    }
  }, {
    key: 'titles',
    value: function titles() {
      return (0, _lodash2.default)(this.achievements).values().map(function (achi) {
        return achi.rewards;
      }).flattenDeep().filter(function (reward) {
        return reward.type === 'title';
      }).map(function (reward) {
        return reward.title;
      }).value();
    }
  }, {
    key: 'tiers',
    value: function tiers() {
      return (0, _lodash2.default)(this.achievements).values().flattenDeep().map('tier').sum();
    }
  }, {
    key: '_allAchievements',
    value: function _allAchievements(player) {
      return (0, _lodash2.default)(AllAchievements).values().map(function (ach) {
        return ach.achievementData(player);
      }).flatten().value();
    }
  }, {
    key: 'addAchievement',
    value: function addAchievement(achievement) {
      this.achievements[achievement.name] = achievement;
    }
  }, {
    key: 'hasAchievement',
    value: function hasAchievement(achievement) {
      return this.achievements[achievement];
    }
  }, {
    key: 'hasAchievementAtTier',
    value: function hasAchievementAtTier(achievement, tier) {
      return this.hasAchievement(achievement) && this.achievements[achievement].tier >= tier;
    }
  }, {
    key: 'checkAchievements',
    value: function checkAchievements(player) {
      var _this2 = this;

      var earned = this._allAchievements(player);
      var mine = this.achievements;

      var newAchievements = [];
      _lodash2.default.each(earned, function (ach) {
        if (mine[ach.name] && mine[ach.name].tier >= ach.tier) return;
        newAchievements.push(ach);
      });

      // always update the achievement data just in case
      this.achievements = {};
      _lodash2.default.each(earned, function (ach) {
        return _this2.addAchievement(ach);
      });

      this.save();

      if (newAchievements.length > 0) {
        player.recalculateStats();
      }

      return newAchievements;
    }
  }, {
    key: 'save',
    value: function save() {
      this.achievementsDb.saveAchievements(this);
    }
  }]);

  return Achievements;
}()) || _class);