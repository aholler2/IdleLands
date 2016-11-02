'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gameState = require('../../core/game-state');

var _logger = require('../../shared/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:global:allpets';
var description = exports.description = 'Get all pets for the global page display. Cannot be logged in to execute this function.';
var args = exports.args = '';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var allpets = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var allPets;
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
              _logger.Logger.info('Socket:Global:Pets', _socket.address.ip + ' requesting global pets.');

              allPets = (0, _lodash2.default)(_gameState.GameState.getInstance().getPlayers()).map(function (p) {
                return p.$pets.activePet;
              }).compact().map(function (pet) {
                var base = _lodash2.default.pick(pet, ['name', 'level', 'professionName']);
                base.owner = pet.$ownerRef.nameEdit || pet.$ownerRef.name;
                base.type = pet.$petId;
                return base;
              }).value();


              respond({
                update: 'pets',
                data: allPets
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function allpets() {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, allpets);
};