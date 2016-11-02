'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnergyMissile = undefined;

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

var EnergyMissile = exports.EnergyMissile = (_temp = _class = function (_Spell) {
  _inherits(EnergyMissile, _Spell);

  function EnergyMissile() {
    _classCallCheck(this, EnergyMissile);

    return _possibleConstructorReturn(this, (EnergyMissile.__proto__ || Object.getPrototypeOf(EnergyMissile)).apply(this, arguments));
  }

  _createClass(EnergyMissile, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.int / 4;
      var max = this.caster.liveStats.int / 2;
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

      var message = '%player cast %spellName at %targetName and dealt %damage damage!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        _get(EnergyMissile.prototype.__proto__ || Object.getPrototypeOf(EnergyMissile.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast() {
      return this.$canTarget.yes();
    }
  }]);

  return EnergyMissile;
}(_spell.Spell), _class.element = _spell.SpellType.ENERGY, _class.tiers = [{ name: 'energy missile', spellPower: 3, weight: 40, cost: 10, level: 1, profession: 'Mage' }, { name: 'energy blast', spellPower: 5, weight: 40, cost: 450, level: 25, profession: 'Mage' }, { name: 'astral flare', spellPower: 7, weight: 40, cost: 2300, level: 65, profession: 'Mage' }, { name: 'energy prod', spellPower: 1, weight: 35, cost: 100, level: 15, profession: 'MagicalMonster',
  collectibles: ['Mage\'s Tome'] }], _temp);