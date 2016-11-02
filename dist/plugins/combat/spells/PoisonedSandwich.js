'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PoisonedSandwich = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _sandwichGenerator = require('../../../shared/sandwich-generator');

var _PoisonedSandwich = require('../effects/PoisonedSandwich');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PoisonedSandwich = exports.PoisonedSandwich = (_temp = _class = function (_Spell) {
  _inherits(PoisonedSandwich, _Spell);

  function PoisonedSandwich() {
    _classCallCheck(this, PoisonedSandwich);

    return _possibleConstructorReturn(this, (PoisonedSandwich.__proto__ || Object.getPrototypeOf(PoisonedSandwich)).apply(this, arguments));
  }

  _createClass(PoisonedSandwich, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemyWithoutEffect('PoisonedSandwich');
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      var min = (this.caster.liveStats.dex + this.caster.liveStats.int) / 8;
      var max = (this.caster.liveStats.dex + this.caster.liveStats.int) / 4;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {

        var sandwich = _sandwichGenerator.SandwichGenerator.generateSandwich(target);
        sandwich.name = _this2.tier.name + ' ' + sandwich.name;
        sandwich.con -= _this2.spellPower * _this2.caster.level;

        var message = '%player served %targetName a %item, sickening %targetName!';

        var casterCon = _this2.caster.liveStats.con;
        var targetCon = target.liveStats.con;
        var durationBoost = 0;

        if (targetCon < casterCon) durationBoost++;
        if (targetCon < casterCon / 2) durationBoost++;
        if (targetCon < casterCon / 4) durationBoost++;

        _get(PoisonedSandwich.prototype.__proto__ || Object.getPrototypeOf(PoisonedSandwich.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          messageData: { item: sandwich.name },
          applyEffect: _PoisonedSandwich.PoisonedSandwich,
          applyEffectExtra: sandwich,
          applyEffectName: sandwich.name,
          applyEffectDuration: _this2.calcDuration() + durationBoost,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'PoisonedSandwich');
    }
  }]);

  return PoisonedSandwich;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'poisoned', spellPower: 3, weight: 30, cost: 85, level: 15, profession: 'SandwichArtist' }], _temp);