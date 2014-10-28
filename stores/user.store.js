
'use strict';

var _ = require('lodash'),
    db = require('../util/mongo/mongo.client').db.users,
    logger = require('../util/log/application.log').logger;

var users = {

  find: function (username, cb) {
    if(!username) { cb(null); return; }

    db.findOne({ username: username }, function (err, result) {
      if(!!err) { cb(err, null); return; }
      if(!!result) { cb(null, result); return; }
      cb(null, null);
    });
  }
};

module.exports.store = users;
