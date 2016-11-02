'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Effect = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagecreator = require('../../plugins/events/messagecreator');

var _logger = require('../../shared/logger');

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var Effect = exports.Effect = function () {
  _createClass(Effect, null, [{
    key: 'chance',
    get: function get() {
      return chance;
    }
  }]);

  function Effect(_ref) {
    var target = _ref.target,
        extra = _ref.extra,
        duration = _ref.duration,
        potency = _ref.potency;

    _classCallCheck(this, Effect);

    this.target = target;
    this.extra = extra;
    this.potency = this._potency = potency;
    this.duration = this._duration = duration;

    if (duration <= 0 || !potency) {
      _logger.Logger.error('Effect', new Error('Bad duration or potency given for effect.'), { name: this.constructor.name, duration: duration, potency: potency });
    }
  }

  _createClass(Effect, [{
    key: '_emitMessage',
    value: function _emitMessage(player, message) {
      var extraData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      extraData.casterName = this.origin.name;
      extraData.spellName = this.origin.spell;
      var parsedMessage = _messagecreator.MessageParser.stringFormat(message, player, extraData);
      this.target.$battle._emitMessage(parsedMessage);
    }
  }, {
    key: 'statByPercent',
    value: function statByPercent(player, stat, percent) {
      return Math.round(player.liveStats[stat] * percent / 100);
    }
  }, {
    key: 'dealDamage',
    value: function dealDamage(player, damage, message) {
      var extraData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var source = this.origin.ref;
      damage = player.$battle.dealDamage(player, damage, source);

      if (message) {
        extraData.damage = damage;
        this._emitMessage(player, message, extraData);
      }

      if (player.hp === 0) {
        this.target.$battle.handleDeath(player, source);
      }
      return damage;
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.duration--;
    }
  }, {
    key: 'affect',
    value: function affect() {}
  }, {
    key: 'unaffect',
    value: function unaffect() {
      this._emitMessage(this.target, 'The effect of %casterName\'s %spellName on %player has dissipated.');
    }
  }, {
    key: 'setStat',
    value: function setStat(target, stat, value) {
      this[stat] = value;
      if (target.$dirty) {
        target.$dirty.flags[stat] = true;
      }
    }
  }]);

  return Effect;
}();