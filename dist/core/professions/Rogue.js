'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rogue = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _profession = require('../base/profession');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rogue = exports.Rogue = (_temp = _class = function (_Profession) {
  _inherits(Rogue, _Profession);

  function Rogue() {
    _classCallCheck(this, Rogue);

    return _possibleConstructorReturn(this, (Rogue.__proto__ || Object.getPrototypeOf(Rogue)).apply(this, arguments));
  }

  _createClass(Rogue, null, [{
    key: 'setupSpecial',
    value: function setupSpecial(target) {
      target._special.name = 'Stamina';
      target._special.maximum = 100;
      target._special.toMaximum();
      this.resetSkillCombo(target);
    }
  }, {
    key: '_eventSelfTakeTurn',
    value: function _eventSelfTakeTurn(target) {
      target._special.add(2);
      if (target.$lastComboSkillTurn > 0) target.$lastComboSkillTurn--;
    }
  }, {
    key: 'updateSkillCombo',
    value: function updateSkillCombo(target, skillName) {
      target.$lastComboSkill = skillName;
      target.$lastComboSkillTurn = 4;
    }
  }, {
    key: 'resetSkillCombo',
    value: function resetSkillCombo(target) {
      target.$lastComboSkill = null;
      target.$lastComboSkillTurn = 0;
    }
  }]);

  return Rogue;
}(_profession.Profession), _class.baseHpPerLevel = _profession.Profession.baseHpPerLevel - 30, _class.baseMpPerLevel = _profession.Profession.baseMpPerLevel + 5, _class.baseHpPerDex = 6, _class.baseMpPerDex = 1, _class.baseConPerLevel = 2, _class.baseDexPerLevel = 4, _class.baseAgiPerLevel = 4, _class.baseStrPerLevel = 2, _class.baseIntPerLevel = 1, _class.classStats = {
  poison: 1,
  venom: 1,
  shatter: 1,
  vampire: 1,
  prone: 1
}, _temp);