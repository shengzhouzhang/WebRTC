
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var details = function (req, res) {

  var id = req.params.id;

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, id).then(function (result) {
    if(!result || !result.length || !result[0]) { res.status(404).json(); return; }

    res.status(200).json(result[0]);
  }, res.status(500).json.bind(undefined));
};

module.exports.routes = {
  details: details
};
