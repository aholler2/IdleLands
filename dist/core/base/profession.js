'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profession = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Profession = exports.Profession = (_temp = _class = function () {
  function Profession() {
    _classCallCheck(this, Profession);
  }

  _createClass(Profession, null, [{
    key: 'load',
    value: function load() {}
  }, {
    key: 'unload',
    value: function unload() {}
  }, {
    key: 'handleEvent',
    value: function handleEvent(target, event, args) {
      _lodash2.default.each(args.battle.allPlayers, function (player) {
        var func = '';
        if (player === target) {
          func = '_eventSelf' + event;
        } else if (player.party === target.party) {
          func = '_eventAlly' + event;
        } else {
          func = '_eventEnemy' + event;
        }

        if (target.$profession[func]) {
          target.$profession[func](target, args);
        }

        if (target[func]) {
          target[func](target, args);
        }
      });
    }
  }, {
    key: 'setupSpecial',
    value: function setupSpecial() {}
  }, {
    key: 'resetSpecial',
    value: function resetSpecial(target) {
      target._special.name = '';
      target._special.maximum = target.minimum = target.__current = 0;
    }
  }]);

  return Profession;
}(), _class.baseHpPerLevel = 270, _class.baseHpPerCon = 30, _class.baseHpPerInt = 0, _class.baseHpPerDex = 0, _class.baseHpPerStr = 0, _class.baseHpPerAgi = 0, _class.baseHpPerLuk = 0, _class.baseMpPerLevel = 0, _class.baseMpPerInt = 0, _class.baseMpPerCon = 0, _class.baseMpPerDex = 0, _class.baseMpPerStr = 0, _class.baseMpPerAgi = 0, _class.baseMpPerLuk = 0, _class.baseConPerLevel = 3, _class.baseDexPerLevel = 3, _class.baseAgiPerLevel = 3, _class.baseStrPerLevel = 3, _class.baseIntPerLevel = 3, _class.baseLukPerLevel = 0, _class.classStats = {}, _temp);