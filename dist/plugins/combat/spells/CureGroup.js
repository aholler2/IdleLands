'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CureGroup = undefined;

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

var CureGroup = exports.CureGroup = (_temp = _class = function (_Spell) {
  _inherits(CureGroup, _Spell);

  function CureGroup() {
    _classCallCheck(this, CureGroup);

    return _possibleConstructorReturn(this, (CureGroup.__proto__ || Object.getPrototypeOf(CureGroup)).apply(this, arguments));
  }

  _createClass(CureGroup, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.int;
      var max = this.caster.liveStats.int * 2;
      return -this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allAllies;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player cast %spellName at %targetName and healed %healed hp!';
      var targets = this.determineTargets();
      var totalHeal = this.calcDamage();
      var damage = totalHeal / this.caster.party.players.length;

      _lodash2.default.each(targets, function (target) {
        _get(CureGroup.prototype.__proto__ || Object.getPrototypeOf(CureGroup.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.allyBelow50PercentHealth(caster) && caster.party && caster.party.players.length > 1;
    }
  }]);

  return CureGroup;
}(_spell.Spell), _class.element = _spell.SpellType.HEAL, _class.tiers = [{ name: 'cure group', spellPower: 0.5, weight: 40, cost: 50, level: 30, profession: 'Cleric' }, { name: 'heal group', spellPower: 1.0, weight: 40, cost: 5800, level: 55, profession: 'Cleric' }, { name: 'restore group', spellPower: 1.5, weight: 40, cost: 13500, level: 95, profession: 'Cleric' }, { name: 'revitalize group', spellPower: 2.5, weight: 40, cost: 30000, level: 145, profession: 'Cleric',
  collectibles: ['Gauntlet'] }], _temp);