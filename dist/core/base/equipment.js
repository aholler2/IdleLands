'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Equipment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var Equipment = exports.Equipment = (_temp = _class = function () {
  function Equipment(opts) {
    _classCallCheck(this, Equipment);

    _lodash2.default.extend(this, Equipment.defaults, opts);
    this.id = chance.guid();
    this.foundAt = Date.now();
    this._baseScore = this.score;
  }

  _createClass(Equipment, [{
    key: 'isNormallyEnchantable',
    get: function get() {
      return this.enchantLevel < 10;
    }
  }, {
    key: 'isUnderNormalPercent',
    get: function get() {
      return this._calcScore / this._baseScore < 3;
    }
  }, {
    key: 'isNothing',
    get: function get() {
      return this.name === 'nothing';
    }
  }, {
    key: 'score',
    get: function get() {
      var _this = this;

      var ret = 0;
      _lodash2.default.each(Equipment.multipliers, function (mult, attr) {
        if (!_this[attr]) return;
        ret += _this[attr] * mult;
      });
      ret = ~~ret;
      this._calcScore = ret;
      return ret;
    }
  }, {
    key: 'fullname',
    get: function get() {
      if (this.enchantLevel > 0) return '+' + this.enchantLevel + ' ' + this.name;
      return '' + this.name;
    }
  }]);

  return Equipment;
}(), _class.defaults = {
  itemClass: 'basic',
  str: 0,
  dex: 0,
  con: 0,
  agi: 0,
  int: 0,
  luk: 0,
  enchantLevel: 0
}, _class.multipliers = {
  str: 1.5,
  dex: 1,
  agi: 1,
  con: 2.5,
  int: 2,
  luk: 5,
  enchantLevel: -125,
  xp: 50,
  hp: 0.5,
  mp: 0.2,
  hpregen: 4,
  mpregen: 2,
  crit: 100,
  prone: 400,
  venom: 500,
  poison: 350,
  shatter: 300,
  vampire: 700,
  damageReduction: 2,
  gold: 0.5,
  sentimentality: 1,
  dance: 100,
  defense: 100,
  offense: 100,
  deadeye: 100,
  lethal: 200,
  silver: 100,
  power: 100,
  vorpal: 500,
  aegis: 100,
  glowing: 300
}, _temp);