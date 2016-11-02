'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cure = undefined;

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

var Cure = exports.Cure = (_temp = _class = function (_Spell) {
  _inherits(Cure, _Spell);

  function Cure() {
    _classCallCheck(this, Cure);

    return _possibleConstructorReturn(this, (Cure.__proto__ || Object.getPrototypeOf(Cure)).apply(this, arguments));
  }

  _createClass(Cure, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.int / 4;
      var max = this.caster.liveStats.int;
      return -this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomAllyBelowHealthPercent(80);
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player cast %spellName at %targetName and healed %healed hp!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        _get(Cure.prototype.__proto__ || Object.getPrototypeOf(Cure.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.allyBelowHealthPercent(caster, 80);
    }
  }]);

  return Cure;
}(_spell.Spell), _class.element = _spell.SpellType.HEAL, _class.tiers = [{ name: 'cure', spellPower: 1.0, weight: 40, cost: 10, level: 1, profession: 'Cleric' }, { name: 'heal', spellPower: 1.5, weight: 40, cost: 450, level: 25, profession: 'Cleric' }, { name: 'restore', spellPower: 2.5, weight: 40, cost: 2300, level: 65, profession: 'Cleric' }, { name: 'revitalize', spellPower: 5.5, weight: 40, cost: 7300, level: 115, profession: 'Cleric',
  collectibles: ['Strand of Fate'] }, { name: 'mini cure', spellPower: 1.0, weight: 35, cost: 100, level: 15, profession: 'MagicalMonster',
  collectibles: ['Cleric\'s Text'] }], _temp);