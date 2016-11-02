'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pirate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _restrictedNumber = require('restricted-number');

var _restrictedNumber2 = _interopRequireDefault(_restrictedNumber);

var _profession = require('../base/profession');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pirate = exports.Pirate = (_temp = _class = function (_Profession) {
  _inherits(Pirate, _Profession);

  function Pirate() {
    _classCallCheck(this, Pirate);

    return _possibleConstructorReturn(this, (Pirate.__proto__ || Object.getPrototypeOf(Pirate)).apply(this, arguments));
  }

  _createClass(Pirate, null, [{
    key: 'setupSpecial',
    value: function setupSpecial(target) {
      target._special.name = 'Bottles';
      target._special.maximum = 99;
      target._special.toMaximum();

      target.$drunk = new _restrictedNumber2.default(0, 100, 0);
    }
  }, {
    key: 'resetSpecial',
    value: function resetSpecial(target) {
      _get(Pirate.__proto__ || Object.getPrototypeOf(Pirate), 'resetSpecial', this).call(this, target);
      delete target.$drunk;
    }
  }]);

  return Pirate;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel + 180, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 5, _class.baseHpPerCon = 18, _class.baseHpPerStr = 6, _class.baseMpPerInt = 5, _class.baseConPerLevel = 3, _class.baseDexPerLevel = 2, _class.baseAgiPerLevel = 2, _class.baseStrPerLevel = 3, _class.baseIntPerLevel = 1, _class.classStats = {
  str: function str(target, baseValue) {
    return target.$personalities && target.$personalities.isActive('Drunk') ? baseValue / 2 : 0;
  }
}, _temp);