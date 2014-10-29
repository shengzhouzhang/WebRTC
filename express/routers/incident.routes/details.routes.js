
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var details = function (req, res) {

  var id = req.params.id;

  dispatcher.dispatch(dispatcher.actions.REQUEST_INCIDENT, id).then(function (result) {

    var details = _.extend(result[0], { events: result[1] });
    res.status(200).json(details);

  }, res.status(500).json.bind(undefined));
};

module.exports.routes = {
  details: details
};
