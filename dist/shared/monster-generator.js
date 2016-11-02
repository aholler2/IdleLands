'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _all = require('../core/professions/_all');

var Professions = _interopRequireWildcard(_all);

var _itemGenerator = require('./item-generator');

var _generator = require('../core/base/generator');

var _equipment = require('../core/base/equipment');

var _assetLoader = require('../shared/asset-loader');

var _boss = require('../../assets/maps/content/boss.json');

var _boss2 = _interopRequireDefault(_boss);

var _bossparties = require('../../assets/maps/content/bossparties.json');

var _bossparties2 = _interopRequireDefault(_bossparties);

var _bossitems = require('../../assets/maps/content/bossitems.json');

var _bossitems2 = _interopRequireDefault(_bossitems);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chance = new _chance2.default();

// import { Monster } from ;

var bossTimers = {};

var MonsterGenerator = exports.MonsterGenerator = function (_Generator) {
  _inherits(MonsterGenerator, _Generator);

  function MonsterGenerator() {
    _classCallCheck(this, MonsterGenerator);

    return _possibleConstructorReturn(this, (MonsterGenerator.__proto__ || Object.getPrototypeOf(MonsterGenerator)).apply(this, arguments));
  }

  _createClass(MonsterGenerator, null, [{
    key: '_setBossTimer',
    value: function _setBossTimer(name) {
      var respawn = _boss2.default[name] ? _boss2.default[name].respawn : _bossparties2.default[name].respawn;
      bossTimers[name] = Date.now() + 1000 * respawn;
    }
  }, {
    key: '_isBossAlive',
    value: function _isBossAlive(name) {
      return bossTimers[name] ? bossTimers[name] - Date.now() < 0 : true;
    }
  }, {
    key: 'generateBoss',
    value: function generateBoss(name) {
      var boss = _lodash2.default.cloneDeep(_boss2.default[name]);
      if (!this._isBossAlive(name)) return;
      boss.stats.name = '' + name;
      boss.stats._name = '' + name;
      var monster = this.augmentMonster(boss.stats);
      monster.$isBoss = true;
      this.equipBoss(monster, boss.items);
      monster._collectibles = boss.collectibles;
      return [monster];
    }
  }, {
    key: 'generateBossParty',
    value: function generateBossParty(name) {
      var _this2 = this;

      var bossparty = _bossparties2.default[name];
      if (!this._isBossAlive(name)) return;
      return _lodash2.default.map(bossparty.members, function (member) {
        var boss = _lodash2.default.cloneDeep(_boss2.default[member]);
        boss.stats.name = '' + member;
        boss.stats._name = '' + member;
        var monster = _this2.augmentMonster(boss.stats);
        monster.$isBoss = true;
        _this2.equipBoss(monster, boss.items);
        monster._collectibles = boss.collectibles;
        return monster;
      });
    }
  }, {
    key: 'equipBoss',
    value: function equipBoss(monster, items) {
      if (!items || !items.length) return;
      _lodash2.default.each(items, function (item) {
        var itemInst = new _equipment.Equipment(_bossitems2.default[item.name]);
        itemInst.name = item.name;
        itemInst.itemClass = 'guardian';
        itemInst.dropPercent = item.dropPercent;
        monster.equip(itemInst);
      });
    }
  }, {
    key: 'generateMonsters',
    value: function generateMonsters(party) {
      var _this3 = this;

      return _lodash2.default.map(party.players, function (p) {
        return _this3.augmentMonster(_this3.pickMonster(p), p);
      });
    }
  }, {
    key: 'pickMonster',
    value: function pickMonster(player) {
      return _lodash2.default.clone((0, _lodash2.default)(_assetLoader.ObjectAssets.monster).reject(function (mon) {
        return mon.level > player.level + 5 || mon.level < player.level - 5;
      }).sample());
    }
  }, {
    key: 'equipMonster',
    value: function equipMonster(monster, baseMonster) {

      // give it some equipment to defend itself with
      _lodash2.default.each(_generator.Generator.types, function (type) {
        var item = _itemGenerator.ItemGenerator.generateItem(type);

        if (monster.canEquip(item)) {
          monster.equip(item);
        }
      });

      // base stats = "monster essence"; always given to a monster after other equipment
      var baseEssence = _lodash2.default.pick(baseMonster, _generator.Generator.stats);
      baseEssence.type = 'essence';
      baseEssence.name = 'monster essence';
      var essence = new _equipment.Equipment(baseEssence);
      monster.equip(essence);
    }
  }, {
    key: 'generateVectorMonster',
    value: function generateVectorMonster(forPlayer) {
      var profession = _lodash2.default.sample(_lodash2.default.keys(Professions));
      return {
        name: 'Vector ' + profession,
        class: profession,
        level: forPlayer.level
      };
    }
  }, {
    key: 'augmentMonster',
    value: function augmentMonster(baseMonster, forPlayer) {

      if (!baseMonster) baseMonster = this.generateVectorMonster(forPlayer);

      baseMonster.professionName = baseMonster.class;
      if (!baseMonster.professionName || baseMonster.professionName.toLowerCase() === 'random') {
        baseMonster.professionName = _lodash2.default.sample(_lodash2.default.keys(Professions));
      }

      // TODO personalities
      // TODO other additions

      if (baseMonster.name && chance.bool({ likelihood: 1 })) {
        var chanceOpts = { prefix: chance.bool(), suffix: chance.bool(), middle: chance.bool() };
        if (baseMonster.gender) {
          chanceOpts.gender = _lodash2.default.sample(['male', 'female']);
        }
        baseMonster.name = chance.name(chanceOpts) + ', the ' + baseMonster.name;
      }

      var Monster = require('../plugins/combat/monster').Monster;
      var monster = new Monster();

      if (baseMonster.mirror) {
        baseMonster.professionName = forPlayer.professionName;
        baseMonster.level = forPlayer.level;
      }

      monster.init(baseMonster);

      if (baseMonster.mirror) {
        _lodash2.default.each(_lodash2.default.values(forPlayer.equipment), function (item) {
          var cloned = _lodash2.default.cloneDeep(item);
          monster.equip(cloned);
        });
      } else {
        this.equipMonster(monster, baseMonster);
      }

      return monster;
    }
  }]);

  return MonsterGenerator;
}(_generator.Generator);