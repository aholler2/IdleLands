'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayOldBread = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _sandwichGenerator = require('../../../shared/sandwich-generator');

var _Stuffed = require('../effects/Stuffed');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayOldBread = exports.DayOldBread = (_temp = _class = function (_Spell) {
  _inherits(DayOldBread, _Spell);

  function DayOldBread() {
    _classCallCheck(this, DayOldBread);

    return _possibleConstructorReturn(this, (DayOldBread.__proto__ || Object.getPrototypeOf(DayOldBread)).apply(this, arguments));
  }

  _createClass(DayOldBread, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemyWithoutEffect('Stuffed');
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.dex / 8;
      var max = this.caster.liveStats.dex / 6;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 100;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return this.spellPower;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        var sandwich = _sandwichGenerator.SandwichGenerator.generateSandwich(target);
        sandwich.name = _this2.tier.name + ' ' + sandwich.name;
        sandwich.con -= 50;

        var message = '%player served %targetName a %item, causing %targetName to fall over and take %damage damage!';

        _get(DayOldBread.prototype.__proto__ || Object.getPrototypeOf(DayOldBread.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          messageData: { item: sandwich.name },
          applyEffect: _Stuffed.Stuffed,
          applyEffectExtra: sandwich,
          applyEffectName: sandwich.name,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return this.$canTarget.enemyWithoutEffect(caster, 'Stuffed');
    }
  }]);

  return DayOldBread;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'day-old', spellPower: 1, weight: 30, cost: 35, level: 5, profession: 'SandwichArtist' }, { name: 'week-old', spellPower: 2, weight: 30, cost: 650, level: 50, profession: 'SandwichArtist' }, { name: 'month-old', spellPower: 3, weight: 30, cost: 2500, level: 100, profession: 'SandwichArtist',
  collectibles: ['Funny Fungus'] }, { name: 'second-old', spellPower: 1, weight: 30, cost: 500, level: 30, profession: 'MagicalMonster',
  collectibles: ['Funny Fungus'] }], _temp);