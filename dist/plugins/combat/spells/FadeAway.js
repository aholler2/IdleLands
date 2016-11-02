'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FadeAway = undefined;

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

var FadeAway = exports.FadeAway = (_temp = _class = function (_Spell) {
  _inherits(FadeAway, _Spell);

  function FadeAway() {
    _classCallCheck(this, FadeAway);

    return _possibleConstructorReturn(this, (FadeAway.__proto__ || Object.getPrototypeOf(FadeAway)).apply(this, arguments));
  }

  _createClass(FadeAway, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.self;
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      return this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var restoredStamina = this.calcDamage();
      var message = '%player used %spellName and recovered ' + restoredStamina + ' stamina!';
      var targets = this.determineTargets();

      this.caster.$profession.resetSkillCombo(this.caster);
      this.caster._special.add(restoredStamina);

      _lodash2.default.each(targets, function (target) {
        _get(FadeAway.prototype.__proto__ || Object.getPrototypeOf(FadeAway.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return caster._special.ltePercent(30);
    }
  }]);

  return FadeAway;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.stat = 'special', _class.tiers = [{ name: 'fade away', spellPower: 30, weight: 30, cost: 0, level: 10, profession: 'Rogue' }, { name: 'shadowstep', spellPower: 50, weight: 30, cost: 0, level: 50, profession: 'Rogue' }, { name: 'vanish from sight', spellPower: 70, weight: 30, cost: 0, level: 90, profession: 'Rogue' }], _temp);