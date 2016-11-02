'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Barbarian = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Barbarian = exports.Barbarian = (_temp = _class = function (_Profession) {
  _inherits(Barbarian, _Profession);

  function Barbarian() {
    _classCallCheck(this, Barbarian);

    return _possibleConstructorReturn(this, (Barbarian.__proto__ || Object.getPrototypeOf(Barbarian)).apply(this, arguments));
  }

  _createClass(Barbarian, null, [{
    key: 'setupSpecial',
    value: function setupSpecial(target) {
      target._special.name = 'Rage';
      target._special.set(0);
      target._special.maximum = 100;
      target.recalculateStats(['str']);
    }
  }, {
    key: 'resetSpecial',
    value: function resetSpecial(target) {
      _get(Barbarian.__proto__ || Object.getPrototypeOf(Barbarian), 'resetSpecial', this).call(this, target);
      if (target.$dirty) {
        target.$dirty.flags.str = true;
      }
    }
  }, {
    key: '_eventSelfAttacked',
    value: function _eventSelfAttacked(target) {
      target._special.add(5);
    }
  }, {
    key: '_eventSelfAttack',
    value: function _eventSelfAttack(target) {
      target._special.sub(2);
    }
  }, {
    key: '_eventAllyKilled',
    value: function _eventAllyKilled(target) {
      target._special.add(10);
    }
  }, {
    key: '_eventSelfKilled',
    value: function _eventSelfKilled(target) {
      target._special.toMinimum();
    }
  }, {
    key: '_eventSelfKill',
    value: function _eventSelfKill(target) {
      target._special.sub(15);
    }
  }]);

  return Barbarian;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel + 210, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 1, _class.baseHpPerStr = 18, _class.baseHpPerCon = 12, _class.baseConPerLevel = 6, _class.baseDexPerLevel = 1, _class.baseAgiPerLevel = 1, _class.baseStrPerLevel = 6, _class.baseIntPerLevel = -5, _class.classStats = {
  hpregen: function hpregen(target) {
    return target._hp.maximum * 0.01;
  },
  damageReduction: function damageReduction(target) {
    return target.level * 10;
  },
  dex: function dex(target, baseValue) {
    return -baseValue * 0.5;
  },
  agi: function agi(target, baseValue) {
    return -baseValue * 0.5;
  },
  str: function str(target, baseValue) {
    return baseValue * target.special / 100;
  }
}, _temp);