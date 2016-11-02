'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpellTargetPossibilities = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpellTargetPossibilities = exports.SpellTargetPossibilities = function () {
  function SpellTargetPossibilities() {
    _classCallCheck(this, SpellTargetPossibilities);
  }

  _createClass(SpellTargetPossibilities, null, [{
    key: 'yes',
    value: function yes() {
      return true;
    }
  }, {
    key: 'enemyHasMp',
    value: function enemyHasMp(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).filter(function (p) {
        return p.mp;
      }).value().length > 1;
    }
  }, {
    key: 'moreThanOneEnemy',
    value: function moreThanOneEnemy(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).value().length > 1;
    }
  }, {
    key: 'enemyNotProfession',
    value: function enemyNotProfession(caster, profession) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).reject(function (p) {
        return p.professionName === profession;
      }).value().length >= 1;
    }
  }, {
    key: 'anyEnemyDead',
    value: function anyEnemyDead(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp > 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).value().length >= 1;
    }

    // Dead and not bonecrafted before

  }, {
    key: 'anyBonecraftable',
    value: function anyBonecraftable(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp > 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).reject(function (p) {
        return p.$prevParty;
      }).value().length >= 1;
    }

    // Not a boss, not a bitomancer

  }, {
    key: 'anyBitFlippable',
    value: function anyBitFlippable(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).reject(function (p) {
        return p.$isBoss;
      }).reject(function (p) {
        return p.professionName === 'Bitomancer';
      }).value().length >= 1;
    }
  }, {
    key: 'allyWithoutEffect',
    value: function allyWithoutEffect(caster, effect) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).reject(function (p) {
        return p.$effects.hasEffect(effect);
      }).value().length >= 1;
    }
  }, {
    key: 'allyBelowHealthPercent',
    value: function allyBelowHealthPercent(caster, percent) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).reject(function (p) {
        return p._hp.greaterThanPercent(percent);
      }).value().length >= 1;
    }
  }, {
    key: 'allyBelowMaxHealth',
    value: function allyBelowMaxHealth(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).reject(function (p) {
        return p._hp.atMaximum();
      }).value().length >= 1;
    }
  }, {
    key: 'anyAllyDead',
    value: function anyAllyDead(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp > 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).value().length >= 1;
    }
  }, {
    key: 'allyBelow50PercentHealth',
    value: function allyBelow50PercentHealth(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).reject(function (p) {
        return p._hp.greaterThanPercent(50);
      }).value().length >= 1;
    }
  }, {
    key: 'enemyWithoutEffect',
    value: function enemyWithoutEffect(caster, effect) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).reject(function (p) {
        return p.$effects.hasEffect(effect);
      }).value().length >= 1;
    }
  }]);

  return SpellTargetPossibilities;
}();