'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _settings = require('../../static/settings');

var _assetLoader = require('../../shared/asset-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gidMap = _settings.SETTINGS.gidMap;
var blockers = [16, 17, 3, 33, 37, 38, 39, 44, 45, 46, 47, 50, 53, 54, 55, 56, 57, 81, 83];
// const interactables = [1, 2, 12, 13, 14, 15, 18, 40, 41, 42, 43, 48, 51];

var Map = exports.Map = function () {
  function Map(path) {
    _classCallCheck(this, Map);

    this.map = _lodash2.default.cloneDeep(require('' + path));

    this.tileHeight = this.map.tileheight;
    this.tileWidth = this.map.tilewidth;

    this.height = this.map.height;
    this.width = this.map.width;

    this.name = this.map.properties.name;
    this.path = path.split('assets/maps/world-maps/')[1];

    this.nameTrainers();
    this.loadRegions();
    this.loadCollectibles();
  }

  _createClass(Map, [{
    key: 'loadCollectibles',
    value: function loadCollectibles() {
      var _this = this;

      this.collectibles = {};
      _lodash2.default.each(this.map.layers[2].objects, function (object) {
        if (object.type !== 'Collectible') return;
        _this.collectibles[object.name] = object.properties;
      });
    }
  }, {
    key: 'loadRegions',
    value: function loadRegions() {
      var _this2 = this;

      this.regions = [];

      if (!this.map.layers[3]) return;

      _lodash2.default.each(this.map.layers[3].objects, function (region) {

        var startX = region.x / 16;
        var startY = region.y / 16;
        var width = region.width / 16;
        var height = region.height / 16;

        for (var x = startX; x < startX + width; x++) {
          for (var y = startY; y < startY + height; y++) {
            _this2.regions[y * _this2.width + x] = region.name;
          }
        }
      });
    }
  }, {
    key: 'nameTrainers',
    value: function nameTrainers() {
      var allTrainers = _lodash2.default.filter(this.map.layers[2].objects, function (obj) {
        return obj.type === 'Trainer';
      });
      _lodash2.default.each(allTrainers, function (trainer) {
        var validNames = _lodash2.default.reject(_assetLoader.ObjectAssets.trainer, function (npc) {
          return npc.class && npc.class !== trainer.name;
        });
        trainer.properties = trainer.properties || {};
        trainer.properties.realName = _lodash2.default.sample(validNames).name;
      });
    }

    // layers[0] will always be the terrain
    // layers[1] will always be the blocking tiles
    // layers[2] will always be the interactable stuff
    // layers[3] will always be map regions, where applicable

  }, {
    key: 'getTile',
    value: function getTile(x, y) {
      var tilePosition = y * this.width + x;
      var tileObject = _lodash2.default.find(this.map.layers[2].objects, { x: this.tileWidth * x, y: this.tileHeight * (y + 1) });

      return {
        terrain: gidMap[this.map.layers[0].data[tilePosition]] || 'Void',
        blocked: _lodash2.default.includes(blockers, this.map.layers[1].data[tilePosition]),
        blocker: gidMap[this.map.layers[1].data[tilePosition]],
        region: this.regions[tilePosition] || 'Wilderness',
        object: tileObject,
        path: this.path
      };
    }
  }]);

  return Map;
}();