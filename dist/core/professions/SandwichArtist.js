'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SandwichArtist = undefined;

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SandwichArtist = exports.SandwichArtist = (_temp = _class = function (_Profession) {
  _inherits(SandwichArtist, _Profession);

  function SandwichArtist() {
    _classCallCheck(this, SandwichArtist);

    return _possibleConstructorReturn(this, (SandwichArtist.__proto__ || Object.getPrototypeOf(SandwichArtist)).apply(this, arguments));
  }

  return SandwichArtist;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel - 90, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 5, _class.baseMpPerInt = 2, _class.baseConPerLevel = 1, _class.baseDexPerLevel = 5, _class.baseAgiPerLevel = 1, _class.baseStrPerLevel = 3, _class.baseIntPerLevel = 1, _class.classStats = {
  mpregen: function mpregen(target) {
    return target._mp.maximum * 0.025;
  }
}, _temp);