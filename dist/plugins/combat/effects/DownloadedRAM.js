'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DownloadedRAM = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _effect = require('../effect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DownloadedRAM = exports.DownloadedRAM = function (_Effect) {
  _inherits(DownloadedRAM, _Effect);

  function DownloadedRAM() {
    _classCallCheck(this, DownloadedRAM);

    return _possibleConstructorReturn(this, (DownloadedRAM.__proto__ || Object.getPrototypeOf(DownloadedRAM)).apply(this, arguments));
  }

  _createClass(DownloadedRAM, [{
    key: 'affect',
    value: function affect(target) {
      var _this2 = this;

      _lodash2.default.each(['str', 'dex', 'agi'], function (stat) {
        _this2.setStat(target, stat, _this2.statByPercent(target, stat, _this2.potency));
      });

      this.setStat(target, 'int', -this.statByPercent(target, 'int', this.potency));
    }
  }]);

  return DownloadedRAM;
}(_effect.Effect);