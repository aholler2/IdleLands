'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DbWrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodb = require('mongodb');

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var connectionString = process.env.MONGODB_URI;

var mongoTag = 'Mongo:' + (process.send ? 'Worker' : 'Core');

var globalPromise = void 0;

var DbWrapper = exports.DbWrapper = function () {
  function DbWrapper() {
    _classCallCheck(this, DbWrapper);
  }

  _createClass(DbWrapper, [{
    key: 'connectionPromise',
    value: function connectionPromise() {
      var _this = this;

      if (globalPromise) {
        return globalPromise;
      }

      globalPromise = new Promise(function (resolve, reject) {
        _logger.Logger.info(mongoTag, 'Connecting to database...');

        _mongodb.MongoClient.connect(connectionString, {
          native_parser: true,
          server: {
            poolSize: 10, auto_reconnect: true, socketOptions: {
              keepAlive: 1, connectTimeoutMS: 120000, socketTimeoutMS: 120000
            }
          }
        }, function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err, db) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 3;
                      break;
                    }

                    _logger.Logger.error('DB:Init', err);
                    return _context.abrupt('return', reject(err));

                  case 3:

                    db.on('close', function () {
                      try {
                        db.open();
                        _logger.Logger.info('DB:Close', 'Attempted reopen.');
                      } catch (e) {
                        _logger.Logger.error('DB:Close', e);
                      }
                    });

                    db.collection('players').createIndex({ name: 1 }, { unique: true }, _lodash2.default.noop);
                    db.collection('players').createIndex({ userId: 1 }, { unique: true }, _lodash2.default.noop);

                    db.collection('players').updateMany({}, { $set: { isOnline: false } });

                    db.collection('battles').createIndex({ happenedAt: 1 }, { expireAfterSeconds: 21600 }, _lodash2.default.noop);

                    _logger.Logger.info(mongoTag, 'Connected!');

                    db.$$collections = {
                      achievements: db.collection('achievements'),
                      battles: db.collection('battles'),
                      collectibles: db.collection('collectibles'),
                      personalities: db.collection('personalities'),
                      pets: db.collection('pets'),
                      players: db.collection('players'),
                      statistics: db.collection('statistics')
                    };

                    resolve(db);

                  case 11:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      });

      return globalPromise;
    }
  }], [{
    key: 'promise',
    get: function get() {
      return globalPromise;
    }
  }]);

  return DbWrapper;
}();