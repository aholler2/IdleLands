'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _dec, _class;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constitute = require('constitute');

var _character = require('../../core/base/character');

var _gameState = require('../../core/game-state');

var _settings = require('../../static/settings');

var _logger = require('../../shared/logger');

var _player = require('./player.db');

var _player2 = require('./player.movement');

var _itemGenerator = require('../../shared/item-generator');

var _dataUpdater = require('../../shared/data-updater');

var _eventhandler = require('../events/eventhandler');

var _all = require('../events/events/_all');

var Events = _interopRequireWildcard(_all);

var _all2 = require('../achievements/achievements/_all');

var Achievements = _interopRequireWildcard(_all2);

var _player3 = require('./player.dirtychecker');

var _emitter = require('./_emitter');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = exports.Player = (_dec = (0, _constitute.Dependencies)(_player.PlayerDb), _dec(_class = function (_Character) {
  _inherits(Player, _Character);

  function Player(playerDb) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

    _this.$playerDb = playerDb;
    _this.$playerMovement = _player2.PlayerMovement;
    _this.$itemGenerator = _itemGenerator.ItemGenerator;
    _this.$dataUpdater = _dataUpdater.DataUpdater;
    return _this;
  }

  _createClass(Player, [{
    key: 'init',
    value: function init(opts) {
      this.$dirty = new _player3.DirtyChecker();

      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'init', this).call(this, opts);

      if (!this.joinDate) this.joinDate = Date.now();
      if (!this.mapRegion) this.mapRegion = 'Wilderness';
      if (!this.gold) this.gold = 0;
      if (!this.map) this.map = 'Norkos';
      if (!this.x) this.x = 10;
      if (!this.y) this.y = 10;

      if (!this.choices) this.choices = [];
      if (_lodash2.default.size(this.equipment) < 10) this.generateBaseEquipment();

      this.$updateAchievements = true;
      this.$updateCollectibles = true;

      this.$partyName = null;

      if (this.isMod) {
        this.emitGMData();
      }
    }
  }, {
    key: 'quickLogin',
    value: function quickLogin() {
      this.$updateAchievements = true;
      this.$updateCollectibles = true;

      if (this.isMod) {
        this.emitGMData();
      }
    }
  }, {
    key: 'emitGMData',
    value: function emitGMData() {
      var maps = _lodash2.default.keys(_gameState.GameState.getInstance().world.maps);
      var teleNames = _lodash2.default.map(_settings.SETTINGS.allTeleports, 'name');
      var permAchs = (0, _lodash2.default)(Achievements).values().filter(function (ach) {
        return ach.permanentProp;
      }).map(function (ach) {
        return { property: ach.permanentProp, name: ach.name };
      }).value();
      var allEvents = (0, _lodash2.default)(Events).keys().reject(function (key) {
        return Events[key].WEIGHT <= 0;
      }).value();
      this.$dataUpdater(this.name, 'gmdata', { maps: maps, teleNames: teleNames, permAchs: permAchs, allEvents: allEvents });
    }
  }, {
    key: 'generateBaseEquipment',
    value: function generateBaseEquipment() {
      var _this2 = this;

      var items = this.$itemGenerator.newPlayerEquipment();
      _lodash2.default.each(items, function (item) {
        return _this2.equip(item);
      });
    }
  }, {
    key: 'takeTurn',
    value: function takeTurn() {

      var activePet = this.$pets.activePet;

      if (activePet) {
        activePet.takeTurn();
        if (activePet.$updatePlayer) {
          this.__updatePetActive();
        }
      }

      if (this.$personalities.isActive('Camping')) {
        this.$statistics.incrementStat('Character.Movement.Camping');
        this.save();
        return;
      }

      this.attemptToDisbandSoloParty();

      try {
        this.moveAction();
        _eventhandler.EventHandler.tryToDoEvent(this);
      } catch (e) {
        _logger.Logger.error('Player', e);
      }

      if (this.$partyName) {
        this.party.playerTakeStep(this);
      }

      this.save();
    }
  }, {
    key: 'attemptToDisbandSoloParty',
    value: function attemptToDisbandSoloParty() {
      if (!this.$partyName) return;

      var party = this.party;
      if (party.players.length > 1) return;

      party.disband(this, false);
    }
  }, {
    key: 'levelUp',
    value: function levelUp() {
      if (this.level === this._level.maximum) return;
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'levelUp', this).call(this);
      this._saveSelf();
      _emitter.emitter.emit('player:levelup', { player: this });
    }
  }, {
    key: 'gainGold',
    value: function gainGold() {
      var gold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var calc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      var isPositive = false;
      if (gold > 0) isPositive = true;

      gold = calc ? this.liveStats.gold(gold) : gold;
      if (_lodash2.default.isNaN(gold) || isPositive && gold < 0) gold = 0;
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'gainGold', this).call(this, gold);

      if (gold > 0) {
        this.$statistics.incrementStat('Character.Gold.Gain', gold);
      } else {
        this.$statistics.incrementStat('Character.Gold.Lose', -gold);
      }

      return gold;
    }
  }, {
    key: 'gainXp',
    value: function gainXp() {
      var xp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var calc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


      var isPositive = false;
      if (xp > 0) isPositive = true;

      xp = calc ? this.liveStats.xp(xp) : xp;
      if (_lodash2.default.isNaN(xp) || isPositive && xp < 0) xp = 0;
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'gainXp', this).call(this, xp);

      if (xp > 0) {
        this.$statistics.incrementStat('Character.XP.Gain', xp);
      } else {
        this.$statistics.incrementStat('Character.XP.Lose', -xp);
      }

      if (this._xp.atMaximum()) this.levelUp();

      return xp;
    }
  }, {
    key: 'addChoice',
    value: function addChoice(messageData) {
      this.choices.push(messageData);

      if (this.choices.length > _settings.SETTINGS.maxChoices) {
        if (this.$personalities.isAnyActive(['Affirmer', 'Denier', 'Indecisive'])) {
          var choice = this.choices[0];
          if (_lodash2.default.includes(choice.choices, 'Yes') && this.$personalities.isActive('Affirmer')) {
            this.handleChoice({ id: choice.id, response: 'Yes' });
          } else if (_lodash2.default.includes(choice.choices, 'No') && this.$personalities.isActive('Denier')) {
            this.handleChoice({ id: choice.id, response: 'No' });
          } else if (this.$personalities.isActive('Indecisive')) {
            this.handleChoice({ id: choice.id, response: _lodash2.default.sample(choice.choices) });
          }
        } else {
          this.choices.shift();
          this.$statistics.incrementStat('Character.Choice.Ignore');
        }
      }

      this.$statistics.incrementStat('Character.Choices');
    }
  }, {
    key: 'handleChoice',
    value: function handleChoice(_ref) {
      var id = _ref.id,
          response = _ref.response;

      var choice = _lodash2.default.find(this.choices, { id: id });
      if (!choice) return;
      var result = Events[choice.event].makeChoice(this, id, response);
      if (result === false) return Events[choice.event].feedback(this);
      this.$statistics.batchIncrement(['Character.Choice.Chosen', 'Character.Choice.Choose.' + response]);
      this.removeChoice(id);
      this.update();
    }
  }, {
    key: 'removeChoice',
    value: function removeChoice(id) {
      this.choices = _lodash2.default.reject(this.choices, { id: id });
    }
  }, {
    key: 'changeGender',
    value: function changeGender(newGender) {
      if (!_lodash2.default.includes(_settings.SETTINGS.validGenders, newGender)) return;
      this.gender = newGender;
      _emitter.emitter.emit('player:changegender', { player: this });
    }
  }, {
    key: 'changeTitle',
    value: function changeTitle(newTitle) {
      if (newTitle && !_lodash2.default.includes(this.$achievements.titles(), newTitle)) return;
      this.title = newTitle;
      _emitter.emitter.emit('player:changetitle', { player: this });
    }
  }, {
    key: 'changeName',
    value: function changeName(newName) {
      if (!newName) return;
      this.nameEdit = newName;
      _emitter.emitter.emit('player:changename', { player: this });
    }
  }, {
    key: 'togglePersonality',
    value: function togglePersonality(personality) {
      if (!_lodash2.default.find(this.$personalities.earnedPersonalities, { name: personality })) return;
      this.$personalities.togglePersonality(this, personality);
      this._updatePersonalities();
    }
  }, {
    key: 'moveAction',
    value: function moveAction() {
      var weight = this.$playerMovement.getInitialWeight(this);

      var _$playerMovement$pick = this.$playerMovement.pickRandomTile(this, weight),
          _$playerMovement$pick2 = _slicedToArray(_$playerMovement$pick, 3),
          index = _$playerMovement$pick2[0],
          newLoc = _$playerMovement$pick2[1],
          dir = _$playerMovement$pick2[2];

      var tile = this.$playerMovement.getTileAt(this.map, newLoc.x, newLoc.y);

      var attempts = 1;
      while (!this.$playerMovement.canEnterTile(this, tile)) {
        if (attempts > 8) {
          // Logger.error('Player', `Player ${this.name} is position locked at ${this.x}, ${this.y} in ${this.map}`);
          break;
        }
        weight[index] = 0;

        var _$playerMovement$pick3 = this.$playerMovement.pickRandomTile(this, weight);

        var _$playerMovement$pick4 = _slicedToArray(_$playerMovement$pick3, 3);

        index = _$playerMovement$pick4[0];
        newLoc = _$playerMovement$pick4[1];
        dir = _$playerMovement$pick4[2];

        tile = this.$playerMovement.getTileAt(this.map, newLoc.x, newLoc.y);
        attempts++;
      }

      this.lastDir = dir === 5 ? null : dir;
      this.x = newLoc.x;
      this.y = newLoc.y;

      var mapInstance = _gameState.GameState.getInstance().world.maps[this.map];

      if (!mapInstance || this.x <= 0 || this.y <= 0 || this.y > mapInstance.height || this.x > mapInstance.width) {
        this.map = 'Norkos';
        this.x = 10;
        this.y = 10;
      }

      this.oldRegion = this.mapRegion;
      this.mapRegion = tile.region;

      this.mapPath = tile.path;

      this.$playerMovement.handleTile(this, tile);

      this.stepCooldown--;

      var incrementStats = ['Character.Steps', 'Character.Maps.' + this.map, 'Character.Terrains.' + tile.terrain, 'Character.Regions.' + tile.region];

      if (this.$personalities.isActive('Drunk')) {
        incrementStats.push('Character.Movement.Drunk');
      }

      if (this.$personalities.isActive('Solo') && !this.party) {
        incrementStats.push('Character.Movement.Solo');
      }

      this.$statistics.batchIncrement(incrementStats);

      this.gainXp(_settings.SETTINGS.xpPerStep);
    }
  }, {
    key: 'equip',
    value: function equip(item) {
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'equip', this).call(this, item);
      this._saveSelf();
    }
  }, {
    key: 'unequip',
    value: function unequip(item, replaceWith) {
      this.equipment[item.type] = replaceWith;
      this.recalculateStats();
      this._saveSelf();
    }
  }, {
    key: 'recalculateStats',
    value: function recalculateStats() {
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'recalculateStats', this).call(this);
      this.$dirty.reset();
    }
  }, {
    key: 'buildSaveObject',
    value: function buildSaveObject() {
      return _lodash2.default.omitBy(this, function (val, key) {
        return _lodash2.default.startsWith(key, '$');
      });
    }
  }, {
    key: 'buildTransmitObject',
    value: function buildTransmitObject() {
      var badKeys = ['equipment', 'isOnline', 'stepCooldown', 'userId', 'lastDir', 'allIps'];
      return _lodash2.default.omitBy(this, function (val, key) {
        return _lodash2.default.startsWith(key, '$') || _lodash2.default.includes(key, 'Link') || _lodash2.default.includes(key, 'Steps') || _lodash2.default.includes(badKeys, key);
      });
    }
  }, {
    key: '_saveSelf',
    value: function _saveSelf() {
      this.$playerDb.savePlayer(this);
    }
  }, {
    key: 'save',
    value: function save() {
      this.checkAchievements();

      if (!this.saveSteps) this.saveSteps = _settings.SETTINGS.saveSteps;
      this.saveSteps--;

      if (this.saveSteps <= 0) {
        this._saveSelf();
        this.$statistics.save();
        this.$pets.save();
        this.saveSteps = _settings.SETTINGS.saveSteps;
      }
      this.update();
    }
  }, {
    key: 'checkAchievements',
    value: function checkAchievements() {
      if (!this.achievementSteps) this.achievementSteps = _settings.SETTINGS.achievementSteps;
      this.achievementSteps--;

      if (this.achievementSteps <= 0) {
        this.$pets.checkPets(this);
        var newAchievements = this.$achievements.checkAchievements(this);
        if (newAchievements.length > 0) {
          _emitter.emitter.emit('player:achieve', { player: this, achievements: newAchievements });
          this.$personalities.checkPersonalities(this);
        }

        this.achievementSteps = _settings.SETTINGS.achievementSteps;
      }
    }
  }, {
    key: '_updatePlayer',
    value: function _updatePlayer() {
      this.$dataUpdater(this.name, 'player', this.buildTransmitObject());
    }
  }, {
    key: '_updateParty',
    value: function _updateParty() {
      var transmitObject = this.party ? this.party.buildTransmitObject() : {};
      if (this.$lastPartyObject && _lodash2.default.isEqual(transmitObject, this.$lastPartyObject)) return;
      this.$lastPartyObject = transmitObject;

      this.$dataUpdater(this.name, 'party', transmitObject);
    }
  }, {
    key: '_updateEquipment',
    value: function _updateEquipment() {
      this.$dataUpdater(this.name, 'equipment', this.equipment);
    }
  }, {
    key: '_updateStatistics',
    value: function _updateStatistics() {
      this.$dataUpdater(this.name, 'statistics', this.$statistics.stats);
    }
  }, {
    key: '_updateAchievements',
    value: function _updateAchievements() {
      this.$dataUpdater(this.name, 'achievements', this.$achievements.achievements);
    }
  }, {
    key: '_updateCollectibles',
    value: function _updateCollectibles() {
      this.$dataUpdater(this.name, 'collectibles', this.$collectibles.collectibles);
    }
  }, {
    key: '_updatePersonalities',
    value: function _updatePersonalities() {
      this.$dataUpdater(this.name, 'personalities', { earned: this.$personalities.earnedPersonalities, active: this.$personalities.activePersonalities });
    }
  }, {
    key: '_updatePet',
    value: function _updatePet() {
      this.__updatePetBuyData();
      this.__updatePetBasic();
      this.__updatePetActive();
    }
  }, {
    key: '__updatePetBasic',
    value: function __updatePetBasic() {
      this.$dataUpdater(this.name, 'petbasic', this.$pets.earnedPets);
    }
  }, {
    key: '__updatePetBuyData',
    value: function __updatePetBuyData() {
      this.$dataUpdater(this.name, 'petbuy', this.$pets.petInfo);
    }
  }, {
    key: '__updatePetActive',
    value: function __updatePetActive() {
      if (!this.$pets.activePet) return;
      this.$dataUpdater(this.name, 'petactive', this.$pets.activePet.buildTransmitObject());
    }
  }, {
    key: 'update',
    value: function update() {
      this._updatePlayer();
      this._updateParty();

      if (this.$updateEquipment) {
        this._updateEquipment();
      }
      // this._updateStatistics();
      /* if(this.$updateAchievements) {
        this._updateAchievements();
        this.$updateAchievements = false;
      } */
      /* if(this.$updateCollectibles) {
        this._updateCollectibles();
        this.$updateCollectibles = false;
      } */
      // this._updatePersonalities();
    }
  }, {
    key: 'fullname',
    get: function get() {
      var viewName = this.nameEdit ? this.nameEdit : this.name;
      if (this.title) return viewName + ', the ' + this.title;
      return viewName;
    }
  }]);

  return Player;
}(_character.Character)) || _class);