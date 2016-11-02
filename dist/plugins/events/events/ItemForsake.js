'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemForsake = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _event = require('../event');

var _adventureLog = require('../../../shared/adventure-log');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 25;

// Forsake an item (random stat -5%)
var ItemForsake = exports.ItemForsake = (_temp = _class = function (_Event) {
  _inherits(ItemForsake, _Event);

  function ItemForsake() {
    _classCallCheck(this, ItemForsake);

    return _possibleConstructorReturn(this, (ItemForsake.__proto__ || Object.getPrototypeOf(ItemForsake)).apply(this, arguments));
  }

  _createClass(ItemForsake, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      var item = this.pickValidItem(player);
      if (!item) return;

      var stat = this.pickStat(item);
      if (!stat) return;

      var boost = item[stat] === 0 ? 5 : Math.max(3, Math.abs(Math.floor(item[stat] / 20)));

      var eventText = this.eventText('forsakeItem', player, { item: item.fullname });

      this.emitMessage({ affected: [player], eventText: eventText + ' [' + stat + ' ' + item[stat] + ' -> ' + (item[stat] - boost) + ']', category: _adventureLog.MessageCategories.ITEM });
      item[stat] -= boost;
      item.score;
      player.recalculateStats();
      player.$updateEquipment = true;

      return [player];
    }
  }]);

  return ItemForsake;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);