'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrogDance = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _DEXBoost = require('../effects/DEXBoost');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GrogDance = exports.GrogDance = (_temp = _class = function (_Spell) {
  _inherits(GrogDance, _Spell);

  function GrogDance() {
    _classCallCheck(this, GrogDance);

    return _possibleConstructorReturn(this, (GrogDance.__proto__ || Object.getPrototypeOf(GrogDance)).apply(this, arguments));
  }

  _createClass(GrogDance, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.self;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 3;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return this.caster._special.maximum - this.caster.special;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player does a %spellName!';
      var targets = this.determineTargets();

      this.caster._special.add(_spell.Spell.chance.integer({ min: 15, max: 45 }));
      this.caster.$drunk.add(25);

      _lodash2.default.each(targets, function (target) {
        _get(GrogDance.prototype.__proto__ || Object.getPrototypeOf(GrogDance.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _DEXBoost.DEXBoost,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return !caster.$effects.hasEffect('DEXBoost') && caster._special.ltePercent(30) && !caster.$effects.hasEffect('DrunkenStupor');
    }
  }]);

  return GrogDance;
}(_spell.Spell), _class.description = 'Dances like a pirate, increasing DEX and replenishing bottle count by 15-45. Also increases drunkenness by 25%', _class.element = _spell.SpellType.PHYSICAL, _class.stat = 'special', _class.tiers = [{ name: 'grog dance', spellPower: 1, weight: 25, cost: 0, profession: 'Pirate', level: 37 }], _temp);