'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Generalist = undefined;

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generalist = exports.Generalist = (_temp = _class = function (_Profession) {
  _inherits(Generalist, _Profession);

  function Generalist() {
    _classCallCheck(this, Generalist);

    return _possibleConstructorReturn(this, (Generalist.__proto__ || Object.getPrototypeOf(Generalist)).apply(this, arguments));
  }

  return Generalist;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 3, _class.baseMpPerInt = 3, _class.baseConPerLevel = 3, _class.baseDexPerLevel = 3, _class.baseAgiPerLevel = 3, _class.baseStrPerLevel = 3, _class.baseIntPerLevel = 3, _class.classStats = {
  mpregen: function mpregen(target) {
    return target._mp.maximum * 0.005;
  }
}, _temp);