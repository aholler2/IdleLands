'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pets = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _constitute = require('constitute');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../../shared/logger');

var _equipment = require('../../core/base/equipment');

var _settings = require('../../static/settings');

var _pets = require('../../../assets/maps/content/pets.json');

var _pets2 = _interopRequireDefault(_pets);

var _pet = require('./pet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pets = exports.Pets = (_dec = (0, _constitute.Dependencies)(_constitute.Container), _dec(_class = function () {
  function Pets(container) {
    var _this = this;

    _classCallCheck(this, Pets);

    var PetsDb = require('./pets.db.js').PetsDb;
    try {
      container.schedulePostConstructor(function (petsDb) {
        _this.petsDb = petsDb;
      }, [PetsDb]);
    } catch (e) {
      _logger.Logger.error('Pets', e);
    }
  }

  // clear current variables and set new


  _createClass(Pets, [{
    key: 'init',
    value: function init(opts) {
      this._id = undefined;
      this.earnedPets = [];
      this.earnedPetData = {};
      this.activePetId = '';
      this.$pets = [];
      _lodash2.default.extend(this, opts);
    }
  }, {
    key: '__emptyGear',
    value: function __emptyGear(_ref) {
      var slot = _ref.slot;

      return new _equipment.Equipment({ name: 'nothing', type: slot });
    }
  }, {
    key: '_updateSimplePetInfo',
    value: function _updateSimplePetInfo(petType, key, value) {
      _lodash2.default.find(this.earnedPets, { name: petType })[key] = value;
    }
  }, {
    key: '_syncGear',
    value: function _syncGear(pet) {
      var _this2 = this;

      if (!pet.equipment) pet.equipment = {};

      _lodash2.default.each(pet.$slots, function (value, key) {
        if (!pet.equipment[key]) pet.equipment[key] = [];
        while (pet.equipment[key].length < value) {
          pet.equipment[key].push(_this2.__emptyGear({ slot: key }));
        }

        while (pet.equipment[key].length > value) {
          pet.addToInventory(pet.equipment[key].shift());
        }
      });
    }
  }, {
    key: '_setupPetData',
    value: function _setupPetData(petName, petData, myPetData, player) {
      myPetData.$specialStats = petData.specialStats;
      myPetData.$category = petData.category;
      myPetData.$slots = petData.slots;
      myPetData.$scale = petData.scale;
      myPetData.$scaleCost = petData.scaleCost;
      myPetData.$petId = petName;
      myPetData.$ownerRef = player;
      myPetData.$manager = this;
    }
  }, {
    key: 'addNewPet',
    value: function addNewPet(player, type, name) {
      if (this.earnedPetData[type]) return;
      if (!name || !name.trim() || name.length > 20) return;

      var cost = _pets2.default[type].cost;
      if (player.gold < cost) return;

      player.gainGold(-cost, false);
      player.$statistics.incrementStat('Character.Gold.Spent', cost);

      var pet = new _pet.Pet();
      this._setupPetData(type, _pets2.default[type], pet, player);
      pet.init({
        name: name,
        creator: player.name,
        owner: player.name,
        attr: _lodash2.default.sample(_settings.SETTINGS.validPetAttributes)
      });

      this._syncGear(pet);

      var petInList = _lodash2.default.find(this.earnedPets, { name: type });
      petInList.bought = true;
      petInList.level = 1;
      petInList.profession = 'Monster';
      petInList.petName = name;

      this.activePetId = type;

      this.earnedPetData[type] = pet.buildSaveObject();
      this.$pets.push(pet);

      this.save();
      player.save();

      player._updatePet();
    }
  }, {
    key: 'restorePetData',
    value: function restorePetData(player) {
      var _this3 = this;

      _lodash2.default.each(_pets2.default, function (petData, petName) {
        if (!_this3.earnedPetData[petName]) return;
        var myPetData = _this3.earnedPetData[petName];
        _this3._setupPetData(petName, petData, myPetData, player);
      });

      this.$pets = _lodash2.default.map(_lodash2.default.values(this.earnedPetData), function (d) {
        var pet = new _pet.Pet();
        pet.init(d);
        _this3._syncGear(pet);
        return pet;
      });
    }
  }, {
    key: 'feedGold',
    value: function feedGold(player, amount) {
      amount = Math.round(+amount);
      if (_lodash2.default.isNaN(amount) || amount <= 0 || player.gold < amount) return 'Bad amount of gold specified.';

      var pet = this.activePet;
      var xpGained = pet.$_scale.xpPerGold * amount;

      if (!pet.canGainXp()) return 'Pet cannot gain XP at this time.';

      player.gainGold(-amount, false);
      player.$statistics.incrementStat('Character.Pet.GoldFed', amount);
      pet.gainXp(xpGained);

      player._updatePet();
    }
  }, {
    key: 'changePet',
    value: function changePet(player, newPetType) {
      if (!this.earnedPetData[newPetType]) return;
      this.activePetId = newPetType;
      player.__updatePetActive();
      this.save();
    }
  }, {
    key: 'togglePetSmartSetting',
    value: function togglePetSmartSetting(setting) {
      if (!_lodash2.default.includes(['self', 'sell', 'equip'], setting)) return;
      var pet = this.activePet;
      pet.smart[setting] = !pet.smart[setting];

      this.save();
    }
  }, {
    key: 'changePetProfession',
    value: function changePetProfession(player, newProfession) {
      var allProfessions = player.$statistics.getStat('Character.Professions');
      if (!allProfessions[newProfession] && newProfession !== 'Monster') return;

      this.activePet.changeProfession(newProfession);
      player.__updatePetActive();
      player.__updatePetBasic();
    }
  }, {
    key: 'changePetAttr',
    value: function changePetAttr(player, newAttr) {
      var allAttrs = player.$achievements.petAttributes();
      if (!_lodash2.default.includes(allAttrs, newAttr)) return;

      this.activePet.changeAttr(newAttr);
      player.__updatePetActive();
      player.__updatePetBasic();
    }
  }, {
    key: 'upgradePet',
    value: function upgradePet(player, scaleAttr) {

      var pet = this.activePet;

      if (pet.$scale[scaleAttr].length - 1 === pet.scaleLevel[scaleAttr]) return;

      var cost = pet.$scaleCost[scaleAttr][pet.scaleLevel[scaleAttr]];
      if (player.gold < cost) return;

      player.gainGold(-cost, false);
      player.$statistics.incrementStat('Character.Gold.Spent', cost);
      player.$statistics.incrementStat('Character.Pet.Upgrades');

      pet.scaleLevel[scaleAttr]++;

      pet.doUpgrade(scaleAttr);

      player.__updatePetActive();
    }
  }, {
    key: 'takePetGold',
    value: function takePetGold(player) {
      var pet = this.activePet;
      var gold = pet.gold.getValue();

      player.gainGold(gold, false);
      pet.gainGold(-gold);

      player.$statistics.incrementStat('Character.Pet.GoldTaken', gold);

      player.__updatePetActive();
    }
  }, {
    key: 'checkPetRequirements',
    value: function checkPetRequirements(player, _ref2) {
      var requirements = _ref2.requirements;
      var statistics = requirements.statistics,
          achievements = requirements.achievements,
          collectibles = requirements.collectibles,
          bosses = requirements.bosses;


      var earned = true;

      if (statistics) {
        _lodash2.default.each(statistics, function (value, key) {
          var statVal = player.$statistics.getStat(key);
          if (_lodash2.default.isObject(statVal)) statVal = player.$statistics.countChild(key);

          if (statVal < value) earned = false;
        });
      }

      if (achievements) {
        _lodash2.default.each(achievements, function (_ref3) {
          var name = _ref3.name,
              tier = _ref3.tier;

          if (!player.$achievements.hasAchievementAtTier(name, tier)) earned = false;
        });
      }

      if (collectibles) {
        _lodash2.default.each(collectibles, function (collectible) {
          if (!player.$collectibles.hasCollectible(collectible)) earned = false;
        });
      }

      if (bosses) {
        _lodash2.default.each(bosses, function (boss) {
          if (!player.$statistics.getStat('Character.BossKills.' + boss)) earned = false;
        });
      }

      return earned;
    }
  }, {
    key: 'sellPetItem',
    value: function sellPetItem(player, itemId) {
      var pet = this.activePet;
      if (!this.activePet) return;

      var item = _lodash2.default.find(pet.inventory, { id: itemId });
      if (!item) return;

      pet.sellItem(item);
      pet.removeFromInventory(item);

      player.__updatePetActive();
    }
  }, {
    key: 'unequipPetItem',
    value: function unequipPetItem(player, itemId) {
      var pet = this.activePet;
      if (!this.activePet) return;

      if (pet.inventoryFull()) {
        return 'Pet inventory full.';
      }

      var item = _lodash2.default.find(_lodash2.default.flatten(_lodash2.default.values(pet.equipment)), { id: itemId });
      if (!item) return;

      if (item.isNothing) {
        return 'Cannot unequip nothing.';
      }

      if (item.type === 'soul') {
        return 'Souls are irreplaceable.';
      }

      pet.unequip(item, true);
      pet.addToInventory(item);

      player.__updatePetActive();
    }
  }, {
    key: 'equipPetItem',
    value: function equipPetItem(player, itemId) {
      var pet = this.activePet;
      if (!this.activePet) return;

      var item = _lodash2.default.find(pet.inventory, { id: itemId });
      if (!item) return;

      if (!pet.canManuallyEquip(item)) {
        return 'No place to equip item.';
      }

      if (!pet.canEquip(item)) {
        return 'Item too strong for pet or pet does not have the correct appendages.';
      }

      pet.equip(item, true);
      pet.removeFromInventory(item);

      player.__updatePetActive();
    }
  }, {
    key: 'giveItemToPet',
    value: function giveItemToPet(player, itemId) {
      var pet = this.activePet;
      if (!this.activePet) return;

      if (pet.inventoryFull()) {
        return 'Pet inventory full.';
      }

      var item = _lodash2.default.find(_lodash2.default.values(player.equipment), { id: itemId });
      if (!item) return;

      if (item.type === 'providence') {
        return 'Providences are gifts from the gods, you cannot forsake them like this.';
      }

      if (item.isNothing) {
        return 'Cannot unequip nothing.';
      }

      item._wasEquipped = true;

      player.unequip(item, this.__emptyGear({ slot: item.type }));
      pet.addToInventory(item);

      player._updateEquipment();
      player.__updatePetActive();
    }
  }, {
    key: 'takeItemFromPet',
    value: function takeItemFromPet(player, itemId) {
      var pet = this.activePet;
      if (!this.activePet) return;

      var item = _lodash2.default.find(pet.inventory, { id: itemId });
      if (!item) return;

      if (!player.equipment[item.type].isNothing) {
        return 'Cannot equip over something.';
      }

      if (!player.canEquip(item) && !item._wasEquipped) {
        return 'Item too powerful for you.';
      }

      player.equip(item);
      pet.removeFromInventory(item);

      player._updateEquipment();
      player.__updatePetActive();
    }
  }, {
    key: 'checkPets',
    value: function checkPets(player) {
      var _this4 = this;

      _lodash2.default.each(_pets2.default, function (petData, petName) {
        if (_lodash2.default.find(_this4.earnedPets, { name: petName })) return;
        if (!_this4.checkPetRequirements(player, petData)) return;

        _this4.earnedPets.push({ bought: false, name: petName });
      });
    }
  }, {
    key: 'buildSaveObject',
    value: function buildSaveObject() {
      var _this5 = this;

      _lodash2.default.each(this.$pets, function (pet) {
        _this5.earnedPetData[pet.$petId] = pet.buildSaveObject();
      });
      return _lodash2.default.omitBy(this, function (val, key) {
        return _lodash2.default.startsWith(key, '$');
      });
    }
  }, {
    key: 'buildGlobalObject',
    value: function buildGlobalObject() {
      var ret = {};
      _lodash2.default.each(this.$pets, function (pet) {
        ret[pet.$petId] = pet.buildSaveObject();
      });

      return ret;
    }
  }, {
    key: 'save',
    value: function save() {
      this.petsDb.savePets(this.buildSaveObject());
    }
  }, {
    key: 'activePet',
    get: function get() {
      return _lodash2.default.find(this.$pets, { $petId: this.activePetId });
    }
  }, {
    key: 'petInfo',
    get: function get() {
      return _lodash2.default.reduce(_lodash2.default.keys(_pets2.default), function (prev, cur) {
        prev[cur] = _lodash2.default.pick(_pets2.default[cur], ['cost', 'category', 'description']);
        return prev;
      }, {});
    }
  }]);

  return Pets;
}()) || _class);