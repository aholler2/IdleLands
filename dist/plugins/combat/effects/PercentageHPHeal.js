'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PercentageHPHeal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _effect = require('../effect');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PercentageHPHeal = exports.PercentageHPHeal = function (_Effect) {
  _inherits(PercentageHPHeal, _Effect);

  function PercentageHPHeal() {
    _classCallCheck(this, PercentageHPHeal);

    return _possibleConstructorReturn(this, (PercentageHPHeal.__proto__ || Object.getPrototypeOf(PercentageHPHeal)).apply(this, arguments));
  }

  _createClass(PercentageHPHeal, [{
    key: 'tick',
    value: function tick() {
      _get(PercentageHPHeal.prototype.__proto__ || Object.getPrototypeOf(PercentageHPHeal.prototype), 'tick', this).call(this);
      var healedHp = Math.round(this.target._hp.maximum * this.potency / 100);
      this.target.$battle.healDamage(this.target, healedHp, this.origin.ref);
      this._emitMessage(this.target, '%player was healed for ' + healedHp + ' hp by %casterName\'s %spellName!');
    }
  }]);

  return PercentageHPHeal;
}(_effect.Effect);