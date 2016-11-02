'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VenomCoating = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _VenomCoating = require('../effects/VenomCoating');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VenomCoating = exports.VenomCoating = (_temp = _class = function (_Spell) {
  _inherits(VenomCoating, _Spell);

  function VenomCoating() {
    _classCallCheck(this, VenomCoating);

    return _possibleConstructorReturn(this, (VenomCoating.__proto__ || Object.getPrototypeOf(VenomCoating)).apply(this, arguments));
  }

  _createClass(VenomCoating, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomAllyWithoutEffect('VenomCoating');
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 3 + this.spellPower;
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

      var message = '%player applied a %spellName on %targetName\'s weapon!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        _get(VenomCoating.prototype.__proto__ || Object.getPrototypeOf(VenomCoating.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _VenomCoating.VenomCoating,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.allyWithoutEffect(caster, 'VenomCoating') && caster._special.ltePercent(30);
    }
  }]);

  return VenomCoating;
}(_spell.Spell), _class.element = _spell.SpellType.BUFF, _class.tiers = [{ name: 'venom coating', spellPower: 1, weight: 25, cost: 200, profession: 'Archer', level: 15 }, { name: 'venom slathering', spellPower: 2, weight: 25, cost: 800, profession: 'Archer', level: 55 }, { name: 'venom layer', spellPower: 1, weight: 25, cost: 600, profession: 'MagicalMonster', level: 35,
  collectibles: ['Feathered Cap'] }], _temp);