'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MerchantEnchant = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _adventureLog = require('../../../shared/adventure-log');

var _Enchant = require('./Enchant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = -1;

// Get the opportunity to buy an item
var MerchantEnchant = exports.MerchantEnchant = (_temp = _class = function (_Event) {
  _inherits(MerchantEnchant, _Event);

  function MerchantEnchant() {
    _classCallCheck(this, MerchantEnchant);

    return _possibleConstructorReturn(this, (MerchantEnchant.__proto__ || Object.getPrototypeOf(MerchantEnchant)).apply(this, arguments));
  }

  _createClass(MerchantEnchant, null, [{
    key: 'operateOn',
    value: function operateOn(player) {

      player.$statistics.batchIncrement(['Character.Events', 'Character.Event.MerchantEnchant']);

      var cost = _event.Event.chance.integer({ min: 100000, max: 500000 });
      if (cost > player.gold) {
        player.$statistics.incrementStat('Character.Enchant.TooExpensive');
        var _message = '%player was offered an enchantment by a wandering merchant, but %she doesn\'t have enough gold.';
        var parsedMessage = this._parseText(_message, player, { item: 'an enchantment' });
        this.emitMessage({ affected: [player], eventText: parsedMessage, category: _adventureLog.MessageCategories.GOLD });
        return [player];
      }

      var id = _event.Event.chance.guid();
      var message = 'Would you like to buy an enchantment for ' + cost + ' gold?';
      var eventText = this.eventText('merchant', player, { item: 'an enchantment', shopGold: cost });
      var extraData = { cost: cost, eventText: eventText };

      player.addChoice({ id: id, message: message, extraData: extraData, event: 'MerchantEnchant', choices: ['Yes', 'No'] });

      return [player];
    }
  }, {
    key: 'makeChoice',
    value: function makeChoice(player, id, response) {
      if (response !== 'Yes') return;
      var choice = _lodash2.default.find(player.choices, { id: id });
      if (player.gold < choice.extraData.cost) return false;
      player.gainGold(-choice.extraData.cost, false);
      _Enchant.Enchant.operateOn(player);
      player.$statistics.incrementStat('Character.Gold.Spent', choice.extraData.cost);
      this.emitMessage({ affected: [player], eventText: choice.extraData.eventText, category: _adventureLog.MessageCategories.GOLD });
    }
  }, {
    key: 'feedback',
    value: function feedback(player) {
      _event.Event.feedback(player, 'You do not have enough gold!');
    }
  }]);

  return MerchantEnchant;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);