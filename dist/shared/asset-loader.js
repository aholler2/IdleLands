'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONParser = exports.ObjectAssets = exports.StringAssets = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// auto-populated
var StringAssets = exports.StringAssets = {};
var ObjectAssets = exports.ObjectAssets = {};

var replaceMultiSpaces = function replaceMultiSpaces(string) {
  return string.replace(/ {2,}/g, ' ');
};

var JSONParser = exports.JSONParser = function () {
  function JSONParser() {
    _classCallCheck(this, JSONParser);
  }

  _createClass(JSONParser, null, [{
    key: '_parseInitialArgs',
    value: function _parseInitialArgs(string) {
      if (!string || _lodash2.default.includes(string, '#')) return [];
      string = replaceMultiSpaces(string);
      var split = string.split('"');
      return [split[1], split[2]];
    }
  }, {
    key: '_parseParameters',
    value: function _parseParameters() {
      var baseObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var parameters = arguments[1];

      var paramData = _lodash2.default.map(parameters.split(' '), function (item) {
        var arr = item.split('=');
        var retVal = {};
        var testVal = +arr[1];

        if (!arr[0]) return {};

        var newVal = 0;
        if (_lodash2.default.isNaN(testVal) && _lodash2.default.isUndefined(arr[1])) {
          newVal = 1;
        } else if (_lodash2.default.includes(['class', 'gender', 'link', 'expiration', 'zone', 'type'], arr[0])) {
          newVal = arr[1];
        } else {
          newVal = testVal;
        }

        retVal[arr[0]] = newVal;
        return retVal;
      });

      return _lodash2.default.reduce(paramData, function (cur, prev) {
        return _lodash2.default.extend({}, cur, prev);
      }, baseObj);
    }
  }, {
    key: 'parseMonsterString',
    value: function parseMonsterString(str) {
      if (!_lodash2.default.includes(str, 'level')) return;

      var _parseInitialArgs2 = this._parseInitialArgs(str),
          _parseInitialArgs3 = _slicedToArray(_parseInitialArgs2, 2),
          name = _parseInitialArgs3[0],
          parameters = _parseInitialArgs3[1];

      if (!parameters) return;
      var monsterData = this._parseParameters({ name: name }, parameters);
      return monsterData;
    }
  }, {
    key: 'parseNPCString',
    value: function parseNPCString(str) {
      var _parseInitialArgs4 = this._parseInitialArgs(str),
          _parseInitialArgs5 = _slicedToArray(_parseInitialArgs4, 2),
          name = _parseInitialArgs5[0],
          parameters = _parseInitialArgs5[1];

      var npcData = this._parseParameters({ name: name }, parameters);
      return npcData;
    }
  }, {
    key: 'parseItemString',
    value: function parseItemString(str, type) {
      var _parseInitialArgs6 = this._parseInitialArgs(str),
          _parseInitialArgs7 = _slicedToArray(_parseInitialArgs6, 2),
          name = _parseInitialArgs7[0],
          parameters = _parseInitialArgs7[1];

      if (!parameters) return;

      var itemData = this._parseParameters({ name: name, type: type }, parameters);
      return itemData;
    }
  }]);

  return JSONParser;
}();

var loadDirectory = function loadDirectory(dir) {
  var results = [];

  var list = _fs2.default.readdirSync(dir);
  _lodash2.default.each(list, function (basefilename) {
    var filename = dir + '/' + basefilename;
    results.push({ filename: filename, type: basefilename.split('.')[0] });
  });

  return results;
};

var parseFile = function parseFile(filename) {
  var baseContents = replaceMultiSpaces(_fs2.default.readFileSync(filename, 'UTF-8')).split('\n');
  return (0, _lodash2.default)(baseContents).compact() /* .reject(line => _.includes(line, '#')) */.value();
};

StringAssets.class = _lodash2.default.map(loadDirectory(__dirname + '/../core/professions'), function (_ref) {
  var filename = _ref.filename;

  if (_lodash2.default.includes(filename, '_all')) return;
  var split = filename.split('/');
  return split[split.length - 1].split('.')[0];
});

_lodash2.default.each(['events', 'strings'], function (folder) {
  _lodash2.default.each(loadDirectory(__dirname + '/../../assets/content/' + folder), function (_ref2) {
    var type = _ref2.type,
        filename = _ref2.filename;

    StringAssets[type] = parseFile(filename);
  });
});

var parseTable = {
  items: JSONParser.parseItemString.bind(JSONParser),
  ingredients: JSONParser.parseItemString.bind(JSONParser),
  monsters: JSONParser.parseMonsterString.bind(JSONParser),
  npcs: JSONParser.parseNPCString.bind(JSONParser)
};

_lodash2.default.each(['items', 'ingredients', 'monsters', 'npcs'], function (folder) {
  _lodash2.default.each(loadDirectory(__dirname + '/../../assets/content/' + folder), function (_ref3) {
    var type = _ref3.type,
        filename = _ref3.filename;

    ObjectAssets[type] = _lodash2.default.compact(_lodash2.default.map(parseFile(filename), function (line) {
      return parseTable[folder](line, type);
    }));
  });
});