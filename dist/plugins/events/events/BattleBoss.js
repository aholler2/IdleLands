'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleBoss = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _battle = require('../../combat/battle');

var _party = require('../../party/party');

var _FindItem = require('./FindItem');

var _monsterGenerator = require('../../../shared/monster-generator');

var _adventureLog = require('../../../shared/adventure-log');

var _emitter = require('../../players/_emitter');

var _logger = require('../../../shared/logger');

var _settings = require('../../../static/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = -1;

// Create a battle
var BattleBoss = exports.BattleBoss = (_temp = _class = function (_Event) {
  _inherits(BattleBoss, _Event);

  function BattleBoss() {
    _classCallCheck(this, BattleBoss);

    return _possibleConstructorReturn(this, (BattleBoss.__proto__ || Object.getPrototypeOf(BattleBoss)).apply(this, arguments));
  }

  _createClass(BattleBoss, null, [{
    key: 'operateOn',
    value: function operateOn(player, _ref) {
      var bossName = _ref.bossName,
          bosses = _ref.bosses;

      if (player.level <= _settings.SETTINGS.minBattleLevel) return;
      if (player.$personalities.isActive('Coward') && _event.Event.chance.bool({ likelihood: 75 })) return;

      if (!player.party) {
        var partyInstance = new _party.Party({ leader: player });
        partyInstance.isBattleParty = true;
      }

      var monsterPartyInstance = new _party.Party({ leader: bosses[0] });
      monsterPartyInstance.isMonsterParty = true;
      if (bosses.length > 1) {
        for (var i = 1; i < bosses.length; i++) {
          monsterPartyInstance.playerJoin(bosses[i]);
        }
      }

      var parties = [player.party, monsterPartyInstance];

      var introText = player.party.displayName + ' is gearing up for an epic boss battle against ' + monsterPartyInstance.displayName + '!';

      var battle = new _battle.Battle({ introText: introText, parties: parties });
      this.emitMessage({ affected: player.party.players, eventText: introText, category: _adventureLog.MessageCategories.COMBAT, extraData: { battleName: battle._id } });

      try {
        battle.startBattle();
      } catch (e) {
        _logger.Logger.error('BattleBoss', e, battle.saveObject());
      }

      if (!battle.isLoser(player.party) && !battle._isTie) {
        _lodash2.default.each(player.party.players, function (p) {
          if (!p.$statistics) return;

          _lodash2.default.each(bosses, function (boss) {
            p.$statistics.incrementStat('Character.BossKills.' + boss._name);
          });
        });

        _monsterGenerator.MonsterGenerator._setBossTimer(bossName);

        var dropItems = _lodash2.default.compact(_lodash2.default.flattenDeep(_lodash2.default.map(bosses, function (boss) {
          return _lodash2.default.map(_lodash2.default.values(boss.equipment), function (item) {
            if (!item.dropPercent) return null;
            if (!_event.Event.chance.bool({ likelihood: item.dropPercent })) return null;
            return item;
          });
        })));

        var dropCollectibles = _lodash2.default.compact(_lodash2.default.flattenDeep(_lodash2.default.map(bosses, function (boss) {
          return _lodash2.default.map(boss._collectibles, function (coll) {
            if (!coll.dropPercent) return null;
            if (!_event.Event.chance.bool({ likelihood: coll.dropPercent })) return null;
            return coll;
          });
        })));

        if (dropItems.length > 0) {
          _lodash2.default.each(dropItems, function (item) {
            _lodash2.default.each(player.party.players, function (p) {
              if (!p.canEquip(item)) return;
              _FindItem.FindItem.operateOn(p, null, item);
            });
          });
        }

        if (dropCollectibles.length > 0) {
          _lodash2.default.each(dropCollectibles, function (coll) {

            var collectibleObj = {
              name: coll.name,
              map: player.map,
              region: player.mapRegion,
              rarity: coll.rarity || 'guardian',
              description: coll.flavorText,
              storyline: coll.storyline,
              foundAt: Date.now()
            };

            _lodash2.default.each(player.party.players, function (p) {
              if (p.$collectibles.hasCollectible(collectibleObj.name)) return;
              p.$collectibles.addCollectible(collectibleObj);
              _emitter.emitter.emit('player:collectible', { player: p, collectible: collectibleObj });
            });
          });
        }
      }

      var affected = player.party.players;

      _lodash2.default.each(affected, function (player) {
        return player.recalculateStats();
      });

      if (player.party.isBattleParty) {
        player.party.disband();
      }

      monsterPartyInstance.disband();

      return affected;
    }
  }]);

  return BattleBoss;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);