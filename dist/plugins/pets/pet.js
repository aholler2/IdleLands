'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _restrictedNumber = require('restricted-number');

var _restrictedNumber2 = _interopRequireDefault(_restrictedNumber);

var _character = require('../../core/base/character');

var _equipment = require('../../core/base/equipment');

var _settings = require('../../static/settings');

var _itemGenerator = require('../../shared/item-generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pet = exports.Pet = function (_Character) {
  _inherits(Pet, _Character);

  function Pet() {
    _classCallCheck(this, Pet);

    return _possibleConstructorReturn(this, (Pet.__proto__ || Object.getPrototypeOf(Pet)).apply(this, arguments));
  }

  _createClass(Pet, [{
    key: 'init',
    value: function init(opts) {
      var _this2 = this;

      opts.gender = opts.gender || _lodash2.default.sample(_settings.SETTINGS.validGenders);
      opts.professionName = opts.professionName || 'Monster';

      _get(Pet.prototype.__proto__ || Object.getPrototypeOf(Pet.prototype), 'init', this).call(this, opts);

      this.createdAt = this.createdAt || Date.now();
      this.inventory = this.inventory || [];

      if (!this.scaleLevel) this.scaleLevel = {
        maxLevel: 0,
        maxItemScore: 0,
        inventory: 0,
        goldStorage: 0,
        battleJoinPercent: 0,
        itemFindTimeDuration: 0,
        itemSellMultiplier: 0,
        itemFindBonus: 0,
        itemFindRangeMultiplier: 0,
        xpPerGold: 0
      };

      this.$_scale = new Proxy({}, {
        get: function get(target, name) {
          var scale = _this2.$scale[name];
          return scale[Math.min(_this2.scaleLevel[name], scale.length - 1)];
        }
      });

      if (!this.smart) this.smart = { self: false, sell: true, equip: true };
      if (!this.gold) this.gold = { minimum: 0, maximum: this.$_scale.goldStorage, __current: 0 };

      this.gold.__proto__ = _restrictedNumber2.default.prototype;

      _lodash2.default.each(this.inventory, function (item) {
        return item.__proto__ = _equipment.Equipment.prototype;
      });

      this._level.maximum = this.$_scale.maxLevel;

      this.updateSoul();
    }
  }, {
    key: 'changeProfession',
    value: function changeProfession(professionName) {
      _get(Pet.prototype.__proto__ || Object.getPrototypeOf(Pet.prototype), 'changeProfession', this).call(this, professionName);
      this.$manager._updateSimplePetInfo(this.$petId, 'profession', professionName);
    }
  }, {
    key: 'changeAttr',
    value: function changeAttr(newAttr) {
      this.attr = newAttr;
    }
  }, {
    key: 'updateSoul',
    value: function updateSoul() {
      var base = _lodash2.default.cloneDeep(this.$specialStats);
      base.name = 'Pet Soul';
      base.type = 'soul';

      base.itemFindRangeMultiplier = this.$_scale.itemFindRangeMultiplier;
      base.itemValueMultiplier = this.$_scale.itemSellMultiplier;
      base.itemFindRange = this.$_scale.maxItemScore;

      var item = new _equipment.Equipment(base);
      this.equipment.soul = [item];
    }
  }, {
    key: 'levelUp',
    value: function levelUp() {
      if (this.level === this._level.maximum) return;
      _get(Pet.prototype.__proto__ || Object.getPrototypeOf(Pet.prototype), 'levelUp', this).call(this);
      this.$manager._updateSimplePetInfo(this.$petId, 'level', this.level);
    }
  }, {
    key: '_setNextItemFind',
    value: function _setNextItemFind() {
      if (!this.$_scale.itemFindTimeDuration) return;
      this.nextItemFind = new Date(Date.now() + this.$_scale.itemFindTimeDuration * 1000);
      this.$manager.save();
    }
  }, {
    key: 'updatePlayer',
    value: function updatePlayer() {
      this.$updatePlayer = true;
    }
  }, {
    key: 'inventoryFull',
    value: function inventoryFull() {
      return this.inventory.length === this.$_scale.inventory;
    }
  }, {
    key: 'findItem',
    value: function findItem() {
      var item = _itemGenerator.ItemGenerator.generateItem(null, this.$_scale.itemFindBonus);

      if (!this.canEquipScore(item)) {
        this.sellItem(item);
        return;
      }

      if (this.smart.equip && this.canEquip(item)) {
        var oldItem = this.shouldEquip(item);
        if (oldItem) {
          this.unequip(oldItem);
          this.equip(item);
          this.recalculateStats();
          this.updatePlayer();
          return;
        }
      }

      // full inventory
      if (this.inventoryFull()) {
        var sellItem = item;

        // try smart sell first
        if (this.smart.sell) {
          var compareItem = _lodash2.default.minBy(this.inventory, '_calcScore');

          // something in inventory is worse than the current sell item
          if (compareItem.score < sellItem.score) {
            sellItem = compareItem;
            this.addToInventory(item);
            this.removeFromInventory(sellItem);
          }
        }

        this.sellItem(sellItem);
      } else {

        this.addToInventory(item);
      }

      this.updatePlayer();
    }
  }, {
    key: 'removeFromInventory',
    value: function removeFromInventory(removeItem) {
      this.inventory = _lodash2.default.reject(this.inventory, function (item) {
        return item === removeItem;
      });
      this.save();
    }
  }, {
    key: 'takeTurn',
    value: function takeTurn() {
      if (!this.nextItemFind) this._setNextItemFind();

      var now = Date.now();

      if (this.nextItemFind - now <= 0) {
        this.findItem();
        this._setNextItemFind();
      }
    }
  }, {
    key: 'canManuallyEquip',
    value: function canManuallyEquip(item) {
      return _lodash2.default.find(this.equipment[item.type], { name: 'nothing' });
    }
  }, {
    key: 'canEquipScore',
    value: function canEquipScore(item) {
      return item.score < this.liveStats.itemFindRange;
    }
  }, {
    key: 'canEquip',
    value: function canEquip(item) {
      return this.$slots[item.type] && this.canEquipScore(item);
    }
  }, {
    key: 'shouldEquip',
    value: function shouldEquip(item) {
      var compareItem = _lodash2.default.minBy(this.equipment[item.type], '_calcScore');
      return item.score > compareItem.score ? compareItem : false;
    }
  }, {
    key: 'unequip',
    value: function unequip(item) {
      var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.equipment[item.type] = _lodash2.default.reject(this.equipment[item.type], function (checkItem) {
        return checkItem === item;
      });
      if (replace) {
        this.equipment[item.type].push(this.$manager.__emptyGear({ slot: item.type }));
      }

      this.recalculateStats();
    }
  }, {
    key: 'equip',
    value: function equip(item) {
      var removeANothing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.equipment[item.type].push(item);

      if (removeANothing) {
        var nothing = _lodash2.default.find(this.equipment[item.type], { name: 'nothing' });
        if (nothing) {
          this.unequip(nothing);
        }
      }

      this.recalculateStats();
    }
  }, {
    key: 'addToInventory',
    value: function addToInventory(item) {
      this.inventory.push(item);
      this.inventory = _lodash2.default.reverse(_lodash2.default.sortBy(this.inventory, 'score'));
      this.save();
    }
  }, {
    key: 'canGainXp',
    value: function canGainXp() {
      return this.level < this.$ownerRef.level;
    }
  }, {
    key: 'gainXp',
    value: function gainXp(xp) {
      if (_lodash2.default.isNaN(xp) || !this.canGainXp()) return 0;
      _get(Pet.prototype.__proto__ || Object.getPrototypeOf(Pet.prototype), 'gainXp', this).call(this, xp);

      if (this._xp.atMaximum()) this.levelUp();
      return xp;
    }
  }, {
    key: 'gainGold',
    value: function gainGold(gold) {
      if (_lodash2.default.isNaN(gold)) return 0;
      this.gold.add(gold);

      this.checkSelfSmartUpgrades();
      return gold;
    }
  }, {
    key: 'checkSelfSmartUpgrades',
    value: function checkSelfSmartUpgrades() {
      var _this3 = this;

      if (!this.smart.self) return;

      _lodash2.default.each(_lodash2.default.keys(this.scaleLevel), function (attr) {
        if (_this3.scaleLevel[attr] === _this3.$scale[attr].length - 1) return;
        var cost = _this3.$scaleCost[attr][_this3.scaleLevel[attr] + 1];
        if (cost > _this3.gold.getValue()) return;

        _this3.gold.sub(cost);
        _this3.scaleLevel[attr]++;
        _this3.doUpgrade(attr);
      });
    }
  }, {
    key: 'doUpgrade',
    value: function doUpgrade(attr) {
      switch (attr) {
        case 'goldStorage':
          return this.gold.maximum = this.$_scale.goldStorage;
        case 'maxLevel':
          return this._level.maximum = this.$_scale.maxLevel;
        case 'itemFindTimeDuration':
          return this._setNextItemFind();
        case 'itemFindRangeMultiplier':
          return this.updateSoul();
        case 'itemSellMultiplier':
          return this.updateSoul();
        case 'maxItemScore':
          return this.updateSoul();
      }
    }
  }, {
    key: 'buildTransmitObject',
    value: function buildTransmitObject() {
      var base = _lodash2.default.omitBy(this, function (val, key) {
        return _lodash2.default.startsWith(key, '$');
      });
      base.$petId = this.$petId;
      base.$scale = this.$scale;
      base.$scaleCost = this.$scaleCost;
      base.$slots = this.$slots;
      base.ownerEdit = this.$ownerRef.nameEdit;
      return base;
    }
  }, {
    key: 'buildSaveObject',
    value: function buildSaveObject() {
      return _lodash2.default.omitBy(this, function (val, key) {
        return _lodash2.default.startsWith(key, '$');
      });
    }
  }, {
    key: 'save',
    value: function save() {
      this.$manager.save();
    }
  }, {
    key: 'fullname',
    get: function get() {
      return this.name + ', the ' + this.$petId + ' with ' + this.attr;
    }
  }]);

  return Pet;
}(_character.Character);