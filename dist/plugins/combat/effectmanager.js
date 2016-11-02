'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EffectManager = exports.EffectManager = function () {
  function EffectManager() {
    _classCallCheck(this, EffectManager);

    this.effects = [];
  }

  _createClass(EffectManager, [{
    key: 'hasEffect',
    value: function hasEffect(effectName) {
      return _lodash2.default.some(this.effects, function (effect) {
        return effect.constructor.name === effectName;
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      _lodash2.default.each(this.effects, function (effect) {
        return effect.duration = 0;
      });
      this.effects = [];
    }
  }, {
    key: 'add',
    value: function add(effect) {
      this.effects.push(effect);
    }
  }, {
    key: 'remove',
    value: function remove(effect) {
      this.effects = _lodash2.default.without(this.effects, effect);
    }
  }, {
    key: 'tick',
    value: function tick() {
      var _this = this;

      _lodash2.default.each(this.effects, function (effect) {
        if (effect.duration <= 0 || effect.target.hp === 0) return;

        effect.tick();

        if (effect.duration <= 0) {
          effect.unaffect();
          _this.remove(effect);
        }
      });
    }
  }]);

  return EffectManager;
}();