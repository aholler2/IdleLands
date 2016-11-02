'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PartyLeave = exports.WEIGHT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _event = require('../event');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WEIGHT = exports.WEIGHT = -1;

// Get given the opportunity to leave party
var PartyLeave = exports.PartyLeave = (_temp = _class = function (_Event) {
  _inherits(PartyLeave, _Event);

  function PartyLeave() {
    _classCallCheck(this, PartyLeave);

    return _possibleConstructorReturn(this, (PartyLeave.__proto__ || Object.getPrototypeOf(PartyLeave)).apply(this, arguments));
  }

  _createClass(PartyLeave, null, [{
    key: 'operateOn',
    value: function operateOn(player) {
      var otherOfSame = _lodash2.default.find(player.choices, function (choice) {
        return choice.event === 'PartyLeave';
      });
      if (otherOfSame) return;
      var id = _event.Event.chance.guid();
      var message = 'Would you like to leave your party?';

      player.addChoice({ id: id, message: message, extraData: {}, event: 'PartyLeave', choices: ['Yes', 'No'] });
    }
  }, {
    key: 'makeChoice',
    value: function makeChoice(player, id, response) {
      if (response !== 'Yes' || !player.party) return;
      player.party.playerLeave(player);
    }
  }]);

  return PartyLeave;
}(_event.Event), _class.WEIGHT = WEIGHT, _temp);