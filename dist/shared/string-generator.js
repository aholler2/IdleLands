'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _assetLoader = require('./asset-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringGenerator = exports.StringGenerator = function () {
  function StringGenerator() {
    _classCallCheck(this, StringGenerator);
  }

  _createClass(StringGenerator, null, [{
    key: '_stringFromGrammar',
    value: function _stringFromGrammar(grammar) {
      if (!grammar) return '';
      return _lodash2.default.map(grammar.split(' '), function (piece) {
        if (!_lodash2.default.includes(piece, '%')) return piece;
        return _lodash2.default.sample(_assetLoader.StringAssets[piece.split('%')[1]]);
      }).join(' ');
    }
  }, {
    key: 'providence',
    value: function providence() {
      var grammar = _lodash2.default.sample(_assetLoader.StringAssets.providenceGrammar);
      return this._stringFromGrammar(grammar);
    }
  }, {
    key: 'battle',
    value: function battle() {
      var grammar = _lodash2.default.sample(_assetLoader.StringAssets.battleGrammar);
      return this._stringFromGrammar(grammar);
    }
  }, {
    key: 'party',
    value: function party() {
      var grammar = _lodash2.default.sample(_assetLoader.StringAssets.partyGrammar);
      return this._stringFromGrammar(grammar);
    }
  }]);

  return StringGenerator;
}();