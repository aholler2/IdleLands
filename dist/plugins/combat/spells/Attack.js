'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Attack = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _statCalculator = require('../../../shared/stat-calculator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attack = exports.Attack = (_temp = _class = function (_Spell) {
  _inherits(Attack, _Spell);

  function Attack() {
    _classCallCheck(this, Attack);

    return _possibleConstructorReturn(this, (Attack.__proto__ || Object.getPrototypeOf(Attack)).apply(this, arguments));
  }

  _createClass(Attack, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.str / 3 * (this.caster.liveStats.silver > 0 ? 1.1 : 1);
      var max = this.caster.liveStats.str * (this.caster.liveStats.power > 0 ? 1.1 : 1);
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemy;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player attacked %targetName with %hisher %weaponName and dealt %damage damage!';
      var weaponName = _lodash2.default.get(this.caster.equipment, 'mainhand.fullname', 'claw');
      var targets = this.determineTargets();

      if (_lodash2.default.compact(targets).length === 0) {
        return;
      }

      _lodash2.default.each(targets, function (target) {
        var done = false;
        var connected = true;
        var damage = _this2.calcDamage();
        var messageData = {
          weaponName: weaponName,
          damage: damage
        };

        var critChance = Math.min(100, Math.max(0, 1 + _this2.caster.liveStats.crit + (_this2.caster.liveStats.vorpal ? 10 : 0)));

        if (_spell.Spell.chance.bool({ likelihood: critChance }) && target.liveStats.aegis <= 0) {
          _this2.caster.$battle.tryIncrement(_this2.caster, 'Combat.Give.CriticalHit');
          _this2.caster.$battle.tryIncrement(target, 'Combat.Receive.CriticalHit');
          damage = _this2.caster.liveStats.str * _this2.spellPower * (_this2.caster.liveStats.lethal > 0 ? 1.5 : 1);
          message = '%player CRITICALLY attacked %targetName with %hisher %weaponName and dealt %damage damage!';
          done = true;
        }

        var canDodge = _spell.Spell.chance.bool({ likelihood: 80 });
        var _ref = [-target.liveStats.dodge, _this2.caster.liveStats.overcomeDodge],
            dodge = _ref[0],
            overcomeDodge = _ref[1];

        var dodgeRoll = _spell.Spell.chance.integer({ min: dodge, max: Math.max(dodge + 1, overcomeDodge) });

        if (!done && canDodge && dodgeRoll <= 0) {
          done = true;
          connected = false;
          _this2.caster.$battle.tryIncrement(_this2.caster, 'Combat.Give.Dodge');
          _this2.caster.$battle.tryIncrement(target, 'Combat.Receive.Dodge');
          message = '%player attacked %targetName with %hisher %weaponName, but %targetName dodged!';
          damage = 0;
        }

        var canAvoidHit = _spell.Spell.chance.bool({ likelihood: 80 });
        var _ref2 = [-target.liveStats.avoidHit, _this2.caster.liveStats.hit, -target.liveStats.deflect],
            avoidHit = _ref2[0],
            hit = _ref2[1],
            deflect = _ref2[2];

        var hitRoll = _spell.Spell.chance.integer({ min: avoidHit, max: Math.max(avoidHit + 1, hit) });

        if (!done && canAvoidHit && deflect <= hitRoll && hitRoll <= 0) {
          message = '%player attacked %targetName with %hisher %weaponName, but %player missed!';
          damage = 0;
          connected = false;

          if (hitRoll < deflect) {
            _this2.caster.$battle.tryIncrement(_this2.caster, 'Combat.Give.Deflect');
            _this2.caster.$battle.tryIncrement(target, 'Combat.Receive.Deflect');
            var deflectItem = _lodash2.default.get(_lodash2.default.sample(_lodash2.default.values(target.equipment)), 'fullname', 'claw');
            messageData.deflectItem = deflectItem;
            message = '%player attacked %targetName with %hisher %weaponName, but %targetName deflected it with %deflectItem!';
          } else {
            _this2.caster.$battle.tryIncrement(_this2.caster, 'Combat.Give.Miss');
            _this2.caster.$battle.tryIncrement(target, 'Combat.Receive.Miss');
          }
        }

        _get(Attack.prototype.__proto__ || Object.getPrototypeOf(Attack.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          messageData: messageData,
          targets: [target]
        });

        if (!connected) return;

        _lodash2.default.each(_statCalculator.ATTACK_STATS, function (stat) {
          var canUse = _this2.caster.liveStats[stat];
          if (canUse <= 0) return;

          var chance = _spell.Spell.chance.bool({ likelihood: Math.max(0, Math.min(100, canUse * 5)) });
          if (!chance) return;

          var properEffect = _lodash2.default.capitalize(stat);

          if (target.$effects.hasEffect(properEffect)) return;

          var effectProto = require('../effects/' + properEffect)[properEffect];

          var effect = new effectProto({ target: target, potency: canUse, duration: 0 });
          effect.origin = { name: _this2.caster.fullname, ref: _this2.caster, spell: stat };
          target.$effects.add(effect);
          effect.affect(target);

          _this2.caster.$battle.tryIncrement(_this2.caster, 'Combat.Give.CombatEffect.' + properEffect);
          _this2.caster.$battle.tryIncrement(target, 'Combat.Receive.CombatEffect.' + properEffect);
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast() {
      return this.$canTarget.yes();
    }
  }]);

  return Attack;
}(_spell.Spell), _class.description = 'A simple attack that uses STR to deal damage.', _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'attack', spellPower: 1.0, weight: 50, cost: 0, level: 1, profession: 'Archer' }, { name: 'attack', spellPower: 1.2, weight: 30, cost: 0, level: 1, profession: 'Barbarian' }, { name: 'strike', spellPower: 2.3, weight: 30, cost: 0, level: 50, profession: 'Barbarian' }, { name: 'attack', spellPower: 1.0, weight: 40, cost: 0, level: 1, profession: 'Bard' }, { name: 'attack', spellPower: 0.7, weight: 20, cost: 0, level: 1, profession: 'Bitomancer' }, { name: 'attack', spellPower: 0.8, weight: 20, cost: 0, level: 1, profession: 'Cleric' }, { name: 'attack', spellPower: 1.1, weight: 65, cost: 0, level: 1, profession: 'Fighter' }, { name: 'strike', spellPower: 1.3, weight: 65, cost: 0, level: 50, profession: 'Fighter' }, { name: 'assault', spellPower: 1.7, weight: 65, cost: 0, level: 100, profession: 'Fighter',
  collectibles: ['Broken Katana'] }, { name: 'attack', spellPower: 1.0, weight: 30, cost: 0, level: 1, profession: 'Generalist' }, { name: 'attack', spellPower: 1.0, weight: 50, cost: 0, level: 1, profession: 'Jester' }, { name: 'strike', spellPower: 1.5, weight: 50, cost: 0, level: 90, profession: 'Jester' }, { name: 'attack', spellPower: 0.5, weight: 50, cost: 0, level: 1, profession: 'Lich' }, { name: 'attack', spellPower: 0.6, weight: 15, cost: 0, level: 1, profession: 'Mage' }, { name: 'attack', spellPower: 0.9, weight: 20, cost: 0, level: 1, profession: 'MagicalMonster' }, { name: 'attack', spellPower: 1.0, weight: 50, cost: 0, level: 1, profession: 'Monster' }, { name: 'attack', spellPower: 0.5, weight: 20, cost: 0, level: 1, profession: 'Necromancer' }, { name: 'attack', spellPower: 1.1, weight: 50, cost: 0, level: 1, profession: 'Pirate' }, { name: 'strike', spellPower: 1.9, weight: 50, cost: 0, level: 75, profession: 'Pirate' }, { name: 'attack', spellPower: 1.0, weight: 20, cost: 0, level: 1, profession: 'Rogue' }, { name: 'strike', spellPower: 1.4, weight: 20, cost: 0, level: 25, profession: 'Rogue' }, { name: 'attack', spellPower: 1.0, weight: 50, cost: 0, level: 1, profession: 'SandwichArtist' }], _temp);