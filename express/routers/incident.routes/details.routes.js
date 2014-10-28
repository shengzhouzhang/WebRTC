
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    store = require('../../../stores/incident.store').store,
    logger = require('../../../util/log/application.log').logger;

var details = function (req, res) {

  store.query({}, function (err, incidents) {
    if(!!err) { res.status(500).json({}); return; }
    if(!incidents || !incidents.length) { res.status(204).json(); return; }

    res.status(200).json(incidents);
  });
};

module.exports.routes = {
  details: details
};
