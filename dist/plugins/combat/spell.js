'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpellType = exports.Spell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spelltargetstrategy = require('./spelltargetstrategy');

var _spelltargetpossibilities = require('./spelltargetpossibilities');

var _messagecreator = require('../../plugins/events/messagecreator');

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var isValidSpellTierProfession = function isValidSpellTierProfession(tier, caster) {
  return tier.profession === caster.professionName || caster.$secondaryProfessions && _lodash2.default.includes(caster.$secondaryProfessions, tier.profession);
};

var Spell = exports.Spell = (_temp = _class = function () {
  _createClass(Spell, [{
    key: 'tier',
    get: function get() {
      var _this = this;

      var tiers = this.constructor.tiers;

      var collectibleCheck = this.caster.$ownerRef ? this.caster.$ownerRef : this.caster;

      return _lodash2.default.last(_lodash2.default.filter(tiers, function (tier) {
        var meetsCollectibleReqs = tier.collectibles ? _lodash2.default.every(tier.collectibles, function (c) {
          return !collectibleCheck.$collectibles || collectibleCheck.$collectibles.hasCollectible(c);
        }) : true;
        return isValidSpellTierProfession(tier, _this.caster) && tier.level <= _this.caster.level && meetsCollectibleReqs;
      }));
    }
  }, {
    key: 'stat',
    get: function get() {
      return this.constructor.stat;
    }
  }, {
    key: 'oper',
    get: function get() {
      return this.constructor.oper;
    }
  }, {
    key: 'element',
    get: function get() {
      return this.constructor.element;
    }
  }, {
    key: 'spellPower',
    get: function get() {
      return this.tier.spellPower;
    }
  }, {
    key: 'cost',
    get: function get() {
      return this.tier.cost;
    }
  }], [{
    key: 'bestTier',
    value: function bestTier(caster) {

      var collectibleCheck = caster.$ownerRef ? caster.$ownerRef : caster;

      return _lodash2.default.last(_lodash2.default.filter(this.tiers, function (tier) {
        var meetsCollectibleReqs = tier.collectibles ? _lodash2.default.every(tier.collectibles, function (c) {
          return !collectibleCheck.$collectibles || collectibleCheck.$collectibles.hasCollectible(c);
        }) : true;
        return isValidSpellTierProfession(tier, caster) && tier.level <= caster.level && meetsCollectibleReqs;
      }));
    }
  }, {
    key: 'chance',
    get: function get() {
      return chance;
    }
  }]);

  function Spell(caster) {
    var _this2 = this;

    _classCallCheck(this, Spell);

    this.caster = caster;
    this.$targetting = new Proxy({}, {
      get: function get(target, name) {
        return _spelltargetstrategy.SpellTargetStrategy[name](_this2.caster);
      }
    });
  }

  _createClass(Spell, [{
    key: 'calcDamage',
    value: function calcDamage() {
      return 0;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 0;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 0;
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return [];
    }
  }, {
    key: '_emitMessage',
    value: function _emitMessage(player, message) {
      var extraData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return _messagecreator.MessageParser.stringFormat(message, player, extraData);
    }
  }, {
    key: 'cast',
    value: function cast(_ref) {
      var _this3 = this;

      var damage = _ref.damage,
          targets = _ref.targets,
          message = _ref.message,
          applyEffect = _ref.applyEffect,
          applyEffectDuration = _ref.applyEffectDuration,
          applyEffectPotency = _ref.applyEffectPotency,
          applyEffectName = _ref.applyEffectName,
          applyEffectExtra = _ref.applyEffectExtra,
          _ref$messageData = _ref.messageData,
          messageData = _ref$messageData === undefined ? {} : _ref$messageData;


      this.caster.$battle.tryIncrement(this.caster, 'Combat.Utilize.' + this.element);

      damage = Math.round(damage);
      this.caster['_' + this.stat][this.oper](this.cost);

      messageData.spellName = this.tier.name;

      if (!targets.length) {
        this.caster.$battle._emitMessage(this._emitMessage(this.caster, message, messageData));
        return;
      }

      _lodash2.default.each(targets, function (target) {
        messageData.targetName = target.fullname;

        _this3.caster.$battle.emitEvents(_this3.caster, 'Attack');
        _this3.caster.$battle.emitEvents(target, 'Attacked');

        var wasAlive = target.hp > 0;
        if (damage !== 0) {
          damage = _this3.dealDamage(target, damage);
        }

        messageData.damage = damage;
        messageData.healed = Math.abs(damage);

        // TODO mark an attack as fatal somewhere else in metadata and display metadata on site
        if (message) {
          _this3.caster.$battle._emitMessage(_this3._emitMessage(_this3.caster, message, messageData));
        }

        // Target was killed by this attack. Prevents double counting of kills.
        if (wasAlive && target.hp === 0) {
          _this3.caster.$battle.handleDeath(target, _this3.caster);
        }

        if (applyEffect && target.hp > 0) {
          var effect = new applyEffect({ target: target, extra: applyEffectExtra, potency: applyEffectPotency || _this3.calcPotency(), duration: applyEffectDuration || _this3.calcDuration() });
          effect.origin = { name: _this3.caster.fullname, ref: _this3.caster, spell: applyEffectName || _this3.tier.name };
          target.$effects.add(effect);
          effect.affect(target);
          _this3.caster.$battle.tryIncrement(_this3.caster, 'Combat.Give.Effect.' + _this3.element);
          _this3.caster.$battle.tryIncrement(target, 'Combat.Receive.Effect.' + _this3.element);
        }
      });
    }
  }, {
    key: 'preCast',
    value: function preCast() {}
  }, {
    key: 'dealDamage',
    value: function dealDamage(target, damage) {
      return this.caster.$battle.dealDamage(target, damage, this.caster);
    }
  }, {
    key: 'minMax',
    value: function minMax(min, max) {
      return Math.max(1, Spell.chance.integer({ min: min, max: Math.max(min + 1, max) }));
    }
  }, {
    key: 'applyCombatEffects',
    value: function applyCombatEffects(effects, target) {
      var _this4 = this;

      _lodash2.default.each(effects, function (stat) {
        var properEffect = _lodash2.default.capitalize(stat);
        var effect = require('./effects/' + properEffect)[properEffect];

        var potencyBonus = _this4.caster.liveStats[stat];
        if (potencyBonus < 0) potencyBonus = 0;

        _this4.cast({
          damage: 0,
          message: '',
          applyEffect: effect,
          applyEffectName: stat,
          applyEffectPotency: 1 + potencyBonus,
          applyEffectDuration: stat === 'prone' ? 1 : _this4.calcDuration(),
          targets: [target]
        });
      });
    }
  }]);

  return Spell;
}(), _class.tiers = [], _class.$canTarget = _spelltargetpossibilities.SpellTargetPossibilities, _class.stat = 'mp', _class.oper = 'sub', _temp);
var SpellType = exports.SpellType = {
  PHYSICAL: 'Physical',

  BUFF: 'Buff',
  DEBUFF: 'Debuff',

  HEAL: 'Heal',

  DIGITAL: 'Digital',
  ENERGY: 'Energy',
  HOLY: 'Holy',

  THUNDER: 'Thunder',
  FIRE: 'Fire',
  WATER: 'Water',
  ICE: 'Ice'
};