'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindItem = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _equipment = require('../../../core/base/equipment');

var _itemGenerator = require('../../../shared/item-generator');

var _adventureLog = require('../../../shared/adventure-log');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 70;

// Get given the opportunity to change items
var FindItem = exports.FindItem = (_temp = _class = function (_Event) {
  _inherits(FindItem, _Event);

  function FindItem() {
    _classCallCheck(this, FindItem);

    return _possibleConstructorReturn(this, (FindItem.__proto__ || Object.getPrototypeOf(FindItem)).apply(this, arguments));
  }

  _createClass(FindItem, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var forceItem = arguments[2];


      var item = forceItem;

      if (!forceItem) {
        item = _itemGenerator.ItemGenerator.generateItem(null, player.calcLuckBonusFromValue(player.stats.luk));

        var playerItem = player.equipment[item.type];
        var text = playerItem.score > item.score ? 'weak' : 'strong';

        if (!player.canEquip(item)) {
          var _message = '%player came across %item, but it was too ' + text + ' for %himher, so %she sold it for %gold gold.';
          var gold = player.sellItem(item);
          var parsedMessage = this._parseText(_message, player, { gold: gold, item: item.fullname });
          this.emitMessage({ affected: [player], eventText: parsedMessage, category: _adventureLog.MessageCategories.ITEM });
          return;
        }
      }

      var id = _event.Event.chance.guid();
      var message = 'Would you like to equip \xAB' + item.fullname + '\xBB?';
      var eventText = this.eventText('findItem', player, { item: item.fullname });
      var extraData = { item: item, eventText: eventText };

      player.addChoice({ id: id, message: message, extraData: extraData, event: 'FindItem', choices: ['Yes', 'No'] });

      return [player];
    }
  }, {
    key: 'makeChoice',
    value: function makeChoice(player, id, response) {
      if (response !== 'Yes') return;
      var choice = _lodash2.default.find(player.choices, { id: id });
      player.equip(new _equipment.Equipment(choice.extraData.item));
      this.emitMessage({ affected: [player], eventText: choice.extraData.eventText, category: _adventureLog.MessageCategories.ITEM });
    }
  }]);

  return FindItem;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);