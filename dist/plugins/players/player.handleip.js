'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleIp = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gameState = require('../../core/game-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleIp = exports.handleIp = function handleIp(player, fromIp) {
  if (!player.allIps) player.allIps = [];
  if (!_lodash2.default.includes(player.allIps, fromIp)) player.allIps.push(fromIp);
  player.allIps = _lodash2.default.compact(_lodash2.default.uniq(player.allIps));

  player.$currentIp = fromIp;
  if (player.isPardoned) return;

  var playerLoad = _gameState.GameState.getInstance().playerLoad;
  playerLoad.playerDb.getOffenses(fromIp).then(function (offenses) {
    if (!offenses) return;

    player.isMuted = true;
    player._saveSelf();
  });
};