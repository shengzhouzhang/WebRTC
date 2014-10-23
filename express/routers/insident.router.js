
'use strict';

var _ = require('lodash'),
    moment = require('moment'),
    express = require('express'),
    store = require('../../stores/insident.store').store,
    logger = require('../../util/log/application.log').logger;

var request = function (req, res) {

  store.query({}, function (err, insidents) {
    if(!!err) { res.status(500).json({}); return; }
    if(!insidents || !insidents.length) { res.status(204).json(); return; }

    res.status(200).json(insidents);
  });
};

var add = function (req, res) {

  var insident = req.insident;

  insident.recevied_at = moment().valueOf();

  store.add(req.insident, function (err, result) {
    if(!!err) { res.status(500).json(); return; }
    res.status(201).json();
  });
};

var validate = function (req, res, next) {

  var insident = req.insident;

  if(!!insident && !!insident.id) { next(); return; }
  res.status(400).json({ error: 'invalid insident data' });
};


var router = express.Router();

router.get('/request', request);
router.post('/add', validate, add);

module.exports.router = router;
