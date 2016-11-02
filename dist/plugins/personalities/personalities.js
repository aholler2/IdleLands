'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Personalities = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _all = require('./personalities/_all');

var AllPersonalities = _interopRequireWildcard(_all);

var _logger = require('../../shared/logger');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Personalities = exports.Personalities = (_dec = (0, _constitute.Dependencies)(_constitute.Container), _dec(_class = function () {
  function Personalities(container) {
    var _this = this;

    _classCallCheck(this, Personalities);

    var PersonalitiesDb = require('./personalities.db.js').PersonalitiesDb;
    try {
      container.schedulePostConstructor(function (personalitiesDb) {
        _this.personalitiesDb = personalitiesDb;
      }, [PersonalitiesDb]);
    } catch (e) {
      _logger.Logger.error('Personalities', e);
    }
  }

  // clear current variables and set new


  _createClass(Personalities, [{
    key: 'init',
    value: function init(opts) {
      this._id = undefined;
      this.activePersonalities = {};
      this.earnedPersonalities = [];
      _lodash2.default.extend(this, opts);
    }
  }, {
    key: '_allPersonalities',
    value: function _allPersonalities(player) {
      return (0, _lodash2.default)(AllPersonalities).values().filter(function (ach) {
        return ach.hasEarned(player);
      }).value();
    }
  }, {
    key: '_activePersonalityData',
    value: function _activePersonalityData() {
      var _this2 = this;

      return (0, _lodash2.default)(this.earnedPersonalities).filter(function (_ref) {
        var name = _ref.name;
        return _this2.isActive(name);
      }).map(function (_ref2) {
        var name = _ref2.name;
        return AllPersonalities[name];
      }).value();
    }
  }, {
    key: 'togglePersonality',
    value: function togglePersonality(player, personality) {
      var newState = !this.activePersonalities[personality];
      this.activePersonalities[personality] = newState;
      if (newState) {
        AllPersonalities[personality].enable(player);
      } else {
        AllPersonalities[personality].disable(player);
      }
      this.save();
    }
  }, {
    key: 'isAnyActive',
    value: function isAnyActive(personalities) {
      var _this3 = this;

      return _lodash2.default.some(personalities, function (p) {
        return _this3.isActive(p);
      });
    }
  }, {
    key: 'isActive',
    value: function isActive(personality) {
      return this.activePersonalities[personality];
    }
  }, {
    key: 'checkPersonalities',
    value: function checkPersonalities(player) {
      var earned = this._allPersonalities(player);
      var earnedObjs = _lodash2.default.sortBy(_lodash2.default.map(earned, function (pers) {
        return {
          name: pers.name,
          description: pers.description
        };
      }), 'name');

      this.earnedPersonalities = earnedObjs;
      // this.save(); - these are regenerated a lot, this is not really necessary except on toggle

      return earnedObjs;
    }
  }, {
    key: 'save',
    value: function save() {
      this.personalitiesDb.savePersonalities(this);
    }
  }]);

  return Personalities;
}()) || _class);