'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _adventureLog = require('../shared/adventure-log');

var _gameState = require('./game-state');

var _emitter = require('../plugins/players/_emitter');

var _player = require('../plugins/players/player.migration');

var _player2 = require('../plugins/players/player.handleip');

var _playerlistUpdater = require('../shared/playerlist-updater');

var _messagecreator = require('../plugins/events/messagecreator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_emitter.emitter.on('player:semilogin', function (_ref) {
  var playerName = _ref.playerName,
      fromIp = _ref.fromIp;

  var player = _gameState.GameState.getInstance().getPlayer(playerName);
  (0, _player2.handleIp)(player, fromIp);
  player.quickLogin();
  player.update();
  (0, _playerlistUpdater.AllPlayers)(playerName);
});

_emitter.emitter.on('player:login', function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref3) {
    var playerName = _ref3.playerName,
        fromIp = _ref3.fromIp;
    var player;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _gameState.GameState.getInstance().addPlayer(playerName);

          case 2:
            player = _context.sent;

            if (player) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            (0, _player.migrate)(player);
            (0, _player2.handleIp)(player, fromIp);
            player.update();
            player.$statistics.incrementStat('Game.Logins');
            (0, _playerlistUpdater.AllPlayers)(playerName);
            (0, _playerlistUpdater.PlayerLogin)(playerName);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());

_emitter.emitter.on('player:register', function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref5) {
    var playerName = _ref5.playerName,
        fromIp = _ref5.fromIp;
    var player;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _gameState.GameState.getInstance().addPlayer(playerName);

          case 2:
            player = _context2.sent;

            if (player) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return');

          case 5:
            (0, _player2.handleIp)(player, fromIp);
            player.update();
            player.$statistics.incrementStat('Game.Logins');
            player.$statistics.incrementStat('Character.Professions.' + player.professionName);
            (0, _playerlistUpdater.AllPlayers)(playerName);
            (0, _playerlistUpdater.PlayerLogin)(playerName);
            (0, _adventureLog.AdventureLog)({
              text: _messagecreator.MessageParser.stringFormat('Welcome %player to Idliathlia!', player),
              type: _adventureLog.MessageTypes.GLOBAL,
              category: _adventureLog.MessageCategories.META
            });

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
}());

_emitter.emitter.on('player:logout', function (_ref6) {
  var playerName = _ref6.playerName;

  (0, _playerlistUpdater.PlayerLogout)(playerName);
  _gameState.GameState.getInstance().delPlayer(playerName);
});

_emitter.emitter.on('player:levelup', function (_ref7) {
  var player = _ref7.player;

  (0, _playerlistUpdater.PlayerUpdateAll)(player.name, ['level']);
  (0, _adventureLog.AdventureLog)({
    text: _messagecreator.MessageParser.stringFormat('%player has reached experience level ' + player.level + '!', player),
    type: _adventureLog.MessageTypes.SINGLE,
    category: _adventureLog.MessageCategories.LEVELUP,
    targets: [player.name],
    targetsDisplay: [player.fullname]
  });
});

_emitter.emitter.on('player:changegender', function (_ref8) {
  var player = _ref8.player;

  (0, _playerlistUpdater.PlayerUpdateAll)(player.name, ['gender']);
  player.update();
});

_emitter.emitter.on('player:changetitle', function (_ref9) {
  var player = _ref9.player;

  (0, _playerlistUpdater.PlayerUpdateAll)(player.name, ['title']);
  player.update();
});

_emitter.emitter.on('player:changename', function (_ref10) {
  var player = _ref10.player;

  (0, _playerlistUpdater.PlayerUpdateAll)(player.name, ['name', 'nameEdit']);
  player.update();
});

_emitter.emitter.on('player:achieve', function (_ref11) {
  var player = _ref11.player,
      achievements = _ref11.achievements;

  player.recalculateStats();

  player.$updateAchievements = true;

  _lodash2.default.each(achievements, function (achievement) {
    (0, _adventureLog.AdventureLog)({
      text: _messagecreator.MessageParser.stringFormat('%player has achieved ' + achievement.name + (achievement.tier > 1 ? ' tier ' + achievement.tier : '') + '!', player),
      type: _adventureLog.MessageTypes.SINGLE,
      category: _adventureLog.MessageCategories.ACHIEVEMENT,
      targets: [player.name],
      targetsDisplay: [player.fullname]
    });
  });
});

_emitter.emitter.on('player:collectible', function (_ref12) {
  var player = _ref12.player,
      collectible = _ref12.collectible;

  var extraData = {
    collectible: collectible.name
  };

  player.$updateCollectibles = true;

  (0, _adventureLog.AdventureLog)({
    text: _messagecreator.MessageParser.stringFormat('%player stumbled across a rare, shiny, and collectible %collectible in ' + player.map + ' - ' + player.mapRegion + '!', player, extraData),
    type: _adventureLog.MessageTypes.SINGLE,
    category: _adventureLog.MessageCategories.EXPLORE,
    targets: [player.name],
    targetsDisplay: [player.fullname]
  });
});

_emitter.emitter.on('player:changeclass', function (_ref13) {
  var player = _ref13.player,
      choice = _ref13.choice;

  player.$statistics.incrementStat('Character.Professions.' + choice.extraData.professionName);
  (0, _playerlistUpdater.PlayerUpdateAll)(player.name, ['professionName']);
  (0, _adventureLog.AdventureLog)({
    text: _messagecreator.MessageParser.stringFormat('%player has met with ' + choice.extraData.trainerName + ' and became a ' + choice.extraData.professionName + '!', player),
    type: _adventureLog.MessageTypes.SINGLE,
    category: _adventureLog.MessageCategories.PROFESSION,
    targets: [player.name],
    targetsDisplay: [player.fullname]
  });
});

_emitter.emitter.on('player:transfer', function (_ref14) {
  var player = _ref14.player,
      dest = _ref14.dest;

  (0, _playerlistUpdater.PlayerUpdateAll)(player.name, ['name', 'map']);

  var message = '';
  switch (dest.movementType) {
    case 'ascend':
      message = '%player has ascended to ' + dest.destName + '.';break;
    case 'descend':
      message = '%player has descended to ' + dest.destName + '.';break;
    case 'fall':
      message = '%player has fallen to ' + dest.destName + ' from ' + dest.fromName + '.';break;
    case 'teleport':
      message = '%player has been teleported to ' + dest.destName + ' from ' + dest.fromName + '.';break;
  }

  if (dest.customMessage) {
    message = dest.customMessage.split('%playerName').join(player.fullname).split('%destName').join(dest.destName);
  }

  (0, _adventureLog.AdventureLog)({
    text: _messagecreator.MessageParser.stringFormat(message, player),
    type: _adventureLog.MessageTypes.SINGLE,
    category: _adventureLog.MessageCategories.EXPLORE,
    targets: [player.name],
    targetsDisplay: [player.fullname],
    map: player.map,
    x: player.x,
    y: player.y
  });
});

_emitter.emitter.on('player:event', function (_ref15) {
  var affected = _ref15.affected,
      category = _ref15.category,
      eventText = _ref15.eventText,
      extraData = _ref15.extraData;

  (0, _adventureLog.AdventureLog)({
    text: eventText,
    extraData: extraData,
    type: _adventureLog.MessageTypes.SINGLE,
    category: category,
    targets: _lodash2.default.map(affected, 'name'),
    targetsDisplay: _lodash2.default.map(affected, 'fullname')
  });
});