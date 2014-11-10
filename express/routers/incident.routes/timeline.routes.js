
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var timeline = function (req, res) {

  var min = req.min,
      max = req.max,
      limit = req.limit || 30;

  dispatcher.dispatch(dispatcher.actions.REQUEST_TIMELINE, {}).then(function (result) {

    dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, result[0]).then(function (result) {

      res.status(200).json(_.map(result[0], function (incident) {

        return {
          id: incident.id,
          status: incident.status,
          home: incident.home,
          contact: _.find(incident.contact, function (contact) {
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
  }, res.status(500).json.bind(res, undefined));
};

module.exports.routes = {
  timeline: timeline
};
