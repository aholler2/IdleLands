'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Summon = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _spell = require('../spell');

var _monsterGenerator = require('../../../shared/monster-generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var monsters = {
  Necromancer: [{ name: 'zombie', statMult: 0.5, slotCost: 1, restrictLevel: 5, restrictClasses: ['Monster'] }, {
    name: 'skeleton',
    statMult: 0.8,
    slotCost: 1,
    restrictLevel: 25,
    restrictClasses: ['Generalist', 'Rogue', 'Mage', 'Cleric', 'Barbarian', 'Fighter', 'SandwichArtist']
  }, { name: 'wraith', statMult: 1.1, slotCost: 1, restrictLevel: 55 }, { name: 'vampire', statMult: 1.0, slotCost: 2, restrictLevel: 70, baseStats: { vampire: 10 } }, { name: 'plaguebringer', statMult: 1.0, slotCost: 2, restrictLevel: 70, baseStats: { venom: 10 } }, { name: 'ghoul', statMult: 1.0, slotCost: 2, restrictLevel: 70, baseStats: { poison: 10 } }, {
    name: 'dracolich',
    statMult: 1.35,
    slotCost: 4,
    restrictLevel: 85,
    restrictClasses: ['Lich'],
    requireCollectibles: ['Undead Dragon Scale']
  }, {
    name: 'demogorgon',
    statMult: 1.75,
    slotCost: 6,
    restrictLevel: 150,
    baseStats: { mirror: 1 },
    requireCollectibles: ['Gorgon Snake']
  }]
};

var Summon = exports.Summon = (_temp = _class = function (_Spell) {
  _inherits(Summon, _Spell);

  function Summon() {
    _classCallCheck(this, Summon);

    return _possibleConstructorReturn(this, (Summon.__proto__ || Object.getPrototypeOf(Summon)).apply(this, arguments));
  }

  _createClass(Summon, [{
    key: 'determineTargets',
    value: function determineTargets() {
      return this.$targetting.self;
    }
  }, {
    key: 'chooseValidMonster',
    value: function chooseValidMonster() {
      var _this2 = this;

      return (0, _lodash2.default)(monsters[this.caster.professionName]).reject(function (mon) {
        return mon.restrictLevel > _this2.caster.level;
      }).reject(function (mon) {
        return _this2.caster.$collectibles && mon.requireCollectibles && !_lodash2.default.every(mon.requireCollectibles, function (col) {
          return _this2.caster.$collectibles.hasCollectible(col);
        });
      }).reject(function (mon) {
        return mon.slotCost > _this2.caster._special.maximum - _this2.caster.special;
      }).sample();
    }
  }, {
    key: 'preCast',
    value: function preCast() {
      var _this3 = this;

      var baseMonster = _lodash2.default.cloneDeep(this.chooseValidMonster());
      _lodash2.default.extend(baseMonster, baseMonster.baseStats);

      if (baseMonster.restrictClasses) {
        baseMonster.class = _lodash2.default.sample(baseMonster.restrictClasses);
      }

      var mimicTarget = this.$targetting.strongestEnemyScore;

      var summonedMonster = _monsterGenerator.MonsterGenerator.augmentMonster(baseMonster, mimicTarget);
      summonedMonster.name = this.caster.fullname + '\'s ' + summonedMonster.name;
      summonedMonster.$isMinion = true;
      summonedMonster._level.set(Math.floor(this.caster.level / 2));
      summonedMonster.recalculateStats();

      this.caster.party.playerJoin(summonedMonster);
      this.caster.$battle._setupPlayer(summonedMonster);

      var isLich = summonedMonster.professionName === 'Lich';

      // Lich summons use default death message if they have phylacteries left.

      if (!isLich) {
        summonedMonster.deathMessage = '%player exploded into a pile of arcane dust!';
      }

      summonedMonster._eventSelfKilled = function () {

        // If the lich has phylacteries left, he stays in the party.
        if (isLich && !summonedMonster._special.atMinimum()) {
          return;
        }

        // If the lich has HP but no phylacteries, he's on his last life, so he stays in the party.
        if (isLich && !summonedMonster._hp.atMinimum()) {
          // Change to the standard minion death message.
          summonedMonster.deathMessage = '%player exploded into a pile of arcane dust!';
          return;
        }

        _this3.caster._special.sub(baseMonster.slotCost);
        summonedMonster.party.playerLeave(summonedMonster);
      };

      var message = '%player used %spellName and spawned a ' + baseMonster.name + '!';

      this.caster._special.add(baseMonster.slotCost);

      _get(Summon.prototype.__proto__ || Object.getPrototypeOf(Summon.prototype), 'cast', this).call(this, {
        damage: 0,
        message: message,
        targets: [this.caster]
      });
    }
  }], [{
    key: 'shouldCast',
    value: function shouldCast(caster) {
      return !caster.$isMinion && !caster._special.atMaximum();
    }
  }]);

  return Summon;
}(_spell.Spell), _class.element = _spell.SpellType.PHYSICAL, _class.tiers = [{ name: 'summon', spellPower: 1, weight: 90, cost: 350, level: 25, profession: 'Necromancer' }], _temp);