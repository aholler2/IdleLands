'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frostbite = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _Frostbite = require('../effects/Frostbite');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Frostbite = exports.Frostbite = (_temp = _class = function (_Spell) {
  _inherits(Frostbite, _Spell);

  function Frostbite() {
    _classCallCheck(this, Frostbite);

    return _possibleConstructorReturn(this, (Frostbite.__proto__ || Object.getPrototypeOf(Frostbite)).apply(this, arguments));
  }

  _createClass(Frostbite, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemyWithoutEffect('Frostbite');
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.int / 4;
      var max = this.caster.liveStats.int / 3;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return this.spellPower * 25;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 2 + this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player cast %spellName at %targetName and dealt %damage damage!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        _get(Frostbite.prototype.__proto__ || Object.getPrototypeOf(Frostbite.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          applyEffect: _Frostbite.Frostbite,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'Frostbite');
    }
  }]);

  return Frostbite;
}(_spell.Spell), _class.element = _spell.SpellType.ICE, _class.tiers = [{ name: 'frostbite', spellPower: 1, weight: 40, cost: 300, level: 15, profession: 'Mage' }, { name: 'cold snap', spellPower: 2, weight: 40, cost: 900, level: 65, profession: 'Mage' }], _temp);