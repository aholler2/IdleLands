'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Necromancer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Necromancer = exports.Necromancer = (_temp = _class = function (_Profession) {
  _inherits(Necromancer, _Profession);

  function Necromancer() {
    _classCallCheck(this, Necromancer);

    return _possibleConstructorReturn(this, (Necromancer.__proto__ || Object.getPrototypeOf(Necromancer)).apply(this, arguments));
  }

  _createClass(Necromancer, null, [{
    key: 'setupSpecial',
    value: function setupSpecial(target) {
      target._special.name = 'Minions';
      target._special.set(0);
      target._special.maximum = Math.floor(target.level / 25) + 1;
    }
  }]);

  return Necromancer;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel - 180, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 10, _class.baseMpPerInt = 12, _class.baseHpPerCon = 42, _class.baseConPerLevel = 1, _class.baseDexPerLevel = 3, _class.baseAgiPerLevel = -3, _class.baseStrPerLevel = 3, _class.baseIntPerLevel = 8, _class.baseLukPerLevel = -1, _class.classStats = {
  mpregen: function mpregen(target) {
    return target._mp.maximum * 0.02;
  },
  agi: function agi(target, baseValue) {
    return -baseValue * 0.1;
  },
  con: function con(target, baseValue) {
    return -baseValue * 0.25;
  },
  prone: 1,
  venom: 1,
  poison: 1,
  vampire: 1
}, _temp);