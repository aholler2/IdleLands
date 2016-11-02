'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatCalculator = exports.ALL_STATS = exports.ATTACK_STATS = exports.SPECIAL_STATS = exports.BASE_STATS = exports.ATTACK_STATS_BASE = exports.SPECIAL_STATS_BASE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _settings = require('../static/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SPECIAL_STATS_BASE = exports.SPECIAL_STATS_BASE = [{ name: 'hpregen', desc: 'Regenerate HP every combat round.', enchantMax: 100 }, { name: 'mpregen', desc: 'Regenerate MP every combat round.', enchantMax: 100 }, { name: 'damageReduction', desc: 'Take 1 fewer damage per point from some sources. Stacks intensity.', enchantMax: 100 }, { name: 'crit', desc: '+1% crit chance. Stacks intensity.', enchantMax: 1 }, { name: 'dance', desc: '+50% dodge chance.', enchantMax: 1 }, { name: 'deadeye', desc: '+50% chance to beat opponent dodge.', enchantMax: 1 }, { name: 'offense', desc: '+10% offensive combat rolls. Stacks intensity.', enchantMax: 1 }, { name: 'defense', desc: '+10% defensive combat rolls. Stacks intensity.', enchantMax: 1 }, { name: 'lethal', desc: '+50% critical damage.', enchantMax: 1 }, { name: 'aegis', desc: 'Negates critical hits.', enchantMax: 1 }, { name: 'silver', desc: '+10% minimum attack damage.', enchantMax: 1 }, { name: 'power', desc: '+10% maximum attack damage.', enchantMax: 1 }, { name: 'vorpal', desc: '+10% critical chance.', enchantMax: 1 }, { name: 'glowing', desc: '+5% to all physical combat rolls. Stacks intensity.', enchantMax: 1 }, { name: 'sentimentality', desc: '+1 score. Stacks intensity.', enchantMax: 500 }, { name: 'hp', desc: '+1 hp. Stacks intensity.', enchantMax: 2000 }, { name: 'mp', desc: '+1 mp. Stacks intensity.', enchantMax: 2000 }, { name: 'xp', desc: 'Gain +1 xp every time xp is gained.', enchantMax: 1 }, { name: 'gold', desc: 'Gain +1 gold every time gold is gained.', enchantMax: 500 }];

var ATTACK_STATS_BASE = exports.ATTACK_STATS_BASE = [{ name: 'prone', desc: '+5% chance of stunning an opponent for 1 round.', enchantMax: 1 }, { name: 'venom', desc: '+5% chance of inflicting venom (DoT, % of target HP) on an enemy. Stacks intensity.', enchantMax: 1 }, { name: 'poison', desc: '+5% chance of inflicting poison (DoT, based on caster INT) on an enemy. Stacks intensity.', enchantMax: 1 }, { name: 'shatter', desc: '+5% chance of inflicting shatter (-10% CON/DEX/AGI) on an enemy. Stacks intensity.', enchantMax: 1 }, { name: 'vampire', desc: '+5% chance of inflicting vampire (health drain) on an enemy. Stacks intensity.', enchantMax: 1 }];

var BASE_STATS = exports.BASE_STATS = ['str', 'con', 'dex', 'int', 'agi', 'luk'];
var SPECIAL_STATS = exports.SPECIAL_STATS = _lodash2.default.map(SPECIAL_STATS_BASE, 'name');
var ATTACK_STATS = exports.ATTACK_STATS = _lodash2.default.map(ATTACK_STATS_BASE, 'name');

var ALL_STATS = exports.ALL_STATS = BASE_STATS.concat(SPECIAL_STATS).concat(ATTACK_STATS);

