'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicalMonster = undefined;

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MagicalMonster = exports.MagicalMonster = (_temp = _class = function (_Profession) {
  _inherits(MagicalMonster, _Profession);

  function MagicalMonster() {
    _classCallCheck(this, MagicalMonster);

    return _possibleConstructorReturn(this, (MagicalMonster.__proto__ || Object.getPrototypeOf(MagicalMonster)).apply(this, arguments));
  }

  return MagicalMonster;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 15, _class.baseMpPerInt = 20, _class.baseConPerLevel = 2, _class.baseDexPerLevel = 2, _class.baseAgiPerLevel = 2, _class.baseStrPerLevel = 2, _class.baseIntPerLevel = 2, _temp);