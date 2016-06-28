
import IRC from 'squelch-client';
import { SETTINGS } from '../../static/settings';
import { Logger } from '../../shared/logger';
const isProd = process.env.NODE_ENV === 'production' && !process.env.EXT_CHAT;

const { server, nick, channel } = SETTINGS.chatConfig.irc;

export class ExternalChatMechanism {
  constructor(primus, sendRoom) {
    if(!isProd) return;

    if(!primus) {
      Logger.error('ExtChat:IRC', new Error('Primus failed to inject correctly!'));
      return;
    }

    Logger.info('ExtChat:IRC', `Connecting to ${server}${channel} as ${nick}...`);

    this.client = new IRC({
      server,
      nick,
      channels: [channel],
      autoConnect: false
    });

    this.client.connect().then(() => {
      Logger.info('ExtChat:IRC', 'Connected!');
      this.client.on('msg', ({ from, msg }) => {
        primus.room(sendRoom).write({
          text: msg,
          playerName: `<irc:${from}>`,
          channel: 'General',
          route: sendRoom,
          event: 'plugin:chat:sendmessage'
        });
      });
    });
  }

  sendMessage(msgData) {
    if(!isProd) return;
    this.client.msg(channel, `<web:${msgData.playerName}> ${msgData.text}`);
  }
}
