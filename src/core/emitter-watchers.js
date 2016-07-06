
import _ from 'lodash';

import { AdventureLog, MessageTypes } from '../shared/adventure-log';
import { GameState } from './game-state';
import { emitter as PlayerEmitter } from '../plugins/players/_emitter';
import { migrate } from '../plugins/players/player.migration';
import { AllPlayers, PlayerLogin, PlayerLogout, PlayerUpdateAll } from '../shared/playerlist-updater';
import { MessageParser } from '../plugins/events/messagecreator';

PlayerEmitter.on('player:login', async ({ playerName }) => {
  const player = await GameState.getInstance().addPlayer(playerName);
  if(!player) return;
  migrate(player);
  player.update();
  player.$statistics.incrementStat('Game.Logins');
  AllPlayers(playerName);
  PlayerLogin(playerName);
  AdventureLog({
    text: MessageParser.stringFormat('Welcome %player back to Idliathlia!', player),
    type: MessageTypes.GLOBAL
  });
});

PlayerEmitter.on('player:register', async ({ playerName }) => {
  const player = await GameState.getInstance().addPlayer(playerName);
  if(!player) return;
  player.update();
  player.$statistics.incrementStat('Game.Logins');
  AllPlayers(playerName);
  PlayerLogin(playerName);
  AdventureLog({
    text: MessageParser.stringFormat('Welcome %player to Idliathlia!', player),
    type: MessageTypes.GLOBAL
  });
});

PlayerEmitter.on('player:logout', ({ playerName }) => {
  PlayerLogout(playerName);
  AdventureLog({
    text: `«${playerName}» has departed Idliathlia!`,
    type: MessageTypes.GLOBAL
  });
  GameState.getInstance().delPlayer(playerName);
});

// TODO title

PlayerEmitter.on('player:levelup', ({ player }) => {
  PlayerUpdateAll(player.name, ['name', 'level']);
  AdventureLog({
    text: MessageParser.stringFormat(`%player has reached experience level ${player.level}!`, player),
    type: MessageTypes.GLOBAL
  });
});

PlayerEmitter.on('player:changeclass', ({ player, choice }) => {
  PlayerUpdateAll(player.name, ['name', 'professionName']);
  AdventureLog({
    text: MessageParser.stringFormat(`%player has met with ${choice.extraData.trainerName} and became a ${choice.extraData.professionName}!`, player),
    type: MessageTypes.SINGLE,
    targets: [player.name]
  });
});

PlayerEmitter.on('player:transfer', ({ player, dest }) => {
  PlayerUpdateAll(player.name, ['name', 'map']);

  let message = '';
  switch(dest.movementType) {
    case 'ascend':    message = `%player has ascended to ${dest.destName}.`; break;
    case 'descend':   message = `%player has descended to ${dest.destName}.`; break;
    case 'fall':      message = `%player has fallen to ${dest.destName} from ${dest.fromName}.`; break;
    case 'teleport':  message = `%player has been teleported to ${dest.destName} from ${dest.fromName}.`; break;
  }

  if(dest.customMessage) {
    message = dest.customMessage.split('%playerName').join(player.fullname).split('%destName').join(dest.destName);
  }

  AdventureLog({
    text: MessageParser.stringFormat(message, player),
    type: MessageTypes.SINGLE,
    targets: [player.name]
  });

});

PlayerEmitter.on('player:event', ({ affected, eventText }) => {
  AdventureLog({
    text: eventText,
    type: MessageTypes.SINGLE,
    targets: _.map(affected, 'name')
  });
});