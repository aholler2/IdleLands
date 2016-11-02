'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodFight = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _sandwichGenerator = require('../../../shared/sandwich-generator');

var _Sandwich = require('../effects/Sandwich');

var _Cookie = require('../effects/Cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FoodFight = exports.FoodFight = (_temp = _class = function (_Spell) {
  _inherits(FoodFight, _Spell);

  function FoodFight() {
    _classCallCheck(this, FoodFight);

    return _possibleConstructorReturn(this, (FoodFight.__proto__ || Object.getPrototypeOf(FoodFight)).apply(this, arguments));
  }

  _createClass(FoodFight, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allAlive;
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.dex / 8;
      var max = this.caster.liveStats.dex / 4;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return this.spellPower;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return _spell.Spell.chance.integer({ min: 2, max: 5 }) + this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = 0;
        var message = '%player started a %spellName!';

        if (_spell.Spell.chance.bool({ likelihood: 90 })) {
          var sandwich = _sandwichGenerator.SandwichGenerator.generateSandwich(target);
          if (_spell.Spell.chance.bool({ likelihood: 75 })) {
            damage = _this2.calcDamage();
            message = message + ' %targetName got hit with %item and took %damage damage!';
          } else {
            message = message + ' %targetName barely avoided getting hit with %item, but ate it anyway.';
          }

          _get(FoodFight.prototype.__proto__ || Object.getPrototypeOf(FoodFight.prototype), 'cast', _this2).call(_this2, {
            damage: damage,
            message: message,
            messageData: { item: sandwich.name },
            applyEffect: _Sandwich.Sandwich,
            applyEffectExtra: sandwich,
            applyEffectName: sandwich.name,
            targets: [target]
          });
        } else {
          message = message + ' %targetName caught a cookie!';

          _get(FoodFight.prototype.__proto__ || Object.getPrototypeOf(FoodFight.prototype), 'cast', _this2).call(_this2, {
            damage: damage,
            message: message,
            applyEffect: _Cookie.Cookie,
            applyEffectName: 'cookie',
            targets: [_this2.caster]
          });
        }
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast() {
      return this.$canTarget.yes();
    }
  }]);

  return FoodFight;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'food fight', spellPower: 1, weight: 30, cost: 500, level: 20, profession: 'SandwichArtist' }, { name: 'food melee', spellPower: 2, weight: 30, cost: 1500, level: 50, profession: 'SandwichArtist' }, { name: 'food brawl', spellPower: 3, weight: 30, cost: 3500, level: 75, profession: 'SandwichArtist' }], _temp);