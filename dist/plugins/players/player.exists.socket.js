'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _player = require('./player.db');

var _logger = require('../../shared/logger');

var _diWrapper = require('../../shared/di-wrapper');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:player:exists';
var description = exports.description = 'Unauthenticated. Check if a particular player exists for auto-login purposes.';
var args = exports.args = 'userId';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var playerDb = (0, _diWrapper.constitute)(_player.PlayerDb);

  if (!playerDb) {
    // Logger?
    throw new Error('$playerDb could not be resolved.');
  }

  var exists = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var userId = _ref2.userId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _logger.Logger.info('Socket:Player:Exists', _socket.address.ip + ' checking if ' + userId + ' exists.');
              _context.prev = 1;
              _context.next = 4;
              return playerDb.getPlayer({ userId: userId });

            case 4:
              respond({ exists: true });
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](1);

              respond({ exists: false });

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 7]]);
    }));

    return function exists(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, exists);
};