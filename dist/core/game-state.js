'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _world = require('./world/world');

var _logger = require('../shared/logger');

var _diWrapper = require('../shared/di-wrapper');

var _messages = require('../static/messages');

var _player = require('../plugins/players/player.load');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UPDATE_KEYS = ['x', 'y', 'map', 'gender', 'professionName', 'level', 'name', 'title'];
var EXTRA_KEYS = ['_id', 'nameEdit', 'isMuted', 'isPardoned', 'isMod', 'name', '$currentIp'];

var GameStateInstance = null;

var GameState = exports.GameState = function () {
  function GameState() {
    _classCallCheck(this, GameState);

    if (GameStateInstance) {
      throw new Error('Can only instantiate GameState once!');
    }

    this.players = [];
    this.playerLoad = (0, _diWrapper.constitute)(_player.PlayerLoad);

    this.parties = {};
    this.playerTimeouts = {};

    _logger.Logger.info('GameState', 'Creating world.');
    this.world = (0, _diWrapper.constitute)(_world.World);
  }

  _createClass(GameState, [{
    key: '_hasTimeout',
    value: function _hasTimeout(playerName) {
      return this.playerTimeouts[playerName];
    }
  }, {
    key: '_setTimeout',
    value: function _setTimeout(playerName, timeoutId) {
      if (this.playerTimeouts[playerName]) {
        clearTimeout(this.playerTimeouts[playerName]);
      }
      this.playerTimeouts[playerName] = timeoutId;
    }
  }, {
    key: '_clearTimeout',
    value: function _clearTimeout(playerName) {
      clearTimeout(this.playerTimeouts[playerName]);
      delete this.playerTimeouts[playerName];
    }
  }, {
    key: 'getParty',
    value: function getParty(partyName) {
      return this.parties[partyName];
    }
  }, {
    key: 'reAddPlayersInOrder',
    value: function reAddPlayersInOrder(players) {
      var _players;

      this.players = _lodash2.default.reject(this.players, function (player) {
        return _lodash2.default.includes(_lodash2.default.map(players, 'name'), player.name);
      });
      (_players = this.players).push.apply(_players, _toConsumableArray(_lodash2.default.filter(players, function (player) {
        return player.isPlayer;
      })));
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer(playerName) {
      var _this = this;

      return new Promise(function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
          var player;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!_this.getPlayer(playerName)) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt('return', resolve(false));

                case 2:
                  _context.next = 4;
                  return _this.retrievePlayer(playerName);

                case 4:
                  player = _context.sent;

                  if (!_this.getPlayer(playerName)) {
                    _context.next = 7;
                    break;
                  }

                  return _context.abrupt('return', resolve(false));

                case 7:
                  if (player) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt('return', reject({ msg: _messages.MESSAGES.NO_PLAYER }));

                case 9:

                  player.choices = _lodash2.default.reject(player.choices, function (c) {
                    return c.event === 'Party' || c.event === 'PartyLeave';
                  });

                  _this.players.push(player);
                  resolve(player);

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'delPlayer',
    value: function delPlayer(playerName) {
      var remPlayer = _lodash2.default.find(this.players, { name: playerName });
      if (!remPlayer) return;
      this.players = _lodash2.default.without(this.players, remPlayer);

      remPlayer.isOnline = false;
      remPlayer.choices = _lodash2.default.reject(remPlayer.choices, function (c) {
        return c.event === 'Party' || c.event === 'PartyLeave';
      });

      if (remPlayer.$battle) {
        remPlayer._hp.set(0);
      }

      if (remPlayer.$partyName) {
        remPlayer.party.playerLeave(remPlayer, true);
      }

      remPlayer.save();
    }
  }, {
    key: 'getPlayer',
    value: function getPlayer(playerName) {
      return _lodash2.default.find(this.players, { name: playerName });
    }
  }, {
    key: 'getPlayers',
    value: function getPlayers() {
      return this.players;
    }
  }, {
    key: 'getPlayerNameSimple',
    value: function getPlayerNameSimple(playerName, keys) {
      return this.getPlayerSimple(this.retrievePlayer(playerName), keys);
    }
  }, {
    key: 'getPlayerSimple',
    value: function getPlayerSimple(player) {
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : UPDATE_KEYS;
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!override) {
        keys = keys.concat(EXTRA_KEYS);
        // keys = _.uniq(keys);
      }
      return _lodash2.default.pick(player, keys);
    }
  }, {
    key: 'getPlayersSimple',
    value: function getPlayersSimple(keys, override) {
      var _this2 = this;

      return _lodash2.default.map(this.players, function (p) {
        return _this2.getPlayerSimple(p, keys, override);
      });
    }
  }, {
    key: 'getSomePlayersSimple',
    value: function getSomePlayersSimple(playerNames, keys) {
      var _this3 = this;

      return _lodash2.default.compact(_lodash2.default.map(this.players, function (p) {
        return playerNames[p.name] ? _this3.getPlayerSimple(p, keys) : null;
      }));
    }
  }, {
    key: 'retrievePlayer',
    value: function retrievePlayer(playerName) {
      var playerObject = _lodash2.default.find(this.players, { name: playerName });
      if (playerObject) return playerObject;

      return this.playerLoad.loadPlayer(playerName);
    }
  }], [{
    key: 'getInstance',
    value: function getInstance() {
      if (GameStateInstance) {
        return GameStateInstance;
      }
      GameStateInstance = new GameState();
      return GameStateInstance;
    }
  }]);

  return GameState;
}();