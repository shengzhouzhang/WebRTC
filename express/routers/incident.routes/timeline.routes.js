
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

    res.status(200).json(result[0]);
    
  }, res.status(500).json.bind(undefined));
};

module.exports.routes = {
  timeline: timeline
};
