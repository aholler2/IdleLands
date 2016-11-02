'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _player = require('./player');

var _player2 = require('./player.db');

var _emitter = require('./_emitter');

var _logger = require('../../shared/logger');

var _diWrapper = require('../../shared/di-wrapper');

var _messages = require('../../static/messages');

var _gameState = require('../../core/game-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var AUTH0_SECRET = process.env.AUTH0_SECRET;

var event = exports.event = 'plugin:player:login';
var description = exports.description = 'Log in or register a new character. Login only requires userId.';
var args = exports.args = 'name, gender, professionName, token, userId';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var login = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var name = _ref2.name,
          gender = _ref2.gender,
          professionName = _ref2.professionName,
          token = _ref2.token,
          userId = _ref2.userId;

      var player, event, playerDb, validateToken, gameState, oldPlayer, playerObject, _msg, loggedInPlayerName, msg;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              player = null;
              event = '';
              playerDb = (0, _diWrapper.constitute)(_player2.PlayerDb);

              _logger.Logger.info('Socket:Player:Login', 'Attempted login from (' + _socket.address.ip + ', ' + userId + ').');

              if (playerDb) {
                _context.next = 8;
                break;
              }

              _logger.Logger.error('Login', new Error('playerDb could not be resolved.'));
              respond({ msg: _messages.MESSAGES.GENERIC });
              return _context.abrupt('return');

            case 8:
              validateToken = process.env.NODE_ENV === 'production' || !_lodash2.default.includes(userId, 'local|');

              if (!validateToken) {
                _context.next = 21;
                break;
              }

              if (!AUTH0_SECRET) {
                _context.next = 20;
                break;
              }

              _context.prev = 11;

              _jsonwebtoken2.default.verify(token, new Buffer(AUTH0_SECRET, 'base64'), { algorithms: ['HS256'] });
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](11);
              return _context.abrupt('return', respond(_messages.MESSAGES.INVALID_TOKEN));

            case 18:
              _context.next = 21;
              break;

            case 20:
              _logger.Logger.error('Login', new Error('Token needs to be validated, but no AUTH0_TOKEN is present.'));

            case 21:
              gameState = _gameState.GameState.getInstance();
              oldPlayer = _lodash2.default.find(gameState.players, { userId: userId });

              if (oldPlayer) {
                _context.next = 77;
                break;
              }

              _context.prev = 24;
              _context.next = 27;
              return playerDb.getPlayer({ userId: userId });

            case 27:
              player = _context.sent;

              event = 'player:login';

              _context.next = 69;
              break;

            case 31:
              _context.prev = 31;
              _context.t1 = _context['catch'](24);


              // 20 char name is reasonable
              name = _lodash2.default.truncate(name, { length: 20 }).trim().replace(/[^\w\d ]/gm, '');
              name = name.split(' the ').join('');
              name = name.trim();

              if (!(name.length === 0)) {
                _context.next = 38;
                break;
              }

              return _context.abrupt('return', respond(_messages.MESSAGES.INVALID_NAME));

            case 38:

              // sensible defaults
              if (!_lodash2.default.includes(['male', 'female'], gender)) gender = 'male';
              if (!_lodash2.default.includes(['Generalist', 'Mage', 'Cleric', 'Fighter'], professionName)) professionName = 'Generalist';

              playerObject = {};
              _context.prev = 41;

              playerObject = (0, _diWrapper.constitute)(_player.Player);
              _context.next = 49;
              break;

            case 45:
              _context.prev = 45;
              _context.t2 = _context['catch'](41);

              _logger.Logger.error('Login', _context.t2);
              return _context.abrupt('return', respond(_messages.MESSAGES.GENERIC));

            case 49:

              playerObject.init({ _id: name, name: name, gender: gender, professionName: professionName, userId: userId });

              _context.prev = 50;
              _context.next = 53;
              return playerDb.createPlayer(playerObject.buildSaveObject());

            case 53:
              _context.next = 58;
              break;

            case 55:
              _context.prev = 55;
              _context.t3 = _context['catch'](50);
              return _context.abrupt('return', respond(_messages.MESSAGES.PLAYER_EXISTS));

            case 58:
              _context.prev = 58;
              _context.next = 61;
              return playerDb.getPlayer({ userId: userId, name: name });

            case 61:
              player = _context.sent;
              _context.next = 68;
              break;

            case 64:
              _context.prev = 64;
              _context.t4 = _context['catch'](58);

              _logger.Logger.error('Login', _context.t4);
              respond(_messages.MESSAGES.GENERIC);

            case 68:
              event = 'player:register';

            case 69:
              if (!player.isBanned) {
                _context.next = 75;
                break;
              }

              _msg = _lodash2.default.clone(_messages.MESSAGES.BANNED);

              _msg.alreadyLoggedIn = true;
              respond(_msg);
              _socket.end();
              return _context.abrupt('return');

            case 75:
              _context.next = 80;
              break;

            case 77:
              if (gameState._hasTimeout(oldPlayer.name)) {
                gameState._clearTimeout(oldPlayer.name);
              }
              _logger.Logger.info('Login', oldPlayer.name + ' semi-login.');
              event = 'player:semilogin';

            case 80:
              loggedInPlayerName = (oldPlayer || player).name;
              _context.prev = 81;

              _socket.authToken = { playerName: loggedInPlayerName, token: token };
              _socket.playerName = loggedInPlayerName;
              _context.next = 90;
              break;

            case 86:
              _context.prev = 86;
              _context.t5 = _context['catch'](81);

              _logger.Logger.error('login.socket.auth/name', _context.t5);
              return _context.abrupt('return', respond(_messages.MESSAGES.GENERIC));

            case 90:
              if (!(_socket.readyState === 2)) {
                _context.next = 92;
                break;
              }

              return _context.abrupt('return');

            case 92:

              _logger.Logger.info('Socket:Player:Login', _socket.playerName + ' (' + _socket.address.ip + ', ' + userId + ') logging in.');

              primus.addPlayer(loggedInPlayerName, _socket);

              _emitter.emitter.emit(event, { playerName: loggedInPlayerName, fromIp: _socket.address.ip });

              msg = _lodash2.default.clone(_messages.MESSAGES.LOGIN_SUCCESS);

              msg.ok = true;
              return _context.abrupt('return', respond(msg));

            case 98:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[11, 15], [24, 31], [41, 45], [50, 55], [58, 64], [81, 86]]);
    }));

    return function login(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, login);
};