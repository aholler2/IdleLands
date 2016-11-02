'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _battle = require('./battle.db');

var _logger = require('../../shared/logger');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:combat:retrieve';
var description = exports.description = 'Retrieve a battle from the database.';
var args = exports.args = 'battleName, playerName';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var retrieve = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var battleName = _ref2.battleName;
      var battle;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _battle.retrieveFromDb)(battleName);

            case 3:
              battle = _context.sent;

              if (battle) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return');

            case 6:
              _logger.Logger.info('Socket:Battle', _socket.address.ip + ' requesting ' + battleName + '.');
              respond({ data: battle, update: 'battle' });
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](0);

              respond({ data: { msg: 'This battle does not exist or has expired.' }, update: 'battle' });

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 10]]);
    }));

    return function retrieve(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, retrieve);
};