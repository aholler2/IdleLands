'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoldBlessParty = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _adventureLog = require('../../../shared/adventure-log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = -1;

// Gain 10-1000 Gold
var GoldBlessParty = exports.GoldBlessParty = (_temp = _class = function (_Event) {
  _inherits(GoldBlessParty, _Event);

  function GoldBlessParty() {
    _classCallCheck(this, GoldBlessParty);

    return _possibleConstructorReturn(this, (GoldBlessParty.__proto__ || Object.getPrototypeOf(GoldBlessParty)).apply(this, arguments));
  }

  _createClass(GoldBlessParty, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      var goldMod = Math.floor(_event.Event.chance.integer({ min: 10, max: 1000 }));
      var eventText = this.eventText('blessGoldParty', player, { gold: goldMod, partyName: player.party.name });

      this.emitMessage({ affected: player.party.players, eventText: eventText + ' [+' + goldMod + ' gold]', category: _adventureLog.MessageCategories.GOLD });

      _lodash2.default.each(player.party.players, function (member) {
        member.gainGold(goldMod, false);
        if (!member.$statistics) return;
        member.$statistics.batchIncrement(['Character.Events', 'Character.Event.GoldBlessParty']);
      });
    }
  }]);

  return GoldBlessParty;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);