
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    request = require('request'),
    dispatcher = require('../dispatcher/dispatcher').dispatcher,
    email = require('../util/email/email.sender').emailer,
    logger = require('../util/log/application.log').logger;

var send = function (incident) {
  if(!incident) { return; }
  if(!process.env.EMAIL) { return; }

  var data = {
    created_at: moment(incident.created_at).format('YYYY-MM-DD HH:mm:ss'),
    action: !!incident.action ? incident.action.replace('_', ' ') : ''
  }

  fetchShifts(function (err, shifts) {

    var current = moment().startOf('minute');

    var inShifts = _.filter(shifts, function (shift) {
      return shift.start.valueOf() < current.valueOf() &&
        shift.end.valueOf() > current.valueOf();
    });

    var options = {
      from: 'irc@cammy.com',
      to: ['steven@cammy.com'],
      subject: '[Cammy-IRC] New Incident Notification',
      template: 'new-incident'
    };

    if(!!inShifts) {
      _.each(inShifts, function (inshift) {
        if(!inshift || !inshift.username) { return; }
        options.to.push(inshift.username);
      });
    } else if (!!process.env.BACKUP_EMAIL) {
      options.to.push(process.env.BACKUP_EMAIL);
    }

    email.send(options, data, function (err, result) {
      if(!!err) { logger.error('email error', err.stack || err); }
      if(!!result) { logger.info('email sent', result, options.to); }
      if(!!result && result.message !== 'success' && !!process.env.BACKUP_EMAIL) {

        // send twice
        options.to = ['steven@cammy.com', process.env.BACKUP_EMAIL];
        email.send(options, data, function (err, result) {
          if(!!err) { logger.error('email error', err.stack || err); }
          if(!!result) { logger.info('email sent', result, options.to); }
        });
      }
    });

  });
}

var fetchShifts = function (cb) {

  request({
    url: 'https://spreadsheets.google.com/feeds/list/14x1aLp9a6_Lwai0TI-lA46F7ROsGlCQ19I0wJ60Kn78/od6/public/values?alt=json',
    method: 'GET',
  }, function (err, response, body) {
    if(!!err) { logger.error('fetch shifts', err); cb(err); }
    if(!body) { cb(new Error ('empty data')); }

    var data;

    try {
      data = JSON.parse(body)
    } catch (err) {
      logger.error('fetch shifts', err);
      cb(err);
    }

    if(!data || !data.feed || !data.feed.entry.length) { cb(new Error('invalid format')); return; }

    var shifts = _.map(data.feed.entry, function (entry) {

      var start = moment(!!entry['gsx$start'] ? entry['gsx$start']['$t'] : null, 'DD/MM/YYYY HH:mm').startOf('minute');
      var end = moment(!!entry['gsx$end'] ? entry['gsx$end']['$t'] : null, 'DD/MM/YYYY HH:mm').startOf('minute');

      return {
        username: !!entry['gsx$email'] ? entry['gsx$email']['$t'] : null,
        start: start,
        end: end
      };
    });

    cb(null, shifts);
  });
};

dispatcher.register(dispatcher.actions.NEW_INCIDENT, send.bind(undefined));
