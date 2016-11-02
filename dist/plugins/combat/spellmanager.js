'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpellManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _all = require('./spells/_all');

var Spells = _interopRequireWildcard(_all);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpellManager = exports.SpellManager = function () {
  function SpellManager() {
    _classCallCheck(this, SpellManager);
  }

  _createClass(SpellManager, null, [{
    key: 'validSpells',
    value: function validSpells(player) {
      return (0, _lodash2.default)(Spells).values().filter(function (spellData) {
        return _lodash2.default.filter(spellData.tiers, function (tier) {
          return (tier.profession === player.professionName || player.$secondaryProfessions && _lodash2.default.includes(player.$secondaryProfessions, tier.profession)) && tier.level <= player.level;
        }).length > 0;
      }).value();
    }
  }]);

  return SpellManager;
}();