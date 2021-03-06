
import { Personality } from '../personality';

export class TreasureHunter extends Personality {
  static description = 'Find better items, but gain significantly less gold and xp.';
  static stats = {
    xp:   (player, baseValue) => -baseValue*0.9,
    gold: (player, baseValue) => -baseValue*0.9,
    itemFindRangeMultiplier: (player) => player.level * 0.05
  };

  static disable(player) {
    this.flagDirty(player, ['xp', 'gold', 'itemFindRange']);
  }

  static enable(player) {
    this.flagDirty(player, ['xp', 'gold', 'itemFindRange']);
  }

  static hasEarned(player) {
    return player.$statistics.getStat('Character.Item.Sell') >= 100;
  }
}