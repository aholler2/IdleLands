'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.args = exports.description = exports.event = undefined;

var _gameState = require('../../core/game-state');

var _commands = require('./commands');

var _logger = require('../../shared/logger');

var _assetLoader = require('../../shared/asset-loader');

var _equipment = require('../../core/base/equipment');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var event = exports.event = 'plugin:gm:giveitem';
var description = exports.description = 'Mod only. Give a custom item to a particular player.';
var args = exports.args = 'targetName, targetItemString';
var socket = exports.socket = function socket(_socket, primus, respond) {

  var giveitem = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
      var targetName = _ref2.targetName,
          targetItemString = _ref2.targetItemString;
      var playerName, player, target, item, itemInst;
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
              target = _gameState.GameState.getInstance().getPlayer(targetName);
              item = _assetLoader.JSONParser.parseItemString(targetItemString);

              if (!(!item || !item.type || !item.name)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', respond({ type: 'error', notify: 'Invalid item.' }));

            case 10:

              _logger.Logger.info('Socket:GM:GiveItem', playerName + ' (' + _socket.address.ip + ') giving item "' + targetItemString + '" to ' + targetName + '.');

              itemInst = new _equipment.Equipment(item);


              _commands.GMCommands.giveItem(target, itemInst);

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function giveitem(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  _socket.on(event, giveitem);
};