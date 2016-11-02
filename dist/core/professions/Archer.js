'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Archer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Archer = exports.Archer = (_temp = _class = function (_Profession) {
  _inherits(Archer, _Profession);

  function Archer() {
    _classCallCheck(this, Archer);

    return _possibleConstructorReturn(this, (Archer.__proto__ || Object.getPrototypeOf(Archer)).apply(this, arguments));
  }

  _createClass(Archer, null, [{
    key: 'setupSpecial',
    value: function setupSpecial(target) {
      target._special.name = 'Focus';
      target._special.maximum = 100 * (Math.floor(target.level / 100) + 1);
      target._special.set(Math.round(target._special.maximum / 2));
    }
  }, {
    key: '_eventSelfAttacked',
    value: function _eventSelfAttacked(target) {
      target._special.sub(5);
    }
  }, {
    key: '_eventSelfTakeTurn',
    value: function _eventSelfTakeTurn(target) {
      target._special.add(10);
    }
  }]);

  return Archer;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel + 90, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 10, _class.baseHpPerCon = 18, _class.baseHpPerDex = 6, _class.baseMpPerDex = 3, _class.baseConPerLevel = 2, _class.baseDexPerLevel = 4, _class.baseAgiPerLevel = 3, _class.baseStrPerLevel = 2, _class.baseIntPerLevel = 1, _class.classStats = {
  dex: function dex(target, baseValue) {
    return baseValue * 0.25;
  },
  shatter: 1,
  crit: 10
}, _temp);