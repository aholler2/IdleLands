'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lich = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _profession = require('../base/profession');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lich = exports.Lich = (_temp = _class = function (_Profession) {
  _inherits(Lich, _Profession);

  function Lich() {
    _classCallCheck(this, Lich);

    return _possibleConstructorReturn(this, (Lich.__proto__ || Object.getPrototypeOf(Lich)).apply(this, arguments));
  }

  _createClass(Lich, null, [{
    key: 'setupSpecial',
    value: function setupSpecial(target) {
      var numProfessions = Math.floor(target.level / 50) + 1;
      target.$secondaryProfessions = _lodash2.default.sampleSize(['Bard', 'Cleric', 'Fighter', 'Generalist', 'Mage', 'SandwichArtist'], numProfessions);
      target._special.name = 'Phylactic Energy';
      target._special.maximum = Math.floor(target.level / 25) + 1;
      target._special.toMaximum();
    }
  }, {
    key: 'resetSpecial',
    value: function resetSpecial(target) {
      _get(Lich.__proto__ || Object.getPrototypeOf(Lich), 'resetSpecial', this).call(this, target);
      delete target.$secondaryProfessions;
    }
  }, {
    key: '_eventSelfKilled',
    value: function _eventSelfKilled(target) {
      if (target._special.atMinimum()) return;
      target.$effects.clear();
      target.$battle._emitMessage(target.fullname + ' sprang back to life via the magic of Phylactery!');
      target._special.sub(1);
      target._hp.toMaximum();
    }
  }]);

  return Lich;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 25, _class.baseMpPerInt = 15, _class.baseConPerLevel = 5, _class.baseDexPerLevel = 0, _class.baseAgiPerLevel = 0, _class.baseStrPerLevel = 7, _class.baseIntPerLevel = 7, _class.classStats = {
  mpregen: function mpregen(target) {
    return target._mp.maximum * 0.02;
  }
}, _temp);