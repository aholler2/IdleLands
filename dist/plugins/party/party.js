'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Party = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _gameState = require('../../core/game-state');

var _stringGenerator = require('../../shared/string-generator');

var _emitter = require('../../plugins/players/_emitter');

var _PartyLeave = require('../events/events/PartyLeave');

var _adventureLog = require('../../shared/adventure-log');

var _messagecreator = require('../../plugins/events/messagecreator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var Party = exports.Party = function () {
  function Party(_ref) {
    var leader = _ref.leader;

    _classCallCheck(this, Party);

    this.players = [];
    this.name = this.generateName();
    _gameState.GameState.getInstance().parties[this.name] = this;

    this.playerJoin(leader);
  }

  _createClass(Party, [{
    key: 'generateName',
    value: function generateName() {
      var name = null;
      do {
        name = _stringGenerator.StringGenerator.party();
      } while (_gameState.GameState.getInstance().parties[name]);

      return name;
    }
  }, {
    key: 'allowPlayerToLeaveParty',
    value: function allowPlayerToLeaveParty(player) {
      _PartyLeave.PartyLeave.operateOn(player);
    }
  }, {
    key: 'setPartySteps',
    value: function setPartySteps(player) {
      player.partySteps = chance.integer({ min: 50, max: 200 });
    }
  }, {
    key: 'playerTakeStep',
    value: function playerTakeStep(player) {
      if (!player.partySteps) this.setPartySteps(player);
      player.partySteps--;

      if (player.partySteps <= 0) {
        this.allowPlayerToLeaveParty(player);
      }
    }
  }, {
    key: 'playerJoin',
    value: function playerJoin(player) {
      this.players.push(player);
      player.$partyName = this.name;

      if (player.isPlayer) {
        player.$statistics.incrementStat('Character.Party.Join');

        player.partySteps = 0;
        if (this.players.length > 1) {
          this.teleportNear(player, this.players[this.players.length - 2]);
        }

        if (this.players.length > 1) {
          _gameState.GameState.getInstance().reAddPlayersInOrder(this.players);
        }
      }
    }
  }, {
    key: 'playerLeave',
    value: function playerLeave(player) {
      var disbanding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


      if (!disbanding && !this.isMonsterParty && !player.$battle && player.isPlayer) {
        _emitter.emitter.emit('player:event', {
          affected: [player],
          eventText: _messagecreator.MessageParser.stringFormat('%player has left %partyName.', player, { partyName: this.name }),
          category: _adventureLog.MessageCategories.PARTY
        });
      }

      var doDisband = false;
      if (!player.$battle && player.isPlayer && (this.players.length <= 2 && !disbanding || player === this.leader)) doDisband = true;

      this.players = _lodash2.default.without(this.players, player);
      player.$partyName = null;
      if (player.isPlayer) {
        player.$statistics.incrementStat('Character.Party.Leave');
      }
      player.choices = _lodash2.default.reject(player.choices, function (c) {
        return c.event === 'PartyLeave';
      });

      if (doDisband && !disbanding) this.disband(player);
    }
  }, {
    key: 'getFollowTarget',
    value: function getFollowTarget(player) {
      if (player === this.leader) return;
      return this.players[_lodash2.default.indexOf(this.players, player) - 1];
    }
  }, {
    key: 'teleportNear',
    value: function teleportNear(me, target) {
      me.x = target.x;
      me.y = target.y;
      me.map = target.map;
    }
  }, {
    key: 'buildTransmitObject',
    value: function buildTransmitObject() {
      return {
        name: this.name,
        isBattleParty: this.isBattleParty,
        players: _lodash2.default.map(this.players, function (p) {
          return {
            name: p.fullname,
            level: p.level,
            profession: p.professionName
          };
        })
      };
    }
  }, {
    key: 'prepareForCombat',
    value: function prepareForCombat() {
      var _this = this;

      _lodash2.default.each(this.players, function (p) {
        var pet = p.$pets ? p.$pets.activePet : null;
        if (!pet || !chance.bool({ likelihood: pet.$_scale.battleJoinPercent })) return;
        _this.playerJoin(pet);
      });
    }
  }, {
    key: 'disband',
    value: function disband(player) {
      var _this2 = this;

      var showMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this.isBattleParty && !this.isMonsterParty && showMessage) {
        _emitter.emitter.emit('player:event', {
          affected: this.players,
          eventText: _messagecreator.MessageParser.stringFormat('%player has disbanded %partyName.', player || this.leader, { partyName: this.name }),
          category: _adventureLog.MessageCategories.PARTY
        });
      }

      _lodash2.default.each(this.players, function (p) {
        return _this2.playerLeave(p, true);
      });
      _gameState.GameState.getInstance().parties[this.name] = null;
      delete _gameState.GameState.getInstance().parties[this.name];
    }
  }, {
    key: 'humanPlayers',
    get: function get() {
      return _lodash2.default.filter(this.players, function (player) {
        return player.isPlayer;
      });
    }
  }, {
    key: 'score',
    get: function get() {
      var score = 0;
      if (!this.leader) {
        // Bonecraft edge case ends party with no players
        return 0;
      } else if (this.leader.isPlayer) {
        score = _lodash2.default.sum(_lodash2.default.map(this.humanPlayers, 'itemScore')) / this.humanPlayers.length;
      } else {
        score = _lodash2.default.sum(_lodash2.default.map(this.players, 'itemScore')) / this.players.length;
      }

      return score;
    }
  }, {
    key: 'level',
    get: function get() {
      var level = 0;

      if (!this.leader) {
        // Bonecraft edge case ends party with no players
        return 0;
      } else if (this.leader.isPlayer) {
        level = _lodash2.default.sum(_lodash2.default.map(this.humanPlayers, 'level')) / this.humanPlayers.length;
      } else {
        level = _lodash2.default.sum(_lodash2.default.map(this.players, 'level')) / this.players.length;
      }

      return level;
    }
  }, {
    key: 'displayName',
    get: function get() {
      return this.players.length === 1 ? this.players[0].fullname : this.name + ' (' + _lodash2.default.map(this.players, 'fullname').join(', ') + ')';
    }
  }, {
    key: 'leader',
    get: function get() {
      return this.players[0];
    }
  }]);

  return Party;
}();