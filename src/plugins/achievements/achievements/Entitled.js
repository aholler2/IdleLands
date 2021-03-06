
import { Achievement, AchievementTypes } from '../achievement';

export class Entitled extends Achievement {
  static achievementData(player) {

    const value = player.$achievements.titles().length;
    const baseValue = 15;

    if(value < baseValue) return [];

    return [{
      tier: 1,
      name: 'Entitled',
      desc: 'Gain a title for getting 15 titles.',
      type: AchievementTypes.EVENT,
      rewards: [{
        type: 'title',
        title: 'Entitled'
      }, {
        type: 'petattr',
        petattr: 'a small child who wants a lot of things'
      }]
    }];
  }
}
