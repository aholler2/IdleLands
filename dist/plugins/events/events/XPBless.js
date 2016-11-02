'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XPBless = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _event = require('../event');

var _adventureLog = require('../../../shared/adventure-log');

var _XPBlessParty = require('./XPBlessParty');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 15;

// Gain 1-3% XP
var XPBless = exports.XPBless = (_temp = _class = function (_Event) {
  _inherits(XPBless, _Event);

  function XPBless() {
    _classCallCheck(this, XPBless);

    return _possibleConstructorReturn(this, (XPBless.__proto__ || Object.getPrototypeOf(XPBless)).apply(this, arguments));
  }

  _createClass(XPBless, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      if (player.party && _event.Event.chance.bool({ likelihood: 70 })) {
        _XPBlessParty.XPBlessParty.operateOn(player);
        return player.party.players;
      }

      var percent = _event.Event.chance.floating({ fixed: 5, min: 0.01, max: 0.03 });
      var baseXp = Math.floor(player._xp.maximum * percent);
      var xpMod = player.gainXp(baseXp);
      var eventText = this.eventText('blessXp', player, { xp: xpMod });

      this.emitMessage({ affected: [player], eventText: eventText + ' [+' + xpMod + ' xp, ~' + (percent * 100).toFixed(2) + '%]', category: _adventureLog.MessageCategories.XP });

      return [player];
    }
  }]);

  return XPBless;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);