var StatCalculator = function () {
  function StatCalculator() {
    _classCallCheck(this, StatCalculator);
  }

  _createClass(StatCalculator, null, [{
    key: '_reduction',
    value: function _reduction(stat) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var baseValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      return baseValue + this._baseStat(args[0], stat);
    }
  }, {
    key: '_secondPassFunctions',
    value: function _secondPassFunctions(player, stat) {
      var possibleFunctions = [player.$profession.classStats].concat(this._achievementFunctions(player, stat)).concat(this._personalityFunctions(player, stat));

      return (0, _lodash2.default)(possibleFunctions).map(stat).filter(_lodash2.default.isFunction).compact().value();
    }
  }, {
    key: '_baseStat',
    value: function _baseStat(player, stat) {
      return this.classStat(player, stat) + this.effectStat(player, stat) + this.equipmentStat(player, stat) + this.professionStat(player, stat) + this.achievementStat(player, stat) + this.personalityStat(player, stat);
    }
  }, {
    key: 'equipmentStat',
    value: function equipmentStat(player, stat) {
      return (0, _lodash2.default)(player.equipment).values().flatten().map(function (item) {
        return _lodash2.default.isNumber(item[stat]) ? item[stat] : 0;
      }).sum();
    }
  }, {
    key: 'professionStat',
    value: function professionStat(player, stat) {
      var base = player.$profession.classStats[stat];
      if (!base || _lodash2.default.isFunction(base)) return 0;
      return base;
    }
  }, {
    key: 'effectStat',
    value: function effectStat(player, stat) {
      return (0, _lodash2.default)(player.$effects.effects).map(function (effect) {
        return effect[stat] || 0;
      }).sum();
    }
  }, {
    key: 'classStat',
    value: function classStat(player, stat) {
      return player.level * (player.$profession['base' + _lodash2.default.capitalize(stat) + 'PerLevel'] || 0);
    }
  }, {
    key: '_achievementFunctions',
    value: function _achievementFunctions(player, stat) {
      if (!player.$achievements) return [];
      return (0, _lodash2.default)(player.$achievements.achievements).values().map('rewards').flattenDeep().reject(function (bonus) {
        return bonus.type !== 'stats';
      }).reject(function (bonus) {
        return !bonus[stat];
      }).value();
    }
  }, {
    key: 'achievementStat',
    value: function achievementStat(player, stat) {
      if (!player.$achievements) return 0;
      return (0, _lodash2.default)(player.$achievements.achievements).values().map('rewards').flattenDeep().reject(function (bonus) {
        return bonus.type !== 'stats';
      }).reject(function (bonus) {
        return !bonus[stat] || _lodash2.default.isFunction(bonus[stat]);
      }).reduce(function (prev, cur) {
        return prev + +cur[stat];
      }, 0);
    }
  }, {
    key: '_personalityFunctions',
    value: function _personalityFunctions(player) {
      if (!player.$achievements) return [];
      return (0, _lodash2.default)(player.$personalities._activePersonalityData()).map('stats').value();
    }
  }, {
    key: 'personalityStat',
    value: function personalityStat(player, stat) {
      if (!player.$personalities) return 0;
      return (0, _lodash2.default)(player.$personalities._activePersonalityData()).reject(function (pers) {
        return !pers.stats[stat] || _lodash2.default.isFunction(pers.stats[stat]);
      }).map(function (pers) {
        return pers.stats[stat] || 0;
      }).sum();
    }
  }, {
    key: 'stat',
    value: function stat(player, _stat) {
      var baseValueMod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var doRound = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (player.$dirty && !player.$dirty.flags[_stat] && player.stats[_stat]) {
        return player.stats[_stat];
      }

      if (player.$dirty) {
        player.$dirty.flags[_stat] = false;
      }

      var mods = 0;
      var baseValue = baseValueMod + this._baseStat(player, _stat);

      var functions = this._secondPassFunctions(player, _stat);
      _lodash2.default.each(functions, function (func) {
        mods += func(player, baseValue);
      });

      return doRound ? Math.floor(baseValue + mods) : baseValue + mods;
    }
  }, {
    key: 'gold',
    value: function gold(player) {
      var _this = this;

      return function (baseVal) {
        return _this.stat(player, 'gold', baseVal, true);
      };
    }
  }, {
    key: 'xp',
    value: function xp(player) {
      var _this2 = this;

      return function (baseVal) {
        return _this2.stat(player, 'xp', baseVal, true);
      };
    }
  }, {
    key: 'hp',
    value: function hp(player) {
      var level = player.level;
      var prof = player.$profession;
      return Math.max(1, prof.baseHpPerLevel * level + prof.baseHpPerStr * this.stat(player, 'str') + prof.baseHpPerCon * this.stat(player, 'con') + prof.baseHpPerDex * this.stat(player, 'dex') + prof.baseHpPerAgi * this.stat(player, 'agi') + prof.baseHpPerInt * this.stat(player, 'int') + prof.baseHpPerLuk * this.stat(player, 'luk') + this.stat(player, 'hp'));
    }
  }, {
    key: 'mp',
    value: function mp(player) {
      var level = player.level;
      var prof = player.$profession;
      return Math.max(0, prof.baseMpPerLevel * level + prof.baseMpPerStr * this.stat(player, 'str') + prof.baseMpPerCon * this.stat(player, 'con') + prof.baseMpPerDex * this.stat(player, 'dex') + prof.baseMpPerAgi * this.stat(player, 'agi') + prof.baseMpPerInt * this.stat(player, 'int') + prof.baseMpPerLuk * this.stat(player, 'luk') + this.stat(player, 'mp'));
    }
  }, {
    key: 'overcomeDodge',
    value: function overcomeDodge(player) {
      return (1 + (this.stat(player, 'deadeye') > 0 ? 1.5 : 1) + this.stat(player, 'glowing') * 0.05 + this.stat(player, 'offense') * 0.1) * Math.max(10, this.stat(player, 'str') + this.stat(player, 'dex') + this.stat(player, 'con') + this.stat(player, 'int') + this.stat(player, 'agi') + this.stat(player, 'luk'));
    }
  }, {
    key: 'dodge',
    value: function dodge(player) {
      return (1 + (this.stat(player, 'dance') > 0 ? 1.5 : 1) + this.stat(player, 'glowing') * 0.05 + this.stat(player, 'defense') * 0.1) * (this.stat(player, 'agi') + this.stat(player, 'luk')) / 8;
    }
  }, {
    key: 'hit',
    value: function hit(player) {
      return (1 + this.stat(player, 'offense') * 0.1 + this.stat(player, 'glowing') * 0.05) * Math.max(10, (this.stat(player, 'str') + this.stat(player, 'dex')) / 2);
    }
  }, {
    key: 'avoidHit',
    value: function avoidHit(player) {
      return (1 + this.stat(player, 'defense') * 0.1 + this.stat(player, 'glowing') * 0.05) * (this.stat(player, 'agi') + this.stat(player, 'dex') + this.stat(player, 'con') + this.stat(player, 'int')) / 16;
    }
  }, {
    key: 'deflect',
    value: function deflect(player) {
      return this.stat(player, 'luk');
    }
  }, {
    key: 'itemValueMultiplier',
    value: function itemValueMultiplier(player) {
      var baseValue = _settings.SETTINGS.reductionDefaults.itemValueMultiplier;
      var reducedValue = this.stat(player, 'itemValueMultiplier', baseValue, false);
      return reducedValue;
    }
  }, {
    key: 'itemFindRange',
    value: function itemFindRange(player) {
      var baseValue = (player.level + 1) * _settings.SETTINGS.reductionDefaults.itemFindRange;
      var reducedValue = this.stat(player, 'itemFindRange', baseValue, false);

      return Math.floor(reducedValue * this.itemFindRangeMultiplier(player));
    }
  }, {
    key: 'itemFindRangeMultiplier',
    value: function itemFindRangeMultiplier(player) {
      var baseValue = 1 + 0.2 * Math.floor(player.level / 10) + _settings.SETTINGS.reductionDefaults.itemFindRangeMultiplier;
      return this.stat(player, 'itemFindRangeMultiplier', baseValue, false);
    }
  }, {
    key: 'merchantItemGeneratorBonus',
    value: function merchantItemGeneratorBonus(player) {
      var baseValue = _settings.SETTINGS.reductionDefaults.merchantItemGeneratorBonus;
      return this._reduction('merchantItemGeneratorBonus', [player], baseValue);
    }
  }, {
    key: 'merchantCostReductionMultiplier',
    value: function merchantCostReductionMultiplier(player) {
      var baseValue = _settings.SETTINGS.reductionDefaults.merchantCostReductionMultiplier;
      return this._reduction('merchantCostReductionMultiplier', [player], baseValue);
    }
  }, {
    key: 'isStunned',
    value: function isStunned(player) {
      var isStunned = _lodash2.default.filter(player.$effects.effects, function (effect) {
        return effect.stun;
      });
      if (isStunned.length > 0) {
        return isStunned[0].stunMessage || 'NO STUN MESSAGE';
      }
    }
  }]);

  return StatCalculator;
}();

exports.StatCalculator = StatCalculator;