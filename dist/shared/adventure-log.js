'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureLog = exports.MessageTypes = exports.MessageCategories = undefined;

var _logger = require('./logger');

var _server = require('../primus/server');

var verifyMessage = function verifyMessage(msg) {
  if (!msg.type) return _logger.Logger.error('AdventureLog', new Error('No message type given.'), msg);
  if (!msg.text) return _logger.Logger.error('AdventureLog', new Error('No message text given.'), msg);
  if (!msg.category) return _logger.Logger.error('AdventureLog', new Error('No message category given.'), msg);
  if (!msg.targets && msg.type !== 'Global') return _logger.Logger.error('AdventureLog', new Error('No message targets given (message is not global).'), msg);

  return true;
};

var MessageCategories = exports.MessageCategories = {
  META: 'Meta',
  EXPLORE: 'Explore',
  LEVELUP: 'Levelup',
  ACHIEVEMENT: 'Achievement',
  COMBAT: 'Combat',
  PET: 'Pet',
  GUILD: 'Guild',
  TOWNCRIER: 'Towncrier',
  PARTY: 'Party',
  ITEM: 'Item',
  GOLD: 'Gold',
  PROFESSION: 'Profession',
  XP: 'Xp'
};

var MessageTypes = exports.MessageTypes = {
  GLOBAL: 'Global',
  SINGLE: 'Single'
};

var AdventureLog = exports.AdventureLog = function AdventureLog(message) {
  if (!verifyMessage(message)) return;

  if (process.env.NODE_ENV !== 'production') {
    _logger.Logger.info('AdventureLog', JSON.stringify(message));
  }

  message.event = 'adventurelog';
  _server.primus.emitToPlayers(message.targets, message);
};