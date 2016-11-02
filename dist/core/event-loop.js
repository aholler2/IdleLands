'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../shared/logger');

var _gameState = require('./game-state');

var _settings = require('../static/settings');

var _playerlistUpdater = require('../shared/playerlist-updater');

require('./emitter-watchers');

require('../shared/asset-loader');

require('../plugins/events/eventhandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_logger.Logger.info('Core', 'Starting emitters.');


_logger.Logger.info('Core', 'Loading assets.');


_logger.Logger.info('Core', 'Loading events.');


_logger.Logger.info('Core', 'Creating game state.');
_gameState.GameState.getInstance();

_logger.Logger.info('Core', 'Starting event loop.');

var timerDelay = _settings.SETTINGS.timeframeSeconds * (process.env.NODE_ENV === 'production' ? 200 : 1);

var flagNextTurn = function flagNextTurn(player) {
  player.$nextTurn = Date.now() + (process.env.NODE_ENV === 'production' ? 1000 : 10) * _settings.SETTINGS.timeframeSeconds;
};

var canTakeTurn = function canTakeTurn(now, player) {
  return player.$nextTurn - now <= 0;
};

var playerInterval = function playerInterval() {
  var gameState = _gameState.GameState.getInstance();
  var players = gameState.getPlayers();

  var now = Date.now();

  var ranPlayerNames = {};

  var playerTakeTurn = function playerTakeTurn(player) {
    if (!player.$nextTurn) flagNextTurn(player);
    if (!canTakeTurn(now, player)) return;

    ranPlayerNames[player.name] = true;
    flagNextTurn(player);

    player.takeTurn();
    // PlayerUpdateAll(player.name, ['x', 'y', 'map']);
  };

  _lodash2.default.each(players, playerTakeTurn);

  (0, _playerlistUpdater.SomePlayersPostMove)(ranPlayerNames);
};

setInterval(playerInterval, timerDelay);

if (global.gc) {
  _logger.Logger.info('Core', 'Running GC every 30 seconds.');
  setInterval(global.gc, 30000);
}