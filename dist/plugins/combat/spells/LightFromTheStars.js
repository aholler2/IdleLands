'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LightFromTheStars = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _CONBoostValue = require('../effects/CONBoostValue');

var _LUKBoostValue = require('../effects/LUKBoostValue');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightFromTheStars = exports.LightFromTheStars = (_temp = _class = function (_Spell) {
  _inherits(LightFromTheStars, _Spell);

  function LightFromTheStars() {
    _classCallCheck(this, LightFromTheStars);

    return _possibleConstructorReturn(this, (LightFromTheStars.__proto__ || Object.getPrototypeOf(LightFromTheStars)).apply(this, arguments));
  }

  _createClass(LightFromTheStars, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allAllies;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 3;
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

      var message = '%player begins singing %spellName at %targetName!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {

        _get(LightFromTheStars.prototype.__proto__ || Object.getPrototypeOf(LightFromTheStars.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _CONBoostValue.CONBoostValue,
          applyEffectPotency: Math.max(1, Math.round(_this2.caster.liveStats.con * _this2.spellPower / 100)),
          applyEffectName: _this2.tier.name + ' (CON)',
          targets: [target]
        });

        _get(LightFromTheStars.prototype.__proto__ || Object.getPrototypeOf(LightFromTheStars.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: '',
          applyEffect: _LUKBoostValue.LUKBoostValue,
          applyEffectPotency: Math.max(1, Math.round(_this2.caster.liveStats.luk * _this2.spellPower / 100)),
          applyEffectName: _this2.tier.name + ' (LUK)',
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.allyWithoutEffect(caster, 'CONBoostValue') && this.$canTarget.allyWithoutEffect(caster, 'LUKBoostValue');
    }
  }]);

  return LightFromTheStars;
}(_spell.Spell), _class.element = _spell.SpellType.BUFF, _class.tiers = [{ name: 'Light From The Stars', spellPower: 15, weight: 25, cost: 200, profession: 'Bard', level: 1,
  collectibles: ['Soaked Sitar'] }, { name: 'Purity From The Stars', spellPower: 30, weight: 25, cost: 2000, profession: 'Bard', level: 50,
  collectibles: ['Soaked Sitar'] }], _temp);