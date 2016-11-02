'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedAlly = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _sandwichGenerator = require('../../../shared/sandwich-generator');

var _Sandwich = require('../effects/Sandwich');

var _Cookie = require('../effects/Cookie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeedAlly = exports.FeedAlly = (_temp = _class = function (_Spell) {
  _inherits(FeedAlly, _Spell);

  function FeedAlly() {
    _classCallCheck(this, FeedAlly);

    return _possibleConstructorReturn(this, (FeedAlly.__proto__ || Object.getPrototypeOf(FeedAlly)).apply(this, arguments));
  }

  _createClass(FeedAlly, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.randomAlly;
    }
  }, {
    key: 'calcDamage',
    value: function calcDamage() {
      var min = this.caster.liveStats.dex / 5;
      var max = this.caster.liveStats.dex;
      return -this.minMax(min, max) * this.spellPower;
    }
  }, {
    key: 'calcPotency',
    value: function calcPotency() {
      return 10;
    }
  }, {
    key: 'calcDuration',
    value: function calcDuration() {
      return this.spellPower + 3;
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this2 = this;

      var targets = this.determineTargets();

      _lodash2.default.each(targets, function (target) {
        var damage = _this2.calcDamage();

        var sandwich = _sandwichGenerator.SandwichGenerator.generateSandwich(target);

        var message = '%player served %targetName a %item, healing %healed hp!';

        _get(FeedAlly.prototype.__proto__ || Object.getPrototypeOf(FeedAlly.prototype), 'cast', _this2).call(_this2, {
          damage: damage,
          message: message,
          messageData: { item: sandwich.name },
          applyEffect: _Sandwich.Sandwich,
          applyEffectExtra: sandwich,
          applyEffectName: sandwich.name,
          targets: [target]
        });

        if (target === _this2.caster) return;

        var sandwichRating = _spell.Spell.chance.integer({ min: 1, max: 7 });
        if (sandwichRating < 5) {
          _get(FeedAlly.prototype.__proto__ || Object.getPrototypeOf(FeedAlly.prototype), 'cast', _this2).call(_this2, {
            damage: 0,
            message: '%targetName rated the sandwich poorly, and %player eats the cookie instead!',
            targets: [target]
          });
          _get(FeedAlly.prototype.__proto__ || Object.getPrototypeOf(FeedAlly.prototype), 'cast', _this2).call(_this2, {
            damage: 0,
            applyEffect: _Cookie.Cookie,
            applyEffectName: 'cookie',
            targets: [_this2.caster]
          });
        } else {
          _get(FeedAlly.prototype.__proto__ || Object.getPrototypeOf(FeedAlly.prototype), 'cast', _this2).call(_this2, {
            damage: 0,
            message: '%targetName rated the sandwich at at least a 5/7, and gets a free cookie!',
            applyEffect: _Cookie.Cookie,
            applyEffectName: 'cookie',
            targets: [target]
          });
        }
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast() {
      return this.$canTarget.yes();
    }
  }]);

  return FeedAlly;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'feed ally', spellPower: 1, weight: 30, cost: 50, level: 20, profession: 'SandwichArtist' }, { name: 'stuff ally', spellPower: 2, weight: 30, cost: 500, level: 50, profession: 'SandwichArtist' }], _temp);