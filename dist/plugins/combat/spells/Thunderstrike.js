'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thunderstrike = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _Thunderstrike = require('../effects/Thunderstrike');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thunderstrike = exports.Thunderstrike = (_temp = _class = function (_Spell) {
  _inherits(Thunderstrike, _Spell);

  function Thunderstrike() {
    _classCallCheck(this, Thunderstrike);

    return _possibleConstructorReturn(this, (Thunderstrike.__proto__ || Object.getPrototypeOf(Thunderstrike)).apply(this, arguments));
  }

  _createClass(Thunderstrike, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemyWithoutEffect('Thunderstrike');
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return _spell.Spell.chance.integer({ min: 1, max: 3 }) + this.spellPower;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      var min = this.caster.liveStats.int / 8;
      var max = this.caster.liveStats.int / 4;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player cast %spellName at %targetName!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {

        _get(Thunderstrike.prototype.__proto__ || Object.getPrototypeOf(Thunderstrike.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _Thunderstrike.Thunderstrike,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'Thunderstrike');
    }
  }]);

  return Thunderstrike;
}(_spell.Spell), _class.element = _spell.SpellType.THUNDER, _class.tiers = [{ name: 'thunderstrike', spellPower: 2, weight: 40, cost: 500, level: 35, profession: 'Mage' }, { name: 'thunderstorm', spellPower: 4, weight: 40, cost: 1500, level: 85, profession: 'Mage' }], _temp);