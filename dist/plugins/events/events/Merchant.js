'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Merchant = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _equipment = require('../../../core/base/equipment');

var _itemGenerator = require('../../../shared/item-generator');

var _adventureLog = require('../../../shared/adventure-log');

var _settings = require('../../../static/settings');

var _MerchantEnchant = require('./MerchantEnchant');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 15;

// Get the opportunity to buy an item
var Merchant = exports.Merchant = (_temp = _class = function (_Event) {
  _inherits(Merchant, _Event);

  function Merchant() {
    _classCallCheck(this, Merchant);

    return _possibleConstructorReturn(this, (Merchant.__proto__ || Object.getPrototypeOf(Merchant)).apply(this, arguments));
  }

  _createClass(Merchant, null, [{
    key: 'operateOn',
    value: function operateOn(player, opts) {
      var _ref = opts || {},
          merchantBonus = _ref.merchantBonus;

      merchantBonus = +merchantBonus;
      if (_lodash2.default.isNaN(merchantBonus)) merchantBonus = _event.Event.chance.integer({ min: -3, max: 15 });

      if (_event.Event.chance.bool({ likelihood: Math.max(0, Math.min(100, merchantBonus / 10)) })) {
        _MerchantEnchant.MerchantEnchant.operateOn(player);
        return [player];
      }

      var item = _itemGenerator.ItemGenerator.generateItem(null, player.calcLuckBonusFromValue(player.stats.luk + player.liveStats.merchantItemGeneratorBonus + merchantBonus));
      if (!player.canEquip(item)) {
        var playerItem = player.equipment[item.type];
        var text = playerItem.score > item.score ? 'weak' : 'strong';

        player.$statistics.incrementStat('Character.Item.Discard');
        var _message = '%player was offered %item by a wandering merchant, but it was too ' + text + ' for %himher.';
        var parsedMessage = this._parseText(_message, player, { item: item.fullname });
        this.emitMessage({ affected: [player], eventText: parsedMessage, category: _adventureLog.MessageCategories.GOLD });
        return [player];
      }

      var sellScore = item.score * _settings.SETTINGS.merchantMultiplier;
      var cost = sellScore - sellScore * player.liveStats.merchantCostReductionMultiplier;
      if (cost > player.gold) {
        player.$statistics.incrementStat('Character.Item.TooExpensive');
        var _message2 = '%player was offered %item by a wandering merchant, but %she doesn\'t have enough gold.';
        var _parsedMessage = this._parseText(_message2, player, { item: item.fullname });
        this.emitMessage({ affected: [player], eventText: _parsedMessage, category: _adventureLog.MessageCategories.GOLD });
        return [player];
      }

      var id = _event.Event.chance.guid();
      var message = 'Would you like to buy \xAB' + item.fullname + '\xBB for ' + cost + ' gold?';
      var eventText = this.eventText('merchant', player, { item: item.fullname, shopGold: cost });
      var extraData = { item: item, cost: cost, eventText: eventText };

      player.addChoice({ id: id, message: message, extraData: extraData, event: 'Merchant', choices: ['Yes', 'No'] });

      return [player];
    }
  }, {
    key: 'makeChoice',
    value: function makeChoice(player, id, response) {
      if (response !== 'Yes') return;
      var choice = _lodash2.default.find(player.choices, { id: id });
      if (player.gold < choice.extraData.cost) return false;
      player.equip(new _equipment.Equipment(choice.extraData.item));
      player.gainGold(-choice.extraData.cost, false);
      player.$statistics.incrementStat('Character.Gold.Spent', choice.extraData.cost);
      this.emitMessage({ affected: [player], eventText: choice.extraData.eventText, category: _adventureLog.MessageCategories.GOLD });
    }
  }, {
    key: 'feedback',
    value: function feedback(player) {
      _event.Event.feedback(player, 'You do not have enough gold!');
    }
  }]);

  return Merchant;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);