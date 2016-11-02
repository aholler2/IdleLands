'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.primus = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _primus = require('primus');

var _primus2 = _interopRequireDefault(_primus);

var _primusEmit = require('primus-emit');

var _primusEmit2 = _interopRequireDefault(_primusEmit);

var _primusRooms = require('primus-rooms');

var _primusRooms2 = _interopRequireDefault(_primusRooms);

var _gameState = require('../core/game-state');

var _logger = require('../shared/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Multiplex from 'primus-multiplex';

var primus = exports.primus = function () {
  if (process.env.NO_START_GAME) return;

  var ip = (0, _lodash2.default)(require('os').networkInterfaces()).values().flatten().filter(function (val) {
    return val.family === 'IPv4' && val.internal === false;
  }).map('address').first();

  if (ip) {
    console.log('Your IP is: ' + ip + (process.env.QUIET ? ' (quiet mode. ssh...)' : ''));
  }

  var express = require('express');
  var compression = require('compression');
  var serve = express();
  serve.use(compression(), express.static('assets'));
  serve.get('/online', function (req, res) {
    try {
      res.set({
        'Cache-Control': 'public, max-age=86400'
      });
      res.json({
        players: _gameState.GameState.getInstance().getPlayers().length,
        sparks: primus.connected
      });
    } catch (e) {
      res.send(e);
    }
  });

  var finalhandler = require('finalhandler');

  // load primus
  var server = require('http').createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    serve(req, res, finalhandler(req, res));
  });

  server.listen(process.env.PORT || 8080);

  var primus = new _primus2.default(server, { iknowhttpsisbetter: true, parser: 'JSON', transformer: 'websockets' });

  // load socket functions
  var normalizedPath = require('path').join(__dirname, '..');

  var getAllSocketFunctions = function getAllSocketFunctions(dir) {
    var results = [];

    var list = _fs2.default.readdirSync(dir);
    _lodash2.default.each(list, function (basefilename) {
      var filename = dir + '/' + basefilename;
      var stat = _fs2.default.statSync(filename);
      if (stat && stat.isDirectory()) results = results.concat(getAllSocketFunctions(filename));else if (_lodash2.default.includes(basefilename, '.socket')) results.push(filename);
    });

    return results;
  };

  var allSocketFunctions = getAllSocketFunctions(normalizedPath);
  var allSocketRequires = _lodash2.default.map(allSocketFunctions, require);

  primus.use('rooms', _primusRooms2.default);
  primus.use('emit', _primusEmit2.default);

  primus.players = {};

  primus.addPlayer = function (playerName, spark) {
    if (!primus.players[playerName]) primus.players[playerName] = [];
    _lodash2.default.each(primus.players[playerName], function (spark) {
      return primus.delPlayer(playerName, spark);
    });
    if (!primus.players[playerName]) primus.players[playerName] = [];
    primus.players[playerName].push(spark);
  };

  primus.delPlayer = function (playerName, spark) {
    primus.players[playerName] = _lodash2.default.without(primus.players[playerName], spark);
    spark.end();
    if (!primus.players[playerName].length) {
      delete primus.players[playerName];
    }
  };

  primus.emitToPlayers = function () {
    var players = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var data = arguments[1];

    _lodash2.default.each(players, function (player) {
      _lodash2.default.each(primus.players[player], function (spark) {
        spark.write(data);
      });
    });
  };

  // primus.use('multiplex', Multiplex);

  // force setting up the global connection
  new (require('../shared/db-wrapper').DbWrapper)().connectionPromise();

  primus.on('connection', function (spark) {
    var respond = function respond(data) {
      spark.write(data);
    };

    _lodash2.default.each(allSocketRequires, function (obj) {
      return obj.socket(spark, primus, function (data) {
        data.event = obj.event;
        respond(data);

        // kill global sparks after 5 seconds
        if (_lodash2.default.includes(obj.event, 'plugin:global')) {
          setTimeout(function () {
            spark.end();
          }, 5000);
        }
      });
    });

    spark.on('error', function (e) {
      _logger.Logger.error('Spark', e);
    });

    setTimeout(function () {
      if (spark.authToken || spark._registering) return;
      spark.end();
    }, 10000);

    // spark.join('adventurelog');
  });

  if (process.env.NODE_ENV !== 'production') {
    _lodash2.default.each(['Play', 'Global'], function (root) {
      var path = require('path').join(__dirname, '..', '..', '..', root);
      _fs2.default.stat(path, function (e) {
        if (e) {
          _logger.Logger.error('Primus:Generate', e);
          return;
        }

        _logger.Logger.info('Primus:Generate', root + ' is installed. Generating a Primus file for it.');
        primus.save(path + '/primus.gen.js');
      });
    });
  }

  return primus;
}();