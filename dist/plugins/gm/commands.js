'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GMCommands = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventhandler = require('../events/eventhandler');

var _FindItem = require('../events/events/FindItem');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GMCommands = exports.GMCommands = function () {
  function GMCommands() {
    _classCallCheck(this, GMCommands);
  }

  _createClass(GMCommands, null, [{
    key: 'teleport',
    value: function teleport(player, _ref) {
      var map = _ref.map,
          x = _ref.x,
          y = _ref.y,
          toLoc = _ref.toLoc;

      var tileData = {
        object: {
          properties: {
            destx: x,
            desty: y,
            movementType: 'teleport',
            map: map,
            toLoc: toLoc
          }
        }
      };

      player.$playerMovement.handleTileTeleport(player, tileData, true);
      var tile = player.$playerMovement.getTileAt(player.map, player.x, player.y);
      player.$playerMovement.handleTile(player, tile);
    }
  }, {
    key: 'toggleMod',
    value: function toggleMod(player) {
      player.isMod = !player.isMod;
      player._saveSelf();
    }
  }, {
    key: 'toggleAchievement',
    value: function toggleAchievement(player, achievement) {
      player.permanentAchievements = player.permanentAchievements || {};
      player.permanentAchievements[achievement] = !player.permanentAchievements[achievement];
    }
  }, {
    key: 'setLevel',
    value: function setLevel(player, level) {
      player._level.set(level - 1);
      player.levelUp();
    }
  }, {
    key: 'giveEvent',
    value: function giveEvent(player, event) {
      _eventhandler.EventHandler.doEvent(player, event);
    }
  }, {
    key: 'giveItem',
    value: function giveItem(player, item) {
      _FindItem.FindItem.operateOn(player, null, item);
    }
  }]);

  return GMCommands;
}();