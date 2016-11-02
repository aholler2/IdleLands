'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

var _playerlistUpdater = require('../../shared/playerlist-updater');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:chat:togglemute';
var description = exports.description = 'Mod only. Toggle muted status for a particular user.';
var args = exports.args = 'targetName';
var socket = exports.socket = function socket(_socket) {

  var togglemute = function () {
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
              _logger.Logger.info('Socket:Mute', playerName + ' (' + _socket.address.ip + ') muting ' + targetName + '.');

              target.isMuted = !target.isMuted;
              if (target.isMuted && target.isPardoned) target.isPardoned = false;

              target._saveSelf();

              (0, _playerlistUpdater.PlayerUpdateAll)(target._id, ['isMuted', 'isPardoned']);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function togglemute(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, togglemute);
};