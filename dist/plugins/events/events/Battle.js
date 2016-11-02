'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Battle = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _battle = require('../../combat/battle');

var _party = require('../../party/party');

var _monsterGenerator = require('../../../shared/monster-generator');

var _adventureLog = require('../../../shared/adventure-log');

var _logger = require('../../../shared/logger');

var _settings = require('../../../static/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBattleDebug = process.env.BATTLE_DEBUG;

var WEIGHT = exports.WEIGHT = isBattleDebug ? 300 : 3;

// Create a battle
var Battle = exports.Battle = (_temp = _class = function (_Event) {
  _inherits(Battle, _Event);

  function Battle() {
    _classCallCheck(this, Battle);

    return _possibleConstructorReturn(this, (Battle.__proto__ || Object.getPrototypeOf(Battle)).apply(this, arguments));
  }

  _createClass(Battle, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      if (player.level <= _settings.SETTINGS.minBattleLevel) return;

      if (player.$personalities.isActive('Coward') && _event.Event.chance.bool({ likelihood: 75 })) return;

      if (!player.party) {
        var partyInstance = new _party.Party({ leader: player });
        partyInstance.isBattleParty = true;
      }

      var monsters = _monsterGenerator.MonsterGenerator.generateMonsters(player.party);

      var monsterPartyInstance = new _party.Party({ leader: monsters[0] });
      monsterPartyInstance.isMonsterParty = true;
      if (monsters.length > 1) {
        for (var i = 1; i < monsters.length; i++) {
          monsterPartyInstance.playerJoin(monsters[i]);
        }
      }

      var parties = [player.party, monsterPartyInstance];

      var introText = this.eventText('battle', player, { _eventData: { parties: parties } });

      var battle = new _battle.Battle({ introText: introText, parties: parties });
      this.emitMessage({ affected: player.party.players, eventText: introText, category: _adventureLog.MessageCategories.COMBAT, extraData: { battleName: battle._id } });

      try {
        battle.startBattle();
      } catch (e) {
        _logger.Logger.error('Battle', e, battle.saveObject());
      }

      _lodash2.default.each(player.party.players, function (player) {
        return player.recalculateStats();
      });

      if (player.party.isBattleParty) {
        player.party.disband();
      }

      monsterPartyInstance.disband();

      return [player];
    }
  }]);

  return Battle;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);