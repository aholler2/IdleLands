'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DataUpdater = exports.DataUpdater = function DataUpdater(playerName, type, data) {
  // Would initialise server with testing if imported on top.
  var primus = require('../primus/server').primus;

  primus.emitToPlayers([playerName], { data: data, update: type });
};