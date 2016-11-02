'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePvP = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _gameState = require('../../../core/game-state');

var _battle = require('../../combat/battle');

var _party = require('../../party/party');

var _adventureLog = require('../../../shared/adventure-log');

var _logger = require('../../../shared/logger');

var _settings = require('../../../static/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 4;

// Create a pvp battle
var BattlePvP = exports.BattlePvP = (_temp = _class = function (_Event) {
  _inherits(BattlePvP, _Event);

  function BattlePvP() {
    _classCallCheck(this, BattlePvP);

    return _possibleConstructorReturn(this, (BattlePvP.__proto__ || Object.getPrototypeOf(BattlePvP)).apply(this, arguments));
  }

  _createClass(BattlePvP, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      if (player.level <= _settings.SETTINGS.minBattleLevel) return;
      if (player.$personalities.isActive('Coward') && _event.Event.chance.bool({ likelihood: 75 })) return;

      var allPlayers = _lodash2.default.reject(_gameState.GameState.getInstance().getPlayers(), function (p) {
        return p.$battle;
      });
      var opponent = null;

      // 1v1
      if (!player.party || player.party.players.length === 1) {
        var partyInstance = new _party.Party({ leader: player });
        partyInstance.isBattleParty = true;

        opponent = (0, _lodash2.default)(allPlayers).reject(function (p) {
          return p.party;
        }).reject(function (p) {
          return p.$personalities.isActive('Camping');
        }).reject(function (p) {
          return p.$personalities.isActive('Coward') && _event.Event.chance.bool({ likelihood: 75 });
        }).reject(function (p) {
          return p.level < player.level - _settings.SETTINGS.pvpBattleRange || p.level > player.level + _settings.SETTINGS.pvpBattleRange;
        }).sample();
        if (!opponent) return;

        var opponentParty = new _party.Party({ leader: opponent });
        opponentParty.isBattleParty = true;

        // XvX
      } else {
        opponent = (0, _lodash2.default)(allPlayers).reject(function (p) {
          return p.$personalities.isActive('Camping');
        }).reject(function (p) {
          return p.$personalities.isActive('Coward') && _event.Event.chance.bool({ likelihood: 75 });
        }).reject(function (p) {
          return !p.party || p.party === player.party || p.party.players.length === 1;
        }).reject(function (p) {
          return p.party.level < player.party.level - _settings.SETTINGS.pvpBattleRange || p.party.level > player.party.level + _settings.SETTINGS.pvpBattleRange;
        }).sample();
        if (!opponent) return;
      }

      var parties = [player.party, opponent.party];
      var players = _lodash2.default.flatten(_lodash2.default.map(parties, function (party) {
        return party.players;
      }));

      var introText = this.eventText('battle', player, { _eventData: { parties: parties } });

      var battle = new _battle.Battle({ introText: introText, parties: parties });
      this.emitMessage({ affected: players, eventText: introText, category: _adventureLog.MessageCategories.COMBAT, extraData: { battleName: battle._id } });

      try {
        battle.startBattle();
      } catch (e) {
        _logger.Logger.error('Battle:PvP', e, battle.saveObject());
      }

      var affected = player.party.players.concat(opponent.party.players);

      _lodash2.default.each(affected, function (player) {
        return player.recalculateStats();
      });

      if (player.party.isBattleParty) {
        player.party.disband();
      }

      if (opponent.party.isBattleParty) {
        opponent.party.disband();
      }

      return affected;
    }
  }]);

  return BattlePvP;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);