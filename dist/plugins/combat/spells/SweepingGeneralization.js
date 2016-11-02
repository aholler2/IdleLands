'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SweepingGeneralization = undefined;

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

var SweepingGeneralization = exports.SweepingGeneralization = (_temp = _class = function (_Spell) {
  _inherits(SweepingGeneralization, _Spell);

  function SweepingGeneralization() {
    _classCallCheck(this, SweepingGeneralization);

    return _possibleConstructorReturn(this, (SweepingGeneralization.__proto__ || Object.getPrototypeOf(SweepingGeneralization)).apply(this, arguments));
  }

  _createClass(SweepingGeneralization, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = (this.caster.stats.str + this.caster.stats.dex) / 8;
      var max = (this.caster.stats.str + this.caster.stats.dex) / 4;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allEnemies;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player used %spellName on %targetName and dealt %damage damage!';
      var targets = this.determineTargets();
      var damage = this.calcDamage();

      _lodash2.default.each(targets, function (target) {
        _get(SweepingGeneralization.prototype.__proto__ || Object.getPrototypeOf(SweepingGeneralization.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.moreThanOneEnemy(caster);
    }
  }]);

  return SweepingGeneralization;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'sweeping generalization', spellPower: 1.0, weight: 35, cost: 50, profession: 'Generalist', level: 5 }, { name: 'broad generalization', spellPower: 3.0, weight: 35, cost: 500, profession: 'Generalist', level: 50 }, { name: 'sweepo generalizo', spellPower: 0.8, weight: 35, cost: 300, profession: 'MagicalMonster', level: 15,
  collectibles: ['Generalist\'s Guidebook'] }], _temp);