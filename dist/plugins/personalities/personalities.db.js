'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalitiesDb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _dbWrapper = require('../../shared/db-wrapper');

var _messages = require('../../static/messages');

var _logger = require('../../shared/logger');

var _diWrapper = require('../../shared/di-wrapper');

var _personalities2 = require('./personalities');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PersonalitiesDb = exports.PersonalitiesDb = (_dec = (0, _constitute.Dependencies)(_dbWrapper.DbWrapper), _dec(_class = function () {
  function PersonalitiesDb(DbWrapper) {
    _classCallCheck(this, PersonalitiesDb);

    this.dbWrapper = DbWrapper;
  }

  _createClass(PersonalitiesDb, [{
    key: 'getPersonalities',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
        var db, personalities;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.dbWrapper.connectionPromise();

              case 2:
                db = _context.sent;
                personalities = db.$$collections.personalities;
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  personalities.find({ _id: id }).limit(1).next(function (err, doc) {

                    if (err) {
                      return reject({ err: err, msg: _messages.MESSAGES.GENERIC });
                    }

                    try {
                      var _personalities = (0, _diWrapper.constitute)(_personalities2.Personalities);
                      _personalities.init(doc);
                      resolve(_personalities);
                    } catch (e) {
                      _logger.Logger.error('PersonalitiesDb:getPersonalities', e);
                      reject({ e: e, msg: _messages.MESSAGES.GENERIC });
                    }
                  });
                }));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPersonalities(_x) {
        return _ref.apply(this, arguments);
      }

      return getPersonalities;
    }()
  }, {
    key: 'savePersonalities',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(personalitiesObject) {
        var db, personalities;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.dbWrapper.connectionPromise();

              case 2:
                db = _context2.sent;
                personalities = db.$$collections.personalities;
                return _context2.abrupt('return', new Promise(function (resolve) {
                  personalities.findOneAndUpdate({ _id: personalitiesObject._id }, { $set: {
                      activePersonalities: personalitiesObject.activePersonalities,
                      earnedPersonalities: personalitiesObject.earnedPersonalities
                    } }, { upsert: true }, function (err) {
                    if (!err) {
                      resolve(personalities);
                    } else {
                      // process.stdout.write('p');
                      // TOFIX: for now, just dump these. it's failed, typically from high load. Hopefully the next save will work better
                      // MONGOERRORIGNORE
                    }
                  });
                }));

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function savePersonalities(_x2) {
        return _ref2.apply(this, arguments);
      }

      return savePersonalities;
    }()
  }]);

  return PersonalitiesDb;
}()) || _class);