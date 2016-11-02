'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:global:player';
var description = exports.description = 'Get all player information for the global page display. Cannot be logged in to execute this function.';
var args = exports.args = 'playerName';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var player = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var playerName = _ref2.playerName;
      var player, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_socket.authToken) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              _logger.Logger.info('Socket:Global:Player', _socket.address.ip + ' requesting global player ' + playerName + '.');

              player = _gameState.GameState.getInstance().getPlayer(playerName);

              if (player) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', respond({ update: 'player', data: {} }));

            case 6:
              data = {
                overview: player.buildTransmitObject(),
                equipment: player.equipment,
                statistics: player.$statistics.stats,
                achievements: player.$achievements.achievements,
                collectibles: player.$collectibles.collectibles,
                pets: { allPets: player.$pets.buildGlobalObject(), activePetId: player.$pets.activePetId }
              };


              respond({
                update: 'player',
                data: data
              });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function player(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, player);
};