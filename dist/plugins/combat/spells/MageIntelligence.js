'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MageIntelligence = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _INTBoost = require('../effects/INTBoost');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MageIntelligence = exports.MageIntelligence = (_temp = _class = function (_Spell) {
  _inherits(MageIntelligence, _Spell);

  function MageIntelligence() {
    _classCallCheck(this, MageIntelligence);

    return _possibleConstructorReturn(this, (MageIntelligence.__proto__ || Object.getPrototypeOf(MageIntelligence)).apply(this, arguments));
  }

  _createClass(MageIntelligence, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomAllyWithoutEffect('INTBoost');
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 5;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player cast %spellName on %targetName!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        _get(MageIntelligence.prototype.__proto__ || Object.getPrototypeOf(MageIntelligence.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _INTBoost.INTBoost,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.allyWithoutEffect(caster, 'INTBoost');
    }
  }]);

  return MageIntelligence;
}(_spell.Spell), _class.element = _spell.SpellType.BUFF, _class.tiers = [{ name: 'magic intelligence', spellPower: 15, weight: 25, cost: 200, profession: 'Mage', level: 15 }, { name: 'magic brilliance', spellPower: 30, weight: 25, cost: 400, profession: 'Mage', level: 30 }, { name: 'arcane intelligence', spellPower: 60, weight: 25, cost: 700, profession: 'Mage', level: 60 }, { name: 'arcane brilliance', spellPower: 120, weight: 25, cost: 1100, profession: 'Mage', level: 95 }], _temp);