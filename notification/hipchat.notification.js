
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    hc = require('../util/hipchat/hipchat.messages').hc,
    logger = require('../util/log/application.log').logger;

dispatcher.register(dispatcher.actions.NEW_INCIDENT, function (incident) {
  if(!incident) { return; }
  if(!process.env.HIPCHAT) { return; }

  var messages = [];

  var address = [
    incident.home.address.street,
    incident.home.address.city,
    incident.home.address.postcode,
    incident.home.address.country
  ].join(' ').trim();

  if(!!address) {
    messages.push(address);
  }

  messages.push(!!incident.action ? incident.action.replace('_', ' ') : '');
  messages.push(moment(incident.created_at).format('YYYY-MM-DD HH:mm:ss'));

  hc.sendMessage(messages.join('<br/>'), function (err, result) {
    if(!!err) { logger.error(err.stack || err); }
    if(!err && !!result) { logger.info('hipchat notification sent'); }
  });
});


dispatcher.register(dispatcher.actions.STATUS_UPDATED, function (incident) {
  if(!incident) { return; }
  if(!process.env.HIPCHAT) { return; }

  var messages = [];

  var address = [
    incident.home.address.street,
    incident.home.address.city,
    incident.home.address.postcode,
    incident.home.address.country
  ].join(' ').trim();

  if(!!address) {
    messages.push(address);
  }

  var note = _.last(incident.notes);

  if(!!note) {
    messages.push(incident.status.join(' ').replace('_', ' '));
    messages.push(note.created_by);
    messages.push(moment(note.created_at).format('YYYY-MM-DD HH:mm:ss'));
  }

  hc.sendMessage(messages.join('<br/>'), function (err, result) {
    if(!!err) { logger.error(err.stack || err); }
    if(!err && !!result) { logger.info('hipchat notification sent'); }
  });
});
