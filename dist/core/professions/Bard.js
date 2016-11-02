'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bard = undefined;

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bard = exports.Bard = (_temp = _class = function (_Profession) {
  _inherits(Bard, _Profession);

  function Bard() {
    _classCallCheck(this, Bard);

    return _possibleConstructorReturn(this, (Bard.__proto__ || Object.getPrototypeOf(Bard)).apply(this, arguments));
  }

  return Bard;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel - 30, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 5, _class.baseMpPerInt = 5, _class.baseConPerLevel = 1, _class.baseDexPerLevel = 1, _class.baseAgiPerLevel = 3, _class.baseStrPerLevel = 2, _class.baseIntPerLevel = 3, _class.classStats = {
  mpregen: function mpregen(target) {
    return target._mp.maximum * 0.005;
  }
}, _temp);