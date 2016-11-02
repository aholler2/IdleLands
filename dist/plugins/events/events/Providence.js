'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Providence = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _equipment = require('../../../core/base/equipment');

var _adventureLog = require('../../../shared/adventure-log');

var _stringGenerator = require('../../../shared/string-generator');

var _settings = require('../../../static/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = -1;

// Get the gift of the divine
var Providence = exports.Providence = (_temp = _class = function (_Event) {
  _inherits(Providence, _Event);

  function Providence() {
    _classCallCheck(this, Providence);

    return _possibleConstructorReturn(this, (Providence.__proto__ || Object.getPrototypeOf(Providence)).apply(this, arguments));
  }

  _createClass(Providence, null, [{
    key: 'generateProvidenceItem',
    value: function generateProvidenceItem() {
      var multiplier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var t0shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var t1shift = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var t2shift = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      var baseItem = {
        type: 'providence',
        itemClass: 'basic',
        name: _stringGenerator.StringGenerator.providence()
      };

      _lodash2.default.each(_event.Event.t0stats, function (stat) {
        if (_event.Event.chance.bool({ likelihood: 30 })) return;
        baseItem[stat] = _event.Event.chance.integer({
          min: Math.min(-15, (-150 + t0shift) * multiplier),
          max: (150 + t0shift) * multiplier
        });
      });

      _lodash2.default.each(_event.Event.t1stats, function (stat) {
        if (_event.Event.chance.bool({ likelihood: 40 })) return;
        baseItem[stat] = _event.Event.chance.integer({
          min: Math.min(-10, (-100 + t1shift) * multiplier),
          max: (100 + t1shift) * multiplier
        });
      });

      _lodash2.default.each(_event.Event.t2stats, function (stat) {
        if (_event.Event.chance.bool({ likelihood: 50 })) return;
        baseItem[stat] = _event.Event.chance.integer({
          min: Math.min(-10, (-75 + t2shift) * multiplier),
          max: (75 + t2shift) * multiplier
        });
      });

      return new _equipment.Equipment(baseItem);
    }
  }, {
    key: 'doBasicProvidencing',
    value: function doBasicProvidencing(player, provData) {
      var message = '';

      var xp = provData.xp,
          level = provData.level,
          gender = provData.gender,
          profession = provData.profession,
          gold = provData.gold;


      if (xp && _event.Event.chance.bool({ likelihood: this.probabilities.xp })) {
        var curPlayerXp = player.xp;
        var lostXp = curPlayerXp - xp;

        player._xp.add(xp);
        message = message + ' ' + (xp > 0 ? 'Gained' : 'Lost') + ' ' + Math.abs(xp) + ' xp!';

        if (xp < 0 && player._xp.atMinimum()) {
          message = message + ' Lost 1 level!';
          player._level.sub(1);
          player.resetMaxXp();
          player._xp.set(player._xp.maximum + lostXp);
        }
      } else if (level && _event.Event.chance.bool({ likelihood: this.probabilities.level })) {
        player._level.add(level);
        player.resetMaxXp();
        message = message + ' ' + (level > 0 ? 'Gained' : 'Lost') + ' ' + Math.abs(level) + ' levels!';
      }

      if (player.gender !== gender && _event.Event.chance.bool({ likelihood: this.probabilities.gender })) {
        player.gender = gender;
        message = message + ' Gender is now ' + gender + '!';
      }

      if (gold && _event.Event.chance.bool({ likelihood: this.probabilities.gold })) {
        player.gold += gold;
        message = message + ' ' + (gold > 0 ? 'Gained' : 'Lost') + ' ' + Math.abs(gold) + ' gold!';
      }

      if (profession !== player.professionName && _event.Event.chance.bool({ likelihood: this.probabilities.profession })) {
        player.changeProfession(profession);
        message = message + ' Profession is now ' + profession + '!';
      }

      if (_event.Event.chance.bool({ likelihood: this.probabilities.personality })) {
        _lodash2.default.each(player.$personalities.earnedPersonalities, function (_ref) {
          var name = _ref.name;

          if (name === 'Camping' || _event.Event.chance.bool({ likelihood: 50 })) return;
          player.$personalities.togglePersonality(player, name);
        });
        message = message + ' Personality shift!';
      }

      if (_event.Event.chance.bool({ likelihood: this.probabilities.title })) {
        player.changeTitle(_lodash2.default.sample(player.$achievements.titles()));
        message = message + ' Title change!';
      }

      return message;
    }
  }, {
    key: 'fatePoolProvidence',
    value: function fatePoolProvidence(player, baseMessage) {
      var providenceData = {
        xp: _event.Event.chance.integer({ min: -player._xp.maximum, max: player.level < 100 ? player._xp.maximum : 0 }),
        level: _event.Event.chance.integer({ min: -3, max: player.level < 100 ? 2 : 0 }),
        gender: _lodash2.default.sample(this._genders),
        profession: _lodash2.default.sample(this._professions(player)) || 'Generalist',
        gold: _event.Event.chance.integer({ min: -Math.min(30000, player.gold), max: 20000 })
      };

      baseMessage = baseMessage + ' ' + this.doBasicProvidencing(player, providenceData).trim();

      if (player.equipment.providence && _event.Event.chance.bool({ likelihood: this.probabilities.clearProvidence })) {
        player.equipment.providence = null;
        delete player.equipment.providence;

        baseMessage = baseMessage + ' Providence cleared!';
      } else if (!player.equipment.providence && _event.Event.chance.bool({ likelihood: this.probabilities.newProvidence })) {
        player.equipment.providence = this.generateProvidenceItem();
      }

      player.recalculateStats();
      this.emitMessage({ affected: [player], eventText: baseMessage, category: _adventureLog.MessageCategories.EXPLORE });
    }
  }, {
    key: 'operateOn',
    value: function operateOn(player) {
      var eventText = this.eventText('providence', player);
      this.fatePoolProvidence(player, eventText);
      player.$statistics.batchIncrement(['Character.Events', 'Character.Event.Providence']);
    }
  }]);

  return Providence;
}(_event.Event), _class.WEIGHT = WEIGHT, _class.probabilities = {
  xp: 10,
  level: 5,
  gender: 80,
  gold: 50,
  profession: 10,
  clearProvidence: 20,
  newProvidence: 75,
  personality: 50,
  title: 75
}, _class._genders = _settings.SETTINGS.validGenders, _class._professions = function (player) {
  return _lodash2.default.keys(player.$statistics.getStat('Character.Professions')) || ['Generalist'];
}, _temp);