'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrunkenStupor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _effect = require('../effect');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DrunkenStupor = exports.DrunkenStupor = function (_Effect) {
  _inherits(DrunkenStupor, _Effect);

  function DrunkenStupor() {
    _classCallCheck(this, DrunkenStupor);

    return _possibleConstructorReturn(this, (DrunkenStupor.__proto__ || Object.getPrototypeOf(DrunkenStupor)).apply(this, arguments));
  }

  _createClass(DrunkenStupor, [{
    key: 'affect',
    value: function affect() {
      this.stun = this.target.$drunk.gtePercent(50) && _effect.Effect.chance.bool({ likelihood: 75 });
      this.stunMessage = this.target.fullname + ' falls into a drunken stupor!';
    }
  }, {
    key: 'tick',
    value: function tick() {
      _get(DrunkenStupor.prototype.__proto__ || Object.getPrototypeOf(DrunkenStupor.prototype), 'tick', this).call(this);
      this.target.$drunk.sub(25);
      this.stun = this.target.$drunk.gtePercent(50) && _effect.Effect.chance.bool({ likelihood: 75 });
      this.stunMessage = this.target.fullname + ' is too drunk to act!';
    }
  }, {
    key: 'unaffect',
    value: function unaffect() {
      _get(DrunkenStupor.prototype.__proto__ || Object.getPrototypeOf(DrunkenStupor.prototype), 'unaffect', this).call(this);
      this.target.$drunk.toMinimum();
    }
  }]);

  return DrunkenStupor;
}(_effect.Effect);