'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExternalChatMechanism = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _squelchClient = require('squelch-client');

var _squelchClient2 = _interopRequireDefault(_squelchClient);

var _settings = require('../../static/settings');

var _logger = require('../../shared/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isProd = process.env.NODE_ENV === 'production' && !process.env.EXT_CHAT;

var _SETTINGS$chatConfig$ = _settings.SETTINGS.chatConfig.irc,
    server = _SETTINGS$chatConfig$.server,
    nick = _SETTINGS$chatConfig$.nick,
    channel = _SETTINGS$chatConfig$.channel;

var ExternalChatMechanism = exports.ExternalChatMechanism = function () {
  function ExternalChatMechanism() {
    _classCallCheck(this, ExternalChatMechanism);
  }

  _createClass(ExternalChatMechanism, [{
    key: 'connect',
    value: function connect(primus, sendRoom) {
      var _this = this;

      if (!isProd) return;

      if (!primus) {
        _logger.Logger.error('ExtChat:IRC', new Error('Primus failed to inject correctly!'));
        return;
      }

      _logger.Logger.info('ExtChat:IRC', 'Connecting to ' + server + channel + ' as ' + nick + '...');

      this.client = new _squelchClient2.default({
        server: server,
        nick: nick,
        channels: [channel],
        autoConnect: false
      });

      this.client.connect().then(function () {
        _logger.Logger.info('ExtChat:IRC', 'Connected!');
        _this.isConnected = true;
        _this.client.on('msg', function (_ref) {
          var from = _ref.from,
              to = _ref.to,
              msg = _ref.msg;

          if (to !== '##idlebot') return;
          primus.room(sendRoom).write({
            text: msg,
            playerName: '<irc:' + from + '>',
            channel: 'General',
            route: sendRoom,
            event: 'plugin:chat:sendmessage'
          });
        });
      });
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(msgData) {
      if (!isProd || !this.isConnected) return;
      this.client.msg(channel, '<web:' + msgData.playerName + ' [' + msgData.level + ']> ' + msgData.text);
    }
  }]);

  return ExternalChatMechanism;
}();