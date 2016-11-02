'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mage = undefined;

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mage = exports.Mage = (_temp = _class = function (_Profession) {
  _inherits(Mage, _Profession);

  function Mage() {
    _classCallCheck(this, Mage);

    return _possibleConstructorReturn(this, (Mage.__proto__ || Object.getPrototypeOf(Mage)).apply(this, arguments));
  }

  return Mage;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel - 150, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 25, _class.baseMpPerInt = 7, _class.baseConPerLevel = 2, _class.baseDexPerLevel = 2, _class.baseAgiPerLevel = 2, _class.baseStrPerLevel = 2, _class.baseIntPerLevel = 6, _class.classStats = {
  mpregen: function mpregen(target) {
    return target._mp.maximum * 0.01;
  }
}, _temp);