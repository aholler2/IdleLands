'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _emitter = require('./_emitter');

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:player:logout';
var description = exports.description = 'Log out of the game.';
var args = exports.args = '';
var socket = exports.socket = function socket(_socket, primus) {

  var logout = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var playerName, gameState, timeoutId;
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

              _logger.Logger.info('Socket:Player:Logout', playerName + ' (' + _socket.address.ip + ') logging out.');

              gameState = _gameState.GameState.getInstance();
              timeoutId = setTimeout(function () {
                if (!gameState._hasTimeout(playerName)) return;
                gameState._clearTimeout(playerName);
                primus.delPlayer(playerName, _socket);
                _emitter.emitter.emit('player:logout', { playerName: playerName });
              }, 10000);


              gameState._setTimeout(playerName, timeoutId);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function logout() {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on('close', logout);
  _socket.on('end', logout);
  _socket.on(event, logout);
};