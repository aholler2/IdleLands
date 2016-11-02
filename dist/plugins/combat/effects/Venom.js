'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Venom = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _effect = require('../effect');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Venom = exports.Venom = function (_Effect) {
  _inherits(Venom, _Effect);

  function Venom(opts) {
    _classCallCheck(this, Venom);

    if (!opts.duration) opts.duration = 5;
    return _possibleConstructorReturn(this, (Venom.__proto__ || Object.getPrototypeOf(Venom)).call(this, opts));
  }

  _createClass(Venom, [{
    key: 'affect',
    value: function affect() {
      this._emitMessage(this.target, '%player had a dangerous venom injected into %hisher veins!');
    }
  }, {
    key: 'tick',
    value: function tick() {
      _get(Venom.prototype.__proto__ || Object.getPrototypeOf(Venom.prototype), 'tick', this).call(this);
      var damage = Math.round(this.target.hp * 0.02 * this.potency);

      if (this.target.$isBoss) {
        damage = Math.round(damage / 4);
      }

      var message = '%player suffered %damage damage from %casterName\'s %spellName!';
      this.dealDamage(this.target, damage, message);
    }
  }]);

  return Venom;
}(_effect.Effect);