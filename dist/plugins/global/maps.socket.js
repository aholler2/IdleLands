'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

var _teleports = require('../../../assets/maps/content/teleports.json');

var _teleports2 = _interopRequireDefault(_teleports);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var compressedTeleports = _lodash2.default.extend({}, _teleports2.default.towns, _teleports2.default.bosses, _teleports2.default.dungeons, _teleports2.default.trainers, _teleports2.default.other);

var event = exports.event = 'plugin:global:allmaps';
var description = exports.description = 'Get all maps for the global page display. Cannot be logged in to execute this function.';
var args = exports.args = '';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var allplayers = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var mapData;
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
              _logger.Logger.info('Socket:Global:Maps', _socket.address.ip + ' requesting global maps.');

              mapData = _lodash2.default.sortBy(_lodash2.default.map(_gameState.GameState.getInstance().world.maps, function (val, key) {
                return { name: key, path: val.path };
              }), 'name');


              respond({
                update: 'maps',
                data: { maps: mapData, teleports: compressedTeleports }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function allplayers() {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, allplayers);
};