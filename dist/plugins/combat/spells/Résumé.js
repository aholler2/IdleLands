'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Résumé = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _StillAngry = require('../effects/StillAngry');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Résumé = exports.Résumé = (_temp = _class = function (_Spell) {
  _inherits(Résumé, _Spell);

  function Résumé() {
    _classCallCheck(this, Résumé);

    return _possibleConstructorReturn(this, (Résumé.__proto__ || Object.getPrototypeOf(Résumé)).apply(this, arguments));
  }

  _createClass(Résumé, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemyWithoutEffect('StillAngry');
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      return 0;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 100;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return 1;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = 'Out of desperation, %player gave a %spellName to %targetName!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var goldRequired = _this2.caster.level * 100;

        var castOpts = {
          damage: 0,
          targets: [target]
        };

        if (target.gold > goldRequired) {
          message = message + ' %targetName hired %player and gave %himher a part-time gig! [+' + goldRequired + ' gold]';
          target.gainGold(-goldRequired, false);
          _this2.caster.gainGold(goldRequired, false);
        } else {
          message = message + ' %targetName declined, and got shoved into the ground by %player!';
          castOpts.applyEffect = _StillAngry.StillAngry;
        }

        castOpts.message = message;

        _get(Résumé.prototype.__proto__ || Object.getPrototypeOf(Résumé.prototype), 'cast', _this2).call(_this2, castOpts);
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return caster._hp.lessThanPercent(25) && this.$canTarget.enemyWithoutEffect(caster, 'StillAngry');
    }
  }]);

  return Résumé;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'résumé', spellPower: 1, weight: 30, cost: 10, level: 1, profession: 'SandwichArtist' }], _temp);