'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeathGlare = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _STRLoss = require('../effects/STRLoss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeathGlare = exports.DeathGlare = (_temp = _class = function (_Spell) {
  _inherits(DeathGlare, _Spell);

  function DeathGlare() {
    _classCallCheck(this, DeathGlare);

    return _possibleConstructorReturn(this, (DeathGlare.__proto__ || Object.getPrototypeOf(DeathGlare)).apply(this, arguments));
  }

  _createClass(DeathGlare, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allEnemies;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 4 - (3 - Math.floor(this.caster.special / 33));
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 20 + 3 * Math.floor(this.caster.special / 9);
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player shoots a %spellName at %targetName!';
      var targets = this.determineTargets();
      this.caster.$drunk.add(15);

      _lodash2.default.each(targets, function (target) {
        _get(DeathGlare.prototype.__proto__ || Object.getPrototypeOf(DeathGlare.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _STRLoss.STRLoss,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'STRLoss') && !caster.$effects.hasEffect('DrunkenStupor');
    }
  }]);

  return DeathGlare;
}(_spell.Spell), _class.description = 'Glares at a target, reducing STR of the entire enemy team. Lasts up to 4 turns and reduces up to 50 STR based on # of bottles.', _class.element = _spell.SpellType.DEBUFF, _class.stat = 'special', _class.tiers = [{ name: 'death glare', spellPower: 1, weight: 25, cost: 9, profession: 'Pirate', level: 7 }], _temp);