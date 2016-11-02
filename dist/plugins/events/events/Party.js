'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Party = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _gameState = require('../../../core/game-state');

var _party = require('../../../plugins/party/party');

var _adventureLog = require('../../../shared/adventure-log');

var _settings = require('../../../static/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBattleDebug = process.env.BATTLE_DEBUG;

var WEIGHT = exports.WEIGHT = isBattleDebug ? 250 : 25;

// Create a party
var Party = exports.Party = (_temp = _class = function (_Event) {
  _inherits(Party, _Event);

  function Party() {
    _classCallCheck(this, Party);

    return _possibleConstructorReturn(this, (Party.__proto__ || Object.getPrototypeOf(Party)).apply(this, arguments));
  }

  _createClass(Party, null, [{
    key: 'operateOn',
    value: function operateOn(player) {

      if (player.$personalities.isActive('Solo') || player.level < _settings.SETTINGS.minPartyLevel) return;

      var validPlayers = _lodash2.default.reject(_gameState.GameState.getInstance().getPlayers(), function (p) {
        return p.$partyName || p === player || p.$personalities.isActive('Solo') || p.$personalities.isActive('Camping') || p.level < _settings.SETTINGS.minPartyLevel || p.map !== player.map;
      });

      if (player.$partyName) {
        if (player.party.players.length < _settings.SETTINGS.maxPartyMembers && validPlayers.length >= 1) {
          var newPlayer = _lodash2.default.sample(validPlayers);
          player.party.playerJoin(newPlayer);
          this.emitMessage({
            affected: player.party.players,
            eventText: this._parseText('%partyName picked up a stray %player on their travels!', newPlayer, { partyName: player.party.name }),
            category: _adventureLog.MessageCategories.PARTY
          });
        }
        return;
      }

      if (validPlayers.length < 3) return;

      var partyInstance = new _party.Party({ leader: player });

      var newPlayers = _lodash2.default.sampleSize(validPlayers, 3);

      player.$statistics.incrementStat('Character.Party.Create');

      _lodash2.default.each(newPlayers, function (p) {
        partyInstance.playerJoin(p);
      });

      var partyMemberString = (0, _lodash2.default)(newPlayers).map(function (p) {
        return '\xAB' + p.fullname + '\xBB';
      }).join(', ');
      var eventText = this.eventText('party', player, { partyName: partyInstance.name, partyMembers: partyMemberString });

      this.emitMessage({ affected: partyInstance.players, eventText: eventText, category: _adventureLog.MessageCategories.PARTY });

      return player.party.players;
    }
  }]);

  return Party;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);