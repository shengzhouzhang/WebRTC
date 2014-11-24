
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    email = require('../util/email/email.sender').emailer,
    logger = require('../util/log/application.log').logger;

var options = {
  from: 'steven@cammy.com',
  to: 'steven@cammy.com',
  subject: '[Cammy-IRC] New Incident Notification',
  template: 'new-incident'
};

var send = function (incident) {
  if(!incident) { return; }
  if(!process.env.EMAIL) { return; }

  var data = {
    created_at: moment(incident.created_at).format('YYYY-MM-DD HH:mm:ss'),
    action: !!incident.action ? incident.action.replace('_', ' ') : ''
  }

  email.send(options, data, function (err, result) {
    if(!!err) { logger.error('email error', err.stack || err); }
    if(!!result) { logger.info('email sent', result, data); }
  });
}

dispatcher.register(dispatcher.actions.NEW_INCIDENT, send.bind(undefined));
