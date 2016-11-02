'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XPBlessParty = exports.WEIGHT = undefined;

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

// Gain 1-3% XP
var XPBlessParty = exports.XPBlessParty = (_temp = _class = function (_Event) {
  _inherits(XPBlessParty, _Event);

  function XPBlessParty() {
    _classCallCheck(this, XPBlessParty);

    return _possibleConstructorReturn(this, (XPBlessParty.__proto__ || Object.getPrototypeOf(XPBlessParty)).apply(this, arguments));
  }

  _createClass(XPBlessParty, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      var percent = _event.Event.chance.floating({ fixed: 5, min: 0.01, max: 0.03 });
      var xpMod = Math.floor(player._xp.maximum * percent);
      var eventText = this.eventText('blessXpParty', player, { xp: xpMod, partyName: player.party.name });

      this.emitMessage({ affected: player.party.players, eventText: eventText + ' [+' + xpMod + ' xp, ~' + (percent * 100).toFixed(2) + '%]', category: _adventureLog.MessageCategories.XP });

      _lodash2.default.each(player.party.players, function (member) {
        member.gainXp(xpMod, false);
        if (!member.$statistics) return;
        member.$statistics.batchIncrement(['Character.Events', 'Character.Event.XPBlessParty']);
      });
    }
  }]);

  return XPBlessParty;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);