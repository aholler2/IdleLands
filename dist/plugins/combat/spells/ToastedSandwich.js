'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastedSandwich = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _sandwichGenerator = require('../../../shared/sandwich-generator');

var _Sandwich = require('../effects/Sandwich');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToastedSandwich = exports.ToastedSandwich = (_temp = _class = function (_Spell) {
  _inherits(ToastedSandwich, _Spell);

  function ToastedSandwich() {
    _classCallCheck(this, ToastedSandwich);

    return _possibleConstructorReturn(this, (ToastedSandwich.__proto__ || Object.getPrototypeOf(ToastedSandwich)).apply(this, arguments));
  }

  _createClass(ToastedSandwich, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemy;
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      var min = (this.caster.liveStats.dex + this.caster.liveStats.int) / 8;
      var max = (this.caster.liveStats.dex + this.caster.liveStats.int) / 4;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 1;
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

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = 0;

        var sandwich = _sandwichGenerator.SandwichGenerator.generateSandwich(target);

        var message = '%player served %targetName a %item.';

        if (_spell.Spell.chance.bool({ likelihood: 75 })) {
          sandwich.name = _this2.tier.name + ' ' + sandwich.name;
          sandwich.con -= _this2.spellPower * 100;
          sandwich.dex -= _this2.spellPower * 100;
          sandwich.agi -= _this2.spellPower * 100;

          damage = _this2.calcDamage();
          message = message + ' %targetName wanted it toasted and got burned for %damage damage!';
        } else {
          message = message + ' %targetName didn\'t want it toasted.';
        }

        _get(ToastedSandwich.prototype.__proto__ || Object.getPrototypeOf(ToastedSandwich.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          messageData: { item: sandwich.name },
          applyEffect: _Sandwich.Sandwich,
          applyEffectExtra: sandwich,
          applyEffectName: sandwich.name,
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

  return ToastedSandwich;
}(_spell.Spell), _class.element = _spell.SpellType.FIRE, _class.tiers = [{ name: 'toasted', spellPower: 1, weight: 30, cost: 125, level: 10, profession: 'SandwichArtist' }, { name: 'burnt', spellPower: 2, weight: 30, cost: 1300, level: 40, profession: 'SandwichArtist' }, { name: 'well-done', spellPower: 3, weight: 30, cost: 6500, level: 90, profession: 'SandwichArtist' }], _temp);