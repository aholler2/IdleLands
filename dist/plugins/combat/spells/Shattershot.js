'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shattershot = undefined;

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

var Shattershot = exports.Shattershot = (_temp = _class = function (_Spell) {
  _inherits(Shattershot, _Spell);

  function Shattershot() {
    _classCallCheck(this, Shattershot);

    return _possibleConstructorReturn(this, (Shattershot.__proto__ || Object.getPrototypeOf(Shattershot)).apply(this, arguments));
  }

  _createClass(Shattershot, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemy;
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      var min = (this.caster.liveStats.str + this.caster.liveStats.dex * 0.5) * 0.2;
      var max = (this.caster.liveStats.str + this.caster.liveStats.dex * 0.5) * 0.4;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 2;
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

      var message = '%player knocked %targetName to the floor using a %spellName, dealing %damage damage!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        _get(Shattershot.prototype.__proto__ || Object.getPrototypeOf(Shattershot.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });

        _get(Shattershot.prototype.__proto__ || Object.getPrototypeOf(Shattershot.prototype), 'applyCombatEffects', _this2).call(_this2, _lodash2.default.sampleSize(_statCalculator.ATTACK_STATS, _this2.spellPower + 1), target);
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'Shatter');
    }
  }]);

  return Shattershot;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.stat = 'special', _class.tiers = [{ name: 'shattershot', spellPower: 1, weight: 30, cost: 25, level: 25, profession: 'Archer' }, { name: 'shatterblast', spellPower: 2, weight: 30, cost: 35, level: 65, profession: 'Archer' }], _temp);