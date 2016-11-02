'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventHandler = exports.allEvents = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance = new _chance2.default();

var allEvents = exports.allEvents = {};

var loadAllEvents = function loadAllEvents() {
  var list = _fs2.default.readdirSync(__dirname + '/events');
  _lodash2.default.each(list, function (basefilename) {
    allEvents[basefilename.split('.')[0]] = require(__dirname + '/events/' + basefilename);
  });
};

loadAllEvents();

var EventHandler = exports.EventHandler = function () {
  function EventHandler() {
    _classCallCheck(this, EventHandler);
  }

  _createClass(EventHandler, null, [{
    key: 'doEvent',
    value: function doEvent(player, eventName) {
      if (!allEvents[eventName]) return;
      var chosenEvent = allEvents[eventName][eventName];
      var affected = chosenEvent.operateOn(player);

      _lodash2.default.each(affected, function (affect) {
        if (!affect || !affect.$statistics) return;
        affect.$statistics.batchIncrement(['Character.Events', 'Character.Event.' + eventName]);
      });
    }
  }, {
    key: 'tryToDoEvent',
    value: function tryToDoEvent(player) {

      if (player.eventSteps > 0) {
        player.eventSteps--;
        return;
      }

      var requiredEventSteps = chance.integer({ min: 35, max: 50 });
      var modifier = player.calcLuckBonusFromValue();
      player.eventSteps = Math.max(7, requiredEventSteps - modifier);

      var events = [];
      var weights = [];

      _lodash2.default.each(_lodash2.default.keys(allEvents), function (evtName) {
        events.push(evtName);
        weights.push(allEvents[evtName].WEIGHT);
      });

      var chosenEventName = chance.weighted(events, weights);
      this.doEvent(player, chosenEventName);
    }
  }]);

  return EventHandler;
}();