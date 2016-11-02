'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _commands = require('./commands');

var _logger = require('../../shared/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:gm:giveevent';
var description = exports.description = 'Mod only. Give an event to a particular player.';
var args = exports.args = 'targetName, targetEvent';
var socket = exports.socket = function socket(_socket) {

  var setlevel = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var targetName = _ref2.targetName,
          targetEvent = _ref2.targetEvent;
      var playerName, player, target;
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
              player = _gameState.GameState.getInstance().getPlayer(playerName);

              if (!(!player || !player.isMod)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return');

            case 6:
              _logger.Logger.info('Socket:GM:GiveEvent', playerName + ' (' + _socket.address.ip + ') giving event ' + targetEvent + ' to ' + targetName + '.');

              target = _gameState.GameState.getInstance().getPlayer(targetName);

              _commands.GMCommands.giveEvent(target, targetEvent);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function setlevel(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, setlevel);
};