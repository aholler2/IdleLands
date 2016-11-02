'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoldBless = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _event = require('../event');

var _adventureLog = require('../../../shared/adventure-log');

var _GoldBlessParty = require('./GoldBlessParty');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 45;

// Gain 10-1000 Gold
var GoldBless = exports.GoldBless = (_temp = _class = function (_Event) {
  _inherits(GoldBless, _Event);

  function GoldBless() {
    _classCallCheck(this, GoldBless);

    return _possibleConstructorReturn(this, (GoldBless.__proto__ || Object.getPrototypeOf(GoldBless)).apply(this, arguments));
  }

  _createClass(GoldBless, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      if (player.party && _event.Event.chance.bool({ likelihood: 70 })) {
        _GoldBlessParty.GoldBlessParty.operateOn(player);
        return player.party.members;
      }

      var baseGold = Math.floor(_event.Event.chance.integer({ min: 10, max: 1000 }));
      var goldMod = player.gainGold(baseGold);
      var eventText = this.eventText('blessGold', player, { gold: goldMod });

      this.emitMessage({ affected: [player], eventText: eventText + ' [+' + goldMod + ' gold]', category: _adventureLog.MessageCategories.GOLD });

      return [player];
    }
  }]);

  return GoldBless;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);