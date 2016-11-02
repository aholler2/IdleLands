'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebuffTouch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebuffTouch = exports.DebuffTouch = (_temp = _class = function (_Spell) {
  _inherits(DebuffTouch, _Spell);

  function DebuffTouch() {
    _classCallCheck(this, DebuffTouch);

    return _possibleConstructorReturn(this, (DebuffTouch.__proto__ || Object.getPrototypeOf(DebuffTouch)).apply(this, arguments));
  }

  _createClass(DebuffTouch, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemyWithoutEffect('Poison');
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage(target) {
      if (this.spellPower < 4 || target.$isBoss) return 0;
      var min = target.hp * 0.15;
      var max = target.hp * 0.25;
      return this.minMax(min, max);
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 3;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 1;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      var effects = ['poison'];
      if (this.spellPower > 1) effects.push('prone');
      if (this.spellPower > 2) effects.push('venom');

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage(target);

        var message = '%player used %spellName on %targetName!';
        if (damage > 0) {
          _this2.caster.$battle.healDamage(_this2.caster, damage, target);
          message = '%player used %spellName on %targetName and drained %damage hp!';
        }

        _get(DebuffTouch.prototype.__proto__ || Object.getPrototypeOf(DebuffTouch.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });

        _get(DebuffTouch.prototype.__proto__ || Object.getPrototypeOf(DebuffTouch.prototype), 'applyCombatEffects', _this2).call(_this2, effects, target);
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'Poison');
    }
  }]);

  return DebuffTouch;
}(_spell.Spell), _class.element = _spell.SpellType.DEBUFF, _class.tiers = [{ name: 'poisontouch', spellPower: 1, weight: 30, cost: 500, level: 15, profession: 'Necromancer' }, { name: 'stuntouch', spellPower: 2, weight: 30, cost: 1700, level: 35, profession: 'Necromancer' }, { name: 'venomtouch', spellPower: 3, weight: 30, cost: 3800, level: 55, profession: 'Necromancer' }, { name: 'deathtouch', spellPower: 4, weight: 30, cost: 7500, level: 85, profession: 'Necromancer',
  collectibles: ['Forbidden Cleric\'s Text'] }], _temp);