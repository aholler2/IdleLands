'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerMovement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gameState = require('../../core/game-state');

var _ProfessionChange = require('../events/events/ProfessionChange');

var _BattleBoss = require('../events/events/BattleBoss');

var _FindTreasure = require('../events/events/FindTreasure');

var _all = require('../events/events/_all');

var Events = _interopRequireWildcard(_all);

var _settings = require('../../static/settings');

var _logger = require('../../shared/logger');

var _emitter = require('./_emitter');

var _monsterGenerator = require('../../shared/monster-generator');

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default(Math.random);

var directions = [1, 2, 3, 6, 9, 8, 7, 4];

var PlayerMovement = exports.PlayerMovement = function () {
  function PlayerMovement() {
    _classCallCheck(this, PlayerMovement);
  }

  _createClass(PlayerMovement, null, [{
    key: 'num2dir',
    value: function num2dir(dir, x, y) {
      switch (dir) {
        case 1:
          return { x: x - 1, y: y - 1 };
        case 2:
          return { x: x, y: y - 1 };
        case 3:
          return { x: x + 1, y: y - 1 };
        case 4:
          return { x: x - 1, y: y };
        case 6:
          return { x: x + 1, y: y };
        case 7:
          return { x: x - 1, y: y + 1 };
        case 8:
          return { x: x, y: y + 1 };
        case 9:
          return { x: x + 1, y: y + 1 };

        default:
          return { x: x, y: y };
      }
    }
  }, {
    key: 'canEnterTile',
    value: function canEnterTile(player, tile) {
      var properties = _lodash2.default.get(tile, 'object.properties');
      if (properties) {
        if (properties.requireMap) return player.$statistics.getStat('Character.Maps.' + properties.requireMap) > 0;
        if (properties.requireRegion) return player.$statistics.getStat('Character.Regions.' + properties.requireRegion) > 0;
        if (properties.requireBoss) return player.$statistics.getStat('Character.BossKills.' + properties.requireBoss) > 0;
        if (properties.requireClass) return player.professionName === properties.requireClass;
        if (properties.requireAchievement) return player.$achievements.hasAchievement(properties.requireAchievement);
        if (properties.requireCollectible) return player.$collectibles.hasCollectible(properties.requireCollectible);
        if (properties.requireHoliday) {
          var _SETTINGS$holidays$pr = _settings.SETTINGS.holidays[properties.requireHoliday],
              start = _SETTINGS$holidays$pr.start,
              end = _SETTINGS$holidays$pr.end;

          var today = new Date();
          return today.getMonth() >= start.getMonth() && today.getDate() >= start.getDate() && today.getMonth() <= end.getMonth() && today.getDate() <= end.getDate();
        }
      }
      return !tile.blocked && tile.terrain !== 'Void';
    }

    // TODO https://github.com/IdleLands/IdleLandsOld/blob/master/src/character/player/Player.coffee#L347

  }, {
    key: 'handleTile',
    value: function handleTile(player, tile) {
      var type = _lodash2.default.get(tile, 'object.type');

      var forceEvent = _lodash2.default.get(tile, 'object.properties.forceEvent', '');
      if (forceEvent) {
        if (!Events[forceEvent]) {
          _logger.Logger.error('PlayerMovement', 'forceEvent ' + forceEvent + ' does not exist at ' + player.x + ', ' + player.y + ' in ' + player.map);
          return;
        }
        Events[forceEvent].operateOn(player, tile.object.properties);
      }

      if (!type || !this['handleTile' + type]) return;
      this['handleTile' + type](player, tile);
    }
  }, {
    key: 'handleTileTreasure',
    value: function handleTileTreasure(player, tile) {
      _FindTreasure.FindTreasure.operateOn(player, { treasureName: tile.object.name });
    }
  }, {
    key: 'handleTileBoss',
    value: function handleTileBoss(player, tile) {
      var boss = _monsterGenerator.MonsterGenerator.generateBoss(tile.object.name);
      if (!boss) return;
      _BattleBoss.BattleBoss.operateOn(player, { bossName: tile.object.name, bosses: boss });
    }
  }, {
    key: 'handleTileBossParty',
    value: function handleTileBossParty(player, tile) {
      var bossparty = _monsterGenerator.MonsterGenerator.generateBossParty(tile.object.name);
      if (!bossparty) return;
      _BattleBoss.BattleBoss.operateOn(player, { bossName: tile.object.name, bosses: bossparty });
    }
  }, {
    key: 'handleTileTrainer',
    value: function handleTileTrainer(player, tile) {
      if (player.stepCooldown > 0) return;
      player.stepCooldown = 10;

      var professionName = tile.object.name;
      var trainerName = tile.object.properties.realName ? tile.object.properties.realName + ', the ' + professionName + ' trainer' : 'the ' + professionName + ' trainer';
      _ProfessionChange.ProfessionChange.operateOn(player, { professionName: professionName, trainerName: trainerName });
    }
  }, {
    key: 'handleTileTeleport',
    value: function handleTileTeleport(player, tile) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


      var dest = tile.object.properties;
      dest.x = +dest.destx;
      dest.y = +dest.desty;

      if (dest.movementType === 'ascend' && player.$personalities.isActive('Delver')) return;
      if (dest.movementType === 'descend' && player.$personalities.isActive('ScaredOfTheDark')) return;

      if (!force && (dest.movementType === 'ascend' || dest.movementType === 'descend')) {
        if (player.stepCooldown > 0) return;
        player.stepCooldown = 10;
      }

      if (!dest.map && !dest.toLoc) {
        _logger.Logger.error('PlayerMovement', new Error('No dest.map at ' + player.x + ', ' + player.y + ' in ' + player.map));
        return;
      }

      if (!dest.movementType) {
        _logger.Logger.error('PlayerMovement', new Error('No dest.movementType at ' + player.x + ', ' + player.y + ' in ' + player.map));
        return;
      }

      if (!dest.fromName) dest.fromName = player.map;
      if (!dest.destName) dest.destName = dest.map;

      if (dest.toLoc) {
        var toLocData = _settings.SETTINGS.locToTeleport(dest.toLoc);
        dest.x = toLocData.x;
        dest.y = toLocData.y;
        dest.map = toLocData.map;
        dest.destName = toLocData.formalName;
      }

      player.map = dest.map;
      player.x = dest.x;
      player.y = dest.y;

      player.oldRegion = player.mapRegion;
      player.mapRegion = tile.region;

      player.$statistics.incrementStat('Character.Movement.' + _lodash2.default.capitalize(dest.movementType));

      _emitter.emitter.emit('player:transfer', { player: player, dest: dest });
    }
  }, {
    key: 'handleTileCollectible',
    value: function handleTileCollectible(player, tile) {

      var collectible = tile.object;
      var collectibleName = collectible.name;
      var collectibleRarity = _lodash2.default.get(collectible, 'properties.rarity', 'basic');

      if (player.$collectibles.hasCollectible(collectibleName)) return;

      var collectibleObj = {
        name: collectibleName,
        map: player.map,
        region: player.mapRegion,
        rarity: collectibleRarity,
        description: collectible.properties.flavorText,
        storyline: collectible.properties.storyline,
        foundAt: Date.now()
      };

      player.$collectibles.addCollectible(collectibleObj);

      _emitter.emitter.emit('player:collectible', { player: player, collectible: collectibleObj });
    }
  }, {
    key: 'getTileAt',
    value: function getTileAt(map, x, y) {
      var mapInstance = _gameState.GameState.getInstance().world.maps[map];
      if (!mapInstance) {
        mapInstance = _gameState.GameState.getInstance().world.maps.Norkos;
        x = 10;
        y = 10;
      }
      return mapInstance.getTile(x, y);
    }
  }, {
    key: 'pickFollowTile',
    value: function pickFollowTile(player, target) {
      return [0, { x: target.x, y: target.y }, target.lastDir];
    }
  }, {
    key: 'pickRandomTile',
    value: function pickRandomTile(player, weight) {
      var overrideFollow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!player.stepCooldown) player.stepCooldown = 0;

      if (player.party && !overrideFollow) {
        var party = player.party;
        var follow = party.getFollowTarget(player);

        if (follow && follow.map === player.map) {
          return this.pickFollowTile(player, follow);
        }
      }

      var indexes = [0, 1, 2, 3, 4, 5, 6, 7];

      var randomIndex = chance.weighted(indexes, weight);
      var dir = directions[randomIndex];

      return [randomIndex, this.num2dir(dir, player.x, player.y), dir];
    }
  }, {
    key: 'getInitialWeight',
    value: function getInitialWeight(player) {

      var weight = [300, 40, 7, 3, 1, 3, 7, 40];

      var MAX_DRUNK = 10;
      var drunkFromPersonality = player.$personalities.isActive('Drunk') ? 7 : 0;
      var drunk = Math.max(0, Math.min(MAX_DRUNK, drunkFromPersonality));

      if (player.lastDir && !drunk) {
        var lastDirIndex = directions.indexOf(player.lastDir);
        weight = weight.slice(weight.length - lastDirIndex).concat(weight.slice(0, weight.length - lastDirIndex));
      } else if (drunk) {
        weight = [1, 1, 1, 1, 1, 1, 1, 1];
      }

      return weight;
    }
  }]);

  return PlayerMovement;
}();