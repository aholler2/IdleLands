'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:global:pet';
var description = exports.description = 'Get all pet information for the global page display. Cannot be logged in to execute this function.';
var args = exports.args = 'playerName';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var pet = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var playerName = _ref2.playerName;
      var player, pet;
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
              player = _gameState.GameState.getInstance().getPlayer(playerName);

              if (player) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', respond({ update: 'pet', data: {} }));

            case 5:
              pet = player.$pets.activePet;

              if (pet) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', respond({ update: 'pet', data: {} }));

            case 8:

              _logger.Logger.info('Socket:Global:Pet', _socket.address.ip + ' requesting global pet for player ' + playerName + '.');

              respond({
                update: 'pet',
                data: pet.buildTransmitObject()
              });

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function pet(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, pet);
};