'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socket = exports.description = exports.args = exports.event = undefined;

var _logger = require('../../shared/logger');

var event = exports.event = 'plugin:player:imregisteringrightnowdontkillme';
var args = exports.args = '';
var description = exports.description = 'Send this to the server to not have your socket killed while registering.';
var socket = exports.socket = function socket(_socket) {

  var registering = function registering() {
    _socket._registering = true;
    _logger.Logger.info('Socket:Player:Registering', _socket.address.ip + ' flagged as registering.');
  };

  _socket.on(event, registering);
};