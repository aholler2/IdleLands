'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jester = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Jester = exports.Jester = (_temp = _class = function (_Profession) {
  _inherits(Jester, _Profession);

  function Jester() {
    _classCallCheck(this, Jester);

    return _possibleConstructorReturn(this, (Jester.__proto__ || Object.getPrototypeOf(Jester)).apply(this, arguments));
  }

  _createClass(Jester, null, [{
    key: 'str',
    value: function str(player) {
      return player.liveStats.luk / 5;
    }
  }, {
    key: 'con',
    value: function con(player) {
      return player.liveStats.luk / 5;
    }
  }, {
    key: 'dex',
    value: function dex(player) {
      return player.liveStats.luk / 5;
    }
  }, {
    key: 'agi',
    value: function agi(player) {
      return player.liveStats.luk / 5;
    }
  }, {
    key: 'int',
    value: function int(player) {
      return player.liveStats.luk / 5;
    }
  }]);

  return Jester;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel, _class.baseHpPerCon = 0, _class.baseHpPerLuk = 30, _class.baseMpPerLuk = 5, _class.baseConPerLevel = 0, _class.baseDexPerLevel = 0, _class.baseAgiPerLevel = 0, _class.baseStrPerLevel = 0, _class.baseIntPerLevel = 0, _class.baseLukPerLevel = 10, _temp);