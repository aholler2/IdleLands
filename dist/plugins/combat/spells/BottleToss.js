'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottleToss = undefined;

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

var BottleToss = exports.BottleToss = (_temp = _class = function (_Spell) {
  _inherits(BottleToss, _Spell);

  function BottleToss() {
    _classCallCheck(this, BottleToss);

    return _possibleConstructorReturn(this, (BottleToss.__proto__ || Object.getPrototypeOf(BottleToss)).apply(this, arguments));
  }

  _createClass(BottleToss, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemy;
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      var drunkMultiplier = this.caster.$personalities && this.caster.$personalities.isActive('Drunk') ? 1.5 : 1;
      var bottlesBonus = this.caster._special.asPercent() / 100 * this.caster.liveStats.con;
      var min = (bottlesBonus + this.caster.liveStats.str) * 0.35 * drunkMultiplier;
      var max = (bottlesBonus + this.caster.liveStats.str) * 0.85 * drunkMultiplier;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player begins singing "99 bottles of ale on the wall..."!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        _get(BottleToss.prototype.__proto__ || Object.getPrototypeOf(BottleToss.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          targets: [target]
        });

        var tosses = 0;
        while (tosses === 0 || _this2.caster.special > 9 && _spell.Spell.chance.bool({ likelihood: 50 })) {
          tosses++;
          _get(BottleToss.prototype.__proto__ || Object.getPrototypeOf(BottleToss.prototype), 'cast', _this2).call(_this2, {
            damage: _this2.calcDamage(),
            message: '%player threw 9 bottles at %targetName, dealing %damage damage!',
            targets: [target]
          });
          _this2.caster._special.sub(9);
        }
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return caster.special > 9;
    }
  }]);

  return BottleToss;
}(_spell.Spell), _class.description = 'Throw a bottle at a target, dealing damage based on STR, CON, and # of Bottles. Has a chance of throwing multiple bottles. Requires and consumes 9 bottles each throw. Deals 1.5x damage if the Drunk personality is activated.', _class.element = _spell.SpellType.DEBUFF, _class.stat = 'special', _class.tiers = [{ name: 'bottle toss', spellPower: 1, weight: 25, cost: 0, profession: 'Pirate', level: 1 }], _temp);