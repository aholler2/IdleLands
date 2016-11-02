'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fighter = undefined;

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fighter = exports.Fighter = (_temp = _class = function (_Profession) {
  _inherits(Fighter, _Profession);

  function Fighter() {
    _classCallCheck(this, Fighter);

    return _possibleConstructorReturn(this, (Fighter.__proto__ || Object.getPrototypeOf(Fighter)).apply(this, arguments));
  }

  return Fighter;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel + 150, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 3, _class.baseMpPerStr = 1, _class.baseMpPerInt = 1, _class.baseConPerLevel = 2, _class.baseDexPerLevel = 4, _class.baseAgiPerLevel = 3, _class.baseStrPerLevel = 5, _class.baseIntPerLevel = 1, _class.classStats = {
  hpregen: function hpregen(target) {
    return target._hp.maximum * 0.0075;
  },
  prone: 1
}, _temp);