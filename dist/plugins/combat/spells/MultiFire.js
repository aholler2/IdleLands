'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiFire = undefined;

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

var MultiFire = exports.MultiFire = (_temp = _class = function (_Spell) {
  _inherits(MultiFire, _Spell);

  function MultiFire() {
    _classCallCheck(this, MultiFire);

    return _possibleConstructorReturn(this, (MultiFire.__proto__ || Object.getPrototypeOf(MultiFire)).apply(this, arguments));
  }

  _createClass(MultiFire, [{
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.int * 0.5;
      var max = this.caster.liveStats.int * 0.8;
      return this.minMax(min, max);
    }
  }, {
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomEnemies(this.spellPower);
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player cast %spellName at %targetName and dealt %damage damage!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        _get(MultiFire.prototype.__proto__ || Object.getPrototypeOf(MultiFire.prototype), 'cast', _this2).call(_this2, {
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

  return MultiFire;
}(_spell.Spell), _class.element = _spell.SpellType.FIRE, _class.tiers = [{ name: 'double fire', spellPower: 2, weight: 40, cost: 250, level: 25, profession: 'Mage' }, { name: 'triple fire', spellPower: 3, weight: 40, cost: 750, level: 55, profession: 'Mage' }, { name: 'quadruple fire', spellPower: 4, weight: 40, cost: 1250, level: 85, profession: 'Mage' }, { name: 'fire star', spellPower: 5, weight: 40, cost: 1700, level: 185, profession: 'Mage',
  collectibles: ['Bucket of Lava'] }], _temp);