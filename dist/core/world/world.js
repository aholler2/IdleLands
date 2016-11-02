'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.World = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _map = require('./map');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _boss = require('../../../assets/maps/content/boss.json');

var _boss2 = _interopRequireDefault(_boss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = exports.World = function () {
  function World() {
    _classCallCheck(this, World);

    this.maps = {};
    this.uniqueRegions = [];

    this.loadAllMaps();
    this.loadAllCollectibles();
  }

  _createClass(World, [{
    key: 'getMapsInFolder',
    value: function getMapsInFolder(dir) {
      var _this = this;

      var results = [];

      var list = _fs2.default.readdirSync(__dirname + '/../../../' + dir);
      _lodash2.default.each(list, function (basefilename) {
        var filename = dir + '/' + basefilename;
        var stat = _fs2.default.statSync(__dirname + '/../../../' + filename);
        if (stat && stat.isDirectory()) results = results.concat(_this.getMapsInFolder(filename));else results.push({ map: basefilename.split('.')[0], path: __dirname + '/../../../' + filename });
      });

      return results;
    }
  }, {
    key: 'loadAllMaps',
    value: function loadAllMaps() {
      var _this2 = this;

      _lodash2.default.each(this.getMapsInFolder('assets/maps/world-maps'), function (_ref) {
        var _uniqueRegions;

        var map = _ref.map,
            path = _ref.path;

        var mapRef = new _map.Map(path);
        _this2.maps[map] = mapRef;

        (_uniqueRegions = _this2.uniqueRegions).push.apply(_uniqueRegions, _toConsumableArray(_lodash2.default.uniq(_lodash2.default.compact(mapRef.regions))));
      });
    }
  }, {
    key: 'loadAllCollectibles',
    value: function loadAllCollectibles() {
      var _this3 = this;

      this.allCollectibles = {};

      _lodash2.default.each(_lodash2.default.values(_boss2.default), function (boss) {
        if (!boss.collectibles) return;
        _lodash2.default.each(boss.collectibles, function (coll) {
          coll.rarity = 'guardian';
          _this3.allCollectibles[coll.name] = coll;
        });
      });

      _lodash2.default.each(_lodash2.default.values(this.maps), function (map) {
        _lodash2.default.extend(_this3.allCollectibles, map.collectibles);
      });
    }
  }]);

  return World;
}();