'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetsDb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _dbWrapper = require('../../shared/db-wrapper');

var _messages = require('../../static/messages');

var _logger = require('../../shared/logger');

var _diWrapper = require('../../shared/di-wrapper');

var _pets2 = require('./pets');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PetsDb = exports.PetsDb = (_dec = (0, _constitute.Dependencies)(_dbWrapper.DbWrapper), _dec(_class = function () {
  function PetsDb(DbWrapper) {
    _classCallCheck(this, PetsDb);

    this.dbWrapper = DbWrapper;
  }

  _createClass(PetsDb, [{
    key: 'getPets',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
        var db, pets;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.dbWrapper.connectionPromise();

              case 2:
                db = _context.sent;
                pets = db.$$collections.pets;
                return _context.abrupt('return', new Promise(function (resolve, reject) {
                  pets.find({ _id: id }).limit(1).next(function (err, doc) {

                    if (err) {
                      return reject({ err: err, msg: _messages.MESSAGES.GENERIC });
                    }

                    try {
                      var _pets = (0, _diWrapper.constitute)(_pets2.Pets);
                      _pets.init(doc);
                      resolve(_pets);
                    } catch (e) {
                      _logger.Logger.error('PetsDb:getPets', e);
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

      function getPets(_x) {
        return _ref.apply(this, arguments);
      }

      return getPets;
    }()
  }, {
    key: 'savePets',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(petsObject) {
        var db, pets;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.dbWrapper.connectionPromise();

              case 2:
                db = _context2.sent;
                pets = db.$$collections.pets;
                return _context2.abrupt('return', new Promise(function (resolve) {
                  pets.findOneAndUpdate({ _id: petsObject._id }, { $set: {
                      activePetId: petsObject.activePetId,
                      earnedPetData: petsObject.earnedPetData,
                      earnedPets: petsObject.earnedPets
                    } }, { upsert: true }, function (err) {
                    if (!err) {
                      resolve(pets);
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

      function savePets(_x2) {
        return _ref2.apply(this, arguments);
      }

      return savePets;
    }()
  }]);

  return PetsDb;
}()) || _class);