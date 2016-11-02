'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveFromDb = exports.persistToDb = undefined;

var _dbWrapper = require('../../shared/db-wrapper');

var _messages = require('../../static/messages');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var persistToDb = exports.persistToDb = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(battleInstance) {
    var saveData, db, battles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            saveData = battleInstance.saveObject();
            _context.next = 3;
            return _dbWrapper.DbWrapper.promise;

          case 3:
            db = _context.sent;
            battles = db.$$collections.battles;
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              battles.findOneAndUpdate({ _id: saveData._id }, saveData, { upsert: true }, function (err) {
                if (!err) {
                  resolve(saveData);
                } else {
                  // process.stdout.write('b');
                  // TOFIX: for now, just dump these. it's failed, typically from high load. Hopefully the next save will work better
                  // MONGOERRORIGNORE
                }
              }, reject);
            }));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function persistToDb(_x) {
    return _ref.apply(this, arguments);
  };
}();

var retrieveFromDb = exports.retrieveFromDb = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(battleName) {
    var db, battles;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _dbWrapper.DbWrapper.promise;

          case 2:
            db = _context3.sent;
            battles = db.$$collections.battles;
            return _context3.abrupt('return', new Promise(function (resolve, reject) {
              battles.find({ _id: battleName }).limit(1).next(function () {
                var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(err, doc) {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!err) {
                            _context2.next = 2;
                            break;
                          }

                          return _context2.abrupt('return', reject({ err: err, msg: _messages.MESSAGES.GENERIC }));

                        case 2:
                          if (doc) {
                            _context2.next = 4;
                            break;
                          }

                          return _context2.abrupt('return', reject({ err: err, msg: _messages.MESSAGES.NO_BATTLE }));

                        case 4:

                          resolve(doc);

                        case 5:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x3, _x4) {
                  return _ref3.apply(this, arguments);
                };
              }());
            }));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function retrieveFromDb(_x2) {
    return _ref2.apply(this, arguments);
  };
}();