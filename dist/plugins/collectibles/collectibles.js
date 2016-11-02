'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collectibles = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../../shared/logger');

var _gameState = require('../../core/game-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collectibles = exports.Collectibles = (_dec = (0, _constitute.Dependencies)(_constitute.Container), _dec(_class = function () {
  function Collectibles(container) {
    var _this = this;

    _classCallCheck(this, Collectibles);

    var CollectiblesDb = require('./collectibles.db').CollectiblesDb;
    try {
      container.schedulePostConstructor(function (collectiblesDb) {
        _this.collectiblesDb = collectiblesDb;
      }, [CollectiblesDb]);
    } catch (e) {
      _logger.Logger.error('Collectibles', e);
    }
  }

  // clear current variables and set new


  _createClass(Collectibles, [{
    key: 'init',
    value: function init(opts) {
      this._id = undefined;
      this.collectibles = undefined;
      var allCollectibles = _gameState.GameState.getInstance().world.allCollectibles;

      // update collectibles on login
      _lodash2.default.each(_lodash2.default.values(opts.collectibles), function (coll) {
        if (!allCollectibles[coll.name]) return;
        coll.rarity = allCollectibles[coll.name].rarity || 'basic';
        coll.description = allCollectibles[coll.name].flavorText;
        coll.storyline = allCollectibles[coll.name].storyline;
      });

      _lodash2.default.extend(this, opts);
    }
  }, {
    key: 'totalCollectibles',
    value: function totalCollectibles() {
      return _lodash2.default.size(this.collectibles);
    }
  }, {
    key: 'addCollectible',
    value: function addCollectible(collectible) {
      this.collectibles[collectible.name] = collectible;
      this.save();
    }
  }, {
    key: 'hasCollectible',
    value: function hasCollectible(collectibleName) {
      return this.collectibles[collectibleName];
    }
  }, {
    key: 'save',
    value: function save() {
      this.collectiblesDb.saveCollectibles(this);
    }
  }]);

  return Collectibles;
}()) || _class);