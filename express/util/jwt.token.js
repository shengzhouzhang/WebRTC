
'use strict';

var jwt = require('jwt-simple'),
    moment = require('moment'),
    logger = require('../../util/log/application.log').logger;

var token = {

  _secret: 'secret',

  create: function (username) {
    if(!username) { throw new Error('invalid username'); }

    return jwt.encode({ username: username, timestamp: moment().valueOf() }, this._secret);
  },

  isExpired: function (timestamp) {
    if (!timestamp || moment(timestamp).add(10080, 'minutes').valueOf() > moment().valueOf()) { return false; }
    return true;
  },

  decode: function (access_token) {
    if(!access_token) { return null; }

    var decoded;

    try {
      decoded = jwt.decode(access_token, this._secret);
    } catch (err) {
      decoded = null;
    }

    return !!decoded && !!decoded.username && !!decoded.timestamp ? decoded : null;
  },
};


module.exports.token = token;
