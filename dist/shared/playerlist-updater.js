'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerUpdateAll = exports.SomePlayersPostMove = exports.AllPlayersPostMove = exports.PlayerLogout = exports.PlayerLogin = exports.AllPlayers = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _server = require('../primus/server');

var _gameState = require('../core/game-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// these functions pertain to one person logging in and out
var AllPlayers = exports.AllPlayers = function AllPlayers(playerName) {
  var allPlayers = _gameState.GameState.getInstance().getPlayersSimple();
  _server.primus.emitToPlayers([playerName], { playerListOperation: 'set', data: allPlayers });
};

var PlayerLogin = exports.PlayerLogin = function PlayerLogin(playerName) {
  var simplePlayerToAdd = _gameState.GameState.getInstance().getPlayerNameSimple(playerName);
  _server.primus.forEach(function (spark, next) {
    if (!spark.authToken || spark.authToken.playerName === playerName) return next();
    spark.write({ playerListOperation: 'add', data: simplePlayerToAdd });
    next();
  }, function () {});
};

var PlayerLogout = exports.PlayerLogout = function PlayerLogout(playerName) {
  _server.primus.forEach(function (spark, next) {
    if (!spark.authToken || spark.authToken.playerName === playerName) return next();
    spark.write({ playerListOperation: 'del', data: playerName });
    next();
  }, function () {});
};

// these are global updater functions
var AllPlayersPostMove = exports.AllPlayersPostMove = function AllPlayersPostMove() {
  var gameState = _gameState.GameState.getInstance();
  var data = gameState.getPlayersSimple(['x', 'y', 'map']);
  _server.primus.forEach(function (spark, next) {
    if (!spark.authToken) return next();
    var player = gameState.getPlayer(spark.authToken.playerName);
    if (!player) return next();
    var filteredData = _lodash2.default.filter(data, function (pt) {
      return pt.map === player.map;
    });
    spark.write({ playerListOperation: 'updateMass', data: filteredData });
    next();
  }, function () {});
};

var SomePlayersPostMove = exports.SomePlayersPostMove = function SomePlayersPostMove(updatedPlayers) {
  if (process.env.IGNORE_OTHER_PLAYER_MOVES) return;
  var gameState = _gameState.GameState.getInstance();
  var data = gameState.getSomePlayersSimple(updatedPlayers, ['x', 'y', 'map']);

  var groupedByMap = _lodash2.default.groupBy(data, 'map');

  _server.primus.forEach(function (spark, next) {
    if (!spark.authToken) return next();
    var player = gameState.getPlayer(spark.authToken.playerName);
    if (!player) return next();
    var filteredData = groupedByMap[player.map];
    if (!filteredData || !filteredData.length) return next();
    spark.write({ playerListOperation: 'updateMass', data: filteredData });
    next();
  }, function () {});
};

var PlayerUpdateAll = exports.PlayerUpdateAll = function PlayerUpdateAll(playerId, keys) {
  var data = _gameState.GameState.getInstance().getPlayerNameSimple(playerId, keys);
  _server.primus.forEach(function (spark, next) {
    spark.write({ playerListOperation: 'update', data: data });
    next();
  }, function () {});
};