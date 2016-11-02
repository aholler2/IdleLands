'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiStrike = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _spell = require('../spell');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiStrike = exports.MultiStrike = (_temp = _class = function (_Spell) {
  _inherits(MultiStrike, _Spell);

  function MultiStrike() {
    _classCallCheck(this, MultiStrike);

    return _possibleConstructorReturn(this, (MultiStrike.__proto__ || Object.getPrototypeOf(MultiStrike)).apply(this, arguments));
  }

  _createClass(MultiStrike, [{
    key: 'preCast',
    value: function preCast() {
      var message = '%player used %spellName!';

      _get(MultiStrike.prototype.__proto__ || Object.getPrototypeOf(MultiStrike.prototype), 'cast', this).call(this, {
        damage: 0,
        message: message,
        targets: []
      });

      for (var i = 0; i < this.spellPower; i++) {
        this.caster.$battle.doAttack(this.caster, 'Attack');
      }
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast() {
      return this.$canTarget.yes();
    }
  }]);

  return MultiStrike;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'double strike', spellPower: 2, weight: 40, cost: 100, level: 1, profession: 'Fighter' }, { name: 'triple strike', spellPower: 3, weight: 40, cost: 1000, level: 50, profession: 'Fighter' }, { name: 'double prod', spellPower: 2, weight: 35, cost: 1000, level: 15, profession: 'MagicalMonster',
  collectibles: ['Fighter\'s Manual'] }], _temp);