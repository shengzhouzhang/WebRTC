
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    hc = require('../util/hipchat/hipchat.messages').hc,
    logger = require('../util/log/application.log').logger;

var hipchat = function (incident) {
  if(!incident) { return; }
  if(!process.env.HIPCHAT) { return; }

  var messages =  [
    'New Incident: ' + !!incident.action ? incident.action.replace('_', ' ') : '',
    moment(incident.created_at).format('YYYY-MM-DD HH:mm:ss')
  ];

  hc.sendMessage(messages.join('<br/>'), function (err, result) {
    if(!!err) { logger.error(err.stack || err); }
    if(!err && !!result) { logger.info('hipchat notification sent'); }
  });
};

dispatcher.register(dispatcher.actions.NEW_INCIDENT, hipchat.bind(undefined));
