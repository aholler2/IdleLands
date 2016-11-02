'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Byte = undefined;

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

var Byte = exports.Byte = (_temp = _class = function (_Spell) {
  _inherits(Byte, _Spell);

  function Byte() {
    _classCallCheck(this, Byte);

    return _possibleConstructorReturn(this, (Byte.__proto__ || Object.getPrototypeOf(Byte)).apply(this, arguments));
  }

  _createClass(Byte, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.int / 10;
      var max = this.caster.liveStats.int / 5;
      return this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemy;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();
        var healed = Math.round(damage / 5);
        var message = '%player cast %spellName at %targetName and dealt %damage damage! %player gained ' + healed + ' hp!';
        _this2.caster.$battle.healDamage(_this2.caster, healed, target);

        _get(Byte.prototype.__proto__ || Object.getPrototypeOf(Byte.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast() {
      return this.$canTarget.yes();
    }
  }]);

  return Byte;
}(_spell.Spell), _class.element = _spell.SpellType.DIGITAL, _class.stat = 'special', _class.tiers = [{ name: 'byte', spellPower: 1, weight: 40, cost: 1, level: 1, profession: 'Bitomancer' }, { name: 'kilobyte', spellPower: 2, weight: 40, cost: 16, level: 8, profession: 'Bitomancer' }, { name: 'megabyte', spellPower: 3, weight: 40, cost: 64, level: 16, profession: 'Bitomancer' }, { name: 'gigabyte', spellPower: 4, weight: 40, cost: 128, level: 32, profession: 'Bitomancer' }, { name: 'terabyte', spellPower: 5, weight: 40, cost: 256, level: 64, profession: 'Bitomancer' }, { name: 'petabyte', spellPower: 6, weight: 40, cost: 512, level: 128, profession: 'Bitomancer',
  collectibles: ['Giant Sized Flask'] }], _temp);