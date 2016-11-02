'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Berserk = undefined;

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

var Berserk = exports.Berserk = (_temp = _class = function (_Spell) {
  _inherits(Berserk, _Spell);

  function Berserk() {
    _classCallCheck(this, Berserk);

    return _possibleConstructorReturn(this, (Berserk.__proto__ || Object.getPrototypeOf(Berserk)).apply(this, arguments));
  }

  _createClass(Berserk, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.self;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var message = '%player is going %spellName!';
      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {

        target._special.add(_this2.spellPower);

        _get(Berserk.prototype.__proto__ || Object.getPrototypeOf(Berserk.prototype), 'cast', _this2).call(_this2, {
          damage: 0,
          message: message,
          targets: [target]
        });
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return caster._special.lessThanPercent(75);
    }
  }]);

  return Berserk;
}(_spell.Spell), _class.description = 'A spell that increases Rage by a set amount.', _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'berserk', spellPower: 15, weight: 25, cost: 0, profession: 'Barbarian', level: 1 }, { name: 'crazy', spellPower: 20, weight: 25, cost: 0, profession: 'Barbarian', level: 35 }, { name: 'out of control', spellPower: 25, weight: 25, cost: 0, profession: 'Barbarian', level: 75 }], _temp);