'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AntimagicArrow = undefined;

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

var AntimagicArrow = exports.AntimagicArrow = (_temp = _class = function (_Spell) {
  _inherits(AntimagicArrow, _Spell);

  function AntimagicArrow() {
    _classCallCheck(this, AntimagicArrow);

    return _possibleConstructorReturn(this, (AntimagicArrow.__proto__ || Object.getPrototypeOf(AntimagicArrow)).apply(this, arguments));
  }

  _createClass(AntimagicArrow, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = (this.caster.liveStats.int + this.caster.liveStats.dex * 0.25) * 0.2;
      var max = (this.caster.liveStats.int + this.caster.liveStats.dex * 0.25) * 0.4;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.enemyWithMostMp;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        var lostMp = Math.floor(target._mp.maximum * (25 * (_this2.spellPower + 1) / 100));
        target._mp.sub(lostMp);
        var message = '%player used an %spellName on %targetName and dealt %damage damage and reduced %targetName\'s mp by ' + lostMp + '!';

        _get(AntimagicArrow.prototype.__proto__ || Object.getPrototypeOf(AntimagicArrow.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyHasMp(caster);
    }
  }]);

  return AntimagicArrow;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.stat = 'special', _class.tiers = [{ name: 'anti-magic arrow', spellPower: 1, weight: 40, cost: 25, level: 30, profession: 'Archer' }, { name: 'anti-magic burst', spellPower: 2, weight: 40, cost: 35, level: 65, profession: 'Archer' }, { name: 'anti-magic blast', spellPower: 3, weight: 40, cost: 45, level: 100, profession: 'Archer',
  collectibles: ['Ivory Arrow'] }], _temp);