'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:player:changename';
var description = exports.description = 'Mod only. Change targets name to something else.';
var args = exports.args = 'targetName, newName';
var socket = exports.socket = function socket(_socket) {

  var changename = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var targetName = _ref2.targetName,
          newName = _ref2.newName;
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
              _logger.Logger.info('Socket:Player:NameChange', _socket.playerName + ' (' + _socket.address.ip + ') changing player name from ' + targetName + ' to ' + newName + '.');

              target.changeName(newName);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function changename(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, changename);
};