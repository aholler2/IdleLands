'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:player:request:pets';
var description = exports.description = 'Request pet data.';
var args = exports.args = '';
var socket = exports.socket = function socket(_socket) {

  var requestpet = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var playerName, player;
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
              player = _gameState.GameState.getInstance().getPlayer(playerName);

              if (player) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return');

            case 8:
              _logger.Logger.info('Socket:Player:RequestPet', _socket.playerName + ' (' + _socket.address.ip + ') requesting pet.');

              player._updatePet();

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function requestpet() {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, requestpet);
};