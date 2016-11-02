'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerDb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _dbWrapper = require('../../shared/db-wrapper');

var _messages = require('../../static/messages');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerDb = exports.PlayerDb = (_dec = (0, _constitute.Dependencies)(_dbWrapper.DbWrapper), _dec(_class = function () {
  function PlayerDb(dbWrapper) {
    _classCallCheck(this, PlayerDb);

    this.dbWrapper = dbWrapper;
  }

  _createClass(PlayerDb, [{
    key: 'getPlayer',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(opts) {
        var _this = this;

        var db, players;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.dbWrapper.connectionPromise();

              case 2:
                db = _context2.sent;
                players = db.$$collections.players;
                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  players.find(opts).limit(1).next(function () {
                    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, doc) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (!err) {
                                _context.next = 2;
                                break;
                              }

                              return _context.abrupt('return', reject({ err: err, msg: _messages.MESSAGES.GENERIC }));

                            case 2:
                              if (doc) {
                                _context.next = 4;
                                break;
                              }

                              return _context.abrupt('return', reject({ err: err, msg: _messages.MESSAGES.NO_PLAYER }));

                            case 4:

                              resolve(doc);

                            case 5:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, _this);
                    }));

                    return function (_x2, _x3) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                }));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPlayer(_x) {
        return _ref.apply(this, arguments);
      }

      return getPlayer;
    }()
  }, {
    key: 'getOffenses',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(ip) {
        var _this2 = this;

        var db, players;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.dbWrapper.connectionPromise();

              case 2:
                db = _context4.sent;
                players = db.$$collections.players;
                return _context4.abrupt('return', new Promise(function (resolve, reject) {
                  players.find({ allIps: ip, isMuted: true }).limit(1).next(function () {
                    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(err, doc) {
                      return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (!err) {
                                _context3.next = 2;
                                break;
                              }

                              return _context3.abrupt('return', reject({ err: err, msg: _messages.MESSAGES.GENERIC }));

                            case 2:
                              resolve(doc);

                            case 3:
                            case 'end':
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this2);
                    }));

                    return function (_x5, _x6) {
                      return _ref4.apply(this, arguments);
                    };
                  }());
                }));

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getOffenses(_x4) {
        return _ref3.apply(this, arguments);
      }

      return getOffenses;
    }()
  }, {
    key: 'createPlayer',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(playerObject) {
        var db, players;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.dbWrapper.connectionPromise();

              case 2:
                db = _context5.sent;
                players = db.$$collections.players;
                return _context5.abrupt('return', new Promise(function (resolve, reject) {
                  players.insertOne(playerObject, function (err) {
                    if (!err) {
                      resolve(playerObject);
                    } else {
                      // process.stdout.write('|');
                      // TOFIX: for now, just dump these. it's failed, typically from high load. Hopefully the next save will work better
                      // MONGOERRORIGNORE
                    }
                  }, reject);
                }));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function createPlayer(_x7) {
        return _ref5.apply(this, arguments);
      }

      return createPlayer;
    }()
  }, {
    key: 'savePlayer',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(playerObject) {
        var savePlayerObject, db, players;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                savePlayerObject = playerObject.buildSaveObject();
                _context6.next = 3;
                return this.dbWrapper.connectionPromise();

              case 3:
                db = _context6.sent;
                players = db.$$collections.players;
                return _context6.abrupt('return', new Promise(function (resolve, reject) {
                  players.findOneAndUpdate({ _id: savePlayerObject._id }, savePlayerObject, { upsert: true }, function (err) {
                    if (!err) {
                      resolve(playerObject);
                    } else {
                      // process.stdout.write('-');
                      // TOFIX: for now, just dump these. it's failed, typically from high load. Hopefully the next save will work better
                      // MONGOERRORIGNORE
                    }
                  }, reject);
                }));

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function savePlayer(_x8) {
        return _ref6.apply(this, arguments);
      }

      return savePlayer;
    }()
  }]);

  return PlayerDb;
}()) || _class);