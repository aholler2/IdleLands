'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Statistics = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../../shared/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Statistics = exports.Statistics = (_dec = (0, _constitute.Dependencies)(_constitute.Container), _dec(_class = function () {
  function Statistics(container) {
    var _this = this;

    _classCallCheck(this, Statistics);

    var StatisticsDb = require('./statistics.db').StatisticsDb;
    try {
      container.schedulePostConstructor(function (statisticsDb) {
        _this.statisticsDb = statisticsDb;
      }, [StatisticsDb]);
    } catch (e) {
      _logger.Logger.error('Statistics', e);
    }
  }

  // clear current variables and set new


  _createClass(Statistics, [{
    key: 'init',
    value: function init(opts) {
      this._id = undefined;
      this.stats = undefined;
      _lodash2.default.extend(this, opts);
    }
  }, {
    key: 'getStat',
    value: function getStat(stat) {
      return _lodash2.default.get(this.stats, stat, 0);
    }
  }, {
    key: '_addStat',
    value: function _addStat(stat) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var val = _lodash2.default.get(this.stats, stat, 0);
      var oldVal = val;
      val += value;
      if (_lodash2.default.isNaN(val)) val = _lodash2.default.isNaN(oldVal) ? 0 : oldVal;
      _lodash2.default.set(this.stats, stat, val);
    }
  }, {
    key: 'countChild',
    value: function countChild(stat) {
      var obj = _lodash2.default.get(this.stats, stat, {});
      return _lodash2.default.sum(_lodash2.default.values(obj)) || 0;
    }
  }, {
    key: 'incrementStat',
    value: function incrementStat(stat) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var doSave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this._addStat(stat, value);
      if (doSave) {
        this.save();
      }
    }
  }, {
    key: 'batchIncrement',
    value: function batchIncrement(stats) {
      var _this2 = this;

      var doSave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _lodash2.default.each(stats, function (stat) {
        return _this2._addStat(stat);
      });
      if (doSave) {
        this.save();
      }
    }
  }, {
    key: 'save',
    value: function save() {
      this.statisticsDb.saveStatistics(this);
    }
  }]);

  return Statistics;
}()) || _class);