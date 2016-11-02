'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLoad = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _player = require('./player');

var _player2 = require('./player.db');

var _statistics = require('../statistics/statistics');

var _statistics2 = require('../statistics/statistics.db');

var _achievements = require('../achievements/achievements');

var _achievements2 = require('../achievements/achievements.db');

var _personalities = require('../personalities/personalities');

var _personalities2 = require('../personalities/personalities.db');

var _collectibles = require('../collectibles/collectibles');

var _collectibles2 = require('../collectibles/collectibles.db');

var _pets = require('../pets/pets');

var _pets2 = require('../pets/pets.db');

var _logger = require('../../shared/logger');

var _diWrapper = require('../../shared/di-wrapper');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerLoad = exports.PlayerLoad = (_dec = (0, _constitute.Dependencies)(_player2.PlayerDb, _statistics2.StatisticsDb, _achievements2.AchievementsDb, _personalities2.PersonalitiesDb, _collectibles2.CollectiblesDb, _pets2.PetsDb), _dec(_class = function () {
  function PlayerLoad(playerDb, statisticsDb, achievementsDb, personalitiesDb, collectiblesDb, petsDb) {
    _classCallCheck(this, PlayerLoad);

    this.playerDb = playerDb;
    this.statisticsDb = statisticsDb;
    this.achievementsDb = achievementsDb;
    this.personalitiesDb = personalitiesDb;
    this.collectiblesDb = collectiblesDb;
    this.petsDb = petsDb;
  }

  _createClass(PlayerLoad, [{
    key: 'loadPets',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(player) {
        var petsObj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (player.petsLink) {
                  _context.next = 9;
                  break;
                }

                petsObj = (0, _diWrapper.constitute)(_pets.Pets);

                petsObj.init({ _id: player.name, activePetId: '', earnedPets: [], earnedPetData: {} });
                _context.next = 5;
                return this.petsDb.savePets(petsObj);

              case 5:
                player.petsLink = player.name;
                player.$pets = petsObj;
                _context.next = 12;
                break;

              case 9:
                _context.next = 11;
                return this.petsDb.getPets(player.name);

              case 11:
                player.$pets = _context.sent;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadPets(_x) {
        return _ref.apply(this, arguments);
      }

      return loadPets;
    }()
  }, {
    key: 'loadStatistics',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(player) {
        var statisticsObj;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (player.statisticsLink) {
                  _context2.next = 9;
                  break;
                }

                statisticsObj = (0, _diWrapper.constitute)(_statistics.Statistics);

                statisticsObj.init({ _id: player.name, stats: {} });
                _context2.next = 5;
                return this.statisticsDb.saveStatistics(statisticsObj);

              case 5:
                player.statisticsLink = player.name;
                player.$statistics = statisticsObj;
                _context2.next = 12;
                break;

              case 9:
                _context2.next = 11;
                return this.statisticsDb.getStatistics(player.name);

              case 11:
                player.$statistics = _context2.sent;

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadStatistics(_x2) {
        return _ref2.apply(this, arguments);
      }

      return loadStatistics;
    }()
  }, {
    key: 'loadAchievements',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(player) {
        var achievementsObj;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (player.achievementsLink) {
                  _context3.next = 9;
                  break;
                }

                achievementsObj = (0, _diWrapper.constitute)(_achievements.Achievements);

                achievementsObj.init({ _id: player.name, achievements: {} });
                _context3.next = 5;
                return this.achievementsDb.saveAchievements(achievementsObj);

              case 5:
                player.achievementsLink = player.name;
                player.$achievements = achievementsObj;
                _context3.next = 12;
                break;

              case 9:
                _context3.next = 11;
                return this.achievementsDb.getAchievements(player.name);

              case 11:
                player.$achievements = _context3.sent;

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadAchievements(_x3) {
        return _ref3.apply(this, arguments);
      }

      return loadAchievements;
    }()
  }, {
    key: 'loadPersonalities',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(player) {
        var personalitiesObj;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (player.personalitiesLink) {
                  _context4.next = 9;
                  break;
                }

                personalitiesObj = (0, _diWrapper.constitute)(_personalities.Personalities);

                personalitiesObj.init({ _id: player.name, activePersonalities: {}, earnedPersonalities: [] });
                _context4.next = 5;
                return this.personalitiesDb.savePersonalities(personalitiesObj);

              case 5:
                player.personalitiesLink = player.name;
                player.$personalities = personalitiesObj;
                _context4.next = 12;
                break;

              case 9:
                _context4.next = 11;
                return this.personalitiesDb.getPersonalities(player.name);

              case 11:
                player.$personalities = _context4.sent;

              case 12:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadPersonalities(_x4) {
        return _ref4.apply(this, arguments);
      }

      return loadPersonalities;
    }()
  }, {
    key: 'loadCollectibles',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(player) {
        var collectiblesObj;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (player.collectiblesLink) {
                  _context5.next = 9;
                  break;
                }

                collectiblesObj = (0, _diWrapper.constitute)(_collectibles.Collectibles);

                collectiblesObj.init({ _id: player.name, collectibles: {} });
                _context5.next = 5;
                return this.collectiblesDb.saveCollectibles(collectiblesObj);

              case 5:
                player.collectiblesLink = player.name;
                player.$collectibles = collectiblesObj;
                _context5.next = 12;
                break;

              case 9:
                _context5.next = 11;
                return this.collectiblesDb.getCollectibles(player.name);

              case 11:
                player.$collectibles = _context5.sent;

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadCollectibles(_x5) {
        return _ref5.apply(this, arguments);
      }

      return loadCollectibles;
    }()
  }, {
    key: 'loadPlayer',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(playerId) {
        var playerObj, player;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.playerDb.getPlayer({ _id: playerId });

              case 2:
                playerObj = _context6.sent;
                _context6.prev = 3;
                player = (0, _diWrapper.constitute)(_player.Player);

                player.init(playerObj);

                _context6.next = 8;
                return Promise.all([this.loadStatistics(player), this.loadAchievements(player), this.loadPersonalities(player), this.loadCollectibles(player), this.loadPets(player)]);

              case 8:

                player.$personalities.checkPersonalities(player);

                player.$pets.restorePetData(player);
                player.$pets.checkPets(player);

                player.isOnline = true;
                player.recalculateStats();

                return _context6.abrupt('return', player);

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6['catch'](3);

                _logger.Logger.error('PlayerLoad:loadPlayer', _context6.t0);
                throw _context6.t0;

              case 20:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 16]]);
      }));

      function loadPlayer(_x6) {
        return _ref6.apply(this, arguments);
      }

      return loadPlayer;
    }()
  }]);

  return PlayerLoad;
}()) || _class);