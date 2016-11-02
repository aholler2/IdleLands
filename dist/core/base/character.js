'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Character = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _restrictedNumber = require('restricted-number');

var _restrictedNumber2 = _interopRequireDefault(_restrictedNumber);

var _gameState = require('../game-state');

var _settings = require('../../static/settings');

var _logger = require('../../shared/logger');

var _equipment = require('../base/equipment');

var _spellmanager = require('../../plugins/combat/spellmanager');

var _effectmanager = require('../../plugins/combat/effectmanager');

var _statCalculator = require('../../shared/stat-calculator');

var _generator = require('./generator.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = exports.Character = function () {
  function Character() {
    _classCallCheck(this, Character);
  }

  _createClass(Character, [{
    key: 'init',
    value: function init(opts) {
      var _this = this;

      _lodash2.default.extend(this, opts);
      if (!this.name) _logger.Logger.error('Player', new Error('No name specified.'), opts);

      if (!this._hp) this._hp = { minimum: 0, maximum: 20, __current: 20 };
      if (!this._mp) this._mp = { minimum: 0, maximum: 0, __current: 0 };
      if (!this._xp) this._xp = { minimum: 0, maximum: this.levelUpXpCalc(1), __current: 0 };
      if (!this._level) this._level = { minimum: 0, maximum: _settings.SETTINGS.maxLevel, __current: this.levelSet || 1 };
      if (!this._special) this._special = { minimum: 0, maximum: 0, __current: 0 };

      if (this._level.maximum < _settings.SETTINGS.maxLevel) {
        this._level.maximum = _settings.SETTINGS.maxLevel;
      }

      _lodash2.default.each(['_hp', '_mp', '_xp', '_level', '_special'], function (stat) {
        if (_lodash2.default.isNaN(_this[stat].__current)) _this[stat].__current = 0;
        _this[stat].__proto__ = _restrictedNumber2.default.prototype;
      });

      _lodash2.default.each(_lodash2.default.flatten(_lodash2.default.values(this.equipment)), function (item) {
        return item.__proto__ = _equipment.Equipment.prototype;
      });

      if (!this.gender) this.gender = _lodash2.default.sample(['male', 'female']);
      if (!this.professionName) this.professionName = 'Generalist';
      if (!this.equipment) this.equipment = {};
      if (!this.statCache) this.statCache = {};

      this.$effects = new _effectmanager.EffectManager();

      this.$stats = new Proxy({}, {
        get: function get(target, name) {
          if (_lodash2.default.includes(_generator.Generator.stats, name) && !_lodash2.default.includes(['gold', 'xp'], name)) {
            return _statCalculator.StatCalculator.stat(_this, name);
          }

          try {
            return _statCalculator.StatCalculator[name](_this);
          } catch (e) {
            _logger.Logger.error('Character: $stats', e, { name: name });
          }
        }
      });

      this.changeProfession(this.professionName);
    }
  }, {
    key: 'recalculateStats',
    value: function recalculateStats() {
      var _this2 = this;

      var otherStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _statCalculator.ALL_STATS.concat(['itemFindRange', 'itemFindRangeMultiplier']);

      _lodash2.default.each(otherStats, function (stat) {
        var val = _this2.liveStats[stat];
        if (_lodash2.default.includes(['xp', 'gold'], stat)) return;
        _this2.statCache[stat] = val;
      });

      var hpVal = _statCalculator.StatCalculator.hp(this);
      this._hp.maximum = this._hp.__current = hpVal + (this.hpBoost || 0);

      var mpVal = _statCalculator.StatCalculator.mp(this);
      this._mp.maximum = this._mp.__current = mpVal + (this.mpBoost || 0);
    }
  }, {
    key: 'changeProfession',
    value: function changeProfession(professionName) {
      if (this.$profession) this.$profession.unload(this);
      this.professionName = professionName;
      this.$profession = require('../professions/' + professionName)[professionName];
      this.$profession.load(this);
      this.recalculateStats();
    }
  }, {
    key: 'calcLuckBonusFromValue',
    value: function calcLuckBonusFromValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.liveStats.luk;

      var tiers = [1, 2, 4, 6, 10, 20, 35, 65, 125, 175, 200, 250, 400, 450, 500];

      var postMaxTierDifference = 150;

      var bonus = 0;

      for (var i = 0; i < tiers.length; i++) {
        if (value >= tiers[i]) {
          bonus++;
        }
      }

      var postmax = tiers[tiers.length - 1] + postMaxTierDifference;
      if (value >= tiers[tiers.length - 1]) {
        while (value > postmax) {
          bonus++;
          postmax += postMaxTierDifference;
        }
      }

      return bonus;
    }
  }, {
    key: 'canEquip',
    value: function canEquip(item) {
      var rangeBoostMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var myItem = this.equipment[item.type];
      var checkScore = item.score;
      var myScore = myItem ? myItem.score : -1000;

      var checkRangeMultiplier = this.$personalities && this.$personalities.isActive('SharpEye') ? 0.65 : 0.05;
      return checkScore > myScore * checkRangeMultiplier && checkScore <= rangeBoostMultiplier * this.liveStats.itemFindRange;
    }
  }, {
    key: 'equip',
    value: function equip(item) {
      item._wasEquipped = true;
      this.equipment[item.type] = item;
      this.recalculateStats();

      if (this.$statistics) {
        this.$statistics.incrementStat('Character.Item.Equip');
      }
    }
  }, {
    key: 'levelUp',
    value: function levelUp() {
      this._level.add(1);
      this.resetMaxXp();
      this._xp.toMinimum();
      this.recalculateStats();
    }
  }, {
    key: 'resetMaxXp',
    value: function resetMaxXp() {
      this._xp.maximum = this.levelUpXpCalc(this.level);
    }
  }, {
    key: 'levelUpXpCalc',
    value: function levelUpXpCalc(level) {
      return Math.floor(100 + 400 * Math.pow(level, 1.71));
    }
  }, {
    key: 'gainGold',
    value: function gainGold() {
      var gold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.gold += gold;
      if (this.gold < 0 || _lodash2.default.isNaN(this.gold)) {
        this.gold = 0;
      }
      return gold;
    }
  }, {
    key: 'gainXp',
    value: function gainXp() {
      var xp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this._xp.add(xp);
      return xp;
    }
  }, {
    key: 'sellItem',
    value: function sellItem(item) {
      var value = Math.max(1, Math.floor(item.score * this.liveStats.itemValueMultiplier));

      if (this.$statistics) {
        this.$statistics.incrementStat('Character.Item.Sell');
      }

      var gold = this.gainGold(value);
      return gold;
    }
  }, {
    key: 'hp',
    get: function get() {
      return this._hp.__current;
    }
  }, {
    key: 'mp',
    get: function get() {
      return this._mp.__current;
    }
  }, {
    key: 'xp',
    get: function get() {
      return this._xp.__current;
    }
  }, {
    key: 'level',
    get: function get() {
      return this._level.__current;
    }
  }, {
    key: 'special',
    get: function get() {
      return this._special.__current;
    }
  }, {
    key: 'profession',
    get: function get() {
      return this.$profession;
    }
  }, {
    key: 'liveStats',
    get: function get() {
      return this.$stats;
    }
  }, {
    key: 'stats',
    get: function get() {
      return this.statCache;
    }
  }, {
    key: 'fullname',
    get: function get() {
      return this.name;
    }
  }, {
    key: 'party',
    get: function get() {
      if (!this.$partyName) return null;
      return _gameState.GameState.getInstance().getParty(this.$partyName);
    }
  }, {
    key: 'itemScore',
    get: function get() {
      return _lodash2.default.reduce(_lodash2.default.flatten(_lodash2.default.values(this.equipment)), function (prev, cur) {
        return prev + cur.score;
      }, 0);
    }
  }, {
    key: 'spells',
    get: function get() {
      return _spellmanager.SpellManager.validSpells(this);
    }
  }, {
    key: 'isPlayer',
    get: function get() {
      return this.joinDate;
    }
  }]);

  return Character;
}();