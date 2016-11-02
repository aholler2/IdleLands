'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _generator = require('../core/base/generator');

var _equipment = require('../core/base/equipment');

var _assetLoader = require('../shared/asset-loader');

var _chests = require('../../assets/maps/content/chests.json');

var _chests2 = _interopRequireDefault(_chests);

var _treasure = require('../../assets/maps/content/treasure.json');

var _treasure2 = _interopRequireDefault(_treasure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chance = new _chance2.default();

var ItemGenerator = exports.ItemGenerator = function (_Generator) {
  _inherits(ItemGenerator, _Generator);

  function ItemGenerator() {
    _classCallCheck(this, ItemGenerator);

    return _possibleConstructorReturn(this, (ItemGenerator.__proto__ || Object.getPrototypeOf(ItemGenerator)).apply(this, arguments));
  }

  _createClass(ItemGenerator, null, [{
    key: 'newPlayerEquipment',
    value: function newPlayerEquipment() {
      var itemNames = {
        body: ['Tattered Shirt', 'Spray Tan', 'Temporary Tattoos', 'Hero\'s Tunic', 'Grandma\'s Sweater'],
        feet: ['Cardboard Shoes', 'Wheelie Shoes', 'Sandals With Built-in Socks'],
        finger: ['Twisted Wire', 'Candy Ring', 'Hero Academy Graduation Ring'],
        hands: ['Pixelated Gloves', 'Winter Gloves', 'Mittens'],
        head: ['Miniature Top Hat', 'Fruit Hat', 'Beanie', 'Sunglasses'],
        legs: ['Leaf', 'Cargo Shorts', 'Comfy Shorts'],
        neck: ['Old Brooch', 'Candy Necklace', 'Keyboard Cat Tie'],
        mainhand: ['Empty and Broken Ale Bottle', 'Father\'s Sword', 'Butter Knife', 'Hero\'s Axe', 'Chocolate Drumstick', 'Aged Toothbrush'],
        offhand: ['Chunk of Rust', 'Shaking Fist', 'Upside-down Map', 'Sticker Book', 'Stolen Dagger'],
        charm: ['Ancient Bracelet', 'Family Photo', 'Third Place Bowling Trophy', 'Love Letter']
      };

      var r = function r() {
        return chance.integer({ min: -2, max: 3 });
      };

      var equipment = [];

      _lodash2.default.each(_lodash2.default.keys(itemNames), function (key) {
        var item = new _equipment.Equipment({
          type: key,
          itemClass: 'newbie',
          name: _lodash2.default.sample(itemNames[key]),
          str: r(), con: r(), dex: r(), int: r(), agi: r(), luk: r()
        });
        equipment.push(item);
      });

      return equipment;
    }
  }, {
    key: 'getAllTreasure',
    value: function getAllTreasure(chestName) {
      return _lodash2.default.map(_chests2.default[chestName].items, function (itemName) {
        var item = new _equipment.Equipment(_treasure2.default[itemName]);
        item.name = itemName;
        item.itemClass = 'guardian';
        return item;
      });
    }
  }, {
    key: 'getItemClass',
    value: function getItemClass(item) {
      var itemClass = 'basic';
      if (item.name.toLowerCase() !== item.name) itemClass = 'pro';
      if (_lodash2.default.includes(item.name.toLowerCase(), 'idle') || _lodash2.default.includes(item.name.toLowerCase(), 'idling')) itemClass = 'idle';
      if (item.score > 7500) itemClass = 'godly';

      return itemClass;
    }
  }, {
    key: 'generateItem',
    value: function generateItem(type) {
      var bonus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (!type) {
        type = _lodash2.default.sample(this.types);
      }

      var baseItem = _lodash2.default.sample(_assetLoader.ObjectAssets[type]);
      var itemInst = new _equipment.Equipment(baseItem);

      this.addPropertiesToItem(itemInst, bonus);

      itemInst._baseScore = itemInst.score;
      itemInst.type = type;
      itemInst.itemClass = this.getItemClass(itemInst);
      itemInst.score;
      return this.cleanUpItem(itemInst);
    }
  }, {
    key: 'addPropertiesToItem',
    value: function addPropertiesToItem(item) {
      var _this2 = this;

      var bonus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (chance.integer({ min: 0, max: 3 }) === 0) {
        (function () {
          _this2.mergePropInto(item, _lodash2.default.sample(_assetLoader.ObjectAssets.prefix));

          var iter = 1;
          var seti = function seti() {
            return chance.integer({ min: 0, max: Math.pow(15, iter) });
          };
          var i = seti();
          while (i < 1 + bonus) {
            _this2.mergePropInto(item, _lodash2.default.sample(_assetLoader.ObjectAssets.prefix));
            iter++;
            i = seti();
          }
        })();
      }

      if (chance.integer({ min: 0, max: 100 }) === 0) {
        this.mergePropInto(item, _lodash2.default.sample(_assetLoader.ObjectAssets['prefix-special']));
      }

      if (chance.integer({ min: 0, max: 85 }) <= 1 + bonus) {
        this.mergePropInto(item, _lodash2.default.sample(_assetLoader.ObjectAssets.suffix));
      }
    }
  }, {
    key: 'cleanUpItem',
    value: function cleanUpItem(item) {
      _lodash2.default.each(item, function (val, attr) {
        if (_lodash2.default.isNaN(val)) item[attr] = true;
      });
      return item;
    }
  }]);

  return ItemGenerator;
}(_generator.Generator);