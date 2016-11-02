'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpellTargetStrategy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpellTargetStrategy = exports.SpellTargetStrategy = function () {
  function SpellTargetStrategy() {
    _classCallCheck(this, SpellTargetStrategy);
  }

  _createClass(SpellTargetStrategy, null, [{
    key: 'all',
    value: function all(caster) {
      return caster.$battle.allPlayers;
    }
  }, {
    key: 'allAlive',
    value: function allAlive(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).value();
    }
  }, {
    key: 'allEnemies',
    value: function allEnemies(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).value();
    }
  }, {
    key: 'enemyWithMostMp',
    value: function enemyWithMostMp(caster) {
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).sortBy(function (p) {
        return p.mp;
      }).reverse().value()[0]];
    }
  }, {
    key: 'strongestEnemyScore',
    value: function strongestEnemyScore(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).sortBy(function (p) {
        return p.itemScore;
      }).reverse().value()[0];
    }
  }, {
    key: 'randomEnemyNotProfession',
    value: function randomEnemyNotProfession(caster) {
      return function (profession) {
        return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
          return p.hp === 0;
        }).reject(function (p) {
          return p.professionName === profession;
        }).reject(function (p) {
          return p.party === caster.party;
        }).sample()];
      };
    }
  }, {
    key: 'randomEnemy',
    value: function randomEnemy(caster) {
      if (caster.professionName === 'Lich') return this.allEnemies(caster);
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).sample()];
    }
  }, {
    key: 'randomEnemies',
    value: function randomEnemies(caster) {
      return function (numEnemies) {
        var validTargets = (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
          return p.hp === 0;
        }).reject(function (p) {
          return p.party === caster.party;
        }).value();

        return _lodash2.default.map(new Array(numEnemies), function () {
          return _lodash2.default.sample(validTargets);
        });
      };
    }
  }, {
    key: 'randomDeadEnemy',
    value: function randomDeadEnemy(caster) {
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp > 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).sample()];
    }

    // Dead enemy and not bonecrafted before

  }, {
    key: 'randomBonecraftable',
    value: function randomBonecraftable(caster) {
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp > 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).reject(function (p) {
        return p.$prevParty;
      }).sample()];
    }

    // Not boss, not bitomancer

  }, {
    key: 'randomBitFlippable',
    value: function randomBitFlippable(caster) {
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party === caster.party;
      }).reject(function (p) {
        return p.$isBoss;
      }).reject(function (p) {
        return p.professionName === 'Bitomancer';
      }).sample()];
    }
  }, {
    key: 'allAllies',
    value: function allAllies(caster) {
      return (0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).filter(function (p) {
        return p.party === caster.party;
      }).value();
    }
  }, {
    key: 'randomAlly',
    value: function randomAlly(caster) {
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).sample()];
    }
  }, {
    key: 'randomDeadAlly',
    value: function randomDeadAlly(caster) {
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp > 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).sample()];
    }
  }, {
    key: 'randomAllyBelowHealthPercent',
    value: function randomAllyBelowHealthPercent(caster) {
      return function (percent) {
        return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
          return p.hp === 0;
        }).reject(function (p) {
          return p.party !== caster.party;
        }).reject(function (p) {
          return p._hp.greaterThanPercent(percent);
        }).sample()];
      };
    }
  }, {
    key: 'randomAllyBelowMaxHealth',
    value: function randomAllyBelowMaxHealth(caster) {
      return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
        return p.hp === 0;
      }).reject(function (p) {
        return p.party !== caster.party;
      }).reject(function (p) {
        return p._hp.atMaximum();
      }).sample()];
    }
  }, {
    key: 'randomAllyWithoutEffect',
    value: function randomAllyWithoutEffect(caster) {
      return function (effect) {
        return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
          return p.hp === 0;
        }).reject(function (p) {
          return p.party !== caster.party;
        }).reject(function (p) {
          return p.$effects.hasEffect(effect);
        }).sample()];
      };
    }
  }, {
    key: 'randomEnemyWithoutEffect',
    value: function randomEnemyWithoutEffect(caster) {
      return function (effect) {
        return [(0, _lodash2.default)(caster.$battle.allPlayers).reject(function (p) {
          return p.hp === 0;
        }).reject(function (p) {
          return p.party === caster.party;
        }).reject(function (p) {
          return p.$effects.hasEffect(effect);
        }).sample()];
      };
    }
  }, {
    key: 'self',
    value: function self(caster) {
      return [caster];
    }
  }]);

  return SpellTargetStrategy;
}();