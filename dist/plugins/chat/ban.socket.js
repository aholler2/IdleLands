'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

var _emitter = require('../../plugins/players/_emitter');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:chat:toggleban';
var description = exports.description = 'Mod only. Toggle banned status for a particular user. Generally only used to ban, as they get kicked immediately.';
var args = exports.args = 'targetName';
var socket = exports.socket = function socket(_socket) {

  var toggleban = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var targetName = _ref2.targetName;
      var playerName, gameState, player, target;
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
              gameState = _gameState.GameState.getInstance();
              player = gameState.retrievePlayer(playerName);
              target = gameState.retrievePlayer(targetName);

              if (!(!player || !player.isMod || !target)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return');

            case 10:
              _logger.Logger.info('Socket:Ban', playerName + ' (' + _socket.address.ip + ') banning ' + targetName + '.');

              target.isBanned = true;
              target._saveSelf();

              _emitter.emitter.emit('player:logout', { playerName: targetName });

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function toggleban(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, toggleban);
};