'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PirateShanty = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _STRBoost = require('../effects/STRBoost');

var _DrunkenStupor = require('../effects/DrunkenStupor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PirateShanty = exports.PirateShanty = (_temp = _class = function (_Spell) {
  _inherits(PirateShanty, _Spell);

  function PirateShanty() {
    _classCallCheck(this, PirateShanty);

    return _possibleConstructorReturn(this, (PirateShanty.__proto__ || Object.getPrototypeOf(PirateShanty)).apply(this, arguments));
  }

  _createClass(PirateShanty, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.allAllies;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 6 - (3 - Math.floor(this.caster.special / 33));
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 20 + 3 * Math.floor(11 - this.caster.special / 9);
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var message = '%player sings a %spellName with %targetName!';

        if (target.professionName === 'Pirate') {
          target.$drunk.add(_spell.Spell.chance.integer({ min: 25, max: 45 }) + target.$personalities && target.$personalities.isActive('Drunk') ? 15 : 0);

          if (target.$drunk.atMaximum()) {
            message = message + ' %targetName is absolutely hammered!';

            _get(PirateShanty.prototype.__proto__ || Object.getPrototypeOf(PirateShanty.prototype), 'cast', _this2).call(_this2, {
              damage: 0,
              message: '',
              applyEffect: _DrunkenStupor.DrunkenStupor,
              applyEffectName: 'drunken stupor',
              applyEffectDuration: 4,
              applyEffectPotency: 1,
              targets: [target]
            });
          }
        }

        _get(PirateShanty.prototype.__proto__ || Object.getPrototypeOf(PirateShanty.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          applyEffect: _STRBoost.STRBoost,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.allyWithoutEffect(caster, 'STRBoost') && !caster.$effects.hasEffect('DrunkenStupor');
    }
  }]);

  return PirateShanty;
}(_spell.Spell), _class.description = 'Sings an inspirational sea shanty with an ally, increasing STR and drunkenness. STR boost scales on # of Bottles. The "DrunkenStupor" effect is gained when drunknness reaches 100%.', _class.element = _spell.SpellType.BUFF, _class.stat = 'special', _class.tiers = [{ name: 'pirate shanty', spellPower: 1, weight: 25, cost: 18, profession: 'Pirate', level: 25 }], _temp);