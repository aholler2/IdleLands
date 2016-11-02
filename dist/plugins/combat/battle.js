'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Battle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _stringGenerator = require('../../shared/string-generator');

var _messagecreator = require('../../plugins/events/messagecreator');

var _battle = require('./battle.db');

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isBattleDebug = process.env.BATTLE_DEBUG;
var isQuiet = process.env.QUIET;

var chance = new _chance2.default();

var MAX_ROUND = 100;

var Battle = exports.Battle = function () {
  function Battle(_ref) {
    var parties = _ref.parties,
        introText = _ref.introText;

    _classCallCheck(this, Battle);

    this.parties = parties;
    this.introText = introText;
    this.happenedAt = Date.now();
    this.name = this.generateName();
    this.setId();
    this.messageData = [];
    this.currentRound = 0;
  }

  _createClass(Battle, [{
    key: 'generateName',
    value: function generateName() {
      return _stringGenerator.StringGenerator.battle();
    }
  }, {
    key: 'isPlayerAlive',
    value: function isPlayerAlive(player) {
      return player.hp > 0;
    }
  }, {
    key: '_emitMessage',
    value: function _emitMessage(message) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (isBattleDebug && !isQuiet) {
        console.log(message);
      }
      this.messageData.push({ message: message, data: data });
    }
  }, {
    key: 'startBattle',
    value: function startBattle() {
      this.setupParties();
      this._initialParties = _lodash2.default.cloneDeep(this._partyStats());
      this.startMessage();
      this.startTakingTurns();
    }
  }, {
    key: 'startMessage',
    value: function startMessage() {
      this._emitMessage(this.introText);
    }
  }, {
    key: '_partyStats',
    value: function _partyStats() {
      return _lodash2.default.map(this.parties, function (party) {
        return {
          name: party.name,
          players: _lodash2.default.map(party.players, function (p) {
            return { name: p.fullname, hp: _lodash2.default.clone(p._hp), mp: _lodash2.default.clone(p._mp), special: _lodash2.default.clone(p._special), level: p.level, profession: p.professionName };
          })
        };
      });
    }
  }, {
    key: 'roundMessage',
    value: function roundMessage() {
      if (isBattleDebug && !isQuiet) {
        _lodash2.default.each(this._partyStats(), function (party) {
          console.log(party.name);
          console.log(party.players);
        });
      }
      this._emitMessage('Round ' + this.currentRound + ' start.', this._partyStats());
    }
  }, {
    key: 'tryIncrement',
    value: function tryIncrement(p, stat) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (!p.$statistics) return;
      p.$statistics.incrementStat(stat, value);
    }
  }, {
    key: '_setupPlayer',
    value: function _setupPlayer(player) {
      player.$battle = this;
      player._hp.toMaximum();
      player._mp.toMaximum();
      player.$profession.setupSpecial(player);

      this.tryIncrement(player, 'Combats');
    }
  }, {
    key: 'setupParties',
    value: function setupParties() {
      var _this = this;

      _lodash2.default.each(this.parties, function (p) {
        p.prepareForCombat();
      });

      _lodash2.default.each(this.allPlayers, function (p) {
        _this._setupPlayer(p);
      });
    }
  }, {
    key: 'calculateTurnOrder',
    value: function calculateTurnOrder() {
      this.turnOrder = _lodash2.default.sortBy(this.allPlayers, function (p) {
        return -p.liveStats.agi;
      });
    }
  }, {
    key: 'startTakingTurns',
    value: function startTakingTurns() {
      while (this.shouldGoOn) {
        this.doRound();
      }

      this.endBattle();
    }
  }, {
    key: 'doRound',
    value: function doRound() {
      var _this2 = this;

      if (!this.shouldGoOn) {
        this.endBattle();
        return;
      }

      this.currentRound++;

      this.roundMessage();

      this.calculateTurnOrder();

      _lodash2.default.each(this.turnOrder, function (p) {
        return _this2.takeTurn(p);
      });
    }
  }, {
    key: 'takeTurn',
    value: function takeTurn(player) {
      if (!this.isPlayerAlive(player) || !this.shouldGoOn) return;
      var stunned = player.liveStats.isStunned;
      if (stunned) {
        this._emitMessage(stunned);
      } else {
        this.doAttack(player);
      }

      this.emitEvents(player, 'TakeTurn');

      // Don't allow player to regen if they kill themselves
      if (!this.isPlayerAlive(player)) return;

      var hpRegen = player.liveStats.hpregen;
      var mpRegen = player.liveStats.mpregen;

      player._hp.add(hpRegen);
      player._mp.add(mpRegen);

      if (hpRegen > 0 || mpRegen > 0) {
        this._emitMessage(player.fullname + ' regenerated ' + hpRegen + ' hp and ' + mpRegen + ' mp!');
      }

      player.$effects.tick();
    }
  }, {
    key: 'doAttack',
    value: function doAttack(player, forceSkill) {
      var spell = null;

      if (!forceSkill) {
        var validSpells = this.validAttacks(player);
        var spellChoice = chance.weighted(_lodash2.default.map(validSpells, 'name'), _lodash2.default.map(validSpells, function (s) {
          return s.bestTier(player).weight;
        }));
        spell = _lodash2.default.find(player.spells, { name: spellChoice });
      } else {
        spell = _lodash2.default.find(player.spells, { name: forceSkill });
      }

      var spellRef = new spell(player);
      spellRef.preCast();
    }
  }, {
    key: 'validAttacks',
    value: function validAttacks(player) {
      return (0, _lodash2.default)(player.spells).filter(function (spell) {
        return spell.shouldCast(player);
      }).filter(function (spell) {
        var tier = spell.bestTier(player);
        if (!tier) return false;
        if (_lodash2.default.isFunction(tier.cost) && !tier.cost(player)) return false;
        if (_lodash2.default.isNumber(tier.cost) && player['_' + spell.stat].lessThan(tier.cost)) return false;
        return true;
      }).value();
    }
  }, {
    key: 'isLoser',
    value: function isLoser(party) {
      return _lodash2.default.every(party.players, function (p) {
        return p.hp === 0;
      });
    }
  }, {
    key: 'endBattle',
    value: function endBattle() {
      this._emitMessage('Battle complete.', this._partyStats());
      this.endBattleBonuses();
      (0, _battle.persistToDb)(this);
      this.cleanUp();

      if (isBattleDebug && this.kill) {
        process.exit(0);
      }
    }
  }, {
    key: 'emitEvents',
    value: function emitEvents(target, event) {
      target.$profession.handleEvent(target, event, { battle: this });
    }
  }, {
    key: 'endBattleBonuses',
    value: function endBattleBonuses() {
      var _this3 = this;

      if (this.currentRound >= MAX_ROUND || !this.winningTeam) {
        this._emitMessage('No one wins! It was a tie! Give it up already, people!');
        this._isTie = true;
        return;
      }

      _lodash2.default.each(this.parties, function (party) {
        // no monster bonuses
        // rare edge case with Bonecraft reducing loser's party size to one summon and then killing it.
        if (!party.leader || !party.leader.isPlayer) return;

        // if this team won
        if (_this3.winningTeam === party) {
          (function () {

            _this3._emitMessage(party.displayName + ' won!');

            var compareLevel = _this3.losingTeam.level;
            var level = party.level;
            var levelDiff = Math.max(-5, Math.min(5, compareLevel - level)) + 6;

            var goldGainedInParty = Math.round(compareLevel * 1560 / _lodash2.default.reject(party.players, function (p) {
              return p.$isMinion;
            }).length);

            _lodash2.default.each(party.players, function (p) {
              _this3.tryIncrement(p, 'Combat.Win');
              var gainedXp = Math.round(p._xp.maximum * (levelDiff / 100));
              if (compareLevel < level - 5) gainedXp = 0;

              var modXp = p.gainXp(gainedXp);
              var modGold = p.gainGold(goldGainedInParty);

              _this3._emitMessage(p.fullname + ' gained ' + modXp + 'xp and ' + modGold + 'gold!');
            });
          })();
        } else {
          _this3._emitMessage(party.displayName + ' lost!');

          _lodash2.default.each(party.players, function (p) {
            _this3.tryIncrement(p, 'Combat.Lose');

            var compareLevel = _this3.winningTeam.level;
            var currentGold = _lodash2.default.isNumber(p.gold) ? p.gold : p.gold.__current;
            var lostGold = Math.round(currentGold / 100);
            var lostXp = Math.round(p._xp.maximum / 20);

            if (compareLevel > party.level + 5) {
              lostXp = 0;
            }

            var modXp = Math.abs(p.gainXp(-Math.abs(lostXp)));
            var modGold = Math.abs(p.gainGold(-Math.abs(lostGold)));

            _this3._emitMessage(p.fullname + ' lost ' + modXp + 'xp and ' + modGold + 'gold!');
          });
        }
      });
    }
  }, {
    key: 'healDamage',
    value: function healDamage(target, healing, source) {
      if (healing > 0) {
        this.tryIncrement(source, 'Combat.Give.Healing', healing);
        this.tryIncrement(target, 'Combat.Receive.Healing', healing);
        target._hp.add(healing);
      }
      return healing;
    }
  }, {
    key: 'dealDamage',
    value: function dealDamage(target, damage, source) {
      if (damage > 0) {
        damage = Math.max(0, damage - target.liveStats.damageReduction);
        this.tryIncrement(source, 'Combat.Give.Damage', damage);
        this.tryIncrement(target, 'Combat.Receive.Damage', damage);

        var overkill = damage - target.hp;
        target._hp.sub(damage);
        // TODO Display overkill damage in battle log.
        if (target.hp === 0) {
          this.tryIncrement(source, 'Combat.Give.Overkill', overkill);
          this.tryIncrement(target, 'Combat.Receive.Overkill', overkill);
        }
      } else if (damage < 0) {
        this.healDamage(target, Math.abs(damage), source);
      }

      return damage;
    }
  }, {
    key: 'handleDeath',
    value: function handleDeath(target, killer) {
      this.tryIncrement(killer, 'Combat.Kills.' + (target.isPlayer ? 'Player' : 'Monster'));
      this.tryIncrement(target, 'Combat.Deaths.' + (killer.isPlayer ? 'Player' : 'Monster'));

      // TODO Get death message from killed character
      var message = target.deathMessage || '%player has died!';
      message = _messagecreator.MessageParser.stringFormat(message, target);
      this._emitMessage(message);

      this.emitEvents(killer, 'Kill');
      this.emitEvents(target, 'Killed');

      target.$effects.clear();
    }
  }, {
    key: 'setId',
    value: function setId() {
      this._id = this.happenedAt + '-' + this.name.split(' ').join('_');
    }
  }, {
    key: 'saveObject',
    value: function saveObject() {
      return {
        _id: this._id,
        name: this.name,
        happenedAt: new Date(this.happenedAt),
        messageData: this.messageData,
        initialParties: this._initialParties,
        parties: _lodash2.default.map(this.parties, function (party) {
          return party.buildTransmitObject();
        })
      };
    }
  }, {
    key: 'cleanUp',
    value: function cleanUp() {
      var _this4 = this;

      _lodash2.default.each(this.allPlayers, function (p) {

        if (p.$prevParty) {
          p._hp.toMinimum();
          p.party.playerLeave(p);
          p.$prevParty.playerJoin(p);
          delete p.$prevParty;
        }

        p.$battle = null;
        p.$profession.resetSpecial(p);
        p.$effects.clear();
        if (p.$statistics) {
          p.$statistics.save();
        }

        if (p.$personalities && p.$personalities.isActive('Solo') && (!p.party || p.party.isBattleParty)) {
          _this4.tryIncrement(p, 'CombatSolo');
        }

        if (!p.isPlayer) {
          p.party.playerLeave(p);

          // pet flags for update
          if (p.updatePlayer) p.updatePlayer();
        }
      });
    }
  }, {
    key: 'allPlayers',
    get: function get() {
      return _lodash2.default.flatten(_lodash2.default.map(this.parties, 'players'));
    }
  }, {
    key: 'shouldGoOn',
    get: function get() {
      var _this5 = this;

      return this.currentRound < MAX_ROUND && _lodash2.default.every(this.parties, function (party) {
        return _lodash2.default.some(party.players, function (p) {
          return _this5.isPlayerAlive(p);
        });
      });
    }
  }, {
    key: 'winningTeam',
    get: function get() {
      var _this6 = this;

      return _lodash2.default.filter(this.parties, function (party) {
        return _lodash2.default.some(party.players, function (p) {
          return _this6.isPlayerAlive(p);
        });
      })[0];
    }
  }, {
    key: 'losingTeam',
    get: function get() {
      var _this7 = this;

      return _lodash2.default.filter(this.parties, function (party) {
        return party !== _this7.winningTeam;
      })[0];
    }
  }]);

  return Battle;
}();