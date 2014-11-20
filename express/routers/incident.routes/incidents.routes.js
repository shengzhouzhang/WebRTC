
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var timeline = function (req, res) {

  var options = {
        created_at:  {
          $gt: !!req.query.min ? parseInt(req.query.min) : 0,
          $lt: !!req.query.max ? parseInt(req.query.max) : moment().valueOf()
        }
      };

  logger.info('incidents', options);

  dispatcher.dispatch(dispatcher.actions.REQUEST_TIMELINE, options).then(function (result) {
    if(!result.length) { res.status(200).json([]); return; }

    res.status(200).json(_.map(result, function (incident) {

      return {
        id: incident.id,
        status: incident.status,
        action: incident.action,
        home: incident.home,
        contacts: _.find(incident.contacts, function (contact) {
          return !!contact.owner;
        }),
        event: {
          id: incident.event.id,
          start: incident.event.start,
          end: incident.event.end,
          cover: incident.event.cover
        },
        created_at: incident.created_at,
      };
    }));

  }, res.status(500).json.bind(res, undefined));
};

module.exports.routes = {
  timeline: timeline
};
