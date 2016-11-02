'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cleric = undefined;

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cleric = exports.Cleric = (_temp = _class = function (_Profession) {
  _inherits(Cleric, _Profession);

  function Cleric() {
    _classCallCheck(this, Cleric);

    return _possibleConstructorReturn(this, (Cleric.__proto__ || Object.getPrototypeOf(Cleric)).apply(this, arguments));
  }

  return Cleric;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel + 60, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 10, _class.baseMpPerInt = 5, _class.baseConPerLevel = 4, _class.baseDexPerLevel = 2, _class.baseAgiPerLevel = 2, _class.baseStrPerLevel = 3, _class.baseIntPerLevel = 6, _class.classStats = {
  mpregen: function mpregen(target) {
    return target._mp.maximum * 0.01;
  }
}, _temp);