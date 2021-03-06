
import { EventHandler } from '../events/eventhandler';
import { FindItem } from '../events/events/FindItem';

export class GMCommands {
  static teleport(player, { map, x, y, toLoc }) {
    const tileData = {
      object: {
        properties: {
          destx: x,
          desty: y,
          movementType: 'teleport',
          map,
          toLoc
        }
      }
    };

    player.$playerMovement.handleTileTeleport(player, tileData, true);
    const tile = player.$playerMovement.getTileAt(player.map, player.x, player.y);
    player.$playerMovement.handleTile(player, tile);
  }

  static toggleMod(player) {
    player.isMod = !player.isMod;
    player._saveSelf();
  }

  static toggleAchievement(player, achievement) {
    player.permanentAchievements = player.permanentAchievements || {};
    player.permanentAchievements[achievement] = !player.permanentAchievements[achievement];
  }

  static setLevel(player, level) {
    player._level.set(level - 1);
    player.levelUp();
  }

  static giveEvent(player, event) {
    EventHandler.doEvent(player, event);
  }

  static giveItem(player, item) {
    FindItem.operateOn(player, null, item);
  }
}