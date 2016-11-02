'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enchant = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

var _adventureLog = require('../../../shared/adventure-log');

var _statCalculator = require('../../../shared/stat-calculator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = 2;

// Enchant an item (+special stat, +50 to random stat, +1 enchantLevel)
var Enchant = exports.Enchant = (_temp = _class = function (_Event) {
  _inherits(Enchant, _Event);

  function Enchant() {
    _classCallCheck(this, Enchant);

    return _possibleConstructorReturn(this, (Enchant.__proto__ || Object.getPrototypeOf(Enchant)).apply(this, arguments));
  }

  _createClass(Enchant, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      var item = this.pickValidItemForEnchant(player);
      if (!item) return [];

      var eventText = this.eventText('enchant', player, { item: item.fullname });

      item.enchantLevel = item.enchantLevel || 0;
      item.enchantLevel++;

      if (_event.Event.chance.bool({ likelihood: 75 })) {
        var stat = this.pickStat(item);
        var boost = 50;

        eventText = eventText + ' [' + stat + ' ' + item[stat] + ' -> ' + (item[stat] + boost) + ']';

        item[stat] += boost;
      } else {
        var _$sample = _lodash2.default.sample(_statCalculator.SPECIAL_STATS_BASE.concat(_statCalculator.ATTACK_STATS_BASE)),
            enchantMax = _$sample.enchantMax,
            name = _$sample.name;

        item[name] = item[name] || 0;

        eventText = eventText + ' [' + name + ' ' + item[name] + ' -> ' + (item[name] + enchantMax) + ']';

        item[name] += enchantMax;
      }

      this.emitMessage({ affected: [player], eventText: eventText, category: _adventureLog.MessageCategories.ITEM });
      item.score;
      player.recalculateStats();
      player.$updateEquipment = true;

      return [player];
    }
  }]);

  return Enchant;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);