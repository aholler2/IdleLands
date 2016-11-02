'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vampire = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _effect = require('../effect');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vampire = exports.Vampire = function (_Effect) {
  _inherits(Vampire, _Effect);

  function Vampire(opts) {
    _classCallCheck(this, Vampire);

    if (!opts.duration) opts.duration = 3;
    return _possibleConstructorReturn(this, (Vampire.__proto__ || Object.getPrototypeOf(Vampire)).call(this, opts));
  }

  _createClass(Vampire, [{
    key: 'affect',
    value: function affect() {
      this._emitMessage(this.target, '%player is slowly being drained of %hisher hp!');
    }
  }, {
    key: 'tick',
    value: function tick() {
      _get(Vampire.prototype.__proto__ || Object.getPrototypeOf(Vampire.prototype), 'tick', this).call(this);
      var damage = Math.round(this.target.hp * 0.01 * this.potency);

      if (this.target.$isBoss) {
        damage = Math.round(damage / 4);
      }

      var casterAlive = this.origin.ref.hp !== 0;

      var message = '%player suffered %damage damage from %casterName\'s %spellName! ' + (casterAlive ? '%casterName leeched it back!' : '');

      var dealtDamage = this.dealDamage(this.target, damage, message);
      if (casterAlive) {
        this.target.$battle.healDamage(this.origin.ref, dealtDamage, this.target);
      }
    }
  }]);

  return Vampire;
}(_effect.Effect);