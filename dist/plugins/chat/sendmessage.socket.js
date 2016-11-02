'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gameState = require('../../core/game-state');

var _settings = require('../../static/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var GENERAL_ROUTE = 'chat:channel:General';
// const EVENTS_ROUTE  = 'chat:general:Global Events';

var CHAT_SPAM_DELAY = process.env.CHAT_SPAM_DELAY || 2000;
var MAX_SPAM_MESSAGES = process.env.MAX_SPAM_MESSAGES || 5;
var SPAM_IGNORE_LEVEL = process.env.SPAM_IGNORE_LEVEL || 25;

var event = exports.event = 'plugin:chat:sendmessage';
var description = exports.description = 'Send a chat message.';
var args = exports.args = 'text, channel, route';
var socket = exports.socket = function socket(_socket, primus) {

  if (!primus.extChat) {
    primus.extChat = new (require('./external.chat.' + _settings.SETTINGS.externalChat).ExternalChatMechanism)();
    primus.extChat.connect(primus, GENERAL_ROUTE);
  }

  // always join the general chat channel
  _socket.join(GENERAL_ROUTE);
  // socket.join(EVENTS_ROUTE);

  var sendmessage = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var text = _ref2.text,
          channel = _ref2.channel,
          route = _ref2.route;
      var playerName, player, timestamp, messageObject;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_socket.authToken) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              playerName = _socket.authToken.playerName;

              if (playerName) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return');

            case 5:
              player = _gameState.GameState.getInstance().retrievePlayer(playerName);

              if (!(!player || !player.isOnline || player.isMuted || player.isBanned)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return');

            case 8:

              if (!player.lastSentMessage) player.lastSentMessage = Date.now();

              timestamp = Date.now();

              if (!player.spamMessages || _lodash2.default.isNaN(player.spamMessages)) player.spamMessages = 0;
              if (timestamp - player.lastSentMessage < CHAT_SPAM_DELAY) player.spamMessages++;else player.spamMessages = Math.max(player.spamMessages - 1, 0);

              if (player.spamMessages > MAX_SPAM_MESSAGES && player.level < SPAM_IGNORE_LEVEL) {
                player.isMuted = true;
                if (!player.autoMutes) player.autoMutes = 0;
                player.autoMutes++;
                player.spamMessages = 0;
              }

              player.lastSentMessage = Date.now();

              text = _lodash2.default.truncate(text, { length: _settings.SETTINGS.chatMessageMaxLength, omission: ' [truncated]' }).trim();

              if (text) {
                _context.next = 17;
                break;
              }

              return _context.abrupt('return');

            case 17:
              messageObject = {
                text: text,
                timestamp: timestamp,
                channel: channel,
                route: route,
                title: player.title,
                playerName: player.nameEdit ? player.nameEdit : player.name,
                level: player.level,
                event: event,
                ip: player.$currentIp,
                isMod: player.isMod
              };


              if (_lodash2.default.includes(route, ':pm:')) {
                (function () {
                  var users = route.split(':')[2].split('|');
                  primus.forEach(function (spark, next) {
                    if (!_lodash2.default.includes(users, spark.playerName)) return next();
                    spark.write(messageObject);
                    next();
                  }, function () {});
                })();
              } else {
                primus.room(route).write(messageObject);

                if (route === GENERAL_ROUTE) {
                  primus.extChat.sendMessage(messageObject);
                }
              }

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function sendmessage(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, sendmessage);
};