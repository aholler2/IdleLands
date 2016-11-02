'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _assetLoader = require('../../shared/asset-loader');

var _messagecreator = require('../../plugins/events/messagecreator');

var _server = require('../../primus/server');

var _emitter = require('../../plugins/players/_emitter');

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var Event = exports.Event = (_temp = _class = function () {
  function Event() {
    _classCallCheck(this, Event);
  }

  _createClass(Event, null, [{
    key: 'operateOn',
    value: function operateOn() {}
  }, {
    key: 'makeChoice',
    value: function makeChoice() {}
  }, {
    key: '_parseText',
    value: function _parseText(message, player, extra) {
      return _messagecreator.MessageParser.stringFormat(message, player, extra);
    }
  }, {
    key: 'eventText',
    value: function eventText(eventType, player, extra) {
      return this._parseText(_lodash2.default.sample(_assetLoader.StringAssets[eventType]), player, extra);
    }
  }, {
    key: 'pickValidItem',
    value: function pickValidItem(player) {
      var validTargets = _lodash2.default.reject(player.equipment, function (item) {
        return item.isNothing || item.type === 'providence';
      });
      return _lodash2.default.sample(validTargets);
    }
  }, {
    key: 'pickValidItemForEnchant',
    value: function pickValidItemForEnchant(player) {
      var validTargets = _lodash2.default.filter(player.equipment, function (item) {
        return !item.isNothing && item.type !== 'providence' && item.isNormallyEnchantable;
      });
      return _lodash2.default.sample(validTargets);
    }
  }, {
    key: 'pickValidItemForBless',
    value: function pickValidItemForBless(player) {
      var validTargets = _lodash2.default.filter(player.equipment, function (item) {
        return !item.isNothing && item.type !== 'providence' && item.isUnderNormalPercent;
      });
      return _lodash2.default.sample(validTargets);
    }
  }, {
    key: 'pickStat',
    value: function pickStat() {
      return _lodash2.default.sample(['str', 'con', 'dex', 'agi', 'int', 'luk']);
    }
  }, {
    key: 'emitMessage',
    value: function emitMessage(_ref) {
      var affected = _ref.affected,
          eventText = _ref.eventText,
          category = _ref.category,
          extraData = _ref.extraData;

      _emitter.emitter.emit('player:event', { affected: affected, eventText: eventText, category: category, extraData: extraData });
    }
  }, {
    key: 'feedback',
    value: function feedback(player, message) {
      _server.primus.forEach(function (spark, next) {
        if (!spark.authToken || spark.authToken.playerName !== player.name) return next();
        spark.write({ type: 'error', title: '', notify: message });
        next();
      }, function () {});
    }
  }, {
    key: 'chance',
    get: function get() {
      return chance;
    }
  }]);

  return Event;
}(), _class.t0stats = ['dex', 'agi'], _class.t1stats = ['str', 'int', 'con'], _class.t2stats = ['luk'], _temp);