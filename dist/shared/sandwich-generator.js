'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SandwichGenerator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _generator = require('../core/base/generator');

var _equipment = require('../core/base/equipment');

var _assetLoader = require('../shared/asset-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chance = new _chance2.default();

var SandwichGenerator = exports.SandwichGenerator = function (_Generator) {
  _inherits(SandwichGenerator, _Generator);

  function SandwichGenerator() {
    _classCallCheck(this, SandwichGenerator);

    return _possibleConstructorReturn(this, (SandwichGenerator.__proto__ || Object.getPrototypeOf(SandwichGenerator)).apply(this, arguments));
  }

  _createClass(SandwichGenerator, null, [{
    key: 'generateSandwich',
    value: function generateSandwich(target) {

      var baseItem = _lodash2.default.sample(_assetLoader.ObjectAssets.bread);
      var itemInst = new _equipment.Equipment(baseItem);
      itemInst.type = 'sandwich';

      var meat = _lodash2.default.sample(_assetLoader.ObjectAssets.meat);
      this.mergePropInto(itemInst, meat, false);
      itemInst.name = meat.name + ' on ' + itemInst.name;

      if (chance.bool({ likelihood: 33 })) {
        var veg = _lodash2.default.sample(_assetLoader.ObjectAssets.veg);
        this.mergePropInto(itemInst, veg, false);
        itemInst.name = veg.name + ' and ' + itemInst.name;
      }

      var inches = 3;

      if (target.isPlayer) {
        if (target.gold > 10000) inches = 12;else inches = 6;
      } else {
        inches = chance.bool({ likelihood: 50 }) ? 6 : 12;
      }

      itemInst.name = inches + '-in ' + itemInst.name;

      return this.cleanUpItem(itemInst);
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

  return SandwichGenerator;
}(_generator.Generator);