'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoldForsake = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _event = require('../event');

var _adventureLog = require('../../../shared/adventure-log');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 10;

// Lose 25-2000 Gold
var GoldForsake = exports.GoldForsake = (_temp = _class = function (_Event) {
  _inherits(GoldForsake, _Event);

  function GoldForsake() {
    _classCallCheck(this, GoldForsake);

    return _possibleConstructorReturn(this, (GoldForsake.__proto__ || Object.getPrototypeOf(GoldForsake)).apply(this, arguments));
  }

  _createClass(GoldForsake, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      var baseGold = Math.min(player.gold, Math.floor(_event.Event.chance.integer({ min: 25, max: 2000 })));
      var goldMod = Math.abs(player.gainGold(-baseGold));
      var eventText = this.eventText('forsakeGold', player, { gold: goldMod });

      this.emitMessage({ affected: [player], eventText: eventText + ' [-' + goldMod + ' gold]', category: _adventureLog.MessageCategories.GOLD });

      return [player];
    }
  }]);

  return GoldForsake;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);