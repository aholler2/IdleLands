'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageParser = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// TODO: https://github.com/IdleLands/IdleLandsOld/blob/e460f87751ddfe370f8e99b46d4838af5688b93b/src/system/handlers/MessageCreator.coffee

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance2 = require('chance');

var _chance3 = _interopRequireDefault(_chance2);

var _gameState = require('../../core/game-state');

var _assetLoader = require('../../shared/asset-loader');

var _logger = require('../../shared/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _chance = new _chance3.default();

var AllDomains = function () {
  function AllDomains() {
    _classCallCheck(this, AllDomains);
  }

  _createClass(AllDomains, null, [{
    key: 'dict',
    value: function dict(props) {
      var funct = props[0].funct;

      var normalizedFunct = funct.toLowerCase();
      var isPlural = false;

      if (normalizedFunct === 'nouns') {
        isPlural = true;
        normalizedFunct = 'noun';
      }

      var canLowercase = !_lodash2.default.includes(['deity'], normalizedFunct);
      var chosenItem = _lodash2.default.sample(_assetLoader.StringAssets[normalizedFunct]);
      if (canLowercase) {
        chosenItem = normalizedFunct === funct ? chosenItem.toLowerCase() : _lodash2.default.capitalize(chosenItem);
      }

      if (normalizedFunct === 'noun' && !isPlural) {
        chosenItem = chosenItem.substring(0, chosenItem.length - 1); // supposedly, all nouns are plural
      }

      return chosenItem;
    }
  }, {
    key: 'placeholder',
    value: function placeholder() {
      return this.dict([{ funct: 'placeholder' }]);
    }
  }, {
    key: 'chance',
    value: function chance(props) {
      var _props$ = props[0],
          funct = _props$.funct,
          args = _props$.args;

      if (!_chance[funct]) return this.placeholder();
      return _chance[funct](args);
    }
  }, {
    key: 'party',
    value: function party(props, cache, partyData) {
      var _props$2 = props[0],
          funct = _props$2.funct,
          cacheNum = _props$2.cacheNum;

      if (funct === 'member') {
        return partyData.players[cacheNum].fullname;
      }
      return this.placeholder();
    }
  }, {
    key: 'combat',
    value: function combat(props, cache, combatData) {
      var _props$3 = props[0],
          funct = _props$3.funct,
          cacheNum = _props$3.cacheNum;

      if (props[1]) {
        return this.party([props[1]], cache, combatData.parties[cacheNum]);
      }

      if (funct === 'party') {
        return combatData.parties[cacheNum].name;
      }

      return this.placeholder();
    }
  }, {
    key: 'random',
    value: function random(props, cache) {
      var _props$4 = props[0],
          domain = _props$4.domain,
          funct = _props$4.funct,
          cacheNum = _props$4.cacheNum,
          args = _props$4.args;

      var got = cache.get(domain, funct, cacheNum);
      if (got) return '\xAB' + got + '\xBB';

      var res = AssetDomainHandler[funct](args, props, cache);
      cache.set(domain, funct, cacheNum, res);
      return '\xAB' + res + '\xBB';
    }
  }]);

  return AllDomains;
}();

var AssetDomainHandler = function () {
  function AssetDomainHandler() {
    _classCallCheck(this, AssetDomainHandler);
  }

  _createClass(AssetDomainHandler, null, [{
    key: 'town',
    value: function town() {
      return _lodash2.default.sample(_lodash2.default.filter(_gameState.GameState.getInstance().world.uniqueRegions, function (r) {
        return _lodash2.default.includes(r, 'Town');
      }));
    }
  }, {
    key: 'class',
    value: function _class() {
      return _lodash2.default.sample(_assetLoader.StringAssets.class);
    }
  }, {
    key: 'player',
    value: function player() {
      return _lodash2.default.sample(_gameState.GameState.getInstance().players).fullname;
    }
  }, {
    key: 'map',
    value: function map() {
      return _lodash2.default.sample(_lodash2.default.keys(_gameState.GameState.getInstance().world.maps));
    }
  }, {
    key: 'pet',
    value: function pet() {
      var player = _lodash2.default.sample(_gameState.GameState.getInstance().players);
      var pet = _lodash2.default.sample(player.$pets.$pets);
      return pet ? pet.fullname : AllDomains.placeholder();
    }
  }, {
    key: 'activePet',
    value: function activePet() {
      var player = _lodash2.default.sample(_gameState.GameState.getInstance().players);
      var pet = player.activePet;
      return pet ? pet.fullname : AllDomains.placeholder();
    }
  }, {
    key: 'guild',
    value: function guild() {
      return AllDomains.placeholder();
    }
  }, {
    key: 'item',
    value: function item() {
      return _lodash2.default.sample(_lodash2.default.values(_lodash2.default.sample(_gameState.GameState.getInstance().players).equipment)).fullname;
    }
  }, {
    key: 'monster',
    value: function monster() {
      return _lodash2.default.sample(_assetLoader.ObjectAssets.monster).name;
    }
  }, {
    key: 'ingredient',
    value: function ingredient() {
      return _lodash2.default.sample(_assetLoader.ObjectAssets[_lodash2.default.sample(['veg', 'meat', 'bread'])]).name;
    }
  }, {
    key: 'party',
    value: function party() {
      var party = _lodash2.default.sample(_lodash2.default.values(_gameState.GameState.getInstance().parties));
      if (party) return party.name;
      return AllDomains.placeholder();
    }
  }]);

  return AssetDomainHandler;
}();

var PlayerOwnedDomainHandler = function () {
  function PlayerOwnedDomainHandler() {
    _classCallCheck(this, PlayerOwnedDomainHandler);
  }

  _createClass(PlayerOwnedDomainHandler, null, [{
    key: 'pet',
    value: function pet() {
      return AllDomains.placeholder();
    }
  }, {
    key: 'guild',
    value: function guild() {
      return AllDomains.placeholder();
    }
  }, {
    key: 'guildMember',
    value: function guildMember() {
      return AllDomains.placeholder();
    }
  }]);

  return PlayerOwnedDomainHandler;
}();

var EventVariableCache = function () {
  function EventVariableCache() {
    _classCallCheck(this, EventVariableCache);

    this.cache = {};
  }

  _createClass(EventVariableCache, [{
    key: 'get',
    value: function get(domain, funct, num) {
      if (_lodash2.default.isNaN(num)) throw new Error('Cache:get num cannot be NaN');
      return _lodash2.default.get(this.cache, domain + '.' + funct + '.' + num);
    }
  }, {
    key: 'set',
    value: function set(domain, funct, num, val) {
      if (_lodash2.default.isNaN(num)) throw new Error('Cache:set num cannot be NaN');
      _lodash2.default.set(this.cache, domain + '.' + funct + '.' + num, val);
    }
  }]);

  return EventVariableCache;
}();

var EventVariableManager = function () {
  function EventVariableManager() {
    _classCallCheck(this, EventVariableManager);
  }

  _createClass(EventVariableManager, null, [{
    key: 'transformVarProps',
    value: function transformVarProps(props, cache, eventData) {
      var _props$5 = props[0],
          domain = _props$5.domain,
          funct = _props$5.funct,
          cacheNum = _props$5.cacheNum;


      var retVal = null;

      try {
        var prevCacheData = cache.get(domain, funct, cacheNum);
        if (prevCacheData && funct !== 'party') return prevCacheData;
        retVal = AllDomains[domain](props, cache, eventData);
        if (funct !== 'party') cache.set(domain, funct, cacheNum, retVal);
      } catch (e) {
        _logger.Logger.error('EventVariableManager', e, { props: props, cache: cache });
      }

      return retVal;
    }
  }, {
    key: 'getVarProps',
    value: function getVarProps(string) {
      var terms = string.split(' ');
      var varProps = [];
      _lodash2.default.each(terms, function (term) {
        var _term$split = term.split('#'),
            _term$split2 = _slicedToArray(_term$split, 2),
            props = _term$split2[0],
            cacheNum = _term$split2[1];

        var _props$split = props.split(':', 2),
            _props$split2 = _slicedToArray(_props$split, 2),
            domain = _props$split2[0],
            funct = _props$split2[1];

        var args = props.substring(1 + funct.length + props.indexOf(funct)).trim().split('\'').join('"');
        try {
          varProps.push({
            domain: domain,
            funct: funct,
            cacheNum: cacheNum ? +cacheNum : 0,
            args: args ? JSON.parse(args) : null
          });
        } catch (e) {
          _logger.Logger.error('MessageCreator', e, { string: string });
        }
      });

      return varProps;
    }
  }, {
    key: 'handleVariables',
    value: function handleVariables(string) {
      var _this = this;

      var eventData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var cache = new EventVariableCache();
      return string.replace(/\$([a-zA-Z\:#0-9 {}_,']+)\$/g, function (match, p1) {
        var string = _this.getVarProps(p1);
        string = _this.transformVarProps(string, cache, eventData);
        return string;
      });
    }
  }]);

  return EventVariableManager;
}();

var MessageParser = exports.MessageParser = function () {
  function MessageParser() {
    _classCallCheck(this, MessageParser);
  }

  _createClass(MessageParser, null, [{
    key: 'genderPronoun',
    value: function genderPronoun(gender, replace) {
      switch (replace) {
        case '%hisher':
          {
            switch (gender) {
              case 'male':
                return 'his';
              case 'female':
                return 'her';
              default:
                return 'their';
            }
          }
        case '%hishers':
          {
            switch (gender) {
              case 'male':
                return 'his';
              case 'female':
                return 'hers';
              default:
                return 'theirs';
            }
          }
        case '%himher':
          {
            switch (gender) {
              case 'male':
                return 'him';
              case 'female':
                return 'her';
              default:
                return 'them';
            }
          }
        case '%she':
        case '%heshe':
          {
            switch (gender) {
              case 'male':
                return 'he';
              case 'female':
                return 'she';
              default:
                return 'they';
            }
          }
      }
    }
  }, {
    key: 'stringFormat',
    value: function stringFormat(string, player) {
      var _this2 = this;

      var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!player) return '';
      string = _lodash2.default.trim(string);

      if (extra.item) extra.item = '\xAB' + extra.item + '\xBB';
      if (extra.partyName) extra.partyName = '\xAB' + extra.partyName + '\xBB';
      if (extra.spellName) extra.spellName = '\xAB' + extra.spellName + '\xBB';
      if (extra.weaponName) extra.weaponName = '\xAB' + extra.weaponName + '\xBB';
      if (extra.targetName) extra.targetName = '\xAB' + extra.targetName + '\xBB';
      if (extra.casterName) extra.casterName = '\xAB' + extra.casterName + '\xBB';
      if (extra.deflectItem) extra.deflectItem = '\xAB' + extra.deflectItem + '\xBB';
      if (extra.collectible) extra.collectible = '\xAB' + extra.collectible + '\xBB';

      _lodash2.default.each(_lodash2.default.keys(extra), function (key) {
        string = string.split('%' + key).join(extra[key]);
      });

      string = EventVariableManager.handleVariables(string, extra._eventData);

      var splitJoins = [{ split: '%player', join: function join() {
          return '\xAB' + player.fullname + '\xBB';
        } }, { split: '%pet', join: function join() {
          return '\xAB' + PlayerOwnedDomainHandler.pet(player) + '\xBB';
        } }, { split: '%guildMember', join: function join() {
          return '\xAB' + PlayerOwnedDomainHandler.guildMember(player) + '\xBB';
        } }, { split: '%guild', join: function join() {
          return '\xAB' + PlayerOwnedDomainHandler.guild(player) + '\xBB';
        } }];

      _lodash2.default.each(['hishers', 'hisher', 'himher', 'she', 'heshe'], function (pronoun) {
        splitJoins.push({
          split: '%' + pronoun,
          join: function join() {
            return _this2.genderPronoun(player.gender, '%' + pronoun);
          }
        });
        splitJoins.push({
          split: '%' + _lodash2.default.capitalize(pronoun),
          join: function join() {
            return _lodash2.default.capitalize(_this2.genderPronoun(player.gender, '%' + pronoun));
          }
        });
      });

      _lodash2.default.each(splitJoins, function (sj) {
        if (!_lodash2.default.includes(string, sj.split)) return;
        string = string.split(sj.split).join(sj.join());
      });

      return string;
    }
  }]);

  return MessageParser;
}();