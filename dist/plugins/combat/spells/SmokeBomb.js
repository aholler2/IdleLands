'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmokeBomb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _DEXLoss = require('../effects/DEXLoss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SmokeBomb = exports.SmokeBomb = (_temp = _class = function (_Spell) {
  _inherits(SmokeBomb, _Spell);

  function SmokeBomb() {
    _classCallCheck(this, SmokeBomb);

    return _possibleConstructorReturn(this, (SmokeBomb.__proto__ || Object.getPrototypeOf(SmokeBomb)).apply(this, arguments));
  }

  _createClass(SmokeBomb, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allEnemies;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 2 + this.spellPower;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 25 * this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player throws a %spellName at %targetName!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        _get(SmokeBomb.prototype.__proto__ || Object.getPrototypeOf(SmokeBomb.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _DEXLoss.DEXLoss,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'DEXLoss');
    }
  }]);

  return SmokeBomb;
}(_spell.Spell), _class.element = _spell.SpellType.DEBUFF, _class.tiers = [{ name: 'smoke bomb', spellPower: 1, weight: 25, cost: 100, profession: 'Archer', level: 5 }, { name: 'smoke grenade', spellPower: 2, weight: 25, cost: 500, profession: 'Archer', level: 35 }, { name: 'smoke missile', spellPower: 3, weight: 25, cost: 1500, profession: 'Archer', level: 85 }], _temp);