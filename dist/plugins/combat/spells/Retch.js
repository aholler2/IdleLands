'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Retch = undefined;

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

var Retch = exports.Retch = (_temp = _class = function (_Spell) {
  _inherits(Retch, _Spell);

  function Retch() {
    _classCallCheck(this, Retch);

    return _possibleConstructorReturn(this, (Retch.__proto__ || Object.getPrototypeOf(Retch)).apply(this, arguments));
  }

  _createClass(Retch, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var drunkMultiplier = this.caster.$personalities && this.caster.$personalities.isActive('Drunk') ? 2 : 1;
      var min = this.caster.liveStats.str * 0.50 * drunkMultiplier;
      var max = this.caster.liveStats.str * 0.75 * drunkMultiplier;
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

      var message = '%player %spellName\'d all over %targetName and dealt %damage damage!';
      var targets = this.determineTargets();
      this.caster.$drunk.toMinimum();
      this.caster._special.add(_spell.Spell.chance.integer({ min: 20, max: 30 }));

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        _get(Retch.prototype.__proto__ || Object.getPrototypeOf(Retch.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return caster.$effects.hasEffect('DrunkenStupor') || caster.$drunk.gtePercent(75);
    }
  }]);

  return Retch;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'retch', spellPower: 1, weight: 80, cost: 0, level: 40, profession: 'Pirate' }, { name: 'vomit', spellPower: 2, weight: 80, cost: 0, level: 80, profession: 'Pirate' }, { name: 'explosive vomit', spellPower: 3, weight: 80, cost: 0, level: 120, profession: 'Pirate',
  collectibles: ['Unpleasant Glass of Water'] }], _temp);