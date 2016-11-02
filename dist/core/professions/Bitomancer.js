'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bitomancer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bitomancer = exports.Bitomancer = (_temp = _class = function (_Profession) {
  _inherits(Bitomancer, _Profession);

  function Bitomancer() {
    _classCallCheck(this, Bitomancer);

    return _possibleConstructorReturn(this, (Bitomancer.__proto__ || Object.getPrototypeOf(Bitomancer)).apply(this, arguments));
  }

  _createClass(Bitomancer, null, [{
    key: 'setupSpecial',
    value: function setupSpecial(target) {
      target._special.name = 'Bandwidth';
      target._special.maximum = Math.floor(56 * Math.pow(target.level, 2) / 50);
      target._special.toMaximum();
    }
  }]);

  return Bitomancer;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel - 60, _class.baseConPerLevel = 1, _class.baseDexPerLevel = 3, _class.baseAgiPerLevel = 1, _class.baseStrPerLevel = 1, _class.baseIntPerLevel = 7, _temp);