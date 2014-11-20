
'use strict';

var _ = require('lodash'),
    uuid = require('node-uuid'),
    moment = require('moment'),
    express = require('express'),
    util = require('../../util/incident.util').util,
    dispatcher = require('../../../dispatcher/dispatcher').dispatcher,
    logger = require('../../../util/log/application.log').logger;

var add = function (req, res) {

  var id = req.params.id,
      note = req.body.note,
      username = req.username;

  logger.info('note', id, note, req.username);

  if(!note || !username) { res.status(400).json({ error: 'missing note content'}); return; }

  var options = {
    query: { id: id },
    update: {
      $push: {
        notes: {
          id: uuid.v1(),
          note: note,
          created_at: moment().valueOf(),
          created_by: username
        }
      }
    }
  };

  dispatcher.dispatch(dispatcher.actions.UPDATE_INCIDENT, options).then(
    function (result) { res.status(200).json(result); },
    function () { res.status(500).json(); }
  );
};

module.exports.routes = {
  notes: {
    add: add
  }
};
