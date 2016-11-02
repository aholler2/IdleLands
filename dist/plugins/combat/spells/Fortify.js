'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fortify = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _PhysicalStatBoost = require('../effects/PhysicalStatBoost');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fortify = exports.Fortify = (_temp = _class = function (_Spell) {
  _inherits(Fortify, _Spell);

  function Fortify() {
    _classCallCheck(this, Fortify);

    return _possibleConstructorReturn(this, (Fortify.__proto__ || Object.getPrototypeOf(Fortify)).apply(this, arguments));
  }

  _createClass(Fortify, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allAllies;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return Math.floor(this.spellPower / 2);
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
        _get(Fortify.prototype.__proto__ || Object.getPrototypeOf(Fortify.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _PhysicalStatBoost.PhysicalStatBoost,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.allyWithoutEffect(caster, 'PhysicalStatBoost');
    }
  }]);

  return Fortify;
}(_spell.Spell), _class.element = _spell.SpellType.BUFF, _class.tiers = [{ name: 'fortify', spellPower: 10, weight: 25, cost: 200, profession: 'Generalist', level: 15 }, { name: 'greater fortify', spellPower: 15, weight: 25, cost: 900, profession: 'Generalist', level: 45 }, { name: 'ultimate fortify', spellPower: 20, weight: 25, cost: 2200, profession: 'Generalist', level: 90 }], _temp);