
'use strict';

var _ = require('lodash'),
    db = require('../util/mongo/mongo.client').db.users,
    bcrypt = require('bcrypt'),
    logger = require('../util/log/application.log').logger;

var users = {

  find: function (username, cb) {
    if(!username) { cb(null); return; }

    db.findOne({ username: username }, function (err, result) {
      if(!!err) { cb(err, null); return; }
      if(!!result) { cb(null, result); return; }
      cb(null, null);
    });
  },

  add: function (user, cb) {
    if(!cb) { throw new Error ('missing cb'); }
    if(!user || !user.username || !user.password) { cb(new Error ('missing username or password')); return; }

    db.count({ username: user.username }, function (err, result) {
      if(!!err) { cb(err, null); return; }
      if(!!result) { cb(new Error ('username exist: ' + user.username), null); return; }

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if(!!err) { if(!!cb) { cb(err, null); } return; }

          user.password = hash;
          db.save(user, function (err, result) {
            if(!!err) { if(!!cb) { cb(err, null); } return; }
            if(!!cb) { cb(null, { username: result.username }); }
          });
        });
      });
    });
  },
};

module.exports.store = users;